import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBar } from "@/components/MobileBar";
import { ConsentBanner } from "@/components/ConsentBanner";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/config/site";
import { regions } from "@/content/areas";
import { services } from "@/content/services";

const display = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["600", "700", "800"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Commercial Cleaning Sydney CBD & Greater Sydney | Triple SR Commercial Cleaning", template: "%s" },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "./" },
  openGraph: { type: "website", locale: "en_AU", siteName: site.name, url: site.url, title: site.name, description: site.description, images: [{ url: "/images/office-city-views.webp", width: 1800, height: 1200, alt: "Clean open-plan office with city skyline views" }] },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#0b2a5b", width: "device-width", initialScale: 1 };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Reading request headers makes pages dynamic so Next can attach the per-request CSP nonce to its scripts.
  await headers();

  const orgLd = {
    "@context": "https://schema.org",
    "@type": ["CleaningService", "LocalBusiness"],
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    image: `${site.url}/images/office-city-views.webp`,
    logo: `${site.url}/logo-horizontal.png`,
    telephone: site.phoneTel,
    email: site.email,
    priceRange: "$$",
    address: { "@type": "PostalAddress", addressLocality: site.address.locality, addressRegion: site.address.region, addressCountry: "AU" },
    areaServed: [{ "@type": "City", name: "Sydney" }, ...regions.map((r) => ({ "@type": "Place", name: r.name }))],
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
    ],
    sameAs: [site.social.instagram, site.social.facebook, site.googleProfile],
    hasOfferCatalog: { "@type": "OfferCatalog", name: "Commercial cleaning services", itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}/services/${s.slug}` } })) },
  };

  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={orgLd} />
        <Header />
        <main id="main" className="flex-1 pt-20">{children}</main>
        <Footer />
        <MobileBar />
        <ConsentBanner />
      </body>
    </html>
  );
}
