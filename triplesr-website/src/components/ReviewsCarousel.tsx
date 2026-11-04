"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { reviews as all, Stars, type ReviewT } from "./Reviews";
import { Arrow } from "./Icons";

const INTERVAL = 8000;

function usePerView() {
  const [n, setN] = useState(1);
  useEffect(() => {
    const q2 = window.matchMedia("(min-width: 768px)");
    const q3 = window.matchMedia("(min-width: 1100px)");
    const set = () => setN(q3.matches ? 3 : q2.matches ? 2 : 1);
    set();
    q2.addEventListener("change", set);
    q3.addEventListener("change", set);
    return () => { q2.removeEventListener("change", set); q3.removeEventListener("change", set); };
  }, []);
  return n;
}

function Card({ r }: { r: ReviewT }) {
  const long = r.text.length > 230;
  return (
    <figure className="relative flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-lg">
      <svg aria-hidden viewBox="0 0 48 48" className="absolute right-5 top-5 h-10 w-10 text-teal/10" fill="currentColor"><path d="M10 28c0-8 4-14 12-16v5c-4 1-6 4-6 7h6v12H10V28Zm18 0c0-8 4-14 12-16v5c-4 1-6 4-6 7h6v12H28V28Z" /></svg>
      <Stars />
      <blockquote className="mt-4 line-clamp-6 whitespace-pre-line text-[15px] leading-relaxed text-ink">{r.text}</blockquote>
      {long && <Link href="/reviews" className="mt-2 text-sm font-bold text-teal underline">Read the full review</Link>}
      <figcaption className="mt-auto flex items-center gap-3 pt-5">
        <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-teal to-navy font-display font-extrabold text-white">{r.name.charAt(0).toUpperCase()}</span>
        <span className="min-w-0 text-sm">
          <span className="block truncate font-bold text-navy">{r.name}</span>
          <span className="text-muted">{r.localGuide ? "Local Guide · " : ""}Google · {r.postedRelative}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function ReviewsCarousel({ prioritize = [] }: { prioritize?: number[] }) {
  const reduce = useReducedMotion();
  const perView = usePerView();
  const items = [...all].sort((a, b) => Number(prioritize.includes(b.id)) - Number(prioritize.includes(a.id)));
  const max = Math.max(items.length - perView, 0);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const i = Math.min(index, max);

  const go = useCallback((n: number) => setIndex(n > max ? 0 : n < 0 ? max : n), [max]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => go(i + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [i, paused, reduce, go]);

  const pages = max + 1;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Google reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => { if (e.key === "ArrowRight") go(i + 1); if (e.key === "ArrowLeft") go(i - 1); }}
    >
      <div className="relative">
        <button onClick={() => go(i - 1)} aria-label="Previous reviews" className="absolute -left-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-xl ring-1 ring-line transition hover:scale-110 hover:bg-navy hover:text-white md:grid lg:-left-6">
          <Arrow className="h-5 w-5 rotate-180" />
        </button>
        <button onClick={() => go(i + 1)} aria-label="Next reviews" className="absolute -right-1 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-xl ring-1 ring-line transition hover:scale-110 hover:bg-navy hover:text-white md:grid lg:-right-6">
          <Arrow className="h-5 w-5" />
        </button>

        <div
          className="overflow-hidden px-1 py-3"
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
          }}
        >
          <motion.ul
            className="flex"
            animate={{ x: `${-(100 / perView) * i}%` }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 24, mass: 0.9 }}
            aria-live={paused ? "polite" : "off"}
          >
            {items.map((r, n) => {
              const visible = n >= i && n < i + perView;
              return (
                <li key={r.id} className="shrink-0 px-2.5" style={{ width: `${100 / perView}%` }} aria-hidden={!visible} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${items.length}`}>
                  <Card r={r} />
                </li>
              );
            })}
          </motion.ul>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Choose review slide">
        <button onClick={() => go(i - 1)} aria-label="Previous reviews" className="mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow ring-1 ring-line md:hidden"><Arrow className="h-5 w-5 rotate-180" /></button>
        <span className="hidden items-center gap-2 md:flex">
        {Array.from({ length: pages }).map((_, n) => (
          <button key={n} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1} of ${pages}`} onClick={() => go(n)} className="grid h-6 place-items-center px-0.5">
            <span className={`block h-2 rounded-full transition-all duration-300 ${n === i ? "w-8 bg-gradient-to-r from-teal to-green-bright" : "w-2 bg-line hover:bg-teal/50"}`} />
          </button>
        ))}
        </span>
        <span className="min-w-16 text-center text-sm font-bold tabular-nums text-navy md:hidden">{i + 1} / {pages}</span>
        <button onClick={() => go(i + 1)} aria-label="Next reviews" className="ml-2 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-navy shadow ring-1 ring-line md:hidden"><Arrow className="h-5 w-5" /></button>
      </div>
    </div>
  );
}
