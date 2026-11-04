"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { serviceGroups, services } from "@/content/services";
import { img } from "@/lib/images";
import { Arrow, serviceIcons } from "./Icons";

const tabs = ["All", ...serviceGroups] as const;

function Tile({ s, n }: { s: (typeof services)[number]; n: number }) {
  const im = img(s.hero);
  const Icon = serviceIcons[s.icon];
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();

  // Cursor spotlight (desktop only, skipped under reduced motion)
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current?.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current?.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      layout={!reduce}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (n % 5) * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <Link
        ref={ref}
        href={`/services/${s.slug}`}
        onPointerMove={onMove}
        className="group relative block aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-navy shadow-[0_18px_40px_-24px_rgba(11,42,91,.6)] ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-24px_rgba(11,42,91,.75)] focus-visible:ring-4 focus-visible:ring-teal"
        aria-label={`${s.title}: ${s.summary}`}
      >
        <Image
          src={im.src}
          alt={im.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/45 to-navy/5 transition-opacity duration-500 group-hover:from-navy group-hover:via-navy/70" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.22), transparent 60%)" }}
        />

        <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-teal shadow-lg backdrop-blur transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
          <Icon className="h-5 w-5" />
        </span>
        <span className="absolute right-4 top-3 font-display text-sm font-extrabold tracking-widest text-white/70">{String(n + 1).padStart(2, "0")}</span>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-display text-lg font-extrabold leading-tight !text-white sm:text-xl">{s.title}</h3>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr] [@media(hover:none)]:hidden">
            <p className="overflow-hidden text-[13px] leading-snug text-white/85 [@media(hover:hover)]:pt-0 group-hover:pt-2">{s.summary}</p>
          </div>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white">
            <span className="relative">
              Explore
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-green-bright transition-all duration-500 group-hover:w-full" />
            </span>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-green text-white transition-transform duration-500 group-hover:translate-x-1 group-hover:bg-green-bright">
              <Arrow className="h-4 w-4" />
            </span>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

export function ServicesShowcase() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const shown = services.filter((s) => tab === "All" || s.group === tab);
  const count = (t: (typeof tabs)[number]) => (t === "All" ? services.length : services.filter((s) => s.group === t).length);

  return (
    <div>
      <div className="-mx-4 flex snap-x items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter services by sector">
        <LayoutGroup id="svc-tabs">
          {tabs.map((t) => {
            const on = tab === t;
            return (
              <button
                key={t}
                role="tab"
                aria-selected={on}
                onClick={() => setTab(t)}
                className={`relative isolate min-h-11 shrink-0 snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors ${on ? "text-white" : "text-navy hover:text-teal"}`}
              >
                {on && <motion.span layoutId="svc-pill" className="absolute inset-0 -z-10 rounded-full bg-navy shadow-lg" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
                <span className="relative">{t}</span>
                <span className={`relative ml-1.5 rounded-full px-1.5 py-0.5 text-[11px] ${on ? "bg-white/20" : "bg-soft text-muted"}`}>{count(t)}</span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-5" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {shown.map((s) => <Tile key={s.slug} s={s} n={services.indexOf(s)} />)}
        </AnimatePresence>
      </ul>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">Not sure which fits? <Link href="/services#guide" className="font-bold text-teal underline">See the quick guide</Link> or call us.</p>
        <Link href="/services" className="btn btn-outline">View all services <Arrow className="h-5 w-5" /></Link>
      </div>
    </div>
  );
}
