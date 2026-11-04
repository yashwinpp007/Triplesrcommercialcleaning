import Link from "next/link";
import data from "@/content/reviews.json";
import { site } from "@/config/site";
import { Star } from "./Icons";

export type ReviewT = (typeof data.reviews)[number];
export const reviews = data.reviews;

export function Stars({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <span className="flex gap-0.5 text-amber-400" role="img" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={className} />)}
    </span>
  );
}

export function ReviewCard({ r }: { r: ReviewT }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6 shadow-sm">
      <Stars />
      <blockquote className="mt-3 flex-1 whitespace-pre-line text-[15px] leading-relaxed text-ink">{r.text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3 border-t border-line pt-4">
        <span aria-hidden className="grid h-10 w-10 place-items-center rounded-full bg-teal-soft font-bold text-teal">{r.name.charAt(0).toUpperCase()}</span>
        <span className="text-sm">
          <span className="block font-bold text-navy">{r.name}</span>
          <span className="text-muted">{r.localGuide ? "Local Guide · " : ""}Google review · {r.postedRelative}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function RatingSummary() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="font-display text-4xl font-extrabold text-navy">{site.googleRating.value}</span>
      <div>
        <Stars className="h-5 w-5" />
        <p className="text-sm text-muted">{site.googleRating.count} Google reviews</p>
      </div>
    </div>
  );
}

export function ReviewsMarquee({ items = reviews }: { items?: ReviewT[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden py-2" aria-label="Customer reviews from Google">
      <div className="marquee-track gap-5">
        {doubled.map((r, i) => (
          <div key={`${r.id}-${i}`} className="w-[20rem] shrink-0 pr-5 sm:w-[24rem]" aria-hidden={i >= items.length}>
            <ReviewCard r={r} />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-soft to-transparent" />
    </div>
  );
}

export function GoogleAttribution() {
  return (
    <p className="text-sm text-muted">
      Reviews from Google, shown word for word. <a className="font-bold text-teal underline" href={site.googleProfile} target="_blank" rel="noopener noreferrer">See all on Google</a> ·{" "}
      <a className="font-bold text-teal underline" href={site.googleProfile} target="_blank" rel="noopener noreferrer">Leave us a review</a> ·{" "}
      <Link className="font-bold text-teal underline" href="/reviews">Read more</Link>
    </p>
  );
}
