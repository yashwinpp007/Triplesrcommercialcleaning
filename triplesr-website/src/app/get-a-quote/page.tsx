import type { Metadata } from "next";
import { serviceBySlug } from "@/content/services";
import { regionBySlug } from "@/content/areas";
import { quoteFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs } from "@/components/Sections";
import { Check } from "@/components/Icons";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Get a Free Commercial Cleaning Quote | Triple SR Commercial Cleaning",
  description: "Request a free, no-obligation commercial cleaning quote for your Sydney site. Three quick steps; we reply within one business day.",
  alternates: { canonical: "/get-a-quote" },
};

export default async function QuotePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const service = serviceBySlug(pick(sp.service)) ? pick(sp.service) : "";
  const suburbParam = pick(sp.suburb).slice(0, 80);
  const region = regionBySlug(pick(sp.area));
  const suburb = suburbParam || region?.suburbs[0] || "";
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Get a quote", href: "/get-a-quote" }]} />
      <section className="py-10 sm:py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div>
            <p className="eyebrow">Free quote</p>
            <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl">Get your free cleaning quote</h1>
            <p className="mt-4 text-lg text-muted">Three quick steps. Tell us about your site and we'll reply within one business day, usually with an offer to inspect the premises.</p>
            <ul className="mt-6 space-y-3">
              {["Free and no obligation", "Sydney CBD and Greater Sydney", "Written, itemised quote", "After-hours cleaning available"].map((t) => (
                <li key={t} className="flex items-center gap-3 font-semibold text-navy"><Check className="h-6 w-6 rounded-full bg-green p-1 text-white" /> {t}</li>
              ))}
            </ul>
          </div>
          <QuoteForm id="quote-page" defaultService={service} defaultSuburb={suburb} key={`${service}-${suburb}`} />
        </div>
      </section>
      <ReviewsSection />
      <Faq items={quoteFaqs} />
    </>
  );
}
