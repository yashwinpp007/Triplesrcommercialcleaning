import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPostDate, postBySlug, posts } from "@/content/posts";
import { serviceBySlug } from "@/content/services";
import { site } from "@/config/site";
import { img } from "@/lib/images";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PostBody } from "@/components/PostBody";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Breadcrumbs, CtaBand } from "@/components/Sections";
import { Reveal } from "@/components/Reveal";
import { Arrow, Calendar, Clock } from "@/components/Icons";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  const im = img(p.hero);
  return {
    title: p.metaTitle,
    description: p.description,
    keywords: p.keywords,
    authors: [{ name: site.name }],
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title: p.metaTitle, description: p.description, publishedTime: p.date, modifiedTime: p.date, authors: [site.name], images: [{ url: im.src, width: im.width, height: im.height, alt: im.alt }] },
    twitter: { card: "summary_large_image", title: p.metaTitle, description: p.description },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const im = img(p.hero);
  const toc = p.body.filter((b) => b.t === "h2");
  const related = p.related.map((s) => serviceBySlug(s)!).filter(Boolean);
  const url = `${site.url}/blog/${p.slug}`;

  return (
    <>
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: p.title, href: `/blog/${p.slug}` }]} />
      <article>
        <header className="container-x max-w-4xl pb-8 pt-6 sm:pt-10">
          <Link href="/blog" className="rounded-full bg-teal-soft px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal">{p.category}</Link>
          <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.1] sm:text-5xl">{p.title}</h1>
          <p className="mt-5 text-xl text-muted">{p.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span className="flex items-center gap-2"><span aria-hidden className="grid h-8 w-8 place-items-center rounded-full bg-navy text-xs font-bold text-white">SR</span> By {site.name}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-teal" /> <time dateTime={p.date}>{formatPostDate(p.date)}</time></span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4 text-teal" /> {p.readMinutes} min read</span>
          </div>
        </header>
        <div className="container-x max-w-5xl">
          <div className="relative aspect-[16/8] overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
            <Image src={im.src} alt={im.alt} fill priority sizes="(max-width: 1024px) 94vw, 1000px" className="object-cover object-[50%_40%]" />
          </div>
        </div>

        <div className="container-x grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="min-w-0 max-w-3xl">
            <nav aria-label="Table of contents" className="mb-8 rounded-3xl border border-line bg-soft p-6">
              <p className="eyebrow">In this guide</p>
              <ol className="mt-3 space-y-1.5">
                {toc.map((b, i) => b.t === "h2" && (
                  <li key={b.id}><a href={`#${b.id}`} className="font-semibold text-navy hover:text-teal hover:underline">{i + 1}. {b.text}</a></li>
                ))}
              </ol>
            </nav>
            <PostBody blocks={p.body} />

            <div className="mt-12 rounded-3xl bg-navy p-7 text-white">
              <p className="font-display text-2xl font-extrabold !text-white">Want us to take care of it?</p>
              <p className="mt-2 text-white/85">Get a free, no-obligation quote for your Sydney office. We reply within one business day.</p>
              <Link href="/get-a-quote?service=regular-office-cleaning" className="btn btn-primary mt-5">Get a Free Quote <Arrow className="h-5 w-5" /></Link>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl font-extrabold">Related services</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}><Link href={`/services/${r.slug}`} className="card-lift flex h-full items-center justify-between gap-2 rounded-2xl border border-line bg-white p-4 font-bold text-navy">{r.title} <Arrow className="h-4 w-4 shrink-0 text-teal" /></Link></li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal><QuoteForm id="quote-blog" defaultService={p.related[0]} compact /></Reveal>
          </aside>
        </div>
      </article>

      <ReviewsSection id="reviews-post" prioritize={[1, 2]} />
      <Faq items={p.faqs} title="Questions about this guide" />
      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          headline: p.title,
          description: p.description,
          image: [`${site.url}${im.src}`],
          datePublished: p.date,
          dateModified: p.date,
          keywords: p.keywords.join(", "),
          inLanguage: "en-AU",
          articleSection: p.category,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/logo-horizontal.png` } },
        }}
      />
    </>
  );
}
