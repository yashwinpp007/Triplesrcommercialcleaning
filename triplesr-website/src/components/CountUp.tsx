"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Counts up once when scrolled into view. Only use with verified figures.
export function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.2, 0.8, 0.2, 1], onUpdate: (n) => setV(n) });
    return () => c.stop();
  }, [inView, to, reduce]);

  return <span ref={ref} aria-label={`${to.toFixed(decimals)}${suffix}`}><span aria-hidden>{v.toFixed(decimals)}{suffix}</span></span>;
}
