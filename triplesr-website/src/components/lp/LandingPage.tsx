import Image from "next/image";
import { site } from "@/config/site";
import type { LandingPageContent } from "@/content/landing-pages";
import { img } from "@/lib/images";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Check, Clock, Phone, Shield, Star } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { reviews } from "@/components/Reviews";
import { LpReviewCard } from "./LpReviewCard";
import { LpQuoteForm } from "./LpQuoteForm";
import { LpLink } from "./LpTrackedLink";

const wa = (msg: string) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;

function Heading({ id, eyebrow, children }: { id?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="mt-2 text-3xl font-extrabold sm:text-4xl">{children}</h2>
    </div>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-ink">
          <Check className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-green p-1 text-white" /> <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function QuoteCta({ page, label, where }: { page: LandingPageContent; label?: string; where: string }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <LpLink href="#quote" event="lp_cta_click" page={page.slug} location={where} className="btn btn-primary">{label ?? page.hero.cta}</LpLink>
      <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location={where} className="btn btn-outline"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</LpLink>
    </div>
  );
}

export function LandingPage({ page }: { page: LandingPageContent }) {
  const hero = img(page.hero.image);
  const picked = page.reviews.ids.map((id) => reviews.find((r) => r.id === id)).filter((r): r is NonNullable<typeof r> => !!r);

  return (
    <div className="pb-24 lg:pb-0">
      {/* 1. Top bar: logo (not a link), phone, CTA */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-3">
          <Image src="/logo-horizontal.png" alt={page.brandName} width={220} height={56} priority className="h-9 w-auto sm:h-11" />
          <div className="flex items-center gap-2 sm:gap-3">
            <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="top_bar" className="hidden items-center gap-2 font-bold text-navy sm:inline-flex">
              <Phone className="h-5 w-5 text-teal" /> {site.phoneDisplay}
            </LpLink>
            <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="top_bar" className="btn btn-primary min-h-11 px-4 py-2 text-sm sm:text-base">{page.hero.cta}</LpLink>
          </div>
        </div>
      </header>

      {/* 2. Hero + form */}
      <section className="relative overflow-hidden bg-gradient-to-b from-soft to-white py-10 sm:py-14" aria-labelledby="lp-h1">
        <div className="container-x grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="eyebrow">{page.brandName}</p>
            <h1 id="lp-h1" className="mt-2 text-4xl font-extrabold leading-tight sm:text-5xl">{page.hero.h1}</h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{page.hero.sub}</p>
            <div className="mt-6"><Ticks items={page.hero.bullets} /></div>
            <div className="mt-6 flex flex-wrap gap-3">
              <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="hero" className="btn btn-outline"><Phone className="h-5 w-5" /> Or call {site.phoneDisplay}</LpLink>
              {page.whatsapp && <LpLink external href={wa(page.whatsapp)} event="whatsapp_click" page={page.slug} location="hero" className="btn btn-outline">WhatsApp us</LpLink>}
            </div>
            <div className="relative mt-8 hidden aspect-[16/10] overflow-hidden rounded-3xl shadow-xl lg:block">
              <Image src={hero.src} alt={hero.alt} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div id="quote" className="scroll-mt-24 lg:sticky lg:top-24">
            <LpQuoteForm page={page} />
          </div>
        </div>
      </section>

      {/* 3. Trust strip */}
      <section aria-label="Why trust us" className="border-y border-line bg-white py-5">
        <ul className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold text-navy">
          {page.trust.map((t, i) => (
            <li key={t} className="flex items-center gap-2">
              {i === 0 ? <Star className="h-5 w-5 text-amber-400" /> : t.includes("hours") ? <Clock className="h-5 w-5 text-teal" /> : <Shield className="h-5 w-5 text-teal" />}
              {i === 0 ? <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:text-teal">{t}</a> : t}
            </li>
          ))}
        </ul>
      </section>

      {/* 4. Problem */}
      <section className="py-14 sm:py-16" aria-labelledby="lp-problem">
        <div className="container-x">
          <Heading id="lp-problem">{page.problem.h2}</Heading>
          <div className="mt-5 max-w-3xl space-y-4 text-lg text-muted">
            {page.problem.paras.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* 5. What's included */}
      <section id="included" className="scroll-mt-20 bg-soft py-14 sm:py-16" aria-labelledby="lp-included">
        <div className="container-x">
          <Heading id="lp-included" eyebrow="Scope">{page.included.h2}</Heading>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {page.included.groups.map((g) => (
              <div key={g.title} className="rounded-3xl border border-line bg-white p-6">
                <h3 className="text-xl font-extrabold">{g.title}</h3>
                <div className="mt-3"><Ticks items={g.items} /></div>
              </div>
            ))}
          </div>
          {page.included.extras && (
            <div className="mt-5 rounded-3xl border border-teal/30 bg-teal-soft p-6">
              <h3 className="text-lg font-extrabold">{page.included.extras.title}</h3>
              <p className="mt-2 text-ink">{page.included.extras.items.join(" · ")}</p>
            </div>
          )}
          {page.included.note && <p className="mt-5 max-w-3xl text-sm text-muted">{page.included.note}</p>}
          <QuoteCta page={page} where="included" />
        </div>
      </section>

      {/* Frequency / plans table */}
      {page.table && (
        <section id={page.table.id} className="scroll-mt-20 py-14 sm:py-16" aria-labelledby="lp-table">
          <div className="container-x">
            <Heading id="lp-table">{page.table.h2}</Heading>
            <div className="mt-8 overflow-x-auto rounded-3xl border border-line">
              <table className="w-full min-w-[34rem] text-left">
                <thead className="bg-navy text-white">
                  <tr>{page.table.headers.map((h) => <th key={h} scope="col" className="px-5 py-3 font-bold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {page.table.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-line odd:bg-white even:bg-soft">
                      {r.map((c, i) => <td key={i} className={`px-5 py-4 ${i === 0 ? "font-extrabold text-navy" : "text-ink"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {page.table.footnote && <p className="mt-3 text-sm text-muted">{page.table.footnote}</p>}
            {page.table.list && (
              <div className="mt-8 max-w-2xl">
                <h3 className="text-xl font-extrabold">{page.table.listTitle}</h3>
                <div className="mt-3"><Ticks items={page.table.list} /></div>
              </div>
            )}
            <QuoteCta page={page} where="table" />
          </div>
        </section>
      )}

      {/* 6. How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-soft py-14 sm:py-16" aria-labelledby="lp-steps">
        <div className="container-x">
          <Heading id="lp-steps" eyebrow="How it works">{page.steps.h2}</Heading>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.steps.items.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line bg-white p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-extrabold text-white">{i + 1}</span>
                <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <QuoteCta page={page} where="steps" />
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="scroll-mt-20 py-14 sm:py-16" aria-labelledby="lp-reviews">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Heading id="lp-reviews" eyebrow="Google reviews">{page.reviews.h2}</Heading>
              <p className="mt-2 flex items-center gap-2 text-muted">
                <span className="font-display text-xl font-extrabold text-navy">{site.googleRating.value}</span>
                out of 5 from {site.googleRating.count} Google reviews
              </p>
            </div>
            <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="btn btn-outline">Read all on Google</a>
          </div>
          <div className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {picked.map((r) => <LpReviewCard key={r.id} r={r} />)}
          </div>
          {page.reviews.note && <p className="mt-4 text-sm text-muted">{page.reviews.note}</p>}
        </div>
      </section>

      {/* Gallery (strata) */}
      {page.gallery && (
        <section className="pb-14 sm:pb-16" aria-label={page.gallery.caption}>
          <div className="container-x grid gap-4 sm:grid-cols-3">
            {page.gallery.slugs.map((s) => {
              const i = img(s);
              return (
                <figure key={s} className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                  <Image src={i.src} alt={i.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </figure>
              );
            })}
          </div>
          <p className="container-x mt-3 text-sm text-muted">{page.gallery.caption}</p>
        </section>
      )}

      {/* Before / after (end of lease) */}
      {page.beforeAfter && (
        <section className="bg-soft py-14 sm:py-16" aria-labelledby="lp-ba">
          <div className="container-x text-center">
            <Heading id="lp-ba">See the difference</Heading>
            <div className="mt-8"><BeforeAfter before={page.beforeAfter.before} after={page.beforeAfter.after} label="Tiled floor" /></div>
            <p className="mt-4 text-sm text-muted">{page.beforeAfter.caption}</p>
          </div>
        </section>
      )}

      {/* Why us */}
      {page.why && (
        <section className="py-14 sm:py-16" aria-labelledby="lp-why">
          <div className="container-x">
            <Heading id="lp-why">{page.why.h2}</Heading>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.why.items.map((w) => (
                <div key={w.title} className="rounded-3xl border border-line bg-white p-6">
                  <h3 className="text-lg font-extrabold">{w.title}</h3>
                  <p className="mt-2 text-muted">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing explainer (end of lease) */}
      {page.pricing && (
        <section className="py-14 sm:py-16" aria-labelledby="lp-pricing">
          <div className="container-x max-w-3xl">
            <Heading id="lp-pricing">{page.pricing.h2}</Heading>
            <p className="mt-4 text-lg text-muted">{page.pricing.intro}</p>
            <div className="mt-4"><Ticks items={page.pricing.items} /></div>
            <p className="mt-4 text-lg text-muted">{page.pricing.outro}</p>
            <QuoteCta page={page} where="pricing" />
          </div>
        </section>
      )}

      {/* Documents (strata) */}
      {page.documents && (
        <section id={page.documents.id} className="scroll-mt-20 bg-soft py-14 sm:py-16" aria-labelledby="lp-docs">
          <div className="container-x max-w-3xl">
            <Heading id="lp-docs">{page.documents.h2}</Heading>
            <div className="mt-6"><Ticks items={page.documents.items} /></div>
            <QuoteCta page={page} where="documents" />
          </div>
        </section>
      )}

      {/* FAQ: native <details>, answers stay in the HTML */}
      <section className="py-14 sm:py-16" aria-labelledby="lp-faq">
        <div className="container-x max-w-4xl">
          <Heading id="lp-faq" eyebrow="FAQ">Questions people ask before booking</Heading>
          <div className="mt-8 space-y-3">
            {page.faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-line bg-white p-5 open:border-teal open:shadow-lg sm:p-6">
                <summary className="flex items-center justify-between gap-4 font-bold text-navy">
                  <h3 className="text-base font-bold sm:text-lg">{f.q}</h3>
                  <span aria-hidden className="faq-chevron shrink-0 text-teal transition-transform">▾</span>
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      </section>

      {/* Areas */}
      <section className="bg-soft py-12" aria-labelledby="lp-areas">
        <div className="container-x">
          <Heading id="lp-areas">{page.areas.h2}</Heading>
          <p className="mt-3 max-w-4xl text-muted">{page.areas.text}</p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy py-16 text-white" aria-labelledby="lp-final">
        <div className="container-x text-center">
          <h2 id="lp-final" className="mx-auto max-w-3xl text-3xl font-extrabold !text-white sm:text-4xl">{page.finalCta.h2}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85">{page.finalCta.body}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="final" className="btn btn-primary">{page.hero.cta}</LpLink>
            <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="final" className="btn btn-ghost"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</LpLink>
          </div>
          <p className="mt-4 text-sm text-white/75">{page.finalCta.reassurance}</p>
        </div>
      </section>

      {/* Minimal footer: required legal links only */}
      <footer className="border-t border-line py-6 text-center text-sm text-muted">
        <p>© {new Date().getFullYear()} {page.brandName}. {site.address.text}.</p>
        <p className="mt-1">
          <a href="/privacy-policy" className="underline">Privacy Policy</a> · <a href="/terms" className="underline">Terms</a>
        </p>
      </footer>

      {/* Sticky mobile action bar */}
      <div className="glass fixed inset-x-0 bottom-0 z-40 flex gap-3 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
        <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="mobile_bar" className="btn btn-outline min-h-12 flex-1"><Phone className="h-5 w-5" /> Call</LpLink>
        {page.whatsapp && <LpLink external href={wa(page.whatsapp)} event="whatsapp_click" page={page.slug} location="mobile_bar" className="btn btn-outline min-h-12 flex-1">WhatsApp</LpLink>}
        <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="mobile_bar" className="btn btn-primary min-h-12 flex-1">Get Quote</LpLink>
      </div>
    </div>
  );
}
