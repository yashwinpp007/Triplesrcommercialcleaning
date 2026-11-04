import type { Metadata } from "next";
import { site } from "@/config/site";
import { contactFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, PageHero } from "@/components/Sections";
import { OpenBadge } from "@/components/OpenBadge";
import { Reveal } from "@/components/Reveal";
import { Clock, Facebook, Instagram, Mail, Phone, Pin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact Triple SR Commercial Cleaning | Blacktown, Sydney",
  description: "Call 0427 724 809 or send a quote request. Triple SR Commercial Cleaning, Blacktown NSW, servicing Sydney CBD and Greater Sydney.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your cleaning" lead="Call, email or send the form. We reply within one business day." image="team-kitchen-mopping" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]} />
      <section className="py-14">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-6">
            <ul className="space-y-4">
              <li className="flex gap-4"><Phone className="h-12 w-12 shrink-0 rounded-2xl bg-teal-soft p-3 text-teal" /><div><p className="font-bold text-navy">Phone</p><a className="text-lg font-semibold text-teal" href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a></div></li>
              <li className="flex gap-4"><Mail className="h-12 w-12 shrink-0 rounded-2xl bg-teal-soft p-3 text-teal" /><div><p className="font-bold text-navy">Email</p><a className="break-all font-semibold text-teal" href={`mailto:${site.email}`}>{site.email}</a></div></li>
              <li className="flex gap-4"><Pin className="h-12 w-12 shrink-0 rounded-2xl bg-teal-soft p-3 text-teal" /><div><p className="font-bold text-navy">Based in</p><p>{site.address.text}</p><p className="text-sm text-muted">Servicing Sydney CBD and Greater Sydney.</p></div></li>
              <li className="flex gap-4"><Clock className="h-12 w-12 shrink-0 rounded-2xl bg-teal-soft p-3 text-teal" />
                <div className="flex-1"><p className="font-bold text-navy">Opening hours</p>
                  <dl className="mt-1 space-y-1 text-sm">{site.hoursText.map((h) => <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd className="font-semibold">{h.time}</dd></div>)}</dl>
                  <div className="mt-2"><OpenBadge /></div></div></li>
            </ul>
            <div className="flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="btn btn-outline px-5"><Instagram className="h-5 w-5" /> Instagram</a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="btn btn-outline px-5"><Facebook className="h-5 w-5" /> Facebook</a>
            </div>
            <a href="https://www.google.com/maps/search/?api=1&query=Blacktown+NSW" target="_blank" rel="noopener noreferrer" className="block rounded-3xl border border-line bg-soft p-5 font-bold text-teal hover:border-teal">Open Blacktown in Google Maps →</a>
          </Reveal>
          <QuoteForm id="contact-quote" />
        </div>
      </section>
      <Faq items={contactFaqs} />
    </>
  );
}
