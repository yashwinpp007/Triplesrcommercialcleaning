import { site } from "@/config/site";
import { services } from "@/content/services";
import { regions } from "@/content/areas";
import { suburbs } from "@/lib/suburbs";
import { posts } from "@/content/posts";
import reviews from "@/content/reviews.json";

export const dynamic = "force-static";

// Long-form, plain-text summary of the whole site for AI assistants and answer engines.
export function GET() {
  const body = `# ${site.name}: full site summary

${site.name} is a commercial cleaning company based in ${site.address.text}. It services Greater Sydney, with the Sydney CBD as its primary focus.

## Contact
- Phone: ${site.phoneDisplay} (${site.phoneTel})
- Email: ${site.email}
- Website: ${site.url}
- Location: ${site.address.text}
- Hours: open 24 hours a day, 7 days a week
- Social: ${site.social.instagram} · ${site.social.facebook}
- Free, no-obligation on-site quotes; quote form at ${site.url}/get-a-quote
- Google rating: ${site.googleRating.value}/5 from ${site.googleRating.count} Google reviews (${site.googleProfile})

## Services (${services.length})
${services
  .map(
    (s) => `### ${s.title}
URL: ${site.url}/services/${s.slug}
Sector: ${s.group}
${s.intro}
Who it's for: ${s.forWho.join("; ")}.
Included: ${s.included.join("; ")}.
Optional extras: ${s.extras.join("; ")}.
Frequency: ${s.frequency}
${s.faqs.map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n")}`,
  )
  .join("\n\n")}

## Service areas (${regions.length} regions, ${suburbs.length} suburbs)
Every suburb has its own page at ${site.url}/areas/{region}/{suburb}.
${regions
  .map((r) => `- ${r.name} (${site.url}/areas/${r.slug}): ${r.blurb} Suburbs include ${r.suburbs.slice(0, 12).join(", ")}${r.suburbs.length > 12 ? ` and ${r.suburbs.length - 12} more` : ""}.`)
  .join("\n")}

## Blog
${posts.map((p) => `- ${p.title} (${site.url}/blog/${p.slug}), published ${p.date.slice(0, 10)}: ${p.excerpt}`).join("\n")}

## Customer reviews (verbatim from Google, five-star selection)
${reviews.reviews.slice(0, 8).map((r) => `- "${r.text.replace(/\s+/g, " ").trim()}" (${r.name})`).join("\n")}
More at ${site.url}/reviews

## Other pages
- About: ${site.url}/about
- Gallery: ${site.url}/gallery
- FAQ: ${site.url}/faq
- Privacy policy: ${site.url}/privacy-policy
- Terms: ${site.url}/terms
- Sitemap: ${site.url}/sitemap.xml
- Short version of this file: ${site.url}/llms.txt
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
