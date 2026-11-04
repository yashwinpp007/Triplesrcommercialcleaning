import Link from "next/link";
import type { Faq as FaqT } from "@/content/services";
import { site } from "@/config/site";
import { Chevron } from "./Icons";
import { JsonLd } from "./JsonLd";
import { Reveal } from "./Reveal";

// Server-rendered <details>: answers are in the HTML even when collapsed, and FAQPage JSON-LD mirrors the visible text.
export function Faq({ items, title = "Frequently asked questions" }: { items: FaqT[]; title?: string }) {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="faq-heading">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-heading" className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-3 text-muted">Still have a question? Call <a className="font-bold text-teal" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a> or <Link className="font-bold text-teal underline" href="/get-a-quote">get a free quote</Link>.</p>
        </Reveal>
        <div className="space-y-3">
          {items.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-2xl border border-line bg-white p-5 open:border-teal open:shadow-lg">
                <summary className="flex items-center justify-between gap-4 text-left font-bold text-navy">
                  <h3 className="text-base font-bold sm:text-lg">{f.q}</h3>
                  <Chevron className="faq-chevron h-5 w-5 shrink-0 text-teal transition-transform" />
                </summary>
                <p className="mt-3 text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
