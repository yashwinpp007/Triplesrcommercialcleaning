import Image from "next/image";
import { site } from "@/config/site";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { GoogleAttribution, Stars } from "./Reviews";
import { Reveal } from "./Reveal";

// Embedded on the homepage and every inner page. `prioritize` puts the most relevant reviews first.
export function ReviewsSection({ prioritize = [], id = "reviews" }: { prioritize?: number[]; id?: string }) {
  return (
    <section className="relative overflow-hidden bg-soft py-14 sm:py-16" aria-labelledby={`${id}-heading`}>
      <div aria-hidden className="pointer-events-none absolute -left-24 top-6 h-64 w-64 rounded-full bg-teal/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-green-bright/10 blur-3xl" />
      <div className="container-x relative">
        <Reveal className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-5">
            <div className="rounded-2xl bg-white p-3 shadow-lg ring-1 ring-line">
              <Image src="/google-reviews.webp" alt="Google Reviews five-star rating badge" width={900} height={370} className="h-11 w-auto sm:h-12" />
            </div>
            <div>
              <p className="eyebrow">Google reviews</p>
              <h2 id={`${id}-heading`} className="text-2xl font-extrabold sm:text-3xl">What our customers say</h2>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted">
                <span className="font-display text-lg font-extrabold text-navy">{site.googleRating.value}</span>
                <Stars />
                <span>from {site.googleRating.count} Google reviews</span>
              </div>
            </div>
          </div>
          <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Leave us a review</a>
        </Reveal>
        <Reveal delay={0.08} className="mt-8 sm:px-6">
          <ReviewsCarousel prioritize={prioritize} />
        </Reveal>
        <div className="mt-4 text-center"><GoogleAttribution /></div>
      </div>
    </section>
  );
}
