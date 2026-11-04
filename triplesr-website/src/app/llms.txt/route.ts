import { site } from "@/config/site";
import { services } from "@/content/services";
import { regions } from "@/content/areas";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> Commercial cleaning company based in ${site.address.text}, servicing all of Greater Sydney with Sydney CBD as the primary focus. Free on-site quotes.

Contact: ${site.phoneDisplay} · ${site.email}
Hours (Australia/Sydney): Mon–Fri 9am–5pm, Sat 10am–6pm, Sun closed
Google rating: ${site.googleRating.value}/5 from ${site.googleRating.count} Google reviews

## Services
${services.map((s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.summary}`).join("\n")}

## Areas
${regions.map((r) => `- [${r.name}](${site.url}/areas/${r.slug}): ${r.suburbs.slice(0, 6).join(", ")}`).join("\n")}

## Key pages
- [Get a free quote](${site.url}/get-a-quote)
- [Reviews](${site.url}/reviews)
- [FAQ](${site.url}/faq)
- [Contact](${site.url}/contact)
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
