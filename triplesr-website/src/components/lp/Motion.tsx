"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { img } from "@/lib/images";
import { CountUp } from "@/components/CountUp";
import { Star } from "@/components/Icons";
import { site } from "@/config/site";

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Thin gradient bar across the top that fills as the visitor scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden style={{ scaleX: x }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[var(--a)] to-[var(--b)]" />;
}

/** Cross-fading hero photo carousel with a slow zoom, progress dots and a floating Google rating chip. */
export function HeroSlides({ slugs }: { slugs: string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const n = slugs.length;
  useEffect(() => {
    if (reduce || n < 2) return;
    const id = setInterval(() => setI((x) => (x + 1) % n), 4500);
    return () => clearInterval(id);
  }, [reduce, n]);
  const cur = img(slugs[i]);
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white">
      <AnimatePresence initial={false}>
        <motion.div
          key={slugs[i]}
          className="absolute inset-0"
          initial={reduce ? false : { opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.3, ease: EASE }}
        >
          <Image src={cur.src} alt={cur.alt} fill priority={i === 0} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
        </motion.div>
      </AnimatePresence>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-[var(--a)]/10" />
      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-2 text-sm font-bold text-navy shadow-xl backdrop-blur">
        <Star className="h-4 w-4 text-amber-400" />
        <span><CountUp to={site.googleRating.value} decimals={1} /> on Google</span>
        <span className="hidden text-muted sm:inline">· {site.googleRating.count} reviews</span>
      </div>
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2" role="tablist" aria-label="Photo selector">
        {slugs.map((s, k) => (
          <button key={s} type="button" role="tab" aria-selected={k === i} aria-label={`Show photo ${k + 1}`} onClick={() => setI(k)} className="grid h-6 w-6 place-items-center">
            <span className={`h-2 rounded-full transition-all duration-500 ${k === i ? "w-7 bg-white" : "w-2 bg-white/60"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}

/** Two rows of photos drifting in opposite directions. Pauses on hover; static (scrollable) under reduced motion. */
export function PhotoRows({ rows, label }: { rows: string[][]; label: string }) {
  return (
    <div className="space-y-4 overflow-hidden" role="group" aria-label={label}>
      {rows.map((row, r) => (
        <div key={r} className={`marquee ${r % 2 ? "marquee-rev" : ""} relative`}>
          <div className="marquee-track gap-4 pr-4" style={{ animationDuration: `${55 + r * 12}s` }}>
            {[...row, ...row].map((s, k) => {
              const m = img(s);
              const dup = k >= row.length;
              return (
                <div key={`${s}-${k}`} aria-hidden={dup || undefined} className="relative h-52 w-40 shrink-0 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5 sm:h-64 sm:w-52">
                  <Image src={m.src} alt={dup ? "" : m.alt} fill sizes="208px" className="object-cover transition-transform duration-700 hover:scale-110" />
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/** A photo that drifts slightly slower than the page as you scroll. */
export function ParallaxImage({ slug, className = "" }: { slug: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"]);
  const m = img(slug);
  return (
    <div ref={ref} className={`relative overflow-hidden rounded-[2rem] shadow-2xl ring-4 ring-white ${className}`}>
      <motion.div style={{ y }} className="absolute inset-x-0 -inset-y-[10%]">
        <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
      </motion.div>
    </div>
  );
}

/** Staggered fade-up for a group of children. */
export function Stagger({ children, className, gap = 0.08, as = "div" }: { children: React.ReactNode; className?: string; gap?: number; as?: "div" | "ul" | "ol" }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" }) {
  const M = motion[as];
  return (
    <M className={className} variants={{ hidden: { opacity: 0, y: 28, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}>
      {children}
    </M>
  );
}

/** Line that draws itself between the step badges as it scrolls into view. */
export function DrawLine() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="absolute left-[12%] right-[12%] top-[2.75rem] z-0 hidden h-1 origin-left rounded-full bg-gradient-to-r from-[var(--a)] to-[var(--b)] lg:block"
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.4, ease: EASE }}
    />
  );
}
