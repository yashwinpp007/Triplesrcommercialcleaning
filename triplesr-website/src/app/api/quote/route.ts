import { NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { linkCount, quoteSchema } from "@/lib/validation";

export const runtime = "nodejs";

// --- Abuse controls -------------------------------------------------------
// In-memory limiter: fine for a single Node process. On serverless/multi-instance hosting,
// swap this for a durable store (Upstash Redis / KV) – see SECURITY.md.
const hits = new Map<string, number[]>();
const seenKeys = new Map<string, number>();
const LIMIT = 5;
const WINDOW_MS = 15 * 60_000;
const BURST_MS = 10_000;
const MAX_BODY = 12_000;

function limited(id: string) {
  const now = Date.now();
  const recent = (hits.get(id) ?? []).filter((t) => now - t < WINDOW_MS);
  const burst = recent.some((t) => now - t < BURST_MS);
  if (recent.length >= LIMIT || burst) {
    hits.set(id, recent);
    return true;
  }
  recent.push(now);
  hits.set(id, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return false;
}

const fail = (status: number, message: string, extra?: HeadersInit) =>
  NextResponse.json({ ok: false, message }, { status, headers: extra });

const disposable = new Set(["mailinator.com", "guerrillamail.com", "10minutemail.com", "tempmail.com", "yopmail.com", "trashmail.com"]);

async function verifyTurnstile(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured (local dev); configure before launch
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const j = (await res.json()) as { success?: boolean; hostname?: string };
    if (!j.success) return false;
    return !j.hostname || j.hostname === new URL(site.url).hostname || j.hostname === "localhost";
  } catch {
    return false;
  }
}

// Forward the enquiry to Formspree (JSON/AJAX mode). Done server-side so spam traps, rate limits and validation apply first.
async function sendToFormspree(fields: Record<string, string>, replyTo: string, subject: string) {
  const endpoint = process.env.FORMSPREE_ENDPOINT ?? site.formspreeEndpoint;
  if (!endpoint) return false;
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ ...fields, email: replyTo, _subject: subject }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) console.error("formspree rejected submission", res.status);
  return res.ok;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? `${site.name} <onboarding@resend.dev>`,
      to: [to],
      subject: subject.replace(/[\r\n]+/g, " "),
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  return res.ok;
}

export async function POST(req: Request) {
  // 1. Same-origin check (CSRF). Browsers always send Origin on cross-origin POSTs.
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) return fail(403, "Request could not be verified.");
  if (!(req.headers.get("content-type") ?? "").includes("application/json")) return fail(415, "Unsupported request.");

  // 2. Size limit
  const raw = await req.text();
  if (raw.length > MAX_BODY) return fail(413, "Request too large.");

  // 3. Rate limit (hashed IP, never stored raw)
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  const ipHash = createHash("sha256").update(`${process.env.IP_HASH_SALT ?? "dev-salt"}:${ip}`).digest("hex").slice(0, 24);
  if (limited(ipHash)) return fail(429, "Too many requests. Please try again shortly or call us.", { "Retry-After": "900" });

  // 4. Validate (server-side, strict: unknown fields rejected)
  let json: unknown;
  try { json = JSON.parse(raw); } catch { return fail(400, "Invalid request."); }
  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) return fail(400, "Please check your details and try again.");
  const d = parsed.data;

  // 5. Bot traps: honeypot, minimum fill time, link stuffing, disposable email
  if (d.website) return NextResponse.json({ ok: true }); // pretend success to the bot
  const elapsed = Date.now() - d.startedAt;
  if (elapsed < 3000 || elapsed > 6 * 3600_000) return fail(400, "Please try submitting again.");
  if (linkCount(d.message) > 1) return fail(400, "Please remove links from your message.");
  if (disposable.has(d.email.split("@")[1]?.toLowerCase() ?? "")) return fail(400, "Please use a permanent email address.");
  if (!(await verifyTurnstile(d.turnstileToken, ip))) return fail(400, "Verification failed. Please try again.");

  // 6. Idempotency (double-click / retry)
  if (seenKeys.has(d.idempotencyKey)) return NextResponse.json({ ok: true, duplicate: true });
  seenKeys.set(d.idempotencyKey, Date.now());
  if (seenKeys.size > 5000) for (const [k, t] of seenKeys) if (Date.now() - t > 3600_000) seenKeys.delete(k);

  const service = services.find((s) => s.slug === d.service)?.title ?? d.service;
  const lead = {
    receivedAt: new Date().toISOString(),
    service, suburb: d.suburb, size: d.size, floors: d.floors, frequency: d.frequency,
    contactMethod: d.contactMethod, name: d.name, business: d.business, phone: d.phone, email: d.email,
    message: d.message, source: d.source, ipHash,
  };

  // 7. Persist first so no lead is lost if email fails (local file; serverless hosts have no durable disk,
  //    so there the notification email below is what keeps the lead)
  let stored = false;
  try {
    const dir = process.env.LEAD_DATA_DIR ?? path.join(process.cwd(), "data");
    await mkdir(dir, { recursive: true });
    await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(lead) + "\n", { mode: 0o600 });
    stored = true;
  } catch {
    console.error("lead storage failed");
  }

  // 8. Notify the business via Formspree, plus optional Resend email and customer auto-reply (best effort)
  let notified = false;
  const subject = `New quote request: ${service} (${d.suburb})`;
  try {
    notified = await sendToFormspree(
      {
        name: d.name, phone: d.phone, business: d.business || "-", service, suburb: d.suburb, size: d.size, floors: d.floors || "-",
        frequency: d.frequency, contact_method: d.contactMethod, message: d.message || "-", came_from: d.source || "-",
      },
      d.email,
      subject,
    );
  } catch {
    console.error("formspree request failed");
  }
  try {
    if (!notified) {
      const rows = Object.entries({
        Service: service, Suburb: d.suburb, Size: d.size, Floors: d.floors || "-", Frequency: d.frequency,
        "Contact via": d.contactMethod, Name: d.name, Business: d.business || "-", Phone: d.phone, Email: d.email,
        Message: d.message || "-", "Came from": d.source || "-",
      }).map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${k}</b></td><td>${esc(String(v))}</td></tr>`).join("");
      notified = await sendEmail(
        process.env.LEAD_NOTIFY_EMAIL ?? site.email,
        subject,
        `<h2>New quote request</h2><table>${rows}</table><p><a href="tel:${esc(d.phone)}">Call ${esc(d.phone)}</a></p>`,
        d.email,
      );
    }
    // Customer confirmation only sends when Resend is configured with a verified domain
    await sendEmail(
      d.email,
      `We've received your quote request – ${site.name}`,
      `<p>Hi ${esc(d.name)},</p><p>Thanks for contacting ${site.name}. We've received your request for <b>${esc(service)}</b> in ${esc(d.suburb)}.</p><p>${site.responseSla} For anything urgent, call <a href="tel:${site.phoneTel}">${site.phoneDisplay}</a>.</p><p>We're available 24 hours a day, 7 days a week.</p><p>${site.name}<br>${site.address.text}</p>`,
    );
  } catch {
    console.error("lead email failed");
  }

  // Never tell a customer it worked if neither the business email nor storage succeeded
  if (!stored && !notified) {
    console.error("lead lost: neither storage nor notification succeeded");
    seenKeys.delete(d.idempotencyKey); // allow a retry
    return fail(503, `We couldn't send your request just now. Please call ${site.phoneDisplay} or email ${site.email}.`);
  }

  return NextResponse.json({ ok: true });
}

export function GET() {
  return fail(405, "Method not allowed.", { Allow: "POST" });
}
