import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/config/site";
import type { LandingPageContent } from "@/content/landing-pages";
import { BeforeAfter } from "@/components/BeforeAfter";
import { Calendar, Check, Clock, Phone, Shield, Sparkles, Star, Users } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { reviews } from "@/components/Reviews";
import { LpReviewCard } from "./LpReviewCard";
import { LpQuoteForm } from "./LpQuoteForm";
import { LpLink } from "./LpTrackedLink";
import { DrawLine, HeroSlides, ParallaxImage, PhotoRows, ScrollProgress, Stagger, StaggerItem } from "./Motion";

const wa = (msg: string) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
const groupIcons = [Sparkles, Shield, Users, Calendar];
const tint = "bg-[color-mix(in_srgb,var(--a)_7%,white)]";
const gradient = "bg-gradient-to-br from-[var(--a)] to-[var(--b)]";

function Heading({ id, eyebrow, children }: { id?: string; eyebrow?: string; children: React.ReactNode }) {
  return (
    <Reveal className="max-w-3xl">
      {eyebrow && <p className="inline-flex items-center gap-2 text-[.8rem] font-extrabold uppercase tracking-[.14em] text-[var(--a)]"><span className="h-1 w-8 rounded-full bg-gradient-to-r from-[var(--a)] to-[var(--b)]" />{eyebrow}</p>}
      <h2 id={id} className="mt-2 text-3xl font-extrabold sm:text-4xl">{children}</h2>
    </Reveal>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-2.5 text-ink">
          <Check className={`mt-0.5 h-5 w-5 shrink-0 rounded-full p-1 text-white ${gradient}`} /> <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function QuoteCta({ page, label, where }: { page: LandingPageContent; label?: string; where: string }) {
  return (
    <Reveal className="mt-8 flex flex-wrap gap-3">
      <LpLink href="#quote" event="lp_cta_click" page={page.slug} location={where} className="btn btn-primary">{label ?? page.hero.cta}</LpLink>
      <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location={where} className="btn btn-outline"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</LpLink>
    </Reveal>
  );
}

function HeroTitle({ text, highlight }: { text: string; highlight: string }) {
  const at = text.indexOf(highlight);
  if (!highlight || at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className="lp-shimmer">{highlight}</span>
      {text.slice(at + highlight.length)}
    </>
  );
}

export function LandingPage({ page }: { page: LandingPageContent }) {
  const picked = page.reviews.ids.map((id) => reviews.find((r) => r.id === id)).filter((r): r is NonNullable<typeof r> => !!r);
  const theme = { "--a": page.accent.a, "--b": page.accent.b } as CSSProperties;

  return (
    <div className="pb-24 lg:pb-0" style={theme}>
      <ScrollProgress />

      {/* 1. Top bar: logo (not a link), phone, CTA */}
      <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-3">
          <Image src="/logo-horizontal.png" alt={page.brandName} width={220} height={56} priority className="h-9 w-auto sm:h-11" />
          <div className="flex items-center gap-2 sm:gap-3">
            <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="top_bar" className="hidden items-center gap-2 font-bold text-navy sm:inline-flex">
              <Phone className="h-5 w-5 text-[var(--a)]" /> {site.phoneDisplay}
            </LpLink>
            <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="top_bar" className="btn btn-primary min-h-11 px-4 py-2 text-sm sm:text-base">{page.hero.cta}</LpLink>
          </div>
        </div>
      </header>

      {/* 2. Hero + form */}
      <section className="relative overflow-hidden py-10 sm:py-14" aria-labelledby="lp-h1">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--a)_14%,white)] via-white to-[color-mix(in_srgb,var(--b)_14%,white)]" />
        <div aria-hidden className="lp-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--a)]/20 blur-3xl" />
        <div aria-hidden className="lp-blob absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[var(--b)]/25 blur-3xl [animation-delay:-6s]" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[.8rem] font-extrabold uppercase tracking-[.12em] text-[var(--a)] shadow-sm ring-1 ring-line">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--b)]" /> {page.brandName}
            </p>
            <h1 id="lp-h1" className="mt-4 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-6xl"><HeroTitle text={page.hero.h1} highlight={page.hero.highlight} /></h1>
            <p className="mt-4 max-w-xl text-lg text-muted">{page.hero.sub}</p>
            <ul className="mt-6 space-y-2.5">
              {page.hero.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 font-semibold text-navy">
                  <Check className={`mt-0.5 h-6 w-6 shrink-0 rounded-full p-1 text-white ${gradient}`} /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="hero" className="btn btn-outline"><Phone className="h-5 w-5" /> Or call {site.phoneDisplay}</LpLink>
              {page.whatsapp && <LpLink external href={wa(page.whatsapp)} event="whatsapp_click" page={page.slug} location="hero" className="btn btn-outline">WhatsApp us</LpLink>}
            </div>
            <div className="mt-8"><HeroSlides slugs={page.visuals.slides} /></div>
          </div>
          <div id="quote" className="scroll-mt-24 lg:sticky lg:top-24">
            <div className="rounded-[2.2rem] bg-gradient-to-br from-[var(--a)] to-[var(--b)] p-1 shadow-2xl">
              <LpQuoteForm page={page} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Trust strip */}
      <section aria-label="Why trust us" className="relative z-10 -mt-1 bg-navy py-5 text-white">
        <Stagger as="ul" gap={0.1} className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-bold">
          {page.trust.map((t, i) => (
            <StaggerItem as="li" key={t} className="flex items-center gap-2">
              {i === 0 ? <Star className="h-5 w-5 text-amber-400" /> : t.includes("hours") ? <Clock className="h-5 w-5 text-[var(--b)] brightness-150" /> : <Shield className="h-5 w-5 text-white/80" />}
              {i === 0 ? <a href={site.googleProfile} target="_blank" rel="noopener noreferrer" className="underline decoration-white/40 underline-offset-4 hover:decoration-white">{t}</a> : t}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 4. Problem, with a parallax photo */}
      <section className="py-14 sm:py-20" aria-labelledby="lp-problem">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Heading id="lp-problem">{page.problem.h2}</Heading>
            <div className="mt-5 space-y-4 text-lg text-muted">
              {page.problem.paras.map((p, i) => <Reveal key={p} delay={i * 0.08}><p>{p}</p></Reveal>)}
            </div>
          </div>
          <Reveal><ParallaxImage slug={page.visuals.side} className="aspect-[4/5] max-h-[34rem] w-full" /></Reveal>
        </div>
      </section>

      {/* 5. What's included */}
      <section id="included" className={`scroll-mt-20 ${tint} py-14 sm:py-20`} aria-labelledby="lp-included">
        <div className="container-x">
          <Heading id="lp-included" eyebrow="Scope">{page.included.h2}</Heading>
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2">
            {page.included.groups.map((g, gi) => {
              const Icon = groupIcons[gi % groupIcons.length];
              return (
                <StaggerItem key={g.title} className="card-lift overflow-hidden rounded-3xl border border-line bg-white">
                  <div className={`h-1.5 ${gradient}`} />
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-lg ${gradient}`}><Icon className="h-6 w-6" /></span>
                      <h3 className="text-xl font-extrabold">{g.title}</h3>
                    </div>
                    <div className="mt-4"><Ticks items={g.items} /></div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          {page.included.extras && (
            <Reveal className="mt-5 rounded-3xl border border-[var(--a)]/30 bg-white p-6">
              <h3 className="text-lg font-extrabold text-[var(--a)]">{page.included.extras.title}</h3>
              <p className="mt-2 text-ink">{page.included.extras.items.join(" · ")}</p>
            </Reveal>
          )}
          {page.included.note && <p className="mt-5 max-w-3xl text-sm text-muted">{page.included.note}</p>}
          <QuoteCta page={page} where="included" />
        </div>
      </section>

      {/* Photo rows */}
      <section className="overflow-hidden bg-white py-14 sm:py-16" aria-labelledby="lp-photos">
        <div className="container-x">
          <Heading id="lp-photos" eyebrow="Our work">Our team at work</Heading>
          <p className="mt-2 text-sm text-muted">{page.visuals.rowsCaption}</p>
        </div>
        <div className="mt-8"><PhotoRows rows={page.visuals.rows} label="Photos of our cleaning team at work" /></div>
      </section>

      {/* Frequency / plans table */}
      {page.table && (
        <section id={page.table.id} className={`scroll-mt-20 ${tint} py-14 sm:py-20`} aria-labelledby="lp-table">
          <div className="container-x">
            <Heading id="lp-table">{page.table.h2}</Heading>
            <Reveal className="mt-8 overflow-x-auto rounded-3xl border border-line bg-white shadow-lg">
              <table className="w-full min-w-[34rem] text-left">
                <thead className={`${gradient} text-white`}>
                  <tr>{page.table.headers.map((h) => <th key={h} scope="col" className="px-5 py-3.5 font-bold">{h}</th>)}</tr>
                </thead>
                <tbody>
                  {page.table.rows.map((r) => (
                    <tr key={r[0]} className="border-t border-line transition-colors hover:bg-[color-mix(in_srgb,var(--a)_6%,white)]">
                      {r.map((c, i) => <td key={i} className={`px-5 py-4 ${i === 0 ? "font-extrabold text-[var(--a)]" : "text-ink"}`}>{c}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
            {page.table.footnote && <p className="mt-3 text-sm text-muted">{page.table.footnote}</p>}
            {page.table.list && (
              <Reveal className="mt-8 max-w-2xl">
                <h3 className="text-xl font-extrabold">{page.table.listTitle}</h3>
                <div className="mt-3"><Ticks items={page.table.list} /></div>
              </Reveal>
            )}
            <QuoteCta page={page} where="table" />
          </div>
        </section>
      )}

      {/* 6. How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="lp-steps">
        <div className="container-x">
          <Heading id="lp-steps" eyebrow="How it works">{page.steps.h2}</Heading>
          <div className="relative mt-10">
            <DrawLine />
            <Stagger as="ol" gap={0.14} className="relative z-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.steps.items.map((s, i) => (
                <StaggerItem as="li" key={s.title} className="card-lift rounded-3xl border border-line bg-white p-6 shadow-sm">
                  <span className={`grid h-12 w-12 place-items-center rounded-full text-lg font-extrabold text-white shadow-lg ring-4 ring-white ${gradient}`}>{i + 1}</span>
                  <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <QuoteCta page={page} where="steps" />
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className={`scroll-mt-20 ${tint} py-14 sm:py-20`} aria-labelledby="lp-reviews">
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
          <Stagger className="mt-8 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
            {picked.map((r) => <StaggerItem key={r.id}><LpReviewCard r={r} /></StaggerItem>)}
          </Stagger>
          {page.reviews.note && <p className="mt-4 text-sm text-muted">{page.reviews.note}</p>}
        </div>
      </section>

      {/* Before / after (end of lease) */}
      {page.beforeAfter && (
        <section className="py-14 sm:py-20" aria-labelledby="lp-ba">
          <div className="container-x text-center">
            <Heading id="lp-ba">See the difference</Heading>
            <Reveal className="mt-8"><BeforeAfter before={page.beforeAfter.before} after={page.beforeAfter.after} label="Tiled floor" /></Reveal>
            <p className="mt-4 text-sm text-muted">{page.beforeAfter.caption}</p>
          </div>
        </section>
      )}

      {/* Why us */}
      {page.why && (
        <section className="py-14 sm:py-20" aria-labelledby="lp-why">
          <div className="container-x">
            <Heading id="lp-why">{page.why.h2}</Heading>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.why.items.map((w, i) => {
                const Icon = groupIcons[i % groupIcons.length];
                return (
                  <StaggerItem key={w.title} className="card-lift rounded-3xl border border-line bg-white p-6">
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${gradient}`}><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 text-lg font-extrabold">{w.title}</h3>
                    <p className="mt-2 text-muted">{w.body}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* Pricing explainer (end of lease) */}
      {page.pricing && (
        <section className={`${tint} py-14 sm:py-20`} aria-labelledby="lp-pricing">
          <div className="container-x max-w-3xl">
            <Heading id="lp-pricing">{page.pricing.h2}</Heading>
            <Reveal><p className="mt-4 text-lg text-muted">{page.pricing.intro}</p></Reveal>
            <Reveal className="mt-4"><Ticks items={page.pricing.items} /></Reveal>
            <Reveal><p className="mt-4 text-lg text-muted">{page.pricing.outro}</p></Reveal>
            <QuoteCta page={page} where="pricing" />
          </div>
        </section>
      )}

      {/* Documents (strata) */}
      {page.documents && (
        <section id={page.documents.id} className={`scroll-mt-20 ${tint} py-14 sm:py-20`} aria-labelledby="lp-docs">
          <div className="container-x max-w-3xl">
            <Heading id="lp-docs">{page.documents.h2}</Heading>
            <Reveal className="mt-6"><Ticks items={page.documents.items} /></Reveal>
            <QuoteCta page={page} where="documents" />
          </div>
        </section>
      )}

      {/* FAQ: native <details>, answers stay in the HTML */}
      <section className="py-14 sm:py-20" aria-labelledby="lp-faq">
        <div className="container-x max-w-4xl">
          <Heading id="lp-faq" eyebrow="FAQ">Questions people ask before booking</Heading>
          <Stagger gap={0.05} className="mt-8 space-y-3">
            {page.faqs.map((f) => (
              <StaggerItem key={f.q}>
                <details className="group rounded-2xl border border-line bg-white p-5 transition-shadow hover:shadow-md open:border-[var(--a)] open:shadow-lg sm:p-6">
                  <summary className="flex items-center justify-between gap-4 font-bold text-navy">
                    <h3 className="text-base font-bold sm:text-lg">{f.q}</h3>
                    <span aria-hidden className="faq-chevron shrink-0 text-[var(--a)] transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      </section>

      {/* Areas */}
      <section className={`${tint} py-12`} aria-labelledby="lp-areas">
        <div className="container-x">
          <Heading id="lp-areas">{page.areas.h2}</Heading>
          <Reveal><p className="mt-3 max-w-4xl text-muted">{page.areas.text}</p></Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy py-20 text-white" aria-labelledby="lp-final">
        <div aria-hidden className="lp-blob absolute -left-16 top-0 h-80 w-80 rounded-full bg-[var(--a)]/50 blur-3xl" />
        <div aria-hidden className="lp-blob absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-[var(--b)]/45 blur-3xl [animation-delay:-7s]" />
        <div className="container-x relative text-center">
          <Reveal>
            <h2 id="lp-final" className="mx-auto max-w-3xl text-3xl font-extrabold !text-white sm:text-5xl">{page.finalCta.h2}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85">{page.finalCta.body}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="final" className="btn btn-primary lp-pulse">{page.hero.cta}</LpLink>
              <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="final" className="btn btn-ghost"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</LpLink>
            </div>
            <p className="mt-4 text-sm text-white/75">{page.finalCta.reassurance}</p>
          </Reveal>
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
