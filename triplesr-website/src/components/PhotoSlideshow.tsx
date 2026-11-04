"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { img } from "@/lib/images";
import { track } from "@/lib/track";
import { Arrow } from "./Icons";

const AUTOPLAY_MS = 3500;

// Click-to-open photo grid with a full-screen slideshow (arrows, keyboard, swipe, thumbnails, optional autoplay).
export function PhotoSlideshow({ slugs, label }: { slugs: string[]; label: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const startX = useRef<number | null>(null);
  const items = slugs.map(img);
  const n = items.length;

  const go = useCallback((d: number) => {
    setDir(d);
    setOpen((o) => (o === null ? o : (o + d + n) % n));
  }, [n]);

  const close = useCallback(() => {
    setOpen(null);
    setPlaying(false);
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === " " && document.activeElement === document.body) { e.preventDefault(); setPlaying((p) => !p); }
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open, go, close]);

  useEffect(() => {
    if (open === null || !playing) return;
    const id = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [open, playing, go]);

  const cur = open !== null ? items[open] : null;

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {items.map((m, i) => (
          <li key={slugs[i]}>
            <button
              type="button"
              onClick={(e) => { triggerRef.current = e.currentTarget; setDir(1); setOpen(i); track("gallery_open", { image: slugs[i], context: label }); }}
              aria-label={`Open photo ${i + 1} of ${n}: ${m.alt}`}
              className="group relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden rounded-3xl shadow-md ring-1 ring-black/5 transition-shadow hover:shadow-2xl"
            >
              <Image src={m.src} alt={m.alt} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <span className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-navy opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:translate-y-2 sm:group-hover:translate-y-0" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4M11 8v6M8 11h6" /></svg>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {cur && open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${label} photo slideshow`}
            className="fixed inset-0 z-[80] flex flex-col bg-navy/95 backdrop-blur-md"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (startX.current === null) return;
              const dx = e.changedTouches[0].clientX - startX.current;
              startX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-3 px-4 py-3 text-white sm:px-6">
              <p className="font-display text-sm font-bold tabular-nums">{open + 1} / {n}</p>
              <p className="hidden min-w-0 flex-1 truncate text-center text-sm text-white/80 sm:block">{label}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPlaying((p) => !p)}
                  aria-pressed={playing}
                  aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 transition hover:bg-white hover:text-navy"
                >
                  {playing ? (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
                  )}
                </button>
                <button ref={closeRef} type="button" onClick={close} aria-label="Close slideshow" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 text-2xl leading-none transition hover:bg-white hover:text-navy">×</button>
              </div>
            </div>

            {/* Stage */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-white hover:text-navy sm:left-6 sm:h-14 sm:w-14">
                <Arrow className="h-5 w-5 rotate-180" />
              </button>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.figure
                  key={open}
                  custom={dir}
                  initial={reduce ? false : { opacity: 0, x: dir * 60, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, x: dir * -60, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                  className="flex max-h-full max-w-full flex-col items-center"
                >
                  <Image src={cur.src} alt={cur.alt} width={cur.width} height={cur.height} sizes="100vw" priority className="max-h-[68vh] w-auto max-w-[88vw] rounded-2xl object-contain shadow-2xl sm:max-h-[72vh]" />
                  <figcaption className="mt-3 max-w-xl px-4 text-center text-sm text-white/85">{cur.alt}</figcaption>
                </motion.figure>
              </AnimatePresence>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur transition hover:scale-110 hover:bg-white hover:text-navy sm:right-6 sm:h-14 sm:w-14">
                <Arrow className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnails + autoplay progress */}
            <div className="px-4 pb-4 pt-3 sm:px-6">
              <div className="mx-auto flex max-w-xl justify-center gap-2">
                {items.map((m, i) => (
                  <button
                    key={slugs[i]}
                    type="button"
                    onClick={() => { setDir(i >= open ? 1 : -1); setOpen(i); }}
                    aria-label={`Go to photo ${i + 1}`}
                    aria-current={i === open}
                    className={`relative h-14 w-11 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-12 ${i === open ? "ring-green-bright" : "opacity-60 ring-transparent hover:opacity-100"}`}
                  >
                    <Image src={m.src} alt="" fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
              <div className="mx-auto mt-3 h-1 max-w-xl overflow-hidden rounded-full bg-white/15" aria-hidden>
                {playing && !reduce && <motion.div key={open} className="h-full origin-left bg-gradient-to-r from-green-bright to-[#7fe0d4]" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
