import { regionBySlug, slugify, type Region } from "@/content/areas";
import { suburbData } from "@/content/suburbs";
import type { Faq } from "@/content/services";
import { site } from "@/config/site";

export type Suburb = {
  name: string;
  slug: string;
  region: Region;
  lga: string;
  pc: string;
  lat: number;
  lon: number;
};

export const suburbs: Suburb[] = suburbData.map(([name, region, lga, pc, lat, lon]) => ({
  name,
  slug: slugify(name),
  region: regionBySlug(region)!,
  lga,
  pc,
  lat,
  lon,
}));

export const suburbsOf = (regionSlug: string) => suburbs.filter((s) => s.region.slug === regionSlug);
export const findSuburb = (regionSlug: string, slug: string) => suburbs.find((s) => s.region.slug === regionSlug && s.slug === slug);

const CBD = { lat: -33.8688, lon: 151.2093 };
const BASE = { lat: -33.771, lon: 150.9063 }; // Blacktown

/** Great-circle distance in km (straight line, not driving distance). */
export function km(a: { lat: number; lon: number }, b: { lat: number; lon: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export const distances = (s: Suburb) => ({ cbd: Math.max(1, Math.round(km(s, CBD))), base: Math.max(1, Math.round(km(s, BASE))) });

export const nearby = (s: Suburb, n = 8) =>
  suburbs
    .filter((o) => o !== s)
    .map((o) => ({ o, d: km(s, o) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, n)
    .map((x) => x.o);

// Same projection used to generate the map geometry (see sydneyGeo.ts)
export const project = (lat: number, lon: number): [number, number] => [(lon - 150.52) * Math.cos((33.9 * Math.PI) / 180) * 1000, (-33.48 - lat) * 1000];

export const lgaPhrase = (lga: string) => `${lga} local government area`;

/** Services most relevant to a region's typical sites. */
export function featuredServices(r: Region): string[] {
  if (r.primary) return ["regular-office-cleaning", "commercial-end-of-lease-cleaning", "regular-window-cleaning"];
  if (r.home || ["south-west", "st-george"].includes(r.slug)) return ["warehouse-cleaning", "industrial-cleaning", "factory-cleaning", "regular-office-cleaning"];
  if (["hills-district", "sutherland-shire", "northern-beaches"].includes(r.slug)) return ["regular-office-cleaning", "school-cleaning", "education-childcare-cleaning", "regular-window-cleaning"];
  return ["regular-office-cleaning", "health-aged-care-cleaning", "school-cleaning", "regular-window-cleaning"];
}

export function suburbTitle(s: Suburb) {
  return `Commercial Cleaning ${s.name} NSW ${s.pc} | Triple SR`;
}

export function suburbDescription(s: Suburb) {
  return `Commercial cleaning in ${s.name} NSW ${s.pc}: offices, schools, care facilities, warehouses and windows. Free on-site quote from Triple SR. Call ${site.phoneDisplay}.`;
}

/** Answer-first summary (about 50 words) used as the lead and for answer engines. */
export function suburbAnswer(s: Suburb) {
  const d = distances(s);
  return `Triple SR Commercial Cleaning provides commercial cleaning in ${s.name}, NSW ${s.pc}, in the ${lgaPhrase(s.lga)}. We clean ${s.region.context} and other business premises, about ${d.cbd} km from the Sydney CBD. Get a free on-site quote or call ${site.phoneDisplay}.`;
}

export function suburbFaqs(s: Suburb): Faq[] {
  const d = distances(s);
  const near = nearby(s, 5).map((n) => n.name);
  const nearText = near.length > 1 ? `${near.slice(0, -1).join(", ")} and ${near[near.length - 1]}` : near.join("");
  return [
    {
      q: `Do you provide commercial cleaning in ${s.name}?`,
      a: `Yes. Triple SR Commercial Cleaning services businesses in ${s.name} (${s.pc}) and across the ${lgaPhrase(s.lga)}. We clean offices, schools, childcare and care facilities, warehouses, industrial sites and windows, with free on-site quotes.`,
    },
    {
      q: `What kinds of businesses do you clean in ${s.name}?`,
      a: `Around ${s.name} we typically clean ${s.region.context}. Each site gets its own checklist, schedule and equipment, whether it's a daily office clean or a one-off deep clean.`,
    },
    {
      q: `How far is ${s.name} from Triple SR's base?`,
      a: `${s.name} is roughly ${d.base} km (straight line) from our Blacktown base and ${d.cbd} km from the Sydney CBD. Travel is built into your written quote, so there are no surprise call-out charges.`,
    },
    {
      q: `How do I get a commercial cleaning quote in ${s.name}?`,
      a: `Send the quote form with ${s.name} as your suburb or call ${site.phoneDisplay}. We arrange a free on-site inspection where needed and send a clear written quote with no obligation.`,
    },
    {
      q: `Can you clean after hours in ${s.name}, and which nearby suburbs do you cover?`,
      a: `Yes. Evening, early-morning and weekend cleans are available in ${s.name}. We also service nearby suburbs including ${nearText}.`,
    },
  ];
}
