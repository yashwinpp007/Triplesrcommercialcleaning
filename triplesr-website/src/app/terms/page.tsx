import type { Metadata } from "next";
import { site } from "@/config/site";
import { termsFaqs } from "@/lib/faqs";
import { Faq } from "@/components/Faq";
import { Breadcrumbs } from "@/components/Sections";

export const metadata: Metadata = { title: "Terms of Use | Triple SR Commercial Cleaning", description: "Terms of use for the Triple SR Commercial Cleaning website and quote requests.", alternates: { canonical: "/terms" } };

export default function Terms() {
  const h = "mt-8 text-2xl font-extrabold";
  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }]} />
      <article className="container-x max-w-3xl py-12 text-muted [&_p]:mt-3">
        <h1 className="text-4xl font-extrabold">Terms of Use</h1>
        <p>These terms apply to your use of this website. Draft for review by a legal adviser before launch.</p>
        <h2 className={h}>Information on this site</h2>
        <p>We aim to keep information accurate, but it is general in nature. Service scope and pricing are confirmed only in a written quote.</p>
        <h2 className={h}>Quotes</h2>
        <p>Quotes are based on the scope inspected or described and are valid for the period stated on the quote. Changes to scope may change the price and will be agreed in writing first.</p>
        <h2 className={h}>Reviews and third-party content</h2>
        <p>Customer reviews are reproduced from Google. Google and other third-party names belong to their owners.</p>
        <h2 className={h}>Acceptable use</h2>
        <p>Do not misuse the website, submit false or abusive enquiries, or attempt to disrupt or gain unauthorised access to it.</p>
        <h2 className={h}>Liability</h2>
        <p>To the extent permitted by Australian Consumer Law, we are not liable for loss arising from use of this website. Nothing here limits your rights under the Australian Consumer Law.</p>
        <h2 className={h}>Contact</h2>
        <p>{site.name}, {site.address.text}. Email {site.email}. Phone {site.phoneDisplay}.</p>
      </article>
      <Faq items={termsFaqs} />
    </>
  );
}
