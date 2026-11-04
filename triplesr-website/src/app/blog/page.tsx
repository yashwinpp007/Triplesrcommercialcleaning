import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts, formatPostDate } from "@/content/posts";
import { blogFaqs } from "@/lib/faqs";
import { img } from "@/lib/images";
import { Faq } from "@/components/Faq";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Breadcrumbs, CtaBand, PageHero } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Arrow } from "@/components/Icons";
import { site } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Commercial Cleaning Blog Sydney | Tips & Checklists | Triple SR",
  description: "Practical commercial cleaning guides for Sydney businesses: checklists, preparation tips, cost factors and how to choose a cleaner. From Triple SR Commercial Cleaning.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  const sorted = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return (
    <>
      <PageHero eyebrow="Blog" title="Commercial cleaning advice for Sydney businesses" lead="Checklists, how-tos and honest guidance from the Triple SR team." image="office-lounge-city" />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]} />
      <section className="py-14">
        <div className="container-x">
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p, i) => {
              const im = img(p.hero);
              return (
                <Reveal as="li" key={p.slug} delay={i * 0.07}>
                  <Link href={`/blog/${p.slug}`} className="card-lift group block h-full overflow-hidden rounded-3xl border border-line bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image src={im.src} alt={im.alt} fill sizes="(max-width: 768px) 92vw, (max-width: 1024px) 45vw, 30vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy shadow">{p.category}</span>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-muted"><time dateTime={p.date}>{formatPostDate(p.date)}</time> · {p.readMinutes} min read</p>
                      <h2 className="mt-2 text-xl font-extrabold leading-snug">{p.title}</h2>
                      <p className="mt-2 text-muted">{p.excerpt}</p>
                      <span className="mt-4 inline-flex items-center gap-2 font-bold text-teal">Read the guide <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
      <ReviewsSection id="reviews-blog" />
      <Faq items={blogFaqs} />
      <CtaBand />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: `${site.name} Blog`, url: `${site.url}/blog`, publisher: { "@id": `${site.url}/#business` }, blogPost: sorted.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })) }} />
    </>
  );
}
