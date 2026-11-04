"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { reviews } from "./Reviews";
import { Arrow, Star } from "./Icons";

const INTERVAL = 7000;

function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={className} />)}
    </span>
  );
}

export function ReviewsShowcase() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manual, setManual] = useState(false);
  const chipsRef = useRef<HTMLDivElement>(null);
  const r = reviews[i];

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setI((n) => (n + 1) % reviews.length), INTERVAL);
    return () => clearTimeout(id);
  }, [i, paused, reduce]);

  // Keep the active chip in view (scroll the strip itself, never the page)
  useEffect(() => {
    const strip = chipsRef.current;
    const el = strip?.children[i] as HTMLElement | undefined;
    if (strip && el) strip.scrollTo({ left: el.offsetLeft - strip.clientWidth / 2 + el.clientWidth / 2, behavior: reduce ? "auto" : "smooth" });
  }, [i, reduce]);

  const go = (n: number) => { setManual(true); setI((n + reviews.length) % reviews.length); };
  const long = r.text.length > 360;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)]" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      {/* Rating panel */}
      <div className="relative isolate flex flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy via-navy-2 to-teal p-7 text-white shadow-2xl">
        <div aria-hidden className="absolute -right-10 -top-10 -z-10 h-48 w-48 rounded-full bg-green-bright/25 blur-3xl" />
        <div>
          <p className="eyebrow !text-green-bright">Rated on Google</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="font-display text-6xl font-extrabold leading-none text-white">{site.googleRating.value}</span>
            <span className="pb-1 text-white/70">/ 5</span>
          </div>
          <div className="mt-3"><Stars className="h-6 w-6" /></div>
          <p className="mt-2 text-sm text-white/80">From {site.googleRating.count} Google reviews</p>
        </div>
        <div className="mt-7 space-y-3">
          <ul className="hidden space-y-1.5 text-sm text-white/85 sm:block">
            {["On time and professional", "Thorough, attention to detail", "Clear communication"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-bright" /> {t}</li>
            ))}
          </ul>
          <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="btn btn-primary w-full">Leave us a review</a>
        </div>
      </div>

      {/* Featured review stage */}
      <div className="relative flex min-w-0 flex-col rounded-[2rem] border border-line bg-white p-6 shadow-xl sm:p-8">
        <svg aria-hidden viewBox="0 0 48 48" className="absolute right-6 top-6 h-14 w-14 text-teal/10" fill="currentColor"><path d="M10 28c0-8 4-14 12-16v5c-4 1-6 4-6 7h6v12H10V28Zm18 0c0-8 4-14 12-16v5c-4 1-6 4-6 7h6v12H28V28Z" /></svg>
        <div className="relative min-h-[18rem] flex-1" aria-live={manual ? "polite" : "off"}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.figure
              key={r.id}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
              className="flex h-full flex-col"
            >
              <Stars className="h-5 w-5" />
              <div className="my-auto py-4">
                <blockquote className={`whitespace-pre-line font-display font-semibold leading-snug text-navy ${r.text.length > 240 ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"} line-clamp-6`}>
                  {r.text}
                </blockquote>
                {long && <Link href="/reviews" className="mt-2 inline-block text-sm font-bold text-teal underline">Read the full review</Link>}
              </div>
              <figcaption className="flex items-center gap-3">
                <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-teal to-navy font-display text-lg font-extrabold text-white">{r.name.charAt(0).toUpperCase()}</span>
                <span>
                  <span className="block font-bold text-navy">{r.name}</span>
                  <span className="text-sm text-muted">{r.localGuide ? "Local Guide · " : ""}Google review · {r.postedRelative}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Progress + controls */}
        <div className="mt-5 flex items-center gap-3">
          <button onClick={() => go(i - 1)} aria-label="Previous review" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-navy transition hover:border-teal hover:text-teal"><Arrow className="h-5 w-5 rotate-180" /></button>
          <button onClick={() => go(i + 1)} aria-label="Next review" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-navy transition hover:border-teal hover:text-teal"><Arrow className="h-5 w-5" /></button>
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-soft" aria-hidden>
            <motion.div
              key={`${i}-${paused}`}
              className="h-full origin-left rounded-full bg-gradient-to-r from-teal to-green-bright"
              initial={{ scaleX: reduce ? 1 : 0 }}
              animate={{ scaleX: paused || reduce ? (reduce ? 1 : 0) : 1 }}
              transition={{ duration: paused || reduce ? 0 : INTERVAL / 1000, ease: "linear" }}
            />
          </div>
          <span className="shrink-0 text-sm font-semibold tabular-nums text-muted">{i + 1} / {reviews.length}</span>
        </div>

        {/* Reviewer selector */}
        <div ref={chipsRef} className="-mx-1 mt-4 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Choose a review">
          {reviews.map((x, n) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={n === i}
              aria-label={`Review by ${x.name}`}
              onClick={() => go(n)}
              className={`flex shrink-0 snap-start items-center gap-2 rounded-full py-1 pl-1 pr-3 text-sm font-semibold transition ${n === i ? "bg-navy text-white shadow-md" : "bg-soft text-navy hover:bg-teal-soft"}`}
            >
              <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-extrabold ${n === i ? "bg-white/20 text-white" : "bg-white text-teal"}`}>{x.name.charAt(0).toUpperCase()}</span>
              {x.name.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
