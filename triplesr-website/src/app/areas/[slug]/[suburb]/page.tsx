import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { serviceBySlug, services } from "@/content/services";
import { distances, featuredServices, findSuburb, nearby, suburbAnswer, suburbDescription, suburbFaqs, suburbs, suburbTitle } from "@/lib/suburbs";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SuburbMap } from "@/components/SuburbMap";
import { Breadcrumbs, CtaBand, PageHero, ServiceCard } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check } from "@/components/Icons";

export function generateStaticParams() {
  return suburbs.map((s) => ({ slug: s.region.slug, suburb: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; suburb: string }> }): Promise<Metadata> {
  const { slug, suburb } = await params;
  const s = findSuburb(slug, suburb);
  if (!s) return {};
  return {
    title: suburbTitle(s),
    description: suburbDescription(s),
    alternates: { canonical: `/areas/${s.region.slug}/${s.slug}` },
    openGraph: { title: suburbTitle(s), description: suburbDescription(s) },
  };
}

export default async function SuburbPage({ params }: { params: Promise<{ slug: string; suburb: string }> }) {
  const { slug, suburb } = await params;
  const s = findSuburb(slug, suburb);
  if (!s) notFound();
  const d = distances(s);
  const near = nearby(s, 10);
  const featured = featuredServices(s.region).map((x) => serviceBySlug(x)!).filter(Boolean);
  const faqs = suburbFaqs(s);
  const url = `${site.url}/areas/${s.region.slug}/${s.slug}`;

  return (
    <>
      <PageHero
        eyebrow={`${s.name} · NSW ${s.pc}`}
        title={`Commercial Cleaning in ${s.name}, NSW ${s.pc}`}
        lead={suburbAnswer(s)}
        image={s.region.primary ? "office-city-views" : s.region.home || ["south-west", "st-george"].includes(s.region.slug) ? "pressure-washing-concrete" : "office-open-plan"}
      >
        <a href="#quote" className="btn btn-primary">Get a free quote in {s.name} <Arrow className="h-5 w-5" /></a>
      </PageHero>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Areas", href: "/areas" }, { name: s.region.name, href: `/areas/${s.region.slug}` }, { name: s.name, href: `/areas/${s.region.slug}/${s.slug}` }]} />

      <section className="py-14">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-3xl font-extrabold">Who provides commercial cleaning in {s.name}?</h2>
              <p className="mt-4 text-lg text-muted">
                Triple SR Commercial Cleaning is a Blacktown-based commercial cleaning company that services {s.name} and the wider {s.region.name} region. Our uniformed teams clean {s.region.context}, working to a written checklist and a schedule that suits your premises, including after hours and weekends.
              </p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  ["Suburb", s.name],
                  ["Postcode", s.pc],
                  ["Council area", `${s.lga}`],
                  ["Region", s.region.name],
                  ["From Sydney CBD", `about ${d.cbd} km`],
                  ["From our Blacktown base", `about ${d.base} km`],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-2xl border border-line bg-white p-4"><dt className="text-xs font-bold uppercase tracking-wider text-teal">{k}</dt><dd className="mt-1 font-semibold text-navy">{v}</dd></div>
                ))}
              </dl>
              <p className="mt-2 text-xs text-muted">Distances are straight-line estimates.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-extrabold">What commercial cleaning services are available in {s.name}?</h2>
              <p className="mt-4 text-muted">The most requested services around {s.name}, each with its own checklist, equipment and approach:</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {featured.map((f) => (
                  <li key={f.slug}>
                    <Link href={`/services/${f.slug}`} className="card-lift flex h-full items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 font-bold text-navy">
                      {f.title} in {s.name} <Arrow className="h-4 w-4 shrink-0 text-teal" />
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-muted">We also provide {services.filter((x) => !featured.includes(x)).slice(0, 4).map((x) => x.title.toLowerCase()).join(", ")} and more. <Link href="/services" className="font-bold text-teal underline">See all ten services</Link>.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-extrabold">How much does commercial cleaning cost in {s.name}?</h2>
              <p className="mt-4 text-muted">
                Pricing in {s.name} depends on the floor area, number of restrooms and kitchens, how often you need cleaning, access hours and the type of site. We inspect your premises, then send a clear written quote with no obligation. There are no hidden call-out fees.
              </p>
              <ul className="mt-4 space-y-2">
                {["Free, no-obligation on-site quote", "After-hours and weekend cleaning", "Consistent, uniformed team", "Written checklist for your site"].map((t) => (
                  <li key={t} className="flex items-center gap-3 font-semibold text-navy"><Check className="h-6 w-6 rounded-full bg-green p-1 text-white" /> {t}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-extrabold">Which suburbs near {s.name} do you also service?</h2>
              <p className="mt-4 text-muted">Triple SR also cleans businesses in these nearby suburbs:</p>
              <p className="mt-3 flex flex-wrap gap-2">
                {near.map((n) => (
                  <Link key={`${n.region.slug}-${n.slug}`} href={`/areas/${n.region.slug}/${n.slug}`} className="rounded-full bg-teal-soft px-3 py-1.5 text-sm font-semibold text-navy hover:bg-teal hover:text-white">{n.name}</Link>
                ))}
              </p>
              <p className="mt-4 text-sm text-muted">More in <Link href={`/areas/${s.region.slug}`} className="font-bold text-teal underline">{s.region.name}</Link> · <Link href="/areas" className="font-bold text-teal underline">All service areas</Link></p>
            </Reveal>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <SuburbMap s={s} />
            <div id="quote"><QuoteForm defaultSuburb={s.name} id={`quote-${s.region.slug}-${s.slug}`} compact /></div>
          </aside>
        </div>
      </section>

      <section className="bg-soft py-14">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold">Popular services for {s.name} businesses</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{featured.slice(0, 3).map((f, i) => <ServiceCard key={f.slug} s={f} i={i} />)}</div>
        </div>
      </section>

      <ReviewsSection id={`reviews-${s.slug}`} />
      <Faq items={faqs} title={`Commercial cleaning in ${s.name}: common questions`} />
      <CtaBand title={`Need a commercial cleaner in ${s.name}?`} text={`Get a free, no-obligation quote for ${s.name}. We reply within one business day.`} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Commercial cleaning in ${s.name}`,
          serviceType: "Commercial cleaning",
          url,
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "Place", name: s.name, address: { "@type": "PostalAddress", addressLocality: s.name, postalCode: s.pc, addressRegion: "NSW", addressCountry: "AU" }, geo: { "@type": "GeoCoordinates", latitude: s.lat, longitude: s.lon } },
        }}
      />
    </>
  );
}
