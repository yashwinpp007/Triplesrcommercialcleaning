import type { Metadata } from "next";
import { galleryFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, PageHero, SectionHead } from "@/components/Sections";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Gallery } from "@/components/Gallery";
import { Reveal } from "@/components/Reveal";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Cleaning Gallery & Before/After | Triple SR Commercial Cleaning",
  description: "Photos and videos from real Triple SR commercial cleaning jobs across Sydney: offices, schools, restrooms, floors and windows.",
  alternates: { canonical: "/gallery" },
};

const items = [
  { slug: "office-city-views", cat: "Offices" }, { slug: "office-lounge-city", cat: "Offices" }, { slug: "office-open-plan", cat: "Offices" },
  { slug: "office-workstations", cat: "Offices" }, { slug: "office-glass-partitions", cat: "Offices" }, { slug: "team-office-vacuuming", cat: "Our team" },
  { slug: "team-kitchen-mopping", cat: "Our team" }, { slug: "team-corridor-vacuuming", cat: "Our team" }, { slug: "glass-door-vacuum-city", cat: "Our team" },
  { slug: "restroom-vanity", cat: "Restrooms" }, { slug: "restroom-floor-scrubber", cat: "Restrooms" }, { slug: "restroom-cubicle", cat: "Restrooms" },
  { slug: "classroom-clean", cat: "Education" }, { slug: "classroom-wipe-down", cat: "Education" }, { slug: "classroom-vacuum", cat: "Education" },
  { slug: "hall-floor-polished", cat: "Education" }, { slug: "classroom-whiteboard", cat: "Education" }, { slug: "pressure-washing-concrete", cat: "Industrial" },
  { slug: "industrial-window-cleaning", cat: "Windows" }, { slug: "window-cleaning-1", cat: "Windows" }, { slug: "window-cleaning-2", cat: "Windows" },
  { slug: "blinds-window-cleaning", cat: "Windows" }, { slug: "stairs-mopping", cat: "Floors" }, { slug: "tile-floor-after-2", cat: "Floors" },
];

const videos = [
  { src: "/video/clip-4.mp4", poster: "/video/clip-4-poster.webp", label: "Window cleaning" },
  { src: "/video/clip-7.mp4", poster: "/video/clip-7-poster.webp", label: "Glass cleaning on a ladder" },
  { src: "/video/clip-5.mp4", poster: "/video/clip-5-poster.webp", label: "Carpet extraction" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Our work, up close" lead="Real photos and clips from our own jobs. Client details are removed or cropped." image="tile-floor-after" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Gallery", href: "/gallery" }]} />
      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <Reveal><BeforeAfter before="tile-floor-before" after="tile-floor-after" label="Tiled entry floor" /></Reveal>
          <div><SectionHead eyebrow="Before and after" title="Dull to gleaming" text="Drag the handle (or use the arrow keys) to compare a tiled entry floor before and after our clean." /></div>
        </div>
      </section>
      <section className="bg-soft py-14">
        <div className="container-x">
          <SectionHead eyebrow="Photos" title="Browse by type" />
          <Gallery items={items} />
        </div>
      </section>
      <section className="py-14">
        <div className="container-x">
          <SectionHead eyebrow="Videos" title="See us at work" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {videos.map((v) => (
              <Reveal key={v.src}>
                <figure>
                  <video className="aspect-[9/16] w-full rounded-3xl bg-navy object-cover shadow-xl" controls preload="none" playsInline muted poster={v.poster} aria-label={v.label}>
                    <source src={v.src} type="video/mp4" />
                  </video>
                  <figcaption className="mt-2 text-sm font-semibold text-navy">{v.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ReviewsSection />
      <Faq items={galleryFaqs} />
      <CtaBand />
    </>
  );
}
