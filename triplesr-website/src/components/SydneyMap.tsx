"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { allSuburbs, regions, type Region } from "@/content/areas";
import { Arrow, Check, Pin } from "./Icons";

// Schematic inline-SVG map (no third-party requests). Not to scale.
export function SydneyMap({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState<Region>(regions[0]);
  const [q, setQ] = useState("");

  const match = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return null;
    return allSuburbs.filter((s) => s.suburb.toLowerCase().includes(t)).slice(0, 6);
  }, [q]);

  return (
    <div className={`grid gap-8 ${compact ? "" : "lg:grid-cols-[1.25fr_1fr]"} lg:items-center`}>
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-[#eaf6f8] to-[#f4f8fb] p-3 shadow-xl">
        <svg viewBox="0 0 100 100" role="group" aria-label="Schematic map of Greater Sydney service regions" className="h-auto w-full">
          <defs>
            <linearGradient id="sea" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#cfe8ef" /><stop offset="1" stopColor="#a8d4e0" />
            </linearGradient>
          </defs>
          <path d="M100 0H70c6 8 14 12 11 22s-12 14-8 24 10 12 6 26-12 14-10 28H100Z" fill="url(#sea)" />
          <path d="M8 90c10-4 20-2 30-6" stroke="#d9e6ef" strokeWidth=".6" fill="none" />
          <path d="M63 46c-4 1-9 0-12-3" stroke="#a8d4e0" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity=".7" />
          {regions.map((r) => {
            const on = active.slug === r.slug;
            return (
              <g key={r.slug}>
                {r.primary && <circle cx={r.x} cy={r.y} r={r.r} className="pulse-ring" fill="#1e7b3c" opacity=".35" />}
                <circle
                  cx={r.x}
                  cy={r.y}
                  r={r.r}
                  role="button"
                  tabIndex={0}
                  aria-label={`${r.name}${r.primary ? ", primary service area" : ""}${r.home ? ", home base" : ""}`}
                  aria-pressed={on}
                  onClick={() => setActive(r)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActive(r); } }}
                  onMouseEnter={() => setActive(r)}
                  className="cursor-pointer outline-none transition-all duration-300 focus-visible:stroke-navy focus-visible:stroke-[0.8]"
                  fill={r.primary ? "#1e7b3c" : on ? "#0a7c8c" : "#7fb8c4"}
                  fillOpacity={on || r.primary ? 0.92 : 0.55}
                  stroke="#fff"
                  strokeWidth="0.7"
                />
                <text x={r.x} y={r.y + (r.primary ? 0.8 : 0.6)} textAnchor="middle" fontSize={r.primary ? 2.6 : 1.8} fontWeight="700" fill="#fff" pointerEvents="none" style={{ fontFamily: "inherit" }}>
                  {r.short}
                </text>
                {r.home && <path d={`M${r.x} ${r.y - r.r - 1}l1.4 -2.6h-2.8z`} fill="#0b2a5b" />}
              </g>
            );
          })}
        </svg>
        <p className="px-3 pb-2 text-xs text-muted">Schematic map, not to scale. <span className="font-semibold text-navy">Green = Sydney CBD (primary).</span> ▲ = Blacktown home base.</p>
      </div>

      <div>
        <div className="rounded-3xl border border-line bg-white p-6 shadow-lg" aria-live="polite">
          <p className="eyebrow">{active.primary ? "Primary service area" : active.home ? "Home base" : "Service area"}</p>
          <h3 className="mt-1 text-2xl font-extrabold">{active.name}</h3>
          <p className="mt-2 text-muted">{active.blurb}</p>
          <p className="mt-3 text-sm text-muted"><span className="font-semibold text-navy">Includes:</span> {active.suburbs.slice(0, 8).join(", ")}{active.suburbs.length > 8 ? " and more" : ""}.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/get-a-quote?area=${active.slug}`} className="btn btn-primary px-5 py-2.5 text-sm">Get a quote for {active.short} <Arrow className="h-4 w-4" /></Link>
            <Link href={`/areas/${active.slug}`} className="btn btn-outline px-5 py-2.5 text-sm">Cleaning in {active.short}</Link>
          </div>
        </div>

        <div className="mt-5 rounded-3xl bg-navy p-6 text-white">
          <label htmlFor="suburb-check" className="font-display text-lg font-bold">Check we cover your suburb</label>
          <input
            id="suburb-check"
            type="text"
            autoComplete="off"
            placeholder="Start typing, e.g. Parramatta"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-3 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/60"
          />
          <div className="mt-3 min-h-10 text-sm" aria-live="polite">
            {match === null ? (
              <p className="text-white/70">Type at least two letters.</p>
            ) : match.length ? (
              <ul className="space-y-1">
                {match.map((m) => (
                  <li key={m.suburb} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-bright" />
                    <Link href={`/get-a-quote?area=${m.region.slug}&suburb=${encodeURIComponent(m.suburb)}`} className="font-semibold underline-offset-2 hover:underline">{m.suburb}</Link>
                    <span className="text-white/70">covered · {m.region.short}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-start gap-2 text-white/90"><Pin className="mt-0.5 h-4 w-4 shrink-0" /> Not on our list yet. Call 0427 724 809, we may still be able to help.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
