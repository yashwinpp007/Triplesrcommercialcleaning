"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { services } from "@/content/services";
import { site } from "@/config/site";
import { Check, Phone } from "./Icons";
import { track } from "@/lib/track";

type Form = {
  service: string; suburb: string; size: string; floors: string; frequency: string; contactMethod: string;
  name: string; business: string; phone: string; email: string; message: string; consent: boolean; website: string;
};

const auPhone = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;
const steps = ["Your site", "Schedule", "Your details"];
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const sizeOpts = [["small", "Small (under 150 m²)"], ["medium", "Medium (150–600 m²)"], ["large", "Large (600 m²+)"], ["not-sure", "Not sure"]];
const freqOpts = [["daily", "Daily / most days"], ["weekly", "Weekly"], ["fortnightly", "Fortnightly"], ["monthly", "Monthly"], ["one-off", "One-off clean"], ["not-sure", "Not sure yet"]];

export function QuoteForm({
  defaultService = "",
  defaultSuburb = "",
  compact = false,
  id = "quote-form",
}: { defaultService?: string; defaultSuburb?: string; compact?: boolean; id?: string }) {
  const router = useRouter();
  const uid = useId();
  const [step, setStep] = useState(0);
  const [f, setF] = useState<Form>({
    service: defaultService, suburb: defaultSuburb, size: "", floors: "", frequency: "", contactMethod: "either",
    name: "", business: "", phone: "", email: "", message: "", consent: false, website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState("");
  const started = useRef(0);
  const sent = useRef(false);
  const idem = useRef("");
  const tsToken = useRef("");
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    started.current = Date.now();
    idem.current = crypto.randomUUID();
  }, []);

  useEffect(() => {
    if (!TURNSTILE_KEY || step !== 2) return;
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
  }, [step, uid]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) => {
    if (!sent.current) { sent.current = true; track("quote_form_start", { form: id }); }
    setF((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validators: Record<number, () => Record<string, string>> = useMemo(
    () => ({
      0: () => {
        const e: Record<string, string> = {};
        if (!f.service) e.service = "Choose a service";
        if (f.suburb.trim().length < 2) e.suburb = "Enter your suburb";
        if (!f.size) e.size = "Choose an approximate size";
        return e;
      },
      1: () => {
        const e: Record<string, string> = {};
        if (!f.frequency) e.frequency = "Choose how often you need cleaning";
        return e;
      },
      2: () => {
        const e: Record<string, string> = {};
        if (f.name.trim().length < 2) e.name = "Enter your name";
        if (!auPhone.test(f.phone.replace(/\s+/g, " ").trim())) e.phone = "Enter a valid Australian phone number";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address";
        if (!f.consent) e.consent = "Please tick to agree so we can contact you";
        return e;
      },
    }),
    [f],
  );

  const next = () => {
    const e = validators[step]();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`${uid}-${Object.keys(e)[0]}`)?.focus();
      return;
    }
    track("quote_step_complete", { step: step + 1 });
    setStep((s) => s + 1);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (step < 2) return next();
    const e = validators[2]();
    setErrors(e);
    if (Object.keys(e).length) return document.getElementById(`${uid}-${Object.keys(e)[0]}`)?.focus();
    setBusy(true);
    setServerError("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...f,
          consent: true,
          startedAt: started.current,
          idempotencyKey: idem.current,
          turnstileToken: tsToken.current,
          source: window.location.pathname + (document.referrer ? ` ← ${new URL(document.referrer).host}` : ""),
        }),
      });
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (!res.ok || !j.ok) throw new Error(j.message ?? "Something went wrong.");
      track("quote_submit_success", { service: f.service });
      router.push("/thank-you");
    } catch (err) {
      setServerError((err as Error).message || `Something went wrong. Please call ${site.phoneDisplay}.`);
      setBusy(false);
    }
  };

  const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-ink transition focus:border-teal focus:ring-2 focus:ring-teal/30";
  const lab = "mb-1.5 block text-sm font-bold text-navy";
  const err = (k: string) => errors[k] && <p id={`${uid}-${k}-err`} role="alert" className="mt-1 text-sm font-semibold text-red-700">{errors[k]}</p>;
  const aria = (k: string) => ({ id: `${uid}-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined });

  return (
    <form id={id} onSubmit={submit} noValidate className="rounded-[2rem] border border-line bg-white p-5 shadow-2xl sm:p-8" aria-label="Free quote request">
      <div ref={topRef} />
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm font-bold text-navy">
          <span>Step {step + 1} of 3: {steps[step]}</span>
          <span className="text-muted">Free, no obligation</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-soft" role="progressbar" aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}>
          <motion.div className="h-full rounded-full bg-gradient-to-r from-teal to-green-bright" animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.4 }} />
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.22 }} className="space-y-4">
          {step === 0 && (
            <>
              <div>
                <label className={lab} htmlFor={`${uid}-service`}>Which service do you need?</label>
                <select {...aria("service")} className={field} value={f.service} onChange={(e) => set("service", e.target.value)}>
                  <option value="">Select a service…</option>
                  {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
                </select>
                {err("service")}
              </div>
              <div className={compact ? "" : "grid gap-4 sm:grid-cols-2"}>
                <div>
                  <label className={lab} htmlFor={`${uid}-suburb`}>Suburb / location</label>
                  <input {...aria("suburb")} className={field} autoComplete="address-level2" placeholder="e.g. Sydney CBD" value={f.suburb} onChange={(e) => set("suburb", e.target.value)} />
                  {err("suburb")}
                </div>
                <div className={compact ? "mt-4" : ""}>
                  <label className={lab} htmlFor={`${uid}-floors`}>Number of floors (optional)</label>
                  <input {...aria("floors")} className={field} inputMode="numeric" maxLength={3} placeholder="e.g. 2" value={f.floors} onChange={(e) => set("floors", e.target.value.replace(/\D/g, ""))} />
                </div>
              </div>
              <fieldset>
                <legend className={lab}>Approximate size</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {sizeOpts.map(([v, l]) => (
                    <label key={v} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${f.size === v ? "border-teal bg-teal-soft text-navy" : "border-line hover:border-teal/60"}`}>
                      <input type="radio" name={`${uid}-size`} className="h-4 w-4 accent-[#0a7c8c]" checked={f.size === v} onChange={() => set("size", v)} /> {l}
                    </label>
                  ))}
                </div>
                {err("size")}
              </fieldset>
            </>
          )}

          {step === 1 && (
            <>
              <fieldset>
                <legend className={lab}>How often do you need cleaning?</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {freqOpts.map(([v, l]) => (
                    <label key={v} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold transition ${f.frequency === v ? "border-teal bg-teal-soft text-navy" : "border-line hover:border-teal/60"}`}>
                      <input type="radio" name={`${uid}-freq`} className="h-4 w-4 accent-[#0a7c8c]" checked={f.frequency === v} onChange={() => set("frequency", v)} /> {l}
                    </label>
                  ))}
                </div>
                {err("frequency")}
              </fieldset>
              <div>
                <label className={lab} htmlFor={`${uid}-contactMethod`}>Best way to reach you</label>
                <select {...aria("contactMethod")} className={field} value={f.contactMethod} onChange={(e) => set("contactMethod", e.target.value)}>
                  <option value="either">Phone or email</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={lab} htmlFor={`${uid}-name`}>Your name</label>
                  <input {...aria("name")} className={field} autoComplete="name" maxLength={80} value={f.name} onChange={(e) => set("name", e.target.value)} />
                  {err("name")}
                </div>
                <div>
                  <label className={lab} htmlFor={`${uid}-business`}>Business name (optional)</label>
                  <input {...aria("business")} className={field} autoComplete="organization" maxLength={120} value={f.business} onChange={(e) => set("business", e.target.value)} />
                </div>
                <div>
                  <label className={lab} htmlFor={`${uid}-phone`}>Phone</label>
                  <input {...aria("phone")} className={field} type="tel" inputMode="tel" autoComplete="tel" placeholder="04xx xxx xxx" value={f.phone} onChange={(e) => set("phone", e.target.value)} />
                  {err("phone")}
                </div>
                <div>
                  <label className={lab} htmlFor={`${uid}-email`}>Email</label>
                  <input {...aria("email")} className={field} type="email" inputMode="email" autoComplete="email" maxLength={160} value={f.email} onChange={(e) => set("email", e.target.value)} />
                  {err("email")}
                </div>
              </div>
              <div>
                <label className={lab} htmlFor={`${uid}-message`}>Anything we should know? (optional)</label>
                <textarea {...aria("message")} className={`${field} min-h-24`} maxLength={1500} value={f.message} onChange={(e) => set("message", e.target.value)} />
              </div>
              {TURNSTILE_KEY && <div id={`ts-${uid.replace(/:/g, "")}`} />}
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-sm text-muted">
                  <input {...aria("consent")} type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[#1e7b3c]" checked={f.consent} onChange={(e) => set("consent", e.target.checked)} />
                  <span>I agree to {site.name} contacting me about this enquiry. See the <Link href="/privacy-policy" className="font-bold text-teal underline">Privacy Policy</Link>.</span>
                </label>
                {err("consent")}
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div role="alert" aria-live="assertive">
        {serverError && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">
            {serverError} <a href={`tel:${site.phoneTel}`} className="underline">Call {site.phoneDisplay}</a>
          </p>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="btn btn-outline px-5">Back</button>
        ) : (
          <a href={`tel:${site.phoneTel}`} className="inline-flex items-center gap-2 text-sm font-bold text-navy"><Phone className="h-4 w-4 text-teal" /> Prefer to call? {site.phoneDisplay}</a>
        )}
        {step < 2 ? (
          <button type="button" onClick={next} className="btn btn-primary px-7">Continue</button>
        ) : (
          <button type="submit" disabled={busy} className="btn btn-primary px-7 disabled:opacity-60">
            {busy ? "Sending…" : <>Send my request <Check className="h-5 w-5" /></>}
          </button>
        )}
      </div>
      <p className="mt-4 text-xs text-muted">{site.responseSla}</p>
    </form>
  );
}
