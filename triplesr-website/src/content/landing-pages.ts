import { site } from "@/config/site";
import type { Faq } from "@/content/services";

// Copy for the Google Ads landing pages (/lp/[slug]). Source of truth: google-ads-landing-pages/*.md.
// Rules: no invented claims, no prices, reviews come verbatim from reviews.json by id.
// Insurance / police-check chips only appear when site.confirmed says they are true.

export type FieldOption = [value: string, label: string];
export type LpField = {
  key: string;
  label: string;
  type: "text" | "tel" | "email" | "select" | "date" | "textarea";
  required?: boolean;
  options?: FieldOption[];
  placeholder?: string;
  autoComplete?: string;
  half?: boolean; // share a row on wider screens
};

export type LpList = { title: string; items: string[] };

export type LandingPageContent = {
  slug: string;
  service: string; // value sent to /api/quote
  serviceTitle: string; // label used in the lead email
  brandName: string;
  metaTitle: string;
  metaDescription: string;
  accent: { a: string; b: string }; // page colour theme (decorative + headings; both pass 3:1 on white)
  visuals: { slides: string[]; rows: string[][]; side: string; rowsCaption: string };
  guarantee?: { title: string; body: string; points: string[]; note: string };
  premium?: boolean; // colourful dark-hero variant with extra motion (LandingPage + Premium.tsx)
  stats?: { to: number; decimals?: number; suffix?: string; label: string }[];
  ticker?: string[];
  chips?: string[];
  order?: string[]; // section order override (see LandingPage defaultOrder)
  faqHeading?: string;
  properties?: { h2: string; intro: string; items: { title: string; body: string; image: string }[] };
  hero: { eyebrow?: string; h1: string; highlight: string; sub: string; bullets: string[]; image: string; cta: string; microcopy: string };
  form: { heading: string; button: string; fields: LpField[] };
  trust: string[];
  problem: { h2: string; paras: string[]; points?: { title: string; body: string }[] };
  included: { h2: string; intro?: string; cards?: { title: string; body: string }[]; groups?: LpList[]; extras?: LpList; note?: string };
  table?: { id: string; h2: string; headers: string[]; rows: string[][]; listTitle?: string; list?: string[]; footnote?: string };
  steps: { h2: string; items: { title: string; body: string }[] };
  why?: { h2: string; items: { title: string; body: string }[] };
  pricing?: { h2: string; intro: string; items: string[]; outro: string };
  documents?: { id: string; h2: string; items: string[] };
  beforeAfter?: { before: string; after: string; caption: string };
  reviews: { h2: string; ids: number[]; note?: string };
  faqs: Faq[];
  areas: { h2: string; text: string; chips?: string[] };
  finalCta: { h2: string; body: string; reassurance: string; bullets?: string[] };
  whatsapp: string | null;
};

const cert = site.confirmed.insurance;
const police = site.confirmed.policeChecked;

const base = (extra: string[]) => [
  `${site.googleRating.value} ★ on Google (${site.googleRating.count} reviews)`,
  ...extra,
  ...(cert ? ["Fully insured"] : []),
  ...(police ? ["Police-checked cleaners"] : []),
];


