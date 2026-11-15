"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "@/components/Icons";

const EASE = [0.2, 0.8, 0.2, 1] as const;

/** Card with a cursor-following spotlight and a gentle 3D tilt. */
export function SpotlightCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (!reduce) el.style.transform = `perspective(900px) rotateX(${(y / r.height - 0.5) * -7}deg) rotateY(${(x / r.width - 0.5) * 9}deg) translateY(-4px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={leave} style={style} className={`lp-spot transition-transform duration-300 ease-out will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/** Headline that rises in word by word. Words inside `highlight` get the animated gradient. */
export function WordReveal({ text, highlight }: { text: string; highlight: string }) {
  const reduce = useReducedMotion();
  const at = text.indexOf(highlight);
  const words = text.split(" ");
  const starts = words.map((_, i) => words.slice(0, i).join(" ").length + (i ? 1 : 0));
  return (
    <>
      {words.map((w, i) => {
        const start = starts[i];
        const hi = at >= 0 && start >= at && start < at + highlight.length;
        return (
          <span key={i} className="inline-block overflow-hidden pb-[.12em] align-bottom">
            <motion.span
              className={`inline-block ${hi ? "lp-shimmer-hi" : ""}`}
              initial={reduce ? false : { y: "110%", rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </>
  );
}

/** Small floating badges that drift around the hero photo. */
export function FloatingChips({ items }: { items: string[] }) {
  const spots = ["-left-3 top-[18%] sm:-left-8", "-right-3 top-[40%] sm:-right-8", "left-6 -bottom-4 sm:left-10", "right-8 -top-4 sm:right-12"];
  const rot = ["-4deg", "3deg", "-2deg", "4deg"];
  return (
    <>
      {items.slice(0, 4).map((t, i) => (
        <div
          key={t}
          style={{ ["--r" as string]: rot[i], animationDelay: `${i * -1.2}s` }}
          className={`lp-bob absolute z-10 flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3.5 py-2 text-xs font-extrabold text-navy shadow-xl backdrop-blur sm:text-sm ${spots[i]}`}
        >
          <Check className="h-5 w-5 rounded-full bg-gradient-to-br from-[var(--a)] to-[var(--b)] p-1 text-white" /> {t}
        </div>
      ))}
    </>
  );
}

/** Decorative sparkles for dark sections (pure CSS twinkle; hidden from assistive tech). */
export function Twinkles({ n = 16 }: { n?: number }) {
  const dots = Array.from({ length: n }, (_, i) => ({ l: (i * 37 + 11) % 100, t: (i * 53 + 7) % 100, d: (i % 7) * 0.45, s: 3 + (i % 3) * 2 }));
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span key={i} className="lp-twinkle absolute rounded-full bg-white" style={{ left: `${d.l}%`, top: `${d.t}%`, width: d.s, height: d.s, animationDelay: `${d.d}s`, boxShadow: "0 0 12px 2px rgba(255,255,255,.7)" }} />
      ))}
    </div>
  );
}

const paths: Record<string, React.ReactNode> = {
  "Office Cleaning": <><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /></>,
  "Floor Cleaning": <><path d="M3 9l9-5 9 5-9 5-9-5z" /><path d="M3 14l9 5 9-5" /></>,
  "Carpet Cleaning": <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M3 15h18M9 5v14M15 5v14" /></>,
  "Window & Glass Cleaning": <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M12 3v18M4 12h16M7 6l3 2M14 15l3 2" /></>,
  "Kitchen & Breakroom Cleaning": <path d="M6 3v8a2 2 0 002 2v8M6 3v5M10 3v5M8 3v5M17 3c-2 2-2 6 0 8v10" />,
  "Washroom Cleaning": <><path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" /><path d="M9.5 15a2.5 2.5 0 002.5 2.5" /></>,
  "Walls & Skirting Boards": <><path d="M4 4h16v12H4zM2 20h20" /><path d="M8 8l8 4" /></>,
  "Rubbish Removal": <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5" />,
};

export function ServiceIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {paths[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}

/** Seamless scrolling ribbon of short keywords. */
export function Ticker({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden bg-gradient-to-r from-[var(--a)] via-[#7c3aed] to-[var(--b)] py-3.5 text-white">
      <div className="marquee-track" style={{ animationDuration: "38s" }}>
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= items.length || undefined} className="flex shrink-0 items-center gap-6 pr-6 text-sm font-extrabold uppercase tracking-[.16em] sm:text-base">
            {t} <span className="text-[#fde047]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
