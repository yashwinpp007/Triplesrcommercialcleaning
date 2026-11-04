import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { img } from "@/lib/images";
import { homeFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { QuickQuote } from "@/components/QuickQuote";
import { BeforeAfter } from "@/components/BeforeAfter";
import { SydneyMap } from "@/components/SydneyMap";
import { RatingSummary } from "@/components/Reviews";
import { ReviewsSection } from "@/components/ReviewsSection";
import { CtaBand, Photo, SectionHead } from "@/components/Sections";
import { ServicesShowcase } from "@/components/ServicesShowcase";
import { Reveal } from "@/components/Reveal";
import { Arrow, Calendar, Check, Clock, Phone, Shield, Sparkles, Users } from "@/components/Icons";
import { OpenBadge } from "@/components/OpenBadge";

export const metadata: Metadata = {
  title: "Commercial Cleaning Sydney CBD & Greater Sydney | Triple SR Commercial Cleaning",
  description: "Commercial cleaning across Sydney CBD and Greater Sydney: offices, schools, childcare, aged care, warehouses, industrial and windows. Free on-site quotes. Call 0427 724 809.",
  alternates: { canonical: "/" },
};

const why = [
  { icon: Users, t: "Uniformed, consistent teams", d: "The same Triple SR team on your site, in uniform, who learn your space and your standards." },
  { icon: Calendar, t: "Flexible, after-hours schedules", d: "Daily, weekly or one-off cleans, with evening, early-morning and weekend options." },
  { icon: Shield, t: "Free on-site quotes", d: "We inspect your premises and send a clear written quote with no obligation." },
  { icon: Sparkles, t: "Checklists, not guesswork", d: "A site-specific checklist so everyone knows exactly what's cleaned and how often." },
  { icon: Clock, t: "Quick to respond", d: "One phone number, one email and a reply to every enquiry within one business day." },
  { icon: Check, t: "Rated 4.6 on Google", d: "Customer reviews on our Google profile, with the real text shown on this site." },
];

const steps = [
  ["Request a quote", "Send the form or call us. It takes about a minute."],
  ["Free site inspection", "We look at your space, access and needs."],
  ["Tailored plan and price", "A clear written scope, schedule and quote."],
  ["We clean, you relax", "A consistent team delivers to your checklist."],
];

export default function Home() {
  const hero = img("office-city-views");
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <Image src={hero.src} alt="" fill priority fetchPriority="high" sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/35" />
        <div aria-hidden className="sparkle absolute right-[18%] top-24 -z-10 hidden h-6 w-6 text-white lg:block"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12 7-1 11-5 12-12Z" /></svg></div>
        <div className="container-x grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:py-24">
          <div>
            <Reveal>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur">Sydney CBD &amp; Greater Sydney</span>
                <OpenBadge tone="dark" />
              </div>
              <h1 className="text-4xl font-extrabold leading-[1.05] !text-white sm:text-5xl lg:text-6xl">
                Commercial cleaning across Sydney, <span className="bg-gradient-to-r from-green-bright to-[#7fe0d4] bg-clip-text text-transparent">done properly.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/90">
                Offices, schools, childcare, aged care, warehouses and industrial sites. Uniformed teams, flexible after-hours schedules and free on-site quotes, with the Sydney CBD as our primary focus.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/get-a-quote" className="btn btn-primary">Get a Free Quote <Arrow className="h-5 w-5" /></Link>
                <a href={`tel:${site.phoneTel}`} className="btn btn-ghost"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</a>
              </div>
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
                {["Free on-site quotes", "After-hours cleaning", "Uniformed, consistent teams"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><Check className="h-5 w-5 text-green-bright" /> {t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}><QuickQuote /></Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section aria-label="Trust" className="border-b border-line bg-white">
        <div className="container-x grid gap-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-3"><RatingSummary /></div>
          {[["Local business", "Based in Blacktown, NSW"], ["Free quotes", "On-site, no obligation"], ["Sydney-wide", "CBD to Western Sydney"]].map(([a, b]) => (
            <div key={a} className="flex items-center gap-3 border-l-0 sm:border-l sm:border-line sm:pl-6">
              <Check className="h-8 w-8 rounded-full bg-teal-soft p-1.5 text-teal" />
              <div><p className="font-bold text-navy">{a}</p><p className="text-sm text-muted">{b}</p></div>
            </div>
          ))}
        </div>
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
            <SectionHead eyebrow="Why Triple SR" title="A cleaning partner you can rely on" text="We keep it simple: show up on time, follow the checklist, communicate clearly." />
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
            <h2 className="mt-2 text-3xl font-extrabold !text-white sm:text-4xl">From enquiry to spotless in four steps</h2>
          </Reveal>
          <ol className="relative mt-12 grid gap-6 md:grid-cols-4">
            <div aria-hidden className="absolute left-0 right-0 top-6 hidden h-0.5 bg-gradient-to-r from-green-bright via-teal to-transparent md:block" />
            {steps.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.1} className="relative">
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-green font-display text-lg font-extrabold shadow-lg ring-4 ring-navy">{i + 1}</span>
                <h3 className="mt-4 text-xl font-bold !text-white">{t}</h3>
                <p className="mt-1 text-white/80">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* BEFORE / AFTER + VIDEO */}
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <BeforeAfter before="tile-floor-before" after="tile-floor-after" label="Tiled entry floor" />
            <p className="mt-3 text-center text-sm text-muted">A tiled entry floor from one of our jobs. Drag to compare.</p>
          </Reveal>
          <div>
            <SectionHead eyebrow="See the difference" title="Real results from real jobs" text="Dull, marked floors restored to a clean, even finish. These are photos from our own work." />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Photo slug="stairs-mopping" className="aspect-square" sizes="(max-width: 1024px) 45vw, 22vw" />
              <Photo slug="restroom-vanity" className="aspect-square" sizes="(max-width: 1024px) 45vw, 22vw" />
            </div>
            <Link href="/gallery" className="btn btn-outline mt-8">See the gallery <Arrow className="h-5 w-5" /></Link>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <ReviewsSection />

      {/* MAP */}
      <section className="py-20" aria-labelledby="map-heading">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="eyebrow">Where we work</p>
            <h2 id="map-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">Servicing all of Sydney, with the CBD as our focus</h2>
            <p className="mt-3 text-lg text-muted">Based in Blacktown, we clean commercial sites from Sydney CBD to Western Sydney, the North Shore, Inner West, Eastern Suburbs and beyond.</p>
          </Reveal>
          <SydneyMap />
        </div>
      </section>

      <Faq items={homeFaqs} />

      {/* QUOTE */}
      <section className="bg-soft py-20" id="quote">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow">Free quote</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">Tell us about your site</h2>
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
