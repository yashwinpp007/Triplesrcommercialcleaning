"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { site } from "@/config/site";
import type { LandingPageContent } from "@/content/landing-pages";
import { track } from "@/lib/track";

const auPhone = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const FREQ = new Set(["daily", "weekly", "fortnightly", "monthly", "one-off", "not-sure"]);

// Single-step quote form for the Google Ads landing pages. Posts to the same /api/quote endpoint as the main form.
// Fields without a dedicated API slot (bedrooms, role, units...) are folded into the message so nothing is lost.
export function LpQuoteForm({ page, id = "quote" }: { page: LandingPageContent; id?: string }) {
  const router = useRouter();
  const uid = useId();
  const [v, setV] = useState<Record<string, string>>({});
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const started = useRef(0);
  const touched = useRef(false);
  const idem = useRef("");
  const tsToken = useRef("");

  useEffect(() => {
    started.current = Date.now();
    idem.current = crypto.randomUUID();
  }, []);

  useEffect(() => {
    if (!TURNSTILE_KEY) return;
    const render = () => {
      const t = (window as unknown as { turnstile?: { render: (el: string, o: object) => void } }).turnstile;
      t?.render(`#ts-${uid.replace(/:/g, "")}`, { sitekey: TURNSTILE_KEY, callback: (tok: string) => { tsToken.current = tok; } });
    };
    if ((window as unknown as { turnstile?: unknown }).turnstile) return render();
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = render;
    document.head.appendChild(s);
  }, [uid]);

  const set = (k: string, val: string) => {
    if (!touched.current) { touched.current = true; track("quote_form_start", { form: id, page: page.slug }); }
    setV((p) => ({ ...p, [k]: val }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    for (const f of page.form.fields) {
      const val = (v[f.key] ?? "").trim();
      if (f.required && !val) e[f.key] = f.type === "select" ? "Please choose one" : "Required";
      else if (f.key === "name" && val.length < 2) e.name = "Enter your name";
      else if (f.key === "suburb" && val.length < 2) e.suburb = "Enter your suburb";
      else if (f.key === "phone" && !auPhone.test(val.replace(/\s+/g, " "))) e.phone = "Enter a valid Australian phone number";
      else if (f.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) e[f.key] = "Enter a valid email address";
    }
    if (!consent) e.consent = "Please tick to agree so we can contact you";
    return e;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) return document.getElementById(`${uid}-${first}`)?.focus();
    setBusy(true);
    setServerError("");

    const known = new Set(["name", "phone", "email", "suburb", "floors", "frequency"]);
    const extra = page.form.fields
      .filter((f) => !known.has(f.key) && (v[f.key] ?? "").trim())
      .map((f) => `${f.label.replace(/\s*\(optional\)/i, "")}: ${v[f.key].trim()}`);
    const rawFreq = (v.frequency ?? "").trim();
    const frequency = FREQ.has(rawFreq) ? rawFreq : page.service.startsWith("end-of-lease") ? "one-off" : "not-sure";
    if (v.floors?.trim()) extra.unshift(`Floors: ${v.floors.trim()}`);
    const params = new URLSearchParams(window.location.search);
    const utm = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid"].filter((k) => params.get(k)).map((k) => `${k}=${params.get(k)!.slice(0, 40)}`);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          service: page.service,
          suburb: v.suburb.trim(),
          size: "not-sure",
          floors: (v.floors ?? "").replace(/\D/g, "").slice(0, 3),
          frequency,
          contactMethod: v.email?.trim() ? "either" : "phone",
          name: v.name.trim(),
          business: "",
          phone: v.phone.trim(),
          email: (v.email ?? "").trim(),
          message: extra.join(" | "),
          consent: true,
          website,
          startedAt: started.current,
          idempotencyKey: idem.current,
          turnstileToken: tsToken.current,
          source: [window.location.pathname, ...utm].join(" ").slice(0, 300),
        }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !j.ok) throw new Error(j.message ?? "Something went wrong.");
      track("quote_submit_success", { service: page.service, page: page.slug });
      router.push(`/thank-you?src=${encodeURIComponent(page.slug)}`);
    } catch (err) {
      setServerError((err as Error).message || `Something went wrong. Please call ${site.phoneDisplay}.`);
      setBusy(false);
    }
  };

  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink transition focus:border-teal focus:ring-2 focus:ring-teal/30";
  const lab = "mb-1.5 block text-sm font-bold text-navy";

  return (
    <form id={id} onSubmit={submit} noValidate aria-label={page.form.heading} className="relative rounded-[2rem] border border-line bg-white p-5 shadow-2xl sm:p-7">
      <h2 className="text-2xl font-extrabold">{page.form.heading}</h2>
      <p className="mt-1 text-sm text-muted">{page.hero.microcopy}</p>

      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-4">
        {page.form.fields.map((f) => {
          const fid = `${uid}-${f.key}`;
          const err = errors[f.key];
          const common = {
            id: fid,
            "aria-invalid": !!err,
            "aria-describedby": err ? `${fid}-err` : undefined,
            className: field,
            value: v[f.key] ?? "",
          };
          return (
            <div key={f.key} className={f.half ? "col-span-1" : "col-span-2"}>
              <label className={lab} htmlFor={fid}>{f.label}{f.required ? <span className="sr-only"> (required)</span> : null}</label>
              {f.type === "select" ? (
                <select {...common} onChange={(e) => set(f.key, e.target.value)}>
                  <option value="">Select…</option>
                  {f.options?.map(([val, l]) => <option key={val} value={val}>{l}</option>)}
                </select>
              ) : (
                <input
                  {...common}
                  type={f.type}
                  inputMode={f.type === "tel" ? "tel" : f.type === "email" ? "email" : undefined}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  maxLength={f.key === "floors" || f.key === "units" ? 4 : 160}
                  onChange={(e) => set(f.key, e.target.value)}
                />
              )}
              {err && <p id={`${fid}-err`} role="alert" className="mt-1 text-sm font-semibold text-red-700">{err}</p>}
            </div>
          );
        })}
      </div>

      {TURNSTILE_KEY && <div id={`ts-${uid.replace(/:/g, "")}`} className="mt-4" />}

      <div className="mt-4">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input id={`${uid}-consent`} type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#1e7b3c]" checked={consent} aria-invalid={!!errors.consent} onChange={(e) => { setConsent(e.target.checked); setErrors((p) => ({ ...p, consent: "" })); }} />
          <span>I agree to {site.name} contacting me about this enquiry. See the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="font-bold text-teal underline">Privacy Policy</a>.</span>
        </label>
        {errors.consent && <p role="alert" className="mt-1 text-sm font-semibold text-red-700">{errors.consent}</p>}
      </div>

      {serverError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">{serverError}</p>}

      <button type="submit" disabled={busy} className="btn btn-primary mt-5 w-full text-lg disabled:opacity-60">
        {busy ? "Sending…" : page.form.button}
      </button>
      <p className="mt-3 text-center text-sm text-muted">
        Or call <a href={`tel:${site.phoneTel}`} onClick={() => track("phone_click", { location: "lp_form", page: page.slug })} className="font-bold text-teal">{site.phoneDisplay}</a>
      </p>
    </form>
  );
}
