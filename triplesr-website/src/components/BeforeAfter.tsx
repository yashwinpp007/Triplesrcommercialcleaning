"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { img } from "@/lib/images";

export function BeforeAfter({ before, after, label, className = "max-w-md" }: { before: string; after: string; label: string; className?: string }) {
  const b = img(before);
  const a = img(after);
  const [pos, setPos] = useState(50);
  const [hinted, setHinted] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const setFromX = useCallback((x: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
    setHinted(true);
  }, []);

  return (
    <div
      ref={box}
      className={`relative mx-auto aspect-[4/5] w-full ${className} touch-pan-y select-none overflow-hidden rounded-3xl shadow-2xl`}
      onPointerDown={(e) => { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); setFromX(e.clientX); }}
      onPointerMove={(e) => { if (e.buttons || e.pointerType === "touch") setFromX(e.clientX); }}
    >
      <Image src={a.src} alt={a.alt} fill sizes="(max-width: 768px) 90vw, 28rem" className="pointer-events-none object-cover" />
      <div className="pointer-events-none absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={b.src} alt={b.alt} fill sizes="(max-width: 768px) 90vw, 28rem" className="object-cover" />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 text-xs font-bold text-white">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-green/90 px-3 py-1 text-xs font-bold text-white">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,.4)]" style={{ left: `${pos}%` }}>
        <span className={`absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-xl ${hinted ? "" : "animate-pulse"}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="m8 7-5 5 5 5M16 7l5 5-5 5" /></svg>
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => { setPos(Number(e.target.value)); setHinted(true); }}
        aria-label={`${label}: drag to compare before and after`}
        className="absolute inset-x-0 bottom-0 h-full w-full cursor-ew-resize opacity-0"
        style={{ pointerEvents: "none" }}
        tabIndex={0}
      />
    </div>
  );
}
