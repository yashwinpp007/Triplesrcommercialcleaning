import type { Metadata } from "next";
import { site } from "@/config/site";
import { privacyFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Sections";

export const metadata: Metadata = { title: "Privacy Policy | Triple SR Commercial Cleaning", description: "How Triple SR Commercial Cleaning collects, uses and protects your personal information under the Australian Privacy Act 1988.", alternates: { canonical: "/privacy-policy" } };

export default function Privacy() {
  const h = "mt-8 text-2xl font-extrabold";
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy-policy" }]} />
      <article className="container-x max-w-3xl py-12 text-muted [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
        <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
        <p>This policy explains how {site.name} (&ldquo;we&rdquo;) handles personal information in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. Draft for review by a legal adviser before launch.</p>
        <h2 className={h}>What we collect</h2>
        <p>When you request a quote or contact us we collect your name, phone, email, business name, suburb, site details and any message you write. We also receive basic technical data (such as pages visited) only if you allow analytics.</p>
        <h2 className={h}>How we use it</h2>
        <p>To reply to your enquiry, prepare quotes, deliver services, and keep business records. We do not sell your information.</p>
        <h2 className={h}>Who we share it with</h2>
        <p>Service providers that help us run the website and email (for example, Formspree, which receives your quote request on our behalf, our email delivery provider and our hosting provider), and bot-protection services. They may process data on our behalf. Some providers may store data outside Australia.</p>
        <h2 className={h}>Cookies and analytics</h2>
        <p>We use essential cookies only by default. Analytics or marketing tags load only if you choose to allow them in the cookie banner.</p>
        <h2 className={h}>Storage and retention</h2>
        <p>Enquiries are stored securely and deleted after a reasonable period (we aim for 24 months) unless you become a customer. IP addresses used for abuse prevention are hashed and not stored in raw form.</p>
        <h2 className={h}>Marketing</h2>
        <p>We only send marketing emails with your consent, and every message will include how to unsubscribe (Spam Act 2003).</p>
        <h2 className={h}>Access, correction and complaints</h2>
        <p>You can ask to access, correct or delete your information by emailing <a className="font-bold text-teal underline" href={`mailto:${site.email}`}>{site.email}</a>. If you have a privacy complaint, contact us first; you may also contact the Office of the Australian Information Commissioner (oaic.gov.au).</p>
        <h2 className={h}>Data breaches</h2>
        <p>If a breach is likely to cause serious harm, we will notify affected people and the OAIC as required by the Notifiable Data Breaches scheme.</p>
        <h2 className={h}>Contact</h2>
        <p>{site.name}, {site.address.text}. Phone {site.phoneDisplay}.</p>
      </article>
      <Faq items={privacyFaqs} />
    </>
  );
}
