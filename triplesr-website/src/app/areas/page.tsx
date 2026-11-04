import type { Metadata } from "next";
import Link from "next/link";
import { regions } from "@/content/areas";
import { areasFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { SydneyMap } from "@/components/SydneyMap";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Commercial Cleaning Areas Sydney-Wide | Sydney CBD Focus | Triple SR",
  description: "Triple SR services all of Greater Sydney: Sydney CBD, Inner West, Eastern Suburbs, North Shore, Parramatta, Western Sydney and more. Check your suburb.",
  alternates: { canonical: "/areas" },
};

export default function AreasPage() {
  return (
    <>
      <PageHero eyebrow="Areas we service" title="Commercial cleaning across all of Sydney" lead="Sydney CBD is our primary focus, with Blacktown and Western Sydney as home base. Explore the map or check your suburb." image="office-lounge-city" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }]} />
      <section className="py-14"><div className="container-x"><SydneyMap /></div></section>
      <section className="bg-soft py-16">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold">Regions we cover</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {regions.map((r, i) => (
              <Reveal key={r.slug} delay={(i % 3) * 0.06}>
                <Link href={`/areas/${r.slug}`} className="card-lift block h-full rounded-3xl border border-line bg-white p-6">
                  {r.primary && <span className="rounded-full bg-green px-3 py-1 text-xs font-bold text-white">Primary focus</span>}
                  {r.home && <span className="rounded-full bg-navy px-3 py-1 text-xs font-bold text-white">Home base</span>}
                  <h3 className="mt-3 text-xl font-extrabold">{r.name}</h3>
                  <p className="mt-2 text-sm text-muted">{r.blurb}</p>
                  <p className="mt-3 text-sm text-muted">{r.suburbs.slice(0, 6).join(" · ")}</p>
                  <span className="mt-4 inline-flex items-center gap-2 font-bold text-teal">Cleaning in {r.short} <Arrow className="h-4 w-4" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ReviewsSection />
      <Faq items={areasFaqs} />
      <CtaBand />
    </>
  );
}
