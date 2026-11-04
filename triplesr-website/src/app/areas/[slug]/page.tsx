import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { regionBySlug, regions } from "@/content/areas";
import { services } from "@/content/services";
import { regionFaqs } from "@/lib/faqs";
import { site } from "@/config/site";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, CtaBand, PageHero, Photo, SectionHead, ServiceCard } from "@/components/Sections";
import { ReviewCard, reviews } from "@/components/Reviews";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Check } from "@/components/Icons";

export function generateStaticParams() {
  return regions.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = regionBySlug((await params).slug);
  if (!r) return {};
  const title = r.primary
    ? "Commercial Cleaning Sydney CBD | Offices, Strata & End of Lease | Triple SR"
    : `Commercial Cleaning ${r.name} | Triple SR Commercial Cleaning`;
  const description = r.primary
    ? "Commercial cleaning in the Sydney CBD: offices, strata buildings, retail, windows and end of lease. After-hours, building access coordinated. Free quote."
    : `Commercial cleaning across ${r.name}: ${r.blurb} Free on-site quotes.`;
  return { title, description, alternates: { canonical: `/areas/${r.slug}` } };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const r = regionBySlug((await params).slug);
  if (!r) notFound();
  const featured = r.primary
    ? services.filter((s) => ["regular-office-cleaning", "commercial-end-of-lease-cleaning", "regular-window-cleaning"].includes(s.slug))
    : services.filter((s) => (r.home || r.slug === "south-west" || r.slug === "st-george") ? ["warehouse-cleaning", "industrial-cleaning", "factory-cleaning"].includes(s.slug) : ["regular-office-cleaning", "school-cleaning", "education-childcare-cleaning"].includes(s.slug));
  const officeReviews = reviews.filter((x) => x.suggestedPages.includes("regular-office-cleaning")).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={r.primary ? "Our primary service area" : r.home ? "Our home base" : "Service area"}
        title={r.primary ? "Commercial cleaning in the Sydney CBD" : `Commercial cleaning in ${r.name}`}
        lead={r.blurb}
        image={r.primary ? "office-city-views" : r.home ? "pressure-washing-concrete" : "office-open-plan"}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }, { name: r.name, href: `/areas/${r.slug}` }]} />

      <section className="py-14">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            <Reveal>
              <h2 className="text-3xl font-extrabold">{r.primary ? "Cleaning built around the CBD's way of working" : `What we clean in ${r.name}`}</h2>
              <p className="mt-4 text-lg text-muted">
                {r.primary
                  ? "CBD sites mean high-rise towers, multi-tenant floors, building managers and tight access windows. We plan around that: inductions, access cards, lift and loading-dock bookings and after-hours schedules are arranged with your building manager before the first clean."
                  : `Across ${r.name} we typically clean ${r.context}. We schedule around your hours, bring our own equipment and work to a checklist written for your site.`}
              </p>
            </Reveal>
            {r.primary && (
              <Reveal>
                <h3 className="text-xl font-extrabold">CBD access, handled</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {["Building inductions and access cards", "Lift and loading-dock bookings", "After-hours and early-morning cleans", "Strata and building-manager liaison", "End of lease and make-good cleans", "Window cleaning at accessible heights"].map((t) => (
                    <li key={t} className="flex gap-3 rounded-2xl border border-line bg-white p-4"><Check className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-green p-1 text-white" /> {t}</li>
                  ))}
                </ul>
              </Reveal>
            )}
            <Reveal>
              <h3 className="text-xl font-extrabold">Suburbs and precincts we cover</h3>
              <p className="mt-3 flex flex-wrap gap-2">
                {r.suburbs.map((s) => <span key={s} className="rounded-full bg-teal-soft px-3 py-1 text-sm font-semibold text-navy">{s}</span>)}
              </p>
              <p className="mt-3 text-sm text-muted">Don't see your suburb? Call {site.phoneDisplay}. We may still be able to help.</p>
            </Reveal>
            <div className="grid grid-cols-2 gap-4">
              <Photo slug={r.primary ? "office-lounge-city" : "team-office-vacuuming"} className="aspect-[4/3]" sizes="(max-width: 1024px) 45vw, 30vw" />
              <Photo slug={r.primary ? "glass-door-vacuum-city" : "team-kitchen-mopping"} className="aspect-[4/3]" sizes="(max-width: 1024px) 45vw, 30vw" />
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start"><QuoteForm defaultSuburb={r.suburbs[0]} id={`quote-${r.slug}`} compact /></aside>
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="container-x">
          <SectionHead eyebrow="Popular services" title={`Most requested in ${r.short}`} />
          <div className="mt-8 grid gap-6 md:grid-cols-3">{featured.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}</div>
          <p className="mt-6 text-muted"><Link className="font-bold text-teal underline" href="/services">See all ten services</Link></p>
        </div>
      </section>

      {r.primary && officeReviews.length > 0 && (
        <section className="py-16">
          <div className="container-x">
            <SectionHead eyebrow="Office clients" title="What office clients say" />
            <div className="mt-8 grid gap-5 md:grid-cols-2">{officeReviews.map((x) => <ReviewCard key={x.id} r={x} />)}</div>
          </div>
        </section>
      )}

      <Faq items={regionFaqs(r)} title={`Cleaning in ${r.name}: common questions`} />
      <CtaBand title={`Need a cleaner in ${r.short}?`} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: `Commercial cleaning in ${r.name}`, provider: { "@id": `${site.url}/#business` }, areaServed: r.suburbs.map((s) => ({ "@type": "Place", name: s })), url: `${site.url}/areas/${r.slug}` }} />
    </>
  );
}
