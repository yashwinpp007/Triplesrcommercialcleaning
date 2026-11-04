"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { site } from "@/config/site";
import { img } from "@/lib/images";
import { Arrow, Check } from "./Icons";
import { OpenBadge } from "./OpenBadge";

const INTERVAL = 7000;

const slides = [
  {
    bg: "office-city-views", card: "team-office-vacuuming", tag: "Sydney CBD offices", line: "After-hours office cleaning for CBD towers and workplaces.", href: "/services/regular-office-cleaning", service: "regular-office-cleaning",
    h1a: "A cleaner workplace.", h1b: "A higher standard.",
    sub: "Professional commercial cleaning across Sydney, with the CBD as our focus. Reliable teams, tailored cleaning programs and a free on-site quote.",
    cta2: "Explore Our Services", cta2Href: "/services",
    trust: ["Free on-site quotes", "After-hours cleaning", "Consistent, uniformed teams"],
  },
  {
    bg: "office-open-plan", card: "glass-door-vacuum-city", tag: "Commercial end of lease", line: "Detailed handover cleans, ready for the final inspection.", href: "/services/commercial-end-of-lease-cleaning", service: "commercial-end-of-lease-cleaning",
    h1a: "Hand back your lease", h1b: "with confidence.",
    sub: "Detailed commercial end of lease cleaning across Sydney, built around your checklist and ready for the final inspection.",
    cta2: "End of Lease Cleaning", cta2Href: "/services/commercial-end-of-lease-cleaning",
    trust: ["Checklist-led handover", "Weekday and weekend slots", "Clear written quotes"],
  },
  {
    bg: "classroom-clean", card: "classroom-vacuum", tag: "Schools & childcare", line: "Classrooms, halls and amenities cleaned after hours.", href: "/services/school-cleaning", service: "school-cleaning",
    h1a: "Clean classrooms.", h1b: "Healthier learning.",
    sub: "Reliable after-hours cleaning for schools and childcare centres, with child-friendly product options and room-by-room checklists.",
    cta2: "School Cleaning", cta2Href: "/services/school-cleaning",
    trust: ["After-hours cleaning", "Child-friendly product options", "Holiday deep cleans"],
  },
  {
    bg: "hall-floor-polished", card: "stairs-mopping", tag: "Floor care", line: "Polished, gleaming floors across commercial sites.", href: "/services", service: "regular-office-cleaning",
    h1a: "Floors that", h1b: "shine back.",
    sub: "Floor care that brings tiles, vinyl and concrete back to a clean, even finish, from daily mopping to scrubbing and polishing.",
    cta2: "Explore Our Services", cta2Href: "/services",
    trust: ["Scrubbing and polishing", "Strip and seal options", "Tidy, safe wet-floor work"],
  },
  {
    bg: "pressure-washing-concrete", card: "industrial-carpet-extraction", tag: "Warehouse & industrial", line: "Heavy-duty cleaning for warehouses, factories and workshops.", href: "/services/warehouse-cleaning", service: "warehouse-cleaning",
    h1a: "Built for tough sites.", h1b: "Cleaned to schedule.",
    sub: "Warehouse, factory and industrial cleaning across Western Sydney and beyond, planned around your operations.",
    cta2: "Warehouse Cleaning", cta2Href: "/services/warehouse-cleaning",
    trust: ["Pressure washing and scrubbing", "Out-of-hours schedules", "Western Sydney is home base"],
  },
  {
    bg: "industrial-window-cleaning", card: "window-cleaning-1", tag: "Window cleaning", line: "Streak-free glass for offices, shopfronts and schools.", href: "/services/regular-window-cleaning", service: "regular-window-cleaning",
    h1a: "Crystal-clear glass,", h1b: "every single visit.",
    sub: "Streak-free commercial window cleaning for offices, shopfronts and schools, on a regular schedule that suits you.",
    cta2: "Window Cleaning", cta2Href: "/services/regular-window-cleaning",
    trust: ["Interior and exterior glass", "Regular schedules", "Safe-access practices"],
  },
] as const;

const item = (reduce: boolean | null) => ({
  hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number] } },
  out: { opacity: 0, y: reduce ? 0 : -14, transition: { duration: reduce ? 0 : 0.25 } },
});

