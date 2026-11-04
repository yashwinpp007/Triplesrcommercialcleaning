"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { allSuburbs, regions, type Region } from "@/content/areas";
import { sydneyGeo } from "@/content/sydneyGeo";
import { Arrow, Check, Pin } from "./Icons";

const FULL = `0 0 ${sydneyGeo.width} ${sydneyGeo.height}`;
const ROUTE = (() => {
  const [bx, by] = sydneyGeo.blacktown;
  const [cx, cy] = sydneyGeo.cbd;
  return `M${bx} ${by} Q${(bx + cx) / 2 - 20} ${Math.min(by, cy) - 70} ${cx} ${cy}`;
})();

// Real council boundaries (ABS ASGS 2021) rendered as inline SVG: no tiles, no third-party requests.
function viewFor(slug: string | null) {
  const g = slug ? sydneyGeo.regions[slug] : null;
  if (!g) return FULL;
  const [x0, y0, x1, y1] = g.bbox;
  const s = Math.min(Math.max(Math.max(x1 - x0, y1 - y0) * 1.7, 240), sydneyGeo.width);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const x = Math.min(Math.max(cx - s / 2, 0), sydneyGeo.width - s);
  const y = Math.min(Math.max(cy - s / 2, 0), sydneyGeo.height - s);
  return `${x.toFixed(0)} ${y.toFixed(0)} ${s.toFixed(0)} ${s.toFixed(0)}`;
}

