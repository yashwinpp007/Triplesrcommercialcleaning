import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { regions } from "@/content/areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/services", "/about", "/areas", "/gallery", "/reviews", "/faq", "/contact", "/get-a-quote", "/privacy-policy", "/terms"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : p === "/get-a-quote" ? 0.9 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    ...regions.map((r) => ({ url: `${site.url}/areas/${r.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: r.primary ? 0.9 : 0.6 })),
  ];
}