export function HeroSlideshow() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Pause when the tab is hidden or the hero is off-screen
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    const el = heroRef.current;
    const io = el ? new IntersectionObserver(([e]) => setHidden(!e.isIntersecting), { threshold: 0.2 }) : null;
    if (el && io) io.observe(el);
    return () => { document.removeEventListener("visibilitychange", onVis); io?.disconnect(); };
  }, []);

  const running = !reduce && !paused && !hidden;

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setI((n) => (n + 1) % slides.length), INTERVAL);
    return () => clearTimeout(id);
  }, [i, running]);

  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), []);

  // Gentle pointer parallax for the floating card (desktop only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const cardX = useTransform(sx, (v) => v * -18);
  const cardY = useTransform(sy, (v) => v * -14);
  const rotY = useTransform(sx, (v) => v * 4);
  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const s = slides[i];

  return (
    <section
      ref={heroRef}
      className="relative isolate flex min-h-[40rem] items-center overflow-hidden bg-navy text-white lg:min-h-[calc(100svh-4.5rem)] lg:max-h-[58rem]"
      aria-roledescription="carousel"
      aria-label="Triple SR featured work"
      onPointerMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); mx.set(0); my.set(0); }}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Backgrounds: all mounted, crossfaded; Ken Burns on the active one */}
      {slides.map((sl, n) => {
        const im = img(sl.bg);
        const active = n === i;
        return (
          <div key={sl.bg} className={`absolute inset-0 -z-20 transition-opacity duration-[1400ms] ease-in-out ${active ? "opacity-100" : "opacity-0"}`} aria-hidden={!active}>
            <Image
              src={im.src}
              alt=""
              fill
              priority={n === 0}
              fetchPriority={n === 0 ? "high" : "auto"}
              loading={n === 0 ? "eager" : "lazy"}
              sizes="100vw"
              className={`object-cover ${active && !reduce ? "hero-kenburns" : ""}`}
            />
          </div>
        );
      })}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/65 to-navy/5" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/80 via-transparent to-navy/20" />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-96 w-96 rounded-full bg-teal/25 blur-3xl" />
      <div aria-hidden className="sparkle absolute right-[42%] top-28 -z-10 hidden h-5 w-5 text-white lg:block"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" /></svg></div>

      <div className="container-x grid gap-10 pb-36 pt-16 sm:pt-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:pb-40">
        {/* Copy: changes with every slide */}
        <div className="min-h-[26rem] sm:min-h-[27rem]">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">Triple SR Commercial Cleaning</span>
            <OpenBadge tone="dark" />
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={i} initial="hidden" animate="show" exit="out" variants={{ hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.09 } }, out: { transition: { staggerChildren: 0 } } }}>
              <motion.p variants={item(reduce)} className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-green-bright">
                <span className="h-px w-8 bg-green-bright" /> {s.tag}
              </motion.p>
              <motion.h1 variants={item(reduce)} className="max-w-3xl text-balance text-5xl font-extrabold leading-[1.08] !text-white sm:text-6xl lg:text-7xl">
                {s.h1a} <span className="block bg-gradient-to-r from-green-bright to-[#7fe0d4] bg-clip-text pb-[0.14em] text-transparent">{s.h1b}</span>
              </motion.h1>
              <motion.p variants={item(reduce)} className="mt-4 max-w-xl text-lg text-white/90 sm:text-xl">{s.sub}</motion.p>
              <motion.div variants={item(reduce)} className="mt-8 flex flex-wrap gap-3">
                <Link href={`/get-a-quote?service=${s.service}`} className="btn btn-primary px-8">Get a Free Quote <Arrow className="h-5 w-5" /></Link>
                <Link href={s.cta2Href} className="btn btn-ghost px-8">{s.cta2}</Link>
              </motion.div>
              <motion.ul variants={item(reduce)} className="mt-8 hidden flex-wrap gap-x-7 gap-y-2 text-sm font-semibold text-white/90 sm:flex">
                {s.trust.map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-5 w-5 text-green-bright" /> {t}</li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating portrait card (desktop) */}
        <div className="hidden justify-self-end lg:block" style={{ perspective: 1200 }}>
          <motion.div style={{ x: cardX, y: cardY, rotateY: rotY }} className="relative w-[19rem] xl:w-[21rem]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/25 bg-navy-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] ring-1 ring-white/10">
              {slides.map((sl, n) => {
                const im = img(sl.card);
                const active = n === i;
                return (
                  <Image
                    key={sl.card}
                    src={im.src}
                    alt={active ? im.alt : ""}
                    aria-hidden={!active}
                    fill
                    sizes="(min-width: 1280px) 21rem, 19rem"
                    className={`object-cover transition-all duration-[1100ms] ease-out ${active ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
                  />
                );
              })}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy via-navy/70 to-transparent p-5 pt-16">
                <p className="eyebrow !text-green-bright">Now showing</p>
                <Link key={s.tag} href={s.href} className="group mt-1 block" aria-label={`${s.tag}: view service`}>
                  <span className="block font-display text-xl font-extrabold leading-tight text-white">{s.tag}</span>
                  <span className="mt-1 block text-sm text-white/85">{s.line}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white">
                    View service
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-green transition-transform group-hover:translate-x-1"><Arrow className="h-4 w-4" /></span>
                  </span>
                </Link>
              </div>
            </div>
            <a
              href={site.googleProfile}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute -bottom-6 -left-10 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 shadow-2xl backdrop-blur-md transition hover:bg-white/25"
            >
              <span className="font-display text-3xl font-extrabold text-white">{site.googleRating.value}</span>
              <span>
                <span className="flex gap-0.5 text-amber-400" aria-hidden>{"★★★★★"}</span>
                <span className="text-xs text-white/85">{site.googleRating.count} Google reviews</span>
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-0 pb-6">
        <div className="container-x">
          <div className="flex items-end gap-4">
            <div className="flex min-w-0 flex-1 gap-2 sm:gap-3" role="tablist" aria-label="Choose slide">
              {slides.map((sl, n) => (
                <button key={sl.bg} role="tab" aria-selected={n === i} aria-label={`Slide ${n + 1}: ${sl.tag}`} onClick={() => go(n)} className="group min-w-0 flex-1 text-left">
                  <span className="relative block h-1 overflow-hidden rounded-full bg-white/25">
                    <span
                      key={`${n === i}-${i}-${running}`}
                      className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-green-bright to-[#7fe0d4] ${n < i ? "w-full" : n === i ? (running ? "hero-progress" : "w-full") : "w-0"}`}
                      style={n === i && running ? { animationDuration: `${INTERVAL}ms` } : undefined}
                    />
                  </span>
                  <span className={`mt-2 hidden truncate text-xs font-bold transition-colors lg:block ${n === i ? "text-white" : "text-white/55 group-hover:text-white/85"}`}>{sl.tag}</span>
                </button>
              ))}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="hidden font-display text-sm font-bold tabular-nums text-white/80 sm:block">{String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
              <button onClick={() => go(i - 1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition hover:bg-white hover:text-navy"><Arrow className="h-5 w-5 rotate-180" /></button>
              <button onClick={() => go(i + 1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur transition hover:bg-white hover:text-navy"><Arrow className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{s.tag}</p>
    </section>
  );
}