export function SydneyMap({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, { once: true, margin: "-80px" });
  const [active, setActive] = useState<Region>(regions[0]);
  const [hover, setHover] = useState<string | null>(null);
  const [zoom, setZoom] = useState(false);
  const [tour, setTour] = useState(true);
  const [q, setQ] = useState("");

  const choose = (r: Region, z = true) => {
    setTour(false);
    setActive(r);
    setZoom(z);
  };

  // Auto-tour of regions until the visitor interacts (skipped for reduced motion)
  useEffect(() => {
    if (!inView || !tour || reduce || hover) return;
    const id = setTimeout(() => {
      const i = regions.findIndex((r) => r.slug === active.slug);
      setActive(regions[(i + 1) % regions.length]);
      setZoom(true);
    }, zoom ? 4200 : 5200);
    return () => clearTimeout(id);
  }, [inView, tour, reduce, hover, active, zoom]);

  const match = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return null;
    return allSuburbs.filter((s) => s.suburb.toLowerCase().includes(t)).slice(0, 6);
  }, [q]);

  const vb = zoom ? viewFor(active.slug) : FULL;
  const bySlug = useMemo(() => {
    const m = new Map<string, typeof sydneyGeo.areas>();
    sydneyGeo.areas.forEach((a) => {
      if (!a.region) return;
      m.set(a.region, [...(m.get(a.region) ?? []), a]);
    });
    return m;
  }, []);
  const dist = (slug: string) => {
    const c = sydneyGeo.regions[slug]?.c ?? sydneyGeo.cbd;
    return Math.hypot(c[0] - sydneyGeo.cbd[0], c[1] - sydneyGeo.cbd[1]);
  };
  // active region drawn last so its outline sits on top
  const ordered = [...regions].sort((a, b) => Number(a.slug === active.slug) - Number(b.slug === active.slug));

  const fillFor = (r: Region) => {
    if (r.slug === active.slug) return "rgba(59,156,66,.92)";
    if (r.slug === hover) return "rgba(60,185,170,.7)";
    if (r.primary) return "rgba(59,156,66,.5)";
    return "rgba(10,124,140,.42)";
  };

  return (
    <div className={`grid gap-8 ${compact ? "" : "lg:grid-cols-[1.3fr_1fr]"} lg:items-center`}>
      <div ref={wrap} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(120%_90%_at_30%_10%,#14407f_0%,#0b2a5b_55%,#071a3b_100%)] p-2 shadow-2xl">
        {/* subtle grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:38px_38px]" />

        <motion.svg
          viewBox={FULL}
          initial={false}
          animate={{ viewBox: vb }}
          transition={reduce ? { duration: 0 } : { duration: 1.25, ease: [0.65, 0, 0.35, 1] }}
          role="group"
          aria-label="Map of Greater Sydney showing Triple SR service regions"
          className="relative mx-auto block aspect-square w-full max-h-[75vh]"
        >
          {/* Context land (areas we don't list) */}
          {sydneyGeo.areas.filter((a) => a.kind === "context").map((a) => (
            <path key={a.name} d={a.d} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.12)" strokeWidth={0.8} aria-hidden />
          ))}

          {/* Service regions */}
          {ordered.map((r) => {
            const on = r.slug === active.slug;
            const delay = reduce ? 0 : (dist(r.slug) / 450) * 1.6;
            return (
              <g
                key={r.slug}
                role="button"
                tabIndex={0}
                aria-label={`${r.name}${r.primary ? ", primary service area" : ""}${r.home ? ", home base" : ""}`}
                aria-pressed={on}
                className="cursor-pointer outline-none focus-visible:[&_path]:stroke-white"
                onClick={() => choose(r, !(on && zoom))}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(r, !(on && zoom)); } }}
                onMouseEnter={() => setHover(r.slug)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(r.slug)}
                onBlur={() => setHover(null)}
              >
                {(bySlug.get(r.slug) ?? []).map((a) => (
                  <motion.path
                    key={a.name}
                    d={a.d}
                    initial={reduce ? false : { pathLength: 0, fillOpacity: 0 }}
                    animate={inView || reduce ? { pathLength: 1, fillOpacity: 1 } : { pathLength: 0, fillOpacity: 0 }}
                    transition={{ pathLength: { duration: 1.6, delay, ease: "easeInOut" }, fillOpacity: { duration: 0.8, delay: delay + 0.9 } }}
                    style={{ fill: fillFor(r), stroke: on ? "#fff" : "rgba(255,255,255,.5)", strokeWidth: on ? 1.8 : 0.9, strokeLinejoin: "round", transition: "fill .35s ease, stroke .35s ease, stroke-width .35s ease", filter: on ? "drop-shadow(0 0 10px rgba(95,209,138,.65))" : undefined }}
                  />
                ))}
              </g>
            );
          })}

          {/* Service route: Blacktown base to the CBD */}
          <path d={ROUTE} fill="none" stroke="rgba(255,255,255,.75)" strokeWidth={1.6} strokeDasharray="5 6" strokeLinecap="round" className={reduce ? "" : "map-route"} aria-hidden />
          {!reduce && (
            <circle r={3.4} fill="#5fd18a" aria-hidden>
              <animateMotion dur="5.5s" repeatCount="indefinite" path={ROUTE} />
            </circle>
          )}

          {/* Labels: all at full view, only the active region when zoomed */}
          {regions.filter((r) => !zoom || r.slug === active.slug).map((r) => {
            const c = sydneyGeo.regions[r.slug].c;
            return (
              <text key={r.slug} x={c[0]} y={c[1] + (r.primary ? 34 : 0)} textAnchor="middle" fontSize={zoom ? 17 : r.primary ? 13 : 14} fontWeight={800} fill="#fff" stroke="#0b2a5b" strokeWidth={zoom ? 4 : 3.2} paintOrder="stroke" pointerEvents="none" style={{ fontFamily: "inherit", letterSpacing: ".02em" }}>
                {r.short}
              </text>
            );
          })}

          {/* Blacktown base marker */}
          <g aria-hidden>
            <circle cx={sydneyGeo.blacktown[0]} cy={sydneyGeo.blacktown[1]} r={9} fill="#0b2a5b" stroke="#fff" strokeWidth={2.2} />
            <circle cx={sydneyGeo.blacktown[0]} cy={sydneyGeo.blacktown[1]} r={3.4} fill="#fff" />
            <text x={sydneyGeo.blacktown[0]} y={sydneyGeo.blacktown[1] - 15} textAnchor="middle" fontSize={11} fontWeight={800} fill="#fff" stroke="#0b2a5b" strokeWidth={3} paintOrder="stroke">HOME BASE</text>
          </g>

          {/* CBD pin with radar pulse */}
          <g aria-hidden>
            {!reduce && (<>
              <circle cx={sydneyGeo.cbd[0]} cy={sydneyGeo.cbd[1]} r={11} className="pulse-ring" fill="rgba(95,209,138,.55)" />
              <circle cx={sydneyGeo.cbd[0]} cy={sydneyGeo.cbd[1]} r={11} className="pulse-ring" style={{ animationDelay: "1.1s" }} fill="rgba(95,209,138,.4)" />
            </>)}
            <circle cx={sydneyGeo.cbd[0]} cy={sydneyGeo.cbd[1]} r={8} fill="#3b9c42" stroke="#fff" strokeWidth={2.4} />
            <circle cx={sydneyGeo.cbd[0]} cy={sydneyGeo.cbd[1]} r={2.8} fill="#fff" />
          </g>
        </motion.svg>

        {/* Overlay UI */}
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-md">Greater Sydney</span>
          <svg aria-hidden viewBox="0 0 40 40" className="h-9 w-9 text-white/70"><circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.2" /><path d="M20 6l4 14h-8l4-14Z" fill="currentColor" /><path d="M20 34l-4-14h8l-4 14Z" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>
        </div>
        {zoom && (
          <button onClick={() => { setTour(false); setZoom(false); }} className="absolute left-4 top-16 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white hover:text-navy">
            Reset view
          </button>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 pb-3 pt-1 text-xs text-white/75">
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-green-bright" /> Sydney CBD (primary)</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-teal" /> Service regions</span>
          <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-navy" /> Blacktown home base</span>
          <span className="ml-auto text-white/55">Boundaries: ABS ASGS 2021 (CC BY 4.0)</span>
        </div>
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

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a region">
          {regions.map((r) => (
            <button key={r.slug} onClick={() => choose(r, true)} aria-pressed={r.slug === active.slug} className={`min-h-9 rounded-full px-3 py-1 text-xs font-bold transition ${r.slug === active.slug ? "bg-navy text-white shadow-md" : "bg-soft text-navy hover:bg-teal-soft"}`}>{r.short}</button>
          ))}
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
              <ul className="space-y-1.5">
                {match.map((m) => (
                  <li key={m.suburb} className="flex flex-wrap items-center gap-2">
                    <Check className="h-4 w-4 text-green-bright" />
                    <button onClick={() => choose(m.region, true)} className="font-semibold underline-offset-2 hover:underline">{m.suburb}</button>
                    <span className="text-white/70">covered · {m.region.short}</span>
                    <Link href={`/areas/${m.region.slug}/${m.slug}`} className="ml-auto text-xs font-bold text-green-bright hover:underline">{m.suburb} page →</Link>
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
