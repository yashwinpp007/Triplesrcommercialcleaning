import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { landingPages, lpBySlug } from "@/content/landing-pages";
import { LandingPage } from "@/components/lp/LandingPage";

// Google Ads landing pages. Kept out of search results (noindex) and out of the sitemap: they exist for paid traffic.
export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const page = lpBySlug((await params).slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/lp/${page.slug}` },
    robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const page = lpBySlug((await params).slug);
  if (!page) notFound();
  return <LandingPage page={page} />;
}
