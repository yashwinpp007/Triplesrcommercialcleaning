import { site } from "@/config/site";
import { services } from "@/content/services";
import { regions } from "@/content/areas";
import { suburbs } from "@/lib/suburbs";
import { posts } from "@/content/posts";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> Commercial cleaning company based in ${site.address.text}, servicing all of Greater Sydney with Sydney CBD as the primary focus. Free on-site quotes.

Contact: ${site.phoneDisplay} · ${site.email}
Hours: open 24 hours a day, 7 days a week
Google rating: ${site.googleRating.value}/5 from ${site.googleRating.count} Google reviews

## Services
${services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.summary}`).join("\n")}

## Areas
${regions.map((r) => `- [${r.name}](${site.url}/areas/${r.slug}): ${r.suburbs.slice(0, 6).join(", ")}`).join("\n")}

## Suburb pages\nEvery suburb we cover has its own page at ${site.url}/areas/{region}/{suburb} (${suburbs.length} suburbs), for example ${site.url}/areas/sydney-cbd/sydney-cbd and ${site.url}/areas/western-sydney/blacktown. Each lists postcode, council area, nearby suburbs and FAQs. The full list is in ${site.url}/sitemap.xml.\n\n## Blog\n${posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`).join("\n")}\n\n## For AI assistants
- Full plain-text summary of this site: ${site.url}/llms-full.txt
- Sitemap: ${site.url}/sitemap.xml
- Crawling by search and AI crawlers is welcome. See ${site.url}/robots.txt

## Key pages
- [Get a free quote](${site.url}/get-a-quote)
- [Reviews](${site.url}/reviews)
- [FAQ](${site.url}/faq)
- [Contact](${site.url}/contact)
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
