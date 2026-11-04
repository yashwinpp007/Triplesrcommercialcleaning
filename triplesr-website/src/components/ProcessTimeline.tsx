"use client";

import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, useState } from "react";

const steps = [
  { t: "Request a quote", d: "Send the form or call us. It takes about a minute." },
  { t: "Free site inspection", d: "We look at your space, access and needs." },
  { t: "Tailored cleaning proposal", d: "A clear written scope, schedule and price." },
  { t: "We deliver consistent results", d: "A regular team cleans to your checklist." },
];

// Steps light up progressively as the section scrolls through the viewport.
export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const [p, setP] = useState(reduce ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (!reduce) setP(v); });

  const on = (i: number) => reduce || p >= (i === 0 ? 0.02 : (i / (steps.length - 1)) * 0.94);

  return (
    <ol ref={ref} className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
      <div aria-hidden className="absolute bottom-6 left-6 top-6 w-0.5 bg-white/15 md:hidden">
        <motion.div className="h-full w-full origin-top bg-gradient-to-b from-green-bright to-teal" style={{ scaleY: reduce ? 1 : scrollYProgress }} />
      </div>
      <div aria-hidden className="absolute left-6 right-6 top-6 hidden h-0.5 bg-white/15 md:block">
        <motion.div className="h-full w-full origin-left bg-gradient-to-r from-green-bright to-teal" style={{ scaleX: reduce ? 1 : scrollYProgress }} />
      </div>
      {steps.map((s, i) => (
        <li key={s.t} className="relative flex gap-4 md:block">
          <span
            className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-lg font-extrabold ring-4 ring-navy transition-all duration-500 ${
              on(i) ? "scale-100 bg-green text-white shadow-[0_0_0_6px_rgba(59,156,66,.25)]" : "scale-90 bg-navy-2 text-white/50"
            }`}
          >
            {i + 1}
          </span>
          <div className={`transition-all duration-500 md:mt-5 ${on(i) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-50"}`}>
            <h3 className="text-xl font-bold !text-white">{s.t}</h3>
            <p className="mt-1 text-white/80">{s.d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
