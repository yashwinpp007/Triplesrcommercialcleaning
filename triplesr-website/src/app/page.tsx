import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { homeFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { BeforeAfter } from "@/components/BeforeAfter";
import { SydneyMap } from "@/components/SydneyMap";
import { CountUp } from "@/components/CountUp";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { regions } from "@/content/areas";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CtaBand, Photo, SectionHead } from "@/components/Sections";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { Reveal } from "@/components/Reveal";
import { Arrow, Calendar, Check, Clock, Shield, Sparkles, Users } from "@/components/Icons";
import { HeroSlideshow } from "@/components/HeroSlideshow";

export const metadata: Metadata = {
  title: "Commercial Cleaning Sydney CBD & Greater Sydney | Triple SR Commercial Cleaning",
  description: "Commercial cleaning across Sydney CBD and Greater Sydney: offices, schools, childcare, aged care, warehouses, industrial and windows. Free on-site quotes. Call 0427 724 809.",
  alternates: { canonical: "/" },
};

const why = [
  { icon: Check, t: "Consistent cleaning standards", d: "A written, site-specific checklist so every visit meets the same standard." },
  { icon: Users, t: "Uniformed, regular teams", d: "The same Triple SR team on your site, who learn your space and your standards." },
  { icon: Calendar, t: "Flexible cleaning schedules", d: "Daily, weekly or one-off cleans, with evening, early-morning and weekend options." },
  { icon: Sparkles, t: "Tailored cleaning solutions", d: "Scope, products and equipment matched to your site, from offices to factories." },
  { icon: Shield, t: "Inspections and follow-up", d: "We inspect early cleans closely and put any issue right quickly." },
  { icon: Clock, t: "Responsive customer support", d: "One phone number, one email and a reply to every enquiry within one business day." },
];

const stats = [
  { to: site.googleRating.value, decimals: 1, label: "Google rating", sub: `from ${site.googleRating.count} reviews` },
  { to: site.googleRating.count, decimals: 0, label: "Google reviews", sub: "read word for word" },
  { to: 10, decimals: 0, label: "Specialist services", sub: "offices to factories" },
  { to: regions.length, decimals: 0, label: "Sydney regions", sub: "CBD to Western Sydney" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <HeroSlideshow />

      {/* STATS */}
      <section aria-label="At a glance" className="border-b border-line bg-white">
        <dl className="container-x grid grid-cols-2 gap-y-6 py-7 lg:grid-cols-4">
          {stats.map((st, i) => (
            <Reveal key={st.label} delay={i * 0.07} className={`px-2 sm:px-6 ${i > 0 ? "lg:border-l lg:border-line" : ""}`}>
              <dt className="sr-only">{st.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-extrabold text-navy sm:text-5xl"><CountUp to={st.to} decimals={st.decimals} /></span>
                <span className="mt-1 block font-bold text-navy">{st.label}</span>
                <span className="block text-sm text-muted">{st.sub}</span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* SERVICES */}
      <section className="relative overflow-hidden bg-soft py-16 sm:py-20" aria-labelledby="services-heading">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-green-bright/10 blur-3xl" />
        <div className="container-x relative">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow">Our services</p>
              <h2 id="services-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">Cleaning for every kind of commercial space</h2>
            </div>
            <p className="max-w-sm text-muted">Ten specialist services, each with its own checklist, equipment and approach.</p>
          </Reveal>
          <div className="mt-8"><ServicesShowcase /></div>
        </div>
      </section>

      {/* WHY */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal className="grid grid-cols-2 gap-4">
            <Photo slug="team-kitchen-mopping" className="aspect-[3/4]" sizes="(max-width: 1024px) 45vw, 25vw" />
            <Photo slug="team-office-vacuuming" className="mt-8 aspect-[3/4]" sizes="(max-width: 1024px) 45vw, 25vw" />
          </Reveal>
          <div>
            <SectionHead eyebrow="The Triple SR difference" title="The difference is in the details" text="We keep it simple: show up on time, follow the checklist, communicate clearly." />
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {why.map((w, i) => (
                <Reveal key={w.t} delay={i * 0.05}>
                  <div className="flex gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal-soft text-teal"><w.icon className="h-6 w-6" /></span>
                    <div><h3 className="text-lg font-bold">{w.t}</h3><p className="mt-1 text-sm text-muted">{w.d}</p></div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-navy py-20 text-white">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow !text-green-bright">How it works</p>
            <h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl">Simple, seamless, reliable</h2>
            <p className="mt-3 text-lg text-white/80">From enquiry to a spotless site in four steps.</p>
          </Reveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <BeforeAfter before="tile-floor-before" after="tile-floor-after" label="Tiled entry floor" className="max-w-lg" />
          </Reveal>
          <div>
            <SectionHead eyebrow="Results that speak for themselves" title="Real results from real jobs" text="These are photos from our own work. Drag the handle to compare." />
            <div className="mt-6 rounded-3xl border border-line bg-white p-6 shadow-sm">
              <p className="eyebrow">The job</p>
              <h3 className="mt-1 text-xl font-extrabold">Tiled entry floor restoration</h3>
              <p className="mt-2 text-muted">Dull, marked tiles and grout cleaned back to an even, polished finish, taken in the same spot before and after our clean.</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                <span className="rounded-full bg-navy px-3 py-1 text-white">BEFORE</span>
                <span className="rounded-full bg-green px-3 py-1 text-white">AFTER</span>
              </div>
            </div>
            <Link href="/gallery" className="btn btn-outline mt-8">View the full gallery <Arrow className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* SERVICE AREAS */}
      <section className="py-20" aria-labelledby="map-heading">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Our service areas</p>
            <h2 id="map-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">Proudly servicing businesses across Sydney</h2>
            <p className="mt-3 text-lg text-muted">Based in Blacktown, with the Sydney CBD as our focus. Explore the map or check your suburb.</p>
          </Reveal>
          <Reveal>
            <SydneyMap />
          </Reveal>
        </div>
      </section>

      <Faq items={homeFaqs} />

      {/* QUOTE */}
      <section className="bg-soft py-20" id="quote">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Free quote</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Let's talk about your site</h2>
            <p className="mt-3 text-lg text-muted">Three quick steps. We'll get back to you within one business day with next steps for a free on-site inspection.</p>
            <ul className="mt-6 space-y-3">
              {["Free, no-obligation quote", "After-hours and weekend cleaning available", "Consistent, uniformed team"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold text-navy"><Check className="h-6 w-6 rounded-full bg-green p-1 text-white" /> {t}</li>
              ))}
            </ul>
            <Photo slug="team-backpack-vacuum-mask" className="mt-8 hidden aspect-[16/10] lg:block" sizes="40vw" />
          </Reveal>
          <QuoteForm id="home-quote" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
