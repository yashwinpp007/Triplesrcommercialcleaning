export type Region = {
  slug: string;
  name: string;
  short: string;
  // schematic map position (0-100 within the map viewBox)
  x: number;
  y: number;
  r: number;
  suburbs: string[];
  blurb: string;
  context: string;
  primary?: boolean;
  home?: boolean;
};

// Suburb and region lists are editable. Confirm the real service radius with the client before launch.
export const regions: Region[] = [
  {
    slug: "sydney-cbd",
    name: "Sydney CBD",
    short: "CBD",
    x: 63,
    y: 46,
    r: 7,
    primary: true,
    suburbs: ["Sydney CBD", "Barangaroo", "Circular Quay", "The Rocks", "Martin Place", "Town Hall", "World Square", "Haymarket", "Darling Harbour", "Pyrmont", "Ultimo", "Surry Hills", "Chippendale", "Redfern"],
    blurb: "Our primary focus: offices, retail, strata buildings and end of lease make-goods across the CBD and fringe.",
    context: "high-rise towers, multi-tenant floors, building managers and strict access windows",
  },
  {
    slug: "inner-west",
    name: "Inner West",
    short: "Inner West",
    x: 49,
    y: 52,
    r: 7,
    suburbs: ["Balmain", "Leichhardt", "Newtown", "Marrickville", "Ashfield", "Burwood", "Strathfield", "Five Dock", "Haberfield", "Summer Hill", "Petersham", "Camperdown"],
    blurb: "Offices, studios, schools and light industrial sites across the Inner West.",
    context: "converted warehouses, creative studios, schools and light industrial units",
  },
  {
    slug: "eastern-suburbs",
    name: "Eastern Suburbs",
    short: "East",
    x: 77,
    y: 54,
    r: 6,
    suburbs: ["Bondi Junction", "Randwick", "Kensington", "Paddington", "Double Bay", "Rose Bay", "Maroubra", "Coogee", "Waverley", "Woollahra"],
    blurb: "Offices, medical suites, retail and strata buildings across the Eastern Suburbs.",
    context: "professional suites, boutique offices, retail strips and apartment-building common areas",
  },
  {
    slug: "north-shore",
    name: "North Shore",
    short: "North Shore",
    x: 62,
    y: 28,
    r: 7,
    suburbs: ["North Sydney", "St Leonards", "Chatswood", "Lane Cove", "Artarmon", "Crows Nest", "Mosman", "Wollstonecraft", "Willoughby", "Gordon"],
    blurb: "Corporate floors, schools and care facilities on the lower and upper North Shore.",
    context: "corporate towers around North Sydney and Chatswood, schools and care facilities",
  },
  {
    slug: "northern-beaches",
    name: "Northern Beaches",
    short: "N. Beaches",
    x: 80,
    y: 17,
    r: 6,
    suburbs: ["Manly", "Brookvale", "Dee Why", "Mona Vale", "Frenchs Forest", "Warriewood", "Narrabeen", "Avalon"],
    blurb: "Offices, light industrial and education sites across the Northern Beaches.",
    context: "business parks around Brookvale and Frenchs Forest, schools and childcare centres",
  },
  {
    slug: "parramatta-central-west",
    name: "Parramatta & Central West",
    short: "Parramatta",
    x: 36,
    y: 49,
    r: 7,
    suburbs: ["Parramatta", "Westmead", "Harris Park", "Granville", "Auburn", "Rydalmere", "Silverwater", "Homebush", "Olympic Park", "Merrylands", "Wentworthville"],
    blurb: "Government, health, education and commercial sites across the Parramatta region.",
    context: "the Parramatta CBD, health precincts, schools and commercial offices",
  },
  {
    slug: "western-sydney",
    name: "Western Sydney (Blacktown base)",
    short: "Blacktown",
    x: 20,
    y: 46,
    r: 8,
    home: true,
    suburbs: ["Blacktown", "Seven Hills", "Prospect", "Mount Druitt", "Rooty Hill", "Eastern Creek", "Wetherill Park", "Smithfield", "Penrith", "St Marys", "Huntingwood", "Doonside", "Marsden Park"],
    blurb: "Our home base: warehouses, factories, schools and offices from Blacktown to Penrith.",
    context: "warehouses, factories and distribution sites around Eastern Creek, Huntingwood and Wetherill Park",
  },
  {
    slug: "hills-district",
    name: "Hills District",
    short: "Hills",
    x: 31,
    y: 26,
    r: 7,
    suburbs: ["Castle Hill", "Baulkham Hills", "Norwest", "Rouse Hill", "Kellyville", "Bella Vista", "Pennant Hills", "Dural"],
    blurb: "Business parks, schools and childcare across the Hills District and Norwest.",
    context: "Norwest business park offices, schools and childcare centres",
  },
  {
    slug: "south-west",
    name: "South West Sydney",
    short: "South West",
    x: 29,
    y: 72,
    r: 7,
    suburbs: ["Liverpool", "Campbelltown", "Minto", "Ingleburn", "Leppington", "Narellan", "Camden", "Moorebank"],
    blurb: "Warehouses, schools, aged care and offices across the South West.",
    context: "logistics and distribution sites, aged care and schools",
  },
  {
    slug: "st-george",
    name: "St George & South",
    short: "St George",
    x: 58,
    y: 68,
    r: 6,
    suburbs: ["Hurstville", "Kogarah", "Rockdale", "Sydenham", "Mascot", "Botany", "St Peters", "Arncliffe", "Bankstown"],
    blurb: "Offices, industrial units and care facilities across St George and the airport precinct.",
    context: "industrial units, airport-precinct offices and care facilities",
  },
  {
    slug: "sutherland-shire",
    name: "Sutherland Shire",
    short: "The Shire",
    x: 60,
    y: 86,
    r: 6,
    suburbs: ["Sutherland", "Cronulla", "Miranda", "Caringbah", "Kirrawee", "Engadine", "Menai"],
    blurb: "Offices, schools and childcare centres across the Sutherland Shire.",
    context: "schools, childcare centres and professional offices",
  },
];

import { suburbData } from "./suburbs";

export const slugify = (n: string) =>
  n.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/&/g, "and").replace(/['’.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Each region lists every suburb inside its council areas. The hand-picked names above come first
// (when they exist in the dataset), then the rest alphabetically.
const featuredFirst = (r: Region) => {
  const all = suburbData.filter((t) => t[1] === r.slug).map((t) => t[0]);
  const feat = r.suburbs.filter((n) => all.includes(n));
  return [...feat, ...all.filter((n) => !feat.includes(n))];
};
regions.forEach((r) => { r.suburbs = featuredFirst(r); });

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);

export const allSuburbs = suburbData
  .map(([suburb, region, , pc]) => ({ suburb, pc, slug: slugify(suburb), region: regionBySlug(region)! }))
  .sort((a, b) => a.suburb.localeCompare(b.suburb));