export const landingPages: LandingPageContent[] = [
  // ───────────────────────── Commercial end of lease ─────────────────────────
  // Structure follows the agreed page brief: hero + form, problem/solution, 8 service cards, property types,
  // why us, 3-step process, areas, reviews, FAQs, final CTA. No bond-back, 24/7 or years-of-experience claims.
  {
    slug: "commercial-end-of-lease-cleaning-sydney",
    service: "end-of-lease-lp",
    serviceTitle: "Commercial End of Lease Cleaning (ads page)",
    brandName: "Triple SR Commercial Cleaning",
    metaTitle: "Commercial End of Lease Cleaning Sydney | Free Quote",
    metaDescription: "Looking for commercial end of lease cleaning in Sydney? Professional office, retail and commercial property cleaning tailored to your handover requirements. Request a free quote today.",
    accent: { a: "#0a7c8c", b: "#2f8f3a" },
    premium: true,
    order: ["trust", "stats", "problem", "included", "ticker", "properties", "why", "guarantee", "steps", "areas", "reviews", "beforeAfter", "faq", "final"],
    stats: [
      { to: site.googleRating.value, decimals: 1, label: "Google rating" },
      { to: site.googleRating.count, label: "Google reviews" },
      { to: 8, label: "Cleaning scopes covered" },
      { to: 10, label: "Sydney areas serviced" },
    ],
    ticker: ["Offices", "Retail & showrooms", "Warehouses", "Commercial facilities", "Inspection-focused", "Flexible scheduling", "Free quote"],
    chips: ["Inspection-focused", "Flexible scheduling", "Detailed checklist", "Free quote"],
    faqHeading: "Commercial End of Lease Cleaning – FAQs",
    visuals: {
      slides: ["office-glass-partitions", "tile-floor-after", "office-lounge-city", "kitchen-mopping"],
      rows: [[], []],
      side: "office-lounge-city",
      rowsCaption: "",
    },
    hero: {
      eyebrow: "Commercial Cleaning Specialists | Sydney NSW",
      h1: "Commercial End of Lease Cleaning in Sydney",
      highlight: "Commercial End of Lease Cleaning",
      sub: "Professional. Thorough. Inspection-ready. Moving out of your commercial premises? Leave the cleaning to the professionals. We help businesses, commercial tenants and property managers prepare premises for the final inspection and handover, from offices and retail spaces to commercial facilities.",
      bullets: ["Offices, retail, warehouses and commercial facilities", "Cleaning scope tailored to your premises and lease", "Free re-clean if the inspection raises reasonable issues"],
      image: "office-glass-partitions",
      cta: "Get a Free Quote",
      microcopy: "Free and no obligation. We reply within one business day.",
    },
    form: {
      heading: "Request a Free Commercial Cleaning Quote",
      button: "Request My Free Quote",
      fields: [
        { key: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
        { key: "phone", label: "Phone number", type: "tel", required: true, placeholder: "04xx xxx xxx", autoComplete: "tel" },
        { key: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
        { key: "property", label: "Property type", type: "select", required: true, options: [["Office", "Office"], ["Retail / showroom", "Retail / showroom"], ["Warehouse / industrial", "Warehouse / industrial"], ["Clinic / commercial facility", "Clinic / commercial facility"], ["Other", "Other"]] },
        { key: "suburb", label: "Property suburb", type: "text", required: true, placeholder: "e.g. Parramatta", autoComplete: "address-level2" },
        { key: "size", label: "Approximate size", type: "select", options: [["Under 100 sqm", "Under 100 sqm"], ["100-250 sqm", "100-250 sqm"], ["250-500 sqm", "250-500 sqm"], ["500-1,000 sqm", "500-1,000 sqm"], ["1,000+ sqm", "1,000+ sqm"], ["Not sure", "Not sure"]], half: true },
        { key: "date", label: "Preferred cleaning date", type: "date", half: true },
        { key: "requirements", label: "Additional requirements", type: "textarea", placeholder: "e.g. carpet cleaning, lease checklist, building access" },
      ],
    },
    trust: base(["Free re-clean guarantee", "Professional cleaning team", "Flexible scheduling", "Detailed cleaning checklist"]),
    problem: {
      h2: "Moving Out? Leave Your Commercial Space Spotless.",
      paras: [
        "Commercial lease handovers come with cleaning expectations that shouldn't be overlooked.",
        "Dust, built-up grime, dirty floors, neglected kitchens and unclean washrooms can affect the presentation of your premises during the final inspection.",
        "Our commercial end of lease cleaning service helps take the pressure off your move-out process. We focus on the details that matter, delivering a thorough clean so your premises are ready for inspection and handover.",
      ],
      points: [
        { title: "Inspection-Focused Cleaning", body: "Cleaning tailored to your property's condition and handover requirements." },
        { title: "Flexible Scheduling", body: "Cleaning appointments arranged around your relocation and handover timeline." },
        { title: "Attention to Detail", body: "Thorough cleaning of high-use areas, surfaces, floors and facilities." },
      ],
    },
    included: {
      h2: "Comprehensive Commercial Cleaning Services",
      intro: "Every commercial property is different. Our cleaning scope can be tailored to your premises, lease requirements and condition.",
      cards: [
        { title: "Office Cleaning", body: "Desks, workstations, meeting rooms, surfaces and common areas." },
        { title: "Floor Cleaning", body: "Vacuuming, mopping, scrubbing and floor treatment where required." },
        { title: "Carpet Cleaning", body: "Carpet vacuuming and specialised carpet cleaning where requested." },
        { title: "Window & Glass Cleaning", body: "Internal glass, partitions, mirrors and accessible windows." },
        { title: "Kitchen & Breakroom Cleaning", body: "Benchtops, sinks, cupboards, appliances and splashbacks." },
        { title: "Washroom Cleaning", body: "Toilets, basins, mirrors, fixtures and sanitisation." },
        { title: "Walls & Skirting Boards", body: "Spot cleaning of marks, dust and accessible skirting boards." },
        { title: "Rubbish Removal", body: "Emptying bins and removing general cleaning waste." },
      ],
      note: "Services such as carpet steam cleaning, external windows, high-access cleaning and specialist floor treatments can be quoted separately depending on requirements. We don't do make-good repairs, painting or reinstatement.",
    },
    properties: {
      h2: "Commercial End of Lease Cleaning for Every Workspace",
      intro: "Whether you're vacating a small office or a large commercial facility, we can tailor our cleaning services to suit your premises.",
      items: [
        { title: "Office Spaces", body: "Corporate offices, shared workspaces and business premises.", image: "office-glass-partitions" },
        { title: "Retail & Showrooms", body: "Retail stores, display areas and commercial showrooms.", image: "glass-door-vacuum-city" },
        { title: "Warehouses & Industrial", body: "Warehouses, storage facilities and industrial premises.", image: "hall-floor-polished" },
        { title: "Commercial Facilities", body: "Clinics, professional suites and other business facilities.", image: "restroom-vanity-mirror" },
      ],
    },
    why: {
      h2: "A Reliable Cleaning Partner for Your Commercial Handover",
      items: [
        { title: "Professional Standards", body: "A systematic approach to commercial cleaning." },
        { title: "Tailored Cleaning Plans", body: "Services designed around your property's needs." },
        { title: "Reliable Scheduling", body: "Appointments coordinated with your move-out timeline." },
        { title: "Attention to Detail", body: "Focus on the areas that are often overlooked." },
        { title: "Transparent Quotes", body: "Clear pricing based on the scope of work." },
        { title: "Sydney-Wide Service", body: "Serving commercial properties across Sydney and surrounding areas." },
      ],
    },
    guarantee: {
      title: "Our Re-Clean Guarantee",
      body: "If your agent, landlord or property manager raises a reasonable cleaning issue at the handover inspection, within the scope we agreed, we'll come back and re-clean it at no extra charge.",
      points: ["Free return visit for reasonable issues within the agreed scope", "Cleaned to your lease and the agent's checklist", "Tell us promptly after the inspection and we'll arrange a time"],
      note: "This covers cleaning only. We can't guarantee a bond or security deposit refund, as that is decided by the landlord or property manager, and it doesn't cover damage, repairs or make-good works.",
    },
    steps: {
      h2: "From Booking to Handover – Made Simple",
      items: [
        { title: "Request Your Free Quote", body: "Tell us about your commercial property, its size, location and handover date." },
        { title: "Get Your Cleaning Plan", body: "We assess your requirements and provide a tailored cleaning scope and quotation." },
        { title: "Professional Cleaning & Handover", body: "Our team completes the agreed cleaning work, leaving your premises ready for the next stage." },
      ],
    },
    beforeAfter: { before: "tile-floor-before", after: "tile-floor-after", caption: "A real floor we cleaned. Photos are from our own jobs." },
    reviews: { h2: "Trusted to Deliver a Professional Clean", ids: [1, 3, 2], note: "Genuine Google reviews from our office and commercial cleaning clients." },
    faqs: [
      { q: "What is included in commercial end of lease cleaning?", a: "Our service can include office cleaning, floor cleaning, carpet vacuuming, internal glass cleaning, kitchen cleaning, washroom cleaning, skirting boards and general surface cleaning. The exact scope depends on your property's requirements and agreed quotation." },
      { q: "How much does commercial end of lease cleaning cost in Sydney?", a: "Pricing depends on the size of the property, its condition, cleaning requirements and any additional services requested. Contact us for a tailored, obligation-free quote." },
      { q: "Do you clean offices, warehouses and retail spaces?", a: "Yes. We provide tailored commercial end of lease cleaning for offices, retail spaces, warehouses, showrooms and other commercial premises, subject to the required cleaning scope." },
      { q: "Can I book cleaning before my lease handover date?", a: "Yes. We can arrange cleaning appointments around your scheduled move-out and handover date, subject to availability." },
      { q: "Do you provide carpet steam cleaning?", a: "Carpet cleaning can be included as an additional service where required. Let us know your carpet cleaning requirements when requesting a quote." },
      { q: "Do you bring your own cleaning equipment and products?", a: "We can confirm the equipment, cleaning products and any special requirements as part of your quotation and booking arrangements." },
      { q: "How do I get a commercial end of lease cleaning quote?", a: "Simply complete our online enquiry form or call our team. Provide your property location, approximate size and preferred cleaning date, and we'll get back to you with a tailored quotation." },
      { q: "What is your re-clean guarantee?", a: "If the agent, landlord or property manager raises a reasonable cleaning issue at the handover inspection, within the scope we agreed, we'll return and re-clean it at no extra charge. Tell us promptly after the inspection and we'll arrange a time." },
      { q: "Do you guarantee bond return?", a: "We guarantee our cleaning through the free re-clean above, but we can't guarantee a bond or security deposit refund. That is decided by the landlord, property manager and your lease conditions, and can also depend on damage or repairs that cleaning can't fix." },
    ],
    areas: { h2: "Commercial End of Lease Cleaning Across Sydney", text: "Looking for reliable commercial end of lease cleaners in Sydney? We service commercial properties across the areas below. Contact our team to confirm availability in your area.", chips: ["Sydney CBD", "Parramatta", "Blacktown", "North Sydney", "Chatswood", "Hills District", "Western Sydney", "Inner West", "Eastern Suburbs", "South Sydney"] },
    finalCta: {
      h2: "Ready to Hand Over Your Commercial Property?",
      body: "Make your commercial move-out easier with professional end of lease cleaning. Let our team take care of the cleaning while you focus on your next move.",
      reassurance: "Free quote. No obligation. Your information is only used to respond to your enquiry.",
      bullets: ["Free re-clean guarantee", "Professional commercial cleaning", "Flexible scheduling", "Sydney-wide service"],
    },
    whatsapp: "Hi, I'd like a quote for a commercial end of lease clean. Suburb: ___, premises type: ___, size (sqm): ___, handover date: ___.",
  },

  // ───────────────────────── Commercial regular cleaning ─────────────────────────
  // Keywords follow the OfficeCommercial ads campaign: commercial cleaning (Sydney), office cleaning, business cleaning.
  // No invented claims: no 24/7, years-in-business, insurance or police-check statements.
  {
    slug: "commercial-cleaning-sydney",
    service: "commercial-cleaning-lp",
    serviceTitle: "Commercial Regular Cleaning (ads page)",
    brandName: "Triple SR Commercial Cleaning",
    metaTitle: "Commercial Cleaning Sydney | Office & Business Cleaners",
    metaDescription: "Reliable commercial cleaning in Sydney. Regular office and business cleaning, daily to monthly, after hours, with a consistent uniformed team. Free walkthrough and written quote.",
    accent: { a: "#0369a1", b: "#6d28d9" },
    premium: true,
    order: ["trust", "stats", "problem", "included", "ticker", "properties", "table", "why", "steps", "areas", "reviews", "beforeAfter", "faq", "final"],
    stats: [
      { to: site.googleRating.value, decimals: 1, label: "Google rating" },
      { to: site.googleRating.count, label: "Google reviews" },
      { to: 8, label: "Cleaning scopes covered" },
      { to: 10, label: "Sydney areas serviced" },
    ],
    ticker: ["Office cleaning", "Commercial cleaning", "Business cleaning", "After-hours cleans", "Consistent team", "Free walkthrough", "Written quotes"],
    chips: ["After-hours cleans", "Consistent team", "Free walkthrough", "Written quote"],
    faqHeading: "Commercial Cleaning Sydney – FAQs",
    visuals: {
      slides: ["office-open-plan", "team-office-vacuuming", "office-workstations", "restroom-vanity-mirror"],
      rows: [[], []],
      side: "office-city-views",
      rowsCaption: "",
    },
    hero: {
      eyebrow: "Commercial Cleaners | Sydney NSW",
      h1: "Commercial Cleaning in Sydney, Done Properly",
      highlight: "Done Properly",
      sub: "Regular office and business cleaning from a consistent, uniformed team. We clean around your schedule, usually after hours, so your people walk into a fresh workplace every day.",
      bullets: ["Daily, weekly, fortnightly or monthly cleans", "After-hours and early-morning options", "Free site walkthrough and itemised written quote"],
      image: "office-open-plan",
      cta: "Get a Free Quote",
      microcopy: "Free and no obligation. We reply within one business day.",
    },
    form: {
      heading: "Request a Free Commercial Cleaning Quote",
      button: "Request My Free Quote",
      fields: [
        { key: "name", label: "Full name", type: "text", required: true, autoComplete: "name" },
        { key: "phone", label: "Phone number", type: "tel", required: true, placeholder: "04xx xxx xxx", autoComplete: "tel" },
        { key: "email", label: "Email address", type: "email", required: true, autoComplete: "email" },
        { key: "property", label: "Premises type", type: "select", required: true, options: [["Office", "Office"], ["Retail / showroom", "Retail / showroom"], ["Medical / allied-health suite", "Medical / allied-health suite"], ["School / childcare", "School / childcare"], ["Warehouse / industrial", "Warehouse / industrial"], ["Other", "Other"]] },
        { key: "suburb", label: "Premises suburb", type: "text", required: true, placeholder: "e.g. Parramatta", autoComplete: "address-level2" },
        { key: "frequency", label: "How often?", type: "select", required: true, options: [["daily", "Daily"], ["weekly", "Weekly"], ["fortnightly", "Fortnightly"], ["monthly", "Monthly"], ["not-sure", "Not sure"]], half: true },
        { key: "size", label: "Approximate size", type: "select", options: [["Under 100 sqm", "Under 100 sqm"], ["100-250 sqm", "100-250 sqm"], ["250-500 sqm", "250-500 sqm"], ["500-1,000 sqm", "500-1,000 sqm"], ["1,000+ sqm", "1,000+ sqm"], ["Not sure", "Not sure"]], half: true },
        { key: "requirements", label: "Anything else we should know?", type: "textarea", placeholder: "e.g. after-hours access, current cleaner, number of washrooms" },
      ],
    },
    trust: base(["Free on-site walkthrough", "Consistent uniformed team", "After-hours cleaning", "Itemised written quotes"]),
    problem: {
      h2: "A Clean Workplace Shouldn't Be Something You Chase.",
      paras: [
        "A clean workplace lifts morale, protects your people and makes the right impression on every client who walks in. But missed visits, inconsistent standards and a revolving door of cleaners quickly wear thin.",
        "We keep it simple: a free walkthrough, a site-specific checklist and a regular team in Triple SR uniforms who learn your space, your access arrangements and your standards.",
        "Already have a cleaner and thinking of switching? We inspect, agree a scope and handle the changeover.",
      ],
      points: [
        { title: "A Site-Specific Checklist", body: "After a free walkthrough we write a checklist for your space, so everyone knows exactly what clean means." },
        { title: "After-Hours Cleaning", body: "Cleans run in the evening or early morning, so nobody is disturbed." },
        { title: "Easy to Reach", body: "One phone number, one email, and a quick response if something needs attention between visits." },
      ],
    },
    included: {
      h2: "What Your Regular Commercial Clean Covers",
      intro: "Every workplace is different. Your scope is tailored to your premises, your schedule and your standards.",
      cards: [
        { title: "Office Cleaning", body: "Desk and surface wipe-down (tidy desks), reception, meeting rooms and breakout areas." },
        { title: "Floor Cleaning", body: "Vacuuming and mopping of all hard floors, kept consistent between visits." },
        { title: "Carpet Cleaning", body: "Regular carpet vacuuming, with carpet steam cleaning available as an extra." },
        { title: "Window & Glass Cleaning", body: "Internal glass doors, partitions and mirrors." },
        { title: "Kitchen & Breakroom Cleaning", body: "Sinks, benches, appliance exteriors and kitchenettes." },
        { title: "Washroom Cleaning", body: "Cleaning and sanitising, with restocking of consumables." },
        { title: "Walls & Skirting Boards", body: "Touch-point disinfection of door handles, light switches and lift buttons, plus spot cleaning of marks." },
        { title: "Rubbish Removal", body: "Rubbish and recycling removal with liner replacement." },
      ],
      note: "Extras such as carpet steam cleaning, internal window cleaning, fridge and microwave deep cleans, and hard-floor polishing or strip-and-seal are quoted separately.",
    },
    properties: {
      h2: "Commercial Cleaning for Every Kind of Workplace",
      intro: "From a small office to a multi-floor building, we tailor the clean to suit your premises.",
      items: [
        { title: "Offices & Corporate", body: "Corporate and professional offices, co-working spaces and serviced offices.", image: "office-open-plan" },
        { title: "Retail & Showrooms", body: "Retail stores, showrooms, display areas and reception.", image: "glass-door-vacuum-city" },
        { title: "Medical & Allied-Health Suites", body: "General and non-clinical areas of medical and allied-health suites.", image: "restroom-vanity-mirror" },
        { title: "Schools & Childcare", body: "Classrooms, corridors, amenities and shared learning spaces.", image: "classroom-clean" },
      ],
    },
    table: {
      id: "plans",
      h2: "A Schedule That Suits Your Business",
      headers: ["Frequency", "Best for", "Notes"],
      rows: [
        ["Daily", "Busy offices, reception areas, high-traffic sites", "The workplace starts every day fresh"],
        ["Several times a week", "Mid-sized offices and retail premises", "Washrooms and kitchens stay on top of it"],
        ["Weekly", "Smaller offices and professional suites", "A steady rhythm that keeps standards up"],
        ["Fortnightly or monthly", "Low-traffic premises, or a catch-up clean", "A thorough reset between visits"],
      ],
      footnote: "Frequency and times are set around your building's access and alarm procedures. We'll recommend a schedule at the walkthrough.",
    },
    why: {
      h2: "Why Sydney Businesses Choose Triple SR",
      items: [
        { title: "Consistent Team", body: "We aim to keep the same team on your site, and we tell you if the roster changes." },
        { title: "Professional Standards", body: "A systematic approach, with a checklist written for your space." },
        { title: "Flexible Scheduling", body: "Cleans around your hours, including after-hours and early-morning options." },
        { title: "Transparent Quotes", body: "A clear, itemised written quote based on the scope of work." },
        { title: "Easy to Switch", body: "Changing cleaner? We inspect, agree the scope and handle the changeover." },
        { title: "Sydney-Wide Service", body: "Serving commercial premises across Sydney, including the CBD." },
      ],
    },
    steps: {
      h2: "Getting Started Is Simple",
      items: [
        { title: "Request Your Free Quote", body: "Tell us about your premises, its size, location and how often you need a clean." },
        { title: "Free Walkthrough & Quote", body: "We inspect the site or review plans, then send a clear itemised written quote." },
        { title: "Your Regular Clean Begins", body: "Your consistent team arrives on schedule with equipment and products and cleans to your checklist." },
      ],
    },
    beforeAfter: { before: "tile-floor-before", after: "tile-floor-after", caption: "A real floor we cleaned. Photos are from our own jobs." },
    reviews: { h2: "Trusted by Sydney Workplaces", ids: [2, 1, 3], note: "Genuine Google reviews from our office and commercial cleaning clients." },
    faqs: [
      { q: "How much does commercial cleaning cost in Sydney?", a: "Pricing depends on floor area, number of washrooms and kitchens, frequency and access hours. We inspect the site or review plans, then send a clear written quote with no obligation." },
      { q: "Can you clean our office after hours?", a: "Yes. Most office cleans happen in the evening or early morning so nobody is disturbed. We can work to your building's access times and alarm procedures." },
      { q: "What is included in a regular commercial clean?", a: "Typically floors, desk and surface wipe-downs, kitchens and breakrooms, washrooms, rubbish and recycling, internal glass and touch-point disinfection. We agree a checklist for your site at the walkthrough." },
      { q: "How often can you clean?", a: "Daily, several times a week, weekly, fortnightly or monthly, with after-hours or early-morning options." },
      { q: "Will the same cleaners come each time?", a: "We aim to keep the same team on your site so they know your space and your preferences, and we'll tell you if the roster changes." },
      { q: "Do you supply the cleaning products and equipment?", a: "Yes. We bring our own equipment and professional products. If your building requires particular products, tell us and we'll work with them." },
      { q: "Can you clean offices in the Sydney CBD?", a: "Yes. We can arrange building inductions, access cards and lift or loading dock bookings with your building manager." },
      { q: "We already have a cleaner. Is it easy to switch?", a: "Yes. We inspect, agree a scope and handle the changeover. Get a free quote and we'll talk you through it." },
      { q: "Do you do end of lease cleaning for commercial premises?", a: "Yes. See our commercial end of lease cleaning page, or ask us for a quote." },
    ],
    areas: { h2: "Commercial Cleaning Across Sydney", text: "Looking for reliable commercial cleaners in Sydney? We service workplaces across the areas below. Contact our team to confirm availability in your area.", chips: ["Sydney CBD", "Parramatta", "Blacktown", "North Sydney", "Chatswood", "Hills District", "Western Sydney", "Inner West", "Eastern Suburbs", "South Sydney"] },
    finalCta: {
      h2: "Ready for a Cleaner Workplace?",
      body: "Tell us about your premises and how often you'd like us. We'll arrange a free walkthrough and send a clear written quote.",
      reassurance: "Free quote. No obligation. We reply within one business day.",
      bullets: ["Free on-site walkthrough", "After-hours cleaning", "Consistent uniformed team", "Sydney-wide service"],
    },
    whatsapp: "Hi, I'd like a quote for regular commercial cleaning. Suburb: ___, premises type: ___, size (sqm): ___, how often: ___.",
  },
];

// Pages served from a clean top-level URL (rewritten to /lp/[slug] in next.config.ts) instead of /lp/[slug].
export const lpTopLevel = new Set(["commercial-end-of-lease-cleaning-sydney", "commercial-cleaning-sydney"]);
export const lpPath = (slug: string) => (lpTopLevel.has(slug) ? `/${slug}` : `/lp/${slug}`);
export const lpBySlug = (slug: string) => landingPages.find((p) => p.slug === slug);
export const lpServiceTitles: Record<string, string> = Object.fromEntries(landingPages.map((p) => [p.service, p.serviceTitle]));
export const lpServiceSlugs = landingPages.map((p) => p.service);
