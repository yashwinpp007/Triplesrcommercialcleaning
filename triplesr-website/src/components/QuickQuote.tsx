"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { services } from "@/content/services";
import { Arrow } from "./Icons";

// Sends only service + suburb to the full quote form (no personal data in the URL).
export function QuickQuote() {
  const router = useRouter();
  const [service, setService] = useState("");
  const [suburb, setSuburb] = useState("");
  return (
    <form
      aria-label="Start your free quote"
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams();
        if (service) q.set("service", service);
        if (suburb.trim()) q.set("suburb", suburb.trim().slice(0, 80));
        router.push(`/get-a-quote?${q.toString()}`);
      }}
      className="rounded-3xl bg-white p-5 text-ink shadow-2xl sm:p-6"
    >
      <p className="font-display text-xl font-extrabold text-navy">Get a free quote in 60 seconds</p>
      <p className="mt-1 text-sm text-muted">Tell us what you need. We reply within one business day.</p>
      <label htmlFor="qq-service" className="mt-4 block text-sm font-bold text-navy">Service</label>
      <select id="qq-service" value={service} onChange={(e) => setService(e.target.value)} className="mt-1 w-full rounded-xl border border-line bg-white px-4 py-3">
        <option value="">Choose a service…</option>
        {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
      </select>
      <label htmlFor="qq-suburb" className="mt-3 block text-sm font-bold text-navy">Suburb</label>
      <input id="qq-suburb" value={suburb} onChange={(e) => setSuburb(e.target.value)} maxLength={80} autoComplete="address-level2" placeholder="e.g. Sydney CBD" className="mt-1 w-full rounded-xl border border-line px-4 py-3" />
      <button type="submit" className="btn btn-primary mt-5 w-full">Continue <Arrow className="h-5 w-5" /></button>
    </form>
  );
}
