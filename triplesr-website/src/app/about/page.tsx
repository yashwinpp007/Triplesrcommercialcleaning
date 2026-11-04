import type { Metadata } from "next";
import { aboutFaqs } from "@/lib/faqs";
import { site } from "@/config/site";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, PageHero, Photo, SectionHead } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Check } from "@/components/Icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "About Triple SR Commercial Cleaning | Blacktown, Sydney",
  description: "Triple SR Commercial Cleaning is a Blacktown-based cleaning company servicing Sydney CBD and Greater Sydney with uniformed, consistent teams.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero eyebrow="About us" title="Sydney commercial cleaners who turn up and get it done" lead="Triple SR Commercial Cleaning is based in Blacktown and cleans commercial sites across Greater Sydney, with the CBD as a primary focus." image="team-kitchen-mopping-2" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About", href: "/about" }]} />
      <section className="py-16">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHead eyebrow="Our promise" title="Reliable, thorough and easy to deal with" />
            <p className="mt-5 text-lg text-muted">We believe good commercial cleaning is simple: a clear scope, a consistent team, honest communication and a finish you can see. Whether it's a CBD office, a school or a warehouse, we write the checklist with you and clean to it.</p>
            <ul className="mt-6 space-y-3">
              {["Uniformed teams you'll come to recognise", "A written, site-specific checklist", "After-hours and weekend flexibility", "One number to call, and a prompt reply"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold text-navy"><Check className="h-6 w-6 rounded-full bg-green p-1 text-white" /> {t}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            <Photo slug="team-office-vacuuming" className="aspect-[3/4]" sizes="(max-width: 1024px) 45vw, 25vw" />
            <Photo slug="stairs-mopping-2" className="mt-8 aspect-[3/4]" sizes="(max-width: 1024px) 45vw, 25vw" />
          </Reveal>
        </div>
      </section>
      <section className="bg-soft py-16">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[["Local roots", `Based in ${site.address.locality}, NSW, close to Western Sydney's industrial heartland and a short drive to the CBD.`], ["Sector range", "From offices and schools to aged care, warehouses and factories, with a tailored approach for each."], ["Straight talk", "Clear quotes, honest advice and a quick response if something needs fixing."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.08}><div className="h-full rounded-3xl border border-line bg-white p-6"><h3 className="text-xl font-extrabold">{t}</h3><p className="mt-2 text-muted">{d}</p></div></Reveal>
          ))}
        </div>
      </section>
      <ReviewsSection />
      <Faq items={aboutFaqs} />
      <CtaBand />
    </>
  );
}
