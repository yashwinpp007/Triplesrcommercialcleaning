import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/Sections";
import { ReviewsSection } from "@/components/ReviewsSection";

export const metadata: Metadata = {
  title: "Commercial Cleaning FAQ | Triple SR Commercial Cleaning",
  description: "Answers to common questions about commercial cleaning pricing, contracts, products, scheduling and quotes across Sydney.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  { q: "How much does commercial cleaning cost in Sydney?", a: "It depends on floor area, number of restrooms and kitchens, frequency, access hours and the type of site. We give a fixed written quote after an inspection rather than a guess over the phone." },
  { q: "Do I need a long-term contract?", a: "Talk to us about what suits you. Many clients start with a short trial period, and one-off cleans such as end of lease need no ongoing commitment." },
  { q: "What cleaning products do you use?", a: "Professional-grade products suited to each surface and site. Tell us about allergies, odour sensitivities or products your building requires and we'll adapt." },
  { q: "What if I'm not happy with a clean?", a: "Contact us straight away. We'll arrange a return visit to put reasonable issues right, and review the checklist so it doesn't recur." },
  { q: "Can you start quickly?", a: "Often, yes. Availability varies by area and size, so send your request or call and we'll tell you the earliest start." },
  { q: "Do you clean public holidays and weekends?", a: "Weekend cleans are available, and public-holiday work can be arranged by agreement. Our office hours are Monday to Friday 9am–5pm and Saturday 10am–6pm." },
  { q: "How do I pay?", a: "Payment terms are set out in your quote. Ask us during the quote if you need particular invoicing arrangements." },
];

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Commercial cleaning questions, answered" lead="Pricing, contracts, products and getting started. Page-specific questions are on each service and area page." image="office-glass-partitions" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "FAQ", href: "/faq" }]} />
      <ReviewsSection />
      <Faq items={faqs} title="General questions" />
      <CtaBand />
    </>
  );
}
