import type { Metadata } from "next";
import { reviewsFaqs } from "@/lib/faqs";
import { site } from "@/config/site";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/Sections";
import { GoogleAttribution, RatingSummary, ReviewCard, reviews } from "@/components/Reviews";
import { Reveal } from "@/components/Reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Google Reviews | Triple SR Commercial Cleaning",
  description: "Read real five-star Google reviews of Triple SR Commercial Cleaning, rated 4.6 from 36 reviews. Offices, end of lease and more.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero eyebrow="Reviews" title="What our customers say on Google" lead="Fifteen five-star reviews from our Google Business Profile, shown word for word." image="office-workstations" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Reviews", href: "/reviews" }]} />
      <section className="py-14">
        <div className="container-x">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-3xl bg-soft p-6">
            <div className="flex flex-wrap items-center gap-6">
              <Image src="/google-reviews.webp" alt="Google Reviews five-star rating badge" width={900} height={370} className="h-14 w-auto" />
              <RatingSummary />
            </div>
            <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Leave us a review</a>
          </div>
          <ul className="mt-10 columns-1 gap-5 md:columns-2 lg:columns-3">
            {reviews.map((r, i) => (
              <Reveal as="li" key={r.id} delay={(i % 3) * 0.05} className="mb-5 break-inside-avoid">
                <ReviewCard r={r} />
              </Reveal>
            ))}
          </ul>
          <div className="mt-8"><GoogleAttribution /></div>
        </div>
      </section>
      <Faq items={reviewsFaqs} />
      <CtaBand />
    </>
  );
}
