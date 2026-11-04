"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { img } from "@/lib/images";
import { track } from "@/lib/track";

export function Gallery({ items }: { items: { slug: string; cat: string }[] }) {
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat)))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = items.filter((i) => cat === "All" || i.cat === cat);
  const closeRef = useRef<HTMLButtonElement>(null);
  const startX = useRef(0);

  const move = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + shown.length) % shown.length)), [shown.length]);

  useEffect(() => {
    if (open === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, move]);

  const cur = open !== null ? img(shown[open].slug) : null;

  return (
    <>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter photos">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={`min-h-11 rounded-full px-5 py-2 text-sm font-bold transition ${cat === c ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-line hover:ring-teal"}`}>{c}</button>
        ))}
      </div>
      <ul className="mt-8 columns-2 gap-4 md:columns-3 lg:columns-4">
        {shown.map((it, i) => {
          const m = img(it.slug);
          return (
            <li key={it.slug} className="mb-4 break-inside-avoid">
              <button onClick={() => { setOpen(i); track("gallery_open", { image: it.slug }); }} className="group relative block w-full overflow-hidden rounded-2xl" aria-label={`Open photo: ${m.alt}`}>
                <Image src={m.src} alt={m.alt} width={m.width} height={m.height} sizes="(max-width: 768px) 50vw, 25vw" loading="lazy" className="h-auto w-full transition-transform duration-500 group-hover:scale-105" />
              </button>
            </li>
          );
        })}
      </ul>

      {cur && (
        <div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[70] grid place-items-center bg-navy/95 p-4"
          onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => { const dx = e.changedTouches[0].clientX - startX.current; if (Math.abs(dx) > 50) move(dx < 0 ? 1 : -1); }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}>
          <button ref={closeRef} onClick={() => setOpen(null)} aria-label="Close" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">×</button>
          <button onClick={() => move(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">‹</button>
          <button onClick={() => move(1)} aria-label="Next photo" className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25">›</button>
          <figure className="max-h-full max-w-5xl">
            <Image src={cur.src} alt={cur.alt} width={cur.width} height={cur.height} sizes="100vw" className="max-h-[80vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white/85">{cur.alt}</figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
