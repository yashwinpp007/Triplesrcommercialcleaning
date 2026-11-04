import type { Metadata } from "next";
import { serviceGroups, services } from "@/content/services";
import { servicesFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, PageHero, SectionHead, ServiceCard } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Commercial Cleaning Services Sydney | Triple SR Commercial Cleaning",
  description: "Office, end of lease, aged care, hospital, warehouse, industrial, factory, school, childcare and window cleaning across Sydney. Free quotes.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Our services" title="Commercial cleaning services across Sydney" lead="Ten specialist services for offices, care facilities, schools and industrial sites. Pick your sector, or call us and we'll point you to the right scope." image="office-open-plan" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <section className="py-14">
        <div className="container-x space-y-16">
          {serviceGroups.map((g) => (
            <div key={g}>
              <SectionHead eyebrow="Sector" title={g} />
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.filter((s) => s.group === g).map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="guide" className="bg-soft py-16">
        <div className="container-x">
          <SectionHead eyebrow="Which service do I need?" title="Quick guide to similar services" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Aged care vs hospital", "Aged care is about a comfortable, hygienic living environment. Hospital cleaning follows clinical zone protocols.", "/services/health-aged-care-cleaning"],
              ["Childcare vs school", "Childcare centres need frequent hygiene routines. Schools have more rooms, halls and larger campuses.", "/services/education-childcare-cleaning"],
              ["Warehouse, industrial or factory", "Warehouses focus on floors and amenities, industrial on heavy soiling, and factories on production areas.", "/services/warehouse-cleaning"],
            ].map(([t, d, h], i) => (
              <Reveal key={t} delay={i * 0.07}>
                <a href={h} className="card-lift block h-full rounded-3xl border border-line bg-white p-6">
                  <h3 className="text-xl font-extrabold">{t}</h3><p className="mt-2 text-muted">{d}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Faq items={servicesFaqs} />
      <CtaBand />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/services/${s.slug}`, name: s.title })) }} />
    </>
  );
}
