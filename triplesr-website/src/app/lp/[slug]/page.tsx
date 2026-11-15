import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { landingPages, lpBySlug, lpPath, lpTopLevel } from "@/content/landing-pages";
import { LandingPage } from "@/components/lp/LandingPage";

// Google Ads landing pages. Most are noindex and out of the sitemap (paid traffic only); lpTopLevel pages are indexable.
export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = lpBySlug((await params).slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: lpPath(page.slug) },
    // Top-level pages (e.g. commercial end of lease) are indexable and in the sitemap; other ad pages stay noindex.
    robots: lpTopLevel.has(page.slug) ? { index: true, follow: true } : { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = lpBySlug((await params).slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
