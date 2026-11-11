"use client";

import { useState } from "react";
import { Stars, type ReviewT } from "@/components/Reviews";

const LONG = 260; // characters; shorter reviews show in full

// Compact review card for the ad landing pages. The full verbatim text stays in the HTML;
// long reviews are visually clamped with a "Read more" toggle so cards stay a similar height.
export function LpReviewCard({ r }: { r: ReviewT }) {
  const long = r.text.length > LONG;
  const [open, setOpen] = useState(false);
  return (
    <figure className="flex flex-col rounded-3xl border border-line bg-white p-5 shadow-sm">
      <Stars />
      <blockquote className={`mt-3 whitespace-pre-line text-[15px] leading-relaxed text-ink ${long && !open ? "line-clamp-6" : ""}`}>{r.text}</blockquote>
      {long && (
        <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="mt-2 self-start text-sm font-bold text-teal underline underline-offset-4">
          {open ? "Show less" : "Read more"}
        </button>
      )}
      <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-teal-soft font-bold text-teal">{r.name.charAt(0).toUpperCase()}</span>
        <span className="text-sm">
          <span className="block font-bold text-navy">{r.name}</span>
          <span className="text-muted">{r.localGuide ? "Local Guide · " : ""}Google review · {r.postedRelative}</span>
        </span>
      </figcaption>
    </figure>
  );
}
