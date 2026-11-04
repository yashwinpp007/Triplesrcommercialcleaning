import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceBySlug, services } from "@/content/services";
import { site } from "@/config/site";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, CtaBand, SectionHead, ServiceCard } from "@/components/Sections";
import { ReviewsSection } from "@/components/ReviewsSection";
import { PhotoSlideshow } from "@/components/PhotoSlideshow";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { Arrow, Check, Phone } from "@/components/Icons";
import Image from "next/image";
import { img } from "@/lib/images";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = serviceBySlug((await params).slug);
  if (!s) return {};
  const i = img(s.hero);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, images: [{ url: i.src, width: i.width, height: i.height, alt: i.alt }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const s = serviceBySlug((await params).slug);
  if (!s) notFound();
  const hero = img(s.hero);
  const related = s.related.map((r) => services.find((x) => x.slug === r)!).filter(Boolean);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        {/* Soft blurred backdrop of the same photo; the sharp photo is the framed card on the right */}
        <Image src={hero.src} alt="" fill priority sizes="100vw" className="-z-20 scale-110 object-cover opacity-30 blur-2xl" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/80 to-navy/40" />
        <div className="container-x grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow !text-green-bright">{s.group}</p>
            <h1 className="mt-3 text-4xl font-extrabold !text-white sm:text-5xl">{s.h1}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/90">{s.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote" className="btn btn-primary">Get a Free Quote <Arrow className="h-5 w-5" /></a>
              <a href={`tel:${site.phoneTel}`} className="btn btn-ghost"><Phone className="h-5 w-5" /> {site.phoneDisplay}</a>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/25 bg-navy-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] ring-1 ring-white/10">
              <Image src={hero.src} alt={hero.alt} fill priority sizes="(max-width: 1024px) 92vw, 45vw" className="object-cover object-[50%_35%]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy/55 to-transparent" />
            </div>
            <span className="absolute -bottom-4 left-5 rounded-2xl border border-white/25 bg-white/15 px-4 py-2.5 text-sm font-bold text-white shadow-2xl backdrop-blur-md">
              {s.title} <span className="font-medium text-white/80">· Triple SR</span>
            </span>
          </Reveal>
        </div>
      </section>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.title, href: `/services/${s.slug}` }]} />

      <section className="py-14">
        <div className="container-x grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-3xl font-extrabold">What's included</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {s.included.map((t) => (
                  <li key={t} className="flex gap-3 rounded-2xl border border-line bg-white p-4"><Check className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-green p-1 text-white" /><span>{t}</span></li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted"><span className="font-bold text-navy">Optional extras:</span> {s.extras.join(" · ")}.</p>
            </Reveal>

            <Reveal>
              <h2 className="text-3xl font-extrabold">Who this is for</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {s.forWho.map((t) => <li key={t} className="flex gap-2 text-muted"><Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" /> {t}</li>)}
              </ul>
              <p className="mt-4 rounded-2xl bg-teal-soft p-4 text-navy"><span className="font-bold">How often?</span> {s.frequency}</p>
            </Reveal>

            <div>
              <Reveal><h2 className="text-3xl font-extrabold">Our approach</h2></Reveal>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {s.approach.map((a, i) => (
                  <Reveal key={a.title} delay={i * 0.08}>
                    <div className="h-full rounded-3xl border border-line bg-white p-5">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display font-extrabold text-white">{i + 1}</span>
                      <h3 className="mt-3 text-lg font-bold">{a.title}</h3>
                      <p className="mt-1 text-sm text-muted">{a.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start" id="quote">
            <QuoteForm defaultService={s.slug} id={`quote-${s.slug}`} compact />
          </aside>
        </div>
      </section>

      <section className="bg-soft py-16">
        <div className="container-x">
          <SectionHead eyebrow="From our jobs" title={`${s.title} in action`} />
          <div className="mt-8">
            <PhotoSlideshow slugs={s.gallery.slice(0, 4)} label={`${s.title} in action`} />
            <p className="mt-3 text-sm text-muted">Tap a photo to view the slideshow.</p>
          </div>
          {s.video && (
            <Reveal className="mt-8 max-w-sm">
              <video className="aspect-[9/16] w-full rounded-3xl bg-navy object-cover shadow-xl" controls preload="none" playsInline muted poster={s.video.poster} aria-label={`${s.title} at work`}>
                <source src={s.video.src} type="video/mp4" />
              </video>
            </Reveal>
          )}
        </div>
      </section>

      <ReviewsSection prioritize={s.reviewIds} />

      {s.compare && (
        <section className="container-x pb-4">
          <p className="rounded-3xl border border-line bg-white p-5 text-navy"><Link className="font-bold text-teal underline" href={s.compare.to}>{s.compare.text}</Link></p>
        </section>
      )}

      <Faq items={s.faqs} title={`${s.title}: common questions`} />

      <section className="bg-soft py-16">
        <div className="container-x">
          <SectionHead eyebrow="Related services" title="You might also need" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">{related.map((r, i) => <ServiceCard key={r.slug} s={r} i={i} />)}</div>
          <p className="mt-8 text-muted">Servicing all of Sydney. <Link href="/areas/sydney-cbd" className="font-bold text-teal underline">Sydney CBD cleaning</Link> · <Link href="/areas" className="font-bold text-teal underline">All areas</Link></p>
        </div>
      </section>
      <CtaBand />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: s.title, serviceType: s.title, description: s.metaDescription, url: `${site.url}/services/${s.slug}`, provider: { "@id": `${site.url}/#business` }, areaServed: { "@type": "City", name: "Sydney" } }} />
    </>
  );
}
