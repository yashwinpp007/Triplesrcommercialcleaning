import Image from "next/image";
import { Fragment, type CSSProperties } from "react";
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
import { FloatingContact } from "../FloatingContact";
import { CountUp } from "@/components/CountUp";
import { img } from "@/lib/images";
import { DrawLine, HeroSlides, ParallaxImage, PhotoRows, ScrollProgress, Stagger, StaggerItem } from "./Motion";
import { grad, palettes } from "./premium-colors";
import { FloatingChips, ServiceIcon, Twinkles, SpotlightCard, Ticker, WordReveal } from "./Premium";
import "./premium.css";

const defaultOrder = ["trust", "problem", "included", "photos", "table", "steps", "reviews", "beforeAfter", "why", "pricing", "documents", "faq", "areas", "final"];
const wa = (msg: string) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(msg)}`;
const groupIcons = [Sparkles, Shield, Users, Calendar];
const tint = "bg-[color-mix(in_srgb,var(--a)_7%,white)]";
const gradient = "bg-gradient-to-br from-[var(--a)] to-[var(--b)]";

function Heading({ id, eyebrow, light, children }: { id?: string; eyebrow?: string; light?: boolean; children: React.ReactNode }) {
  return (
    <Reveal className="max-w-3xl">
      {eyebrow && <p className={`inline-flex items-center gap-2 text-[.8rem] font-extrabold uppercase tracking-[.14em] ${light ? "text-[#5eead4]" : "text-[var(--a)]"}`}><span className="h-1 w-8 rounded-full bg-gradient-to-r from-[var(--a)] to-[var(--b)]" />{eyebrow}</p>}
      <h2 id={id} className={`mt-2 text-3xl font-extrabold sm:text-4xl ${light ? "!text-white" : ""}`}>{children}</h2>
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

  const sections: Record<string, React.ReactNode> = {
    stats: (
      <>
        {page.stats && (
          <section aria-label="At a glance" className="relative overflow-hidden bg-white py-12">
            <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--a)] to-transparent" />
            <Stagger className="container-x grid grid-cols-2 gap-6 lg:grid-cols-4">
              {page.stats.map((st, i) => (
                <StaggerItem key={st.label} className="text-center">
                  <div className="font-display text-5xl font-extrabold sm:text-6xl" style={{ background: grad(i), WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                    <CountUp to={st.to} decimals={st.decimals} suffix={st.suffix} />
                  </div>
                  <p className="mt-1 text-sm font-bold uppercase tracking-wide text-muted">{st.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}
      </>
    ),
    guarantee: (
      <>
        {page.guarantee && (
          <section className="relative overflow-hidden py-14 sm:py-20" aria-labelledby="lp-guarantee">
            <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[#0a7c8c] via-[#2563eb] to-[#7c3aed]" />
            <div aria-hidden className="lp-grid absolute inset-0 opacity-70" />
            <div aria-hidden className="lp-blob absolute -right-16 -top-10 h-72 w-72 rounded-full bg-[#f5b301]/30 blur-3xl" />
            <Twinkles n={12} />
            <div className="container-x relative grid items-center gap-10 lg:grid-cols-[auto_1fr]">
              <Reveal className="mx-auto">
                <div className="lp-bob grid h-40 w-40 place-items-center rounded-full bg-white/15 ring-8 ring-white/20 backdrop-blur sm:h-48 sm:w-48">
                  <Shield className="h-20 w-20 text-white drop-shadow-lg sm:h-24 sm:w-24" />
                </div>
              </Reveal>
              <div>
                <Heading id="lp-guarantee" eyebrow="Peace of mind" light>{page.guarantee.title}</Heading>
                <Reveal><p className="mt-4 max-w-3xl text-lg text-white/90">{page.guarantee.body}</p></Reveal>
                <Stagger as="ul" className="mt-5 space-y-2.5">
                  {page.guarantee.points.map((pt) => (
                    <StaggerItem as="li" key={pt} className="flex items-start gap-3 font-semibold text-white">
                      <Check className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-white/25 p-1 text-white" /> {pt}
                    </StaggerItem>
                  ))}
                </Stagger>
                <p className="mt-5 max-w-3xl text-sm text-white/75">{page.guarantee.note}</p>
                <QuoteCta page={page} where="guarantee" />
              </div>
            </div>
          </section>
        )}
      </>
    ),
    ticker: <>{page.ticker && <Ticker items={page.ticker} />}</>,
    trust: (
      <>
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

      </>
    ),
    problem: (
      <>
      {/* 4. Problem, with a parallax photo */}
      <section className={`relative overflow-hidden py-14 sm:py-20 ${page.premium ? "bg-gradient-to-b from-white via-[color-mix(in_srgb,var(--a)_6%,white)] to-white" : ""}`} aria-labelledby="lp-problem">
        {page.premium && <div aria-hidden className="lp-blob absolute -right-24 top-10 h-72 w-72 rounded-full bg-[var(--b)]/15 blur-3xl" />}
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Heading id="lp-problem">{page.problem.h2}</Heading>
            <div className="mt-5 space-y-4 text-lg text-muted">
              {page.problem.paras.map((p, i) => <Reveal key={p} delay={i * 0.08}><p>{p}</p></Reveal>)}
            </div>
            {page.problem.points && (
              <Stagger as="ul" className="mt-6 space-y-3">
                {page.problem.points.map((pt, pi) => (
                  <StaggerItem as="li" key={pt.title} className="card-lift rounded-2xl border border-line border-l-[6px] bg-white p-4 shadow-sm" >
                    <h3 className="font-extrabold" style={page.premium ? { color: palettes[pi][0] } : undefined}>{pt.title}</h3>
                    <p className="mt-1 text-muted">{pt.body}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>
          <Reveal><ParallaxImage slug={page.visuals.side} className="aspect-[4/5] max-h-[34rem] w-full" /></Reveal>
        </div>
      </section>

      </>
    ),
    included: (
      <>
      {/* 5. What's included */}
      <section id="included" className={`scroll-mt-20 py-14 sm:py-24 ${page.premium ? "relative overflow-hidden bg-[#06182c]" : tint}`} aria-labelledby="lp-included">
        {page.premium && (
          <>
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a0b3d_0%,#06182c_55%,#0b3a4f_100%)]" />
            <div aria-hidden className="lp-grid absolute inset-0" />
            <div aria-hidden className="lp-blob absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-[#06b6d4]/25 blur-3xl" />
            <div aria-hidden className="lp-blob absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-[#db2777]/25 blur-3xl [animation-delay:-5s]" />
            <Twinkles n={14} />
          </>
        )}
        <div className="container-x relative">
          <Heading id="lp-included" eyebrow="Scope" light={page.premium}>{page.included.h2}</Heading>
          {page.included.intro && <Reveal><p className={`mt-4 max-w-3xl text-lg ${page.premium ? "text-white/75" : "text-muted"}`}>{page.included.intro}</p></Reveal>}
          {page.included.cards && page.premium && (
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {page.included.cards.map((c, ci) => (
                <StaggerItem key={c.title}>
                  <SpotlightCard className="h-full overflow-hidden rounded-3xl border border-white/15 bg-white/[.06] p-6 backdrop-blur-md">
                    <div aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-40 blur-2xl" style={{ background: grad(ci) }} />
                    <span className="relative grid h-14 w-14 place-items-center rounded-2xl text-white shadow-xl" style={{ background: grad(ci), boxShadow: `0 12px 30px -8px ${palettes[ci % palettes.length][0]}` }}><ServiceIcon name={c.title} className="h-7 w-7" /></span>
                    <span aria-hidden className="absolute right-5 top-4 font-display text-5xl font-extrabold text-white/10">{String(ci + 1).padStart(2, "0")}</span>
                    <h3 className="relative mt-5 text-lg font-extrabold !text-white">{c.title}</h3>
                    <p className="relative mt-2 text-white/70">{c.body}</p>
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1" style={{ background: grad(ci) }} />
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </Stagger>
          )}
          {page.included.cards && !page.premium && (
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {page.included.cards.map((c, ci) => {
                const Icon = groupIcons[ci % groupIcons.length];
                return (
                  <StaggerItem key={c.title} className="card-lift overflow-hidden rounded-3xl border border-line bg-white">
                    <div className={`h-1.5 ${gradient}`} />
                    <div className="p-5">
                      <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white shadow-lg ${gradient}`}><Icon className="h-6 w-6" /></span>
                      <h3 className="mt-3 text-lg font-extrabold">{c.title}</h3>
                      <p className="mt-1.5 text-muted">{c.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          )}
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2">
            {(page.included.groups ?? []).map((g, gi) => {
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
          {page.included.note && <p className={`mt-6 max-w-3xl text-sm ${page.premium ? "text-white/65" : "text-muted"}`}>{page.included.note}</p>}
          <QuoteCta page={page} where="included" />
        </div>
      </section>

      </>
    ),
    photos: (
      <>
      {/* Photo rows */}
      <section className="overflow-hidden bg-white py-14 sm:py-16" aria-labelledby="lp-photos">
        <div className="container-x">
          <Heading id="lp-photos" eyebrow="Our work">Our team at work</Heading>
          <p className="mt-2 text-sm text-muted">{page.visuals.rowsCaption}</p>
        </div>
        <div className="mt-8"><PhotoRows rows={page.visuals.rows} label="Photos of our cleaning team at work" /></div>
      </section>

      </>
    ),
    properties: (
      <>
        {page.properties && (
          <section id="properties" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="lp-properties">
            <div className="container-x">
              <Heading id="lp-properties" eyebrow="Property types">{page.properties.h2}</Heading>
              <Reveal><p className="mt-4 max-w-3xl text-lg text-muted">{page.properties.intro}</p></Reveal>
              <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {page.properties.items.map((p, pi) => (
                  <StaggerItem key={p.title} className="card-lift overflow-hidden rounded-3xl border border-line bg-white">
                    {page.premium ? (
                      <div className="group relative aspect-[3/4] overflow-hidden">
                        <Image src={img(p.image).src} alt={img(p.image).alt} fill sizes="(min-width: 1024px) 22vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#06182c] via-[#06182c]/40 to-transparent" />
                        <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: grad(pi) }} />
                        <div className="absolute inset-x-0 bottom-0 p-5">
                          <h3 className="text-xl font-extrabold !text-white">{p.title}</h3>
                          <p className="mt-1.5 text-sm text-white/80">{p.body}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <ParallaxImage slug={p.image} className="aspect-[4/3] w-full" />
                        <div className="p-5">
                          <h3 className="text-lg font-extrabold text-[var(--a)]">{p.title}</h3>
                          <p className="mt-1.5 text-muted">{p.body}</p>
                        </div>
                      </>
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
              <QuoteCta page={page} where="properties" />
            </div>
          </section>
        )}
      </>
    ),
    table: (
      <>
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

      </>
    ),
    steps: (
      <>
      {/* 6. How it works */}
      <section id="how-it-works" className="scroll-mt-20 py-14 sm:py-20" aria-labelledby="lp-steps">
        <div className="container-x">
          <Heading id="lp-steps" eyebrow="How it works">{page.steps.h2}</Heading>
          <div className="relative mt-10">
            <DrawLine />
            <Stagger as="ol" gap={0.14} className={`relative z-10 grid gap-4 sm:grid-cols-2 ${page.steps.items.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {page.steps.items.map((s, i) => (
                <StaggerItem as="li" key={s.title} className="card-lift rounded-3xl border border-line bg-white p-6 shadow-sm">
                  <span className={`grid h-12 w-12 place-items-center rounded-full text-lg font-extrabold text-white shadow-lg ring-4 ring-white ${gradient}`} style={page.premium ? { background: grad(i), boxShadow: `0 10px 28px -6px ${palettes[i % palettes.length][0]}` } : undefined}>{i + 1}</span>
                  <h3 className="mt-4 text-lg font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <QuoteCta page={page} where="steps" />
        </div>
      </section>

      </>
    ),
    reviews: (
      <>
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

      </>
    ),
    beforeAfter: (
      <>
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

      </>
    ),
    why: (
      <>
      {/* Why us */}
      {page.why && (
        <section className={`py-14 sm:py-20 ${page.premium ? "bg-gradient-to-b from-white to-[color-mix(in_srgb,var(--b)_8%,white)]" : ""}`} aria-labelledby="lp-why">
          <div className="container-x">
            <Heading id="lp-why">{page.why.h2}</Heading>
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.why.items.map((w, i) => {
                const Icon = groupIcons[i % groupIcons.length];
                return (
                  <StaggerItem key={w.title} className="card-lift relative overflow-hidden rounded-3xl border border-line bg-white p-6">
                    {page.premium && <div aria-hidden className="absolute inset-x-0 top-0 h-1.5" style={{ background: grad(i + 2) }} />}
                    <span className={`grid h-11 w-11 place-items-center rounded-2xl text-white ${gradient}`} style={page.premium ? { background: grad(i + 2) } : undefined}><Icon className="h-6 w-6" /></span>
                    <h3 className="mt-4 text-lg font-extrabold">{w.title}</h3>
                    <p className="mt-2 text-muted">{w.body}</p>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      </>
    ),
    pricing: (
      <>
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

      </>
    ),
    documents: (
      <>
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

      </>
    ),
    faq: (
      <>
      {/* FAQ: native <details>, answers stay in the HTML */}
      <section className="py-14 sm:py-20" aria-labelledby="lp-faq">
        <div className="container-x max-w-4xl">
          <Heading id="lp-faq" eyebrow="FAQ">{page.faqHeading ?? "Questions people ask before booking"}</Heading>
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

      </>
    ),
    areas: (
      <>
      {/* Areas */}
      <section className={`${tint} py-12`} aria-labelledby="lp-areas">
        <div className="container-x">
          <Heading id="lp-areas">{page.areas.h2}</Heading>
          <Reveal><p className="mt-3 max-w-4xl text-muted">{page.areas.text}</p></Reveal>
          {page.areas.chips && (
            <Stagger as="ul" gap={0.05} className="mt-6 flex flex-wrap gap-3">
              {page.areas.chips.map((c, i) => (
                <StaggerItem as="li" key={c}><span className="inline-block rounded-full px-5 py-2.5 font-bold text-white shadow-lg transition-transform hover:-translate-y-1 hover:scale-105" style={{ background: grad(i) }}>{c}</span></StaggerItem>
              ))}
            </Stagger>
          )}
        </div>
      </section>

      </>
    ),
    final: (
      <>
      {/* Final CTA */}
      <section className="relative overflow-hidden bg-navy py-20 text-white" aria-labelledby="lp-final">
        <div aria-hidden className="lp-blob absolute -left-16 top-0 h-80 w-80 rounded-full bg-[var(--a)]/50 blur-3xl" />
        <div aria-hidden className="lp-blob absolute -right-10 bottom-0 h-96 w-96 rounded-full bg-[var(--b)]/45 blur-3xl [animation-delay:-7s]" />
        {page.premium && (
          <>
            <div aria-hidden className="lp-grid absolute inset-0 opacity-60" />
            <div aria-hidden className="lp-orbit absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/15" />
            <div aria-hidden className="lp-orbit absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 [animation-direction:reverse]" />
            <Twinkles n={18} />
          </>
        )}
        <div className="container-x relative text-center">
          <Reveal>
            <h2 id="lp-final" className="mx-auto max-w-3xl text-3xl font-extrabold !text-white sm:text-5xl">{page.finalCta.h2}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg text-white/85">{page.finalCta.body}</p>
            {page.finalCta.bullets && (
              <ul className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold text-white/90">
                {page.finalCta.bullets.map((b) => <li key={b} className="flex items-center gap-2"><Check className="h-4 w-4 text-[var(--b)] brightness-150" /> {b}</li>)}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="final" className="btn btn-primary lp-pulse">{page.hero.cta}</LpLink>
              <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="final" className="btn btn-ghost"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</LpLink>
            </div>
            <p className="mt-4 text-sm text-white/75">{page.finalCta.reassurance}</p>
          </Reveal>
        </div>
      </section>

      </>
    ),
  };
  const order = page.order ?? defaultOrder;

  return (
    <div className={`pb-24 lg:pb-0 ${page.premium ? "lp-premium" : ""}`} style={theme}>
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
      {page.premium ? (
        <section className="relative overflow-hidden bg-[#06182c] py-12 text-white sm:py-16" aria-labelledby="lp-h1">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#0e5a73_0%,#06182c_52%,#1a0b3d_100%)]" />
          <div aria-hidden className="lp-grid absolute inset-0" />
          <div aria-hidden className="lp-blob absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#06b6d4]/35 blur-3xl" />
          <div aria-hidden className="lp-blob absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#7c3aed]/40 blur-3xl [animation-delay:-6s]" />
          <div aria-hidden className="lp-blob absolute left-1/3 top-2/3 h-72 w-72 rounded-full bg-[#22c55e]/25 blur-3xl [animation-delay:-3s]" />
          <div aria-hidden className="lp-blob absolute right-1/4 -top-10 h-56 w-56 rounded-full bg-[#f5b301]/20 blur-3xl [animation-delay:-9s]" />
          <Twinkles n={18} />
          <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[.8rem] font-extrabold uppercase tracking-[.12em] text-[#5eead4] backdrop-blur">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#a3e635]" /> {page.hero.eyebrow ?? page.brandName}
              </p>
              <h1 id="lp-h1" className="mt-4 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl lg:text-6xl"><WordReveal text={page.hero.h1} highlight={page.hero.highlight} /></h1>
              <p className="mt-5 max-w-xl text-lg text-white/80">{page.hero.sub}</p>
              <ul className="mt-6 space-y-2.5">
                {page.hero.bullets.map((b, i) => (
                  <li key={b} className="flex items-start gap-3 font-semibold text-white">
                    <Check className="mt-0.5 h-6 w-6 shrink-0 rounded-full p-1 text-white shadow-lg" style={{ background: grad(i) }} /> {b}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <LpLink href="#quote" event="lp_cta_click" page={page.slug} location="hero" className="btn btn-primary lp-pulse">{page.hero.cta}</LpLink>
                <LpLink href={`tel:${site.phoneTel}`} event="phone_click" page={page.slug} location="hero" className="btn btn-ghost"><Phone className="h-5 w-5" /> Call {site.phoneDisplay}</LpLink>
                {page.whatsapp && <LpLink external href={wa(page.whatsapp)} event="whatsapp_click" page={page.slug} location="hero" className="btn btn-ghost">WhatsApp us</LpLink>}
              </div>
              <div className="relative mt-12">
                <HeroSlides slugs={page.visuals.slides} />
                {page.chips && <FloatingChips items={page.chips} />}
              </div>
            </div>
            <div id="quote" className="scroll-mt-24 lg:sticky lg:top-24">
              <div className="lp-ring">
                <LpQuoteForm page={page} />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
      <section className="relative overflow-hidden py-10 sm:py-14" aria-labelledby="lp-h1">
        <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--a)_14%,white)] via-white to-[color-mix(in_srgb,var(--b)_14%,white)]" />
        <div aria-hidden className="lp-blob absolute -left-24 top-10 h-72 w-72 rounded-full bg-[var(--a)]/20 blur-3xl" />
        <div aria-hidden className="lp-blob absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[var(--b)]/25 blur-3xl [animation-delay:-6s]" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[.8rem] font-extrabold uppercase tracking-[.12em] text-[var(--a)] shadow-sm ring-1 ring-line">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--b)]" /> {page.hero.eyebrow ?? page.brandName}
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

        </>
      )}

      {order.map((k) => <Fragment key={k}>{sections[k]}</Fragment>)}

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

      {/* Floating WhatsApp (left) and call (right) widgets */}
      <FloatingContact message={page.whatsapp ?? undefined} page={page.slug} />
    </div>
  );
}
