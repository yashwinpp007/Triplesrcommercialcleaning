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

const sydneyAreas =
  "Western Sydney (Blacktown, Parramatta, Penrith, Castle Hill) · Inner West · Sydney CBD and fringe · Eastern Suburbs · North Shore · Hills District · South West · St George · Sutherland Shire";

const bedrooms: FieldOption[] = [["Studio", "Studio"], ["1", "1 bedroom"], ["2", "2 bedrooms"], ["3", "3 bedrooms"], ["4", "4 bedrooms"], ["5+", "5+ bedrooms"]];
const propertyTypes: FieldOption[] = [["House", "House"], ["Apartment", "Apartment"], ["Townhouse", "Townhouse"]];

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
    order: ["trust", "stats", "problem", "included", "ticker", "properties", "why", "steps", "areas", "reviews", "beforeAfter", "faq", "final"],
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
      bullets: ["Offices, retail, warehouses and commercial facilities", "Cleaning scope tailored to your premises and lease", "Free, no-obligation quote"],
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
    trust: base(["Professional cleaning team", "Flexible scheduling", "Detailed cleaning checklist"]),
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
      { q: "Do you guarantee bond return?", a: "We aim to deliver cleaning in accordance with the agreed scope and your provided handover requirements. However, bond or security deposit refunds are determined by the landlord, property manager and applicable lease conditions, so we cannot guarantee a bond refund." },
    ],
    areas: { h2: "Commercial End of Lease Cleaning Across Sydney", text: "Looking for reliable commercial end of lease cleaners in Sydney? We service commercial properties across the areas below. Contact our team to confirm availability in your area.", chips: ["Sydney CBD", "Parramatta", "Blacktown", "North Sydney", "Chatswood", "Hills District", "Western Sydney", "Inner West", "Eastern Suburbs", "South Sydney"] },
    finalCta: {
      h2: "Ready to Hand Over Your Commercial Property?",
      body: "Make your commercial move-out easier with professional end of lease cleaning. Let our team take care of the cleaning while you focus on your next move.",
      reassurance: "Free quote. No obligation. Your information is only used to respond to your enquiry.",
      bullets: ["Professional commercial cleaning", "Flexible scheduling", "Tailored cleaning solutions", "Sydney-wide service"],
    },
    whatsapp: "Hi, I'd like a quote for a commercial end of lease clean. Suburb: ___, premises type: ___, size (sqm): ___, handover date: ___.",
  },

  // ───────────────────────── Regular house cleaning ─────────────────────────
  {
    slug: "house-cleaning-sydney",
    service: "house-cleaning-lp",
    serviceTitle: "Regular House Cleaning (ads page)",
    brandName: "Triple SR Cleaning Services",
    metaTitle: "House Cleaning Sydney | Regular Cleaners | Triple SR",
    metaDescription: "Reliable weekly and fortnightly house cleaning across Sydney. Same friendly team each visit. Rated 4.6 on Google. Free quote: 0427 724 809.",
    accent: { a: "#c2410c", b: "#d97706" },
    visuals: {
      slides: ["kitchen-clean-floor", "team-kitchen-mopping", "restroom-vanity-mirror", "blinds-dusting"],
      rows: [
        ["team-kitchen-mopping-2", "restroom-basins", "window-cleaning-2", "tile-floor-after-2", "stairs-sweeping", "blinds-window-cleaning"],
        ["kitchen-mopping", "restroom-vanity", "team-office-vacuuming-2", "squeegee-window", "restroom-cubicle", "tile-floor-after"],
      ],
      side: "team-kitchen-mopping",
      rowsCaption: "Photos from our own cleaning jobs.",
    },
    hero: {
      h1: "House Cleaning in Sydney, Done Properly",
      highlight: "Done Properly",
      sub: "A friendly, uniformed team who clean your home every week or fortnight, so your weekends are yours again.",
      bullets: ["Weekly, fortnightly or one-off cleans", "Kitchens and bathrooms get the most attention", "Free, no-obligation quote with clear pricing"],
      image: "kitchen-clean-floor",
      cta: "Get My Free Quote",
      microcopy: "Free and no obligation. We reply within one business day.",
    },
    form: {
      heading: "Get your free house cleaning quote",
      button: "Get My Free Quote",
      fields: [
        { key: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
        { key: "phone", label: "Mobile number", type: "tel", required: true, placeholder: "04xx xxx xxx", autoComplete: "tel" },
        { key: "suburb", label: "Suburb", type: "text", required: true, placeholder: "e.g. Blacktown", autoComplete: "address-level2" },
        { key: "property", label: "Home type", type: "select", required: true, options: propertyTypes, half: true },
        { key: "bedrooms", label: "Bedrooms", type: "select", required: true, options: bedrooms, half: true },
        { key: "bathrooms", label: "Bathrooms", type: "select", required: true, options: [["1", "1"], ["2", "2"], ["3", "3"], ["4+", "4+"]], half: true },
        { key: "frequency", label: "How often?", type: "select", required: true, options: [["weekly", "Weekly"], ["fortnightly", "Fortnightly"], ["monthly", "Monthly"], ["one-off", "One-off"], ["not-sure", "Not sure"]], half: true },
        { key: "email", label: "Email (optional)", type: "email", autoComplete: "email" },
      ],
    },
    trust: base(["Sydney-based team (Blacktown)", "Free written quotes", "Open 24 hours, 7 days"]),
    problem: {
      h2: "You shouldn't have to spend your weekend cleaning",
      paras: [
        "Work, family and a full diary leave little time for scrubbing bathrooms and mopping floors. Cleaning gets pushed back, then it becomes a big job.",
        "And finding a cleaner you trust can feel like a gamble: Will they turn up? Will they do the same job every time? Is it safe to leave them in the house?",
        "We keep it simple: a consistent team, a clear checklist and a quote you agree before the first visit.",
      ],
    },
    included: {
      h2: "What a regular clean covers",
      groups: [
        { title: "Kitchen", items: ["Benchtops, sink and splashback", "Cooktop and appliance exteriors", "Microwave wipe-out", "Floors vacuumed and mopped"] },
        { title: "Bathrooms and toilets", items: ["Shower, screen, bath and tiles", "Toilet, basin and vanity", "Mirrors and taps", "Floors mopped"] },
        { title: "Bedrooms and living areas", items: ["Dusting of surfaces, shelves and furniture tops", "Vacuuming of carpets and rugs", "Mopping of hard floors", "Beds made on request"] },
        { title: "Throughout", items: ["Light switches and door handles wiped", "Rubbish bins emptied", "Cobwebs from reachable corners", "Skirting boards wiped (rotated through visits)"] },
      ],
      extras: { title: "Extras (quoted separately, tell us if you want them)", items: ["Inside the oven", "Inside the fridge", "Interior windows", "Blinds", "Carpet steam cleaning"] },
    },
    table: {
      id: "plans",
      h2: "A schedule that suits your home",
      headers: ["Plan", "Best for", "Notes"],
      rows: [
        ["Weekly", "Busy families, pets, larger homes", "The home stays consistently clean"],
        ["Fortnightly", "Most households", "A steady rhythm that keeps on top of it"],
        ["Monthly", "Smaller homes, a catch-up clean", "A deeper reset each month"],
        ["One-off", "Before guests, after renovations or to start a routine", "No ongoing commitment"],
      ],
      footnote: "Need to change or pause your schedule? Call or message us.",
    },
    steps: {
      h2: "Getting started takes about two minutes",
      items: [
        { title: "Tell us about your home", body: "Suburb, bedrooms, bathrooms and how often you'd like a clean." },
        { title: "Get your quote", body: "A clear written price, with what's included." },
        { title: "Pick your day", body: "We agree a time that suits you, including how we'll get in." },
        { title: "Relax", body: "The team arrives on time, with equipment and products, and cleans to the checklist." },
      ],
    },
    why: {
      h2: "Why households choose Triple SR",
      items: [
        { title: "Punctual", body: "Reviewers mention it again and again." },
        { title: "Consistent team", body: "We aim to send the same people each visit, and we tell you if the roster changes." },
        { title: "Flexible", body: "We work around your schedule where we can." },
        { title: "Clear communication", body: "One phone number, one email, and we reply within one business day." },
      ],
    },
    reviews: { h2: "Homes we've cleaned, in our customers' words", ids: [7, 8, 12, 9] },
    faqs: [
      { q: "How much does house cleaning cost?", a: "It depends on the size of your home, the number of bathrooms, how often you want us and how dirty it is. Send us your suburb, bedrooms and bathrooms and we'll give you a clear written quote." },
      { q: "Do I need to be home?", a: "No. Many customers arrange access with a key, lockbox or building manager. We'll agree the plan before the first visit." },
      { q: "Will the same cleaners come each time?", a: "We aim to keep the same team so they learn your home. If the roster changes, we'll tell you." },
      { q: "Do you bring your own equipment and products?", a: "Yes. If you prefer specific products, such as fragrance-free, tell us and we'll work with them." },
      { q: "Do you clean homes with pets or kids?", a: "Yes. Let us know about pets (for example, if a dog needs to be secured) and any products to avoid." },
      { q: "What if I'm not happy with the clean?", a: "Tell us as soon as possible. We'll arrange a return visit for reasonable issues within the scope of the clean." },
      { q: "Can I pause or change my schedule?", a: "Yes, with notice. Call or message us." },
      { q: "Do you also clean apartments and townhouses?", a: "Yes, in Sydney, including buildings that need lift bookings or access arrangements." },
      { q: "Do you do end of lease cleaning too?", a: "Yes. Ask us for a quote." },
    ],
    areas: { h2: "House cleaning across Greater Sydney", text: sydneyAreas },
    finalCta: { h2: "Ready for a cleaner home?", body: "Tell us your suburb and how often you'd like us. We'll send a clear written quote.", reassurance: "Free quote. No obligation. We reply within one business day." },
    whatsapp: "Hi, I'd like a quote for regular house cleaning. Suburb: ___, bedrooms: ___, bathrooms: ___, how often: ___.",
  },

  // ───────────────────────── Strata ─────────────────────────
  {
    slug: "strata-cleaning-sydney",
    service: "strata-cleaning-lp",
    serviceTitle: "Strata Cleaning (ads page)",
    brandName: "Triple SR Commercial Cleaning",
    metaTitle: "Strata Cleaning Sydney | Common Areas | Triple SR",
    metaDescription: "Strata and apartment building cleaning across Sydney. Lobbies, lifts, stairs, car parks and bin rooms. Free site inspection and quote. 0427 724 809.",
    accent: { a: "#5b3cc4", b: "#0a7c8c" },
    visuals: {
      slides: ["stairs-mopping", "glass-door-vacuum-city", "team-corridor-vacuuming", "stairs-sweeping"],
      rows: [
        ["stairs-mopping-2", "pressure-washing-concrete", "restroom-floor-scrubber", "hall-floor-polished", "office-glass-partitions", "tile-floor-after-2"],
        ["team-office-vacuuming", "glass-door-vacuum", "pressure-washing-detail", "hall-floor-polished-2", "team-backpack-vacuum-mask", "restroom-vanity"],
      ],
      side: "team-corridor-vacuuming",
      rowsCaption: "Photos from our own cleaning jobs.",
    },
    hero: {
      h1: "Strata Cleaning in Sydney",
      highlight: "Strata Cleaning",
      sub: "Reliable, uniformed cleaners for lobbies, lifts, stairwells, car parks and bin rooms, with a written scope and a free site inspection.",
      bullets: ["Daily, weekly or fortnightly common-area cleaning", "Free site inspection and itemised written quote", "Easy to take to your committee"],
      image: "stairs-mopping",
      cta: "Request a Free Quote",
      microcopy: "Free and no obligation. We reply within one business day.",
    },
    form: {
      heading: "Request your free strata quote",
      button: "Request a Free Quote",
      fields: [
        { key: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
        { key: "role", label: "Your role", type: "select", required: true, options: [["Strata manager", "Strata manager"], ["Building manager", "Building manager"], ["Committee member", "Committee member"], ["Owner", "Owner"], ["Other", "Other"]] },
        { key: "phone", label: "Mobile number", type: "tel", required: true, placeholder: "04xx xxx xxx", autoComplete: "tel" },
        { key: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
        { key: "suburb", label: "Building suburb", type: "text", required: true, placeholder: "e.g. Parramatta", autoComplete: "address-level2" },
        { key: "floors", label: "Floors", type: "text", half: true, placeholder: "e.g. 8" },
        { key: "units", label: "Units", type: "text", half: true, placeholder: "e.g. 60" },
        { key: "current", label: "Current cleaning (optional)", type: "select", options: [["None", "None"], ["Weekly", "Weekly"], ["Fortnightly", "Fortnightly"], ["Other", "Other"]] },
      ],
    },
    trust: base(["Free site inspection", "Written, itemised quotes", "Uniformed teams"]),
    problem: {
      h2: "Common areas are the first thing residents notice",
      paras: [
        "Residents see the lobby, the lift and the stairwell every day. When the cleaning slips, they complain to the manager, and the manager hears about it at the next meeting.",
        "Strata cleaners often fall short in the same ways: different people every visit, tasks skipped, no one to call, and no record of what was done.",
        "We give you a written scope, a consistent team and one number to call.",
      ],
    },
    included: {
      h2: "Common-area cleaning, scoped in writing",
      groups: [
        { title: "Entry and circulation", items: ["Lobbies and entry foyers", "Lifts (floors, walls, buttons, mirrors)", "Corridors and landings", "Stairwells, handrails and balustrades"] },
        { title: "Glass and touch points", items: ["Entry doors and internal glass", "Intercom panels, door handles and handrails", "Mirrors and letterbox areas"] },
        { title: "Service areas", items: ["Bin rooms and rubbish chutes (accessible areas)", "Car parks and driveways (sweeping)", "Mail rooms and storage corridors"] },
        { title: "Shared facilities (where your building has them)", items: ["Gym, function room, meeting rooms, shared laundry", "Common bathrooms and amenities"] },
      ],
      extras: { title: "Periodic and add-on services (quoted separately)", items: ["Pressure washing of entries, driveways and bin areas", "Carpet steam cleaning of corridors and lobbies", "Window and glass cleaning", "Hard-floor polishing, strip and seal"] },
      note: "We clean only what's in your agreed scope. Gardens, pool maintenance and repairs are separate trades.",
    },
    table: {
      id: "frequency",
      h2: "A contract that fits your building",
      headers: ["Building type", "Typical rhythm", "Notes"],
      rows: [
        ["Small block (up to about 20 units)", "Weekly or fortnightly", "Entry, stairs, bin room"],
        ["Medium block", "Two to three times a week", "Adds lift, corridors, car park"],
        ["Large or high-rise", "Daily (weekdays)", "Full common-area scope, on-site checklist"],
      ],
      listTitle: "Every contract includes",
      list: ["A written scope and checklist, agreed before we start", "A consistent team who learn your building", "A named contact for the manager", "Cleaning records or sign-off sheets on request", "A return visit for reasonable issues within scope"],
      footnote: "A guide only. We set the frequency after inspecting the building.",
    },
    steps: {
      h2: "From first call to first clean",
      items: [
        { title: "Tell us about the building", body: "Suburb, floors, units and what you need cleaned." },
        { title: "Free site inspection", body: "We walk the building with you or the building manager and note access, bin rooms, lifts and problem areas." },
        { title: "Written quote and scope", body: "An itemised price, with the checklist and frequency, ready to forward to your committee." },
        { title: "We start", body: "Your team is briefed and introduced, and we confirm keys, fobs and access." },
      ],
    },
    why: {
      h2: "What strata managers get from us",
      items: [
        { title: "Consistent team", body: "Same uniformed cleaners, and we tell you if the roster changes." },
        { title: "One point of contact", body: "One phone number, one email, and we reply within one business day." },
        { title: "Clear scope in writing", body: "No arguments over what's included." },
        { title: "Commercial experience", body: "We clean offices, schools, aged care and industrial sites, and coordinate building access with managers across the Sydney CBD and Greater Sydney." },
        { title: "Easy transition", body: "Switching from another contractor? We handle the handover with your manager." },
        { title: "Local", body: "Based in Blacktown, servicing Greater Sydney." },
      ],
    },
    documents: {
      id: "documents",
      h2: "Everything your committee needs to approve us",
      items: [
        "Itemised written quote",
        "Cleaning scope and checklist",
        ...(cert ? ["Certificate of Currency (public liability) on request"] : []),
        "Cleaning sign-off sheets on request",
      ],
    },
    reviews: { h2: "What our customers say", ids: [1, 2, 11], note: "From our office and regular cleaning clients." },
    faqs: [
      { q: "How much does strata cleaning cost?", a: "It depends on building size, number of floors, car park, frequency and the scope. We inspect first, then send an itemised written quote you can take to your committee." },
      ...(cert ? [{ q: "Can you provide a Certificate of Currency?", a: "Yes. We can provide a Certificate of Currency for public liability on request." }] : []),
      { q: "Do you work with strata managers and building managers?", a: "Yes. We coordinate access, keys, fobs and any lift or loading dock bookings with the manager before we start." },
      { q: "What days and times do you clean?", a: "Most strata cleans happen on weekdays during the day, and we can arrange early-morning or other times. We agree a schedule that causes minimal disruption to residents." },
      { q: "Can you take over from our current cleaner?", a: "Yes. We inspect, write a new scope, agree a start date and handle the changeover." },
      { q: "How do we know the work has been done?", a: "You get a written checklist, and we provide sign-off sheets on request. You also have a direct number to call." },
      { q: "What if there's a problem between visits?", a: "Call 0427 724 809 or email us, and we'll respond as soon as we can. For reasonable issues within scope, we'll arrange a return visit." },
      { q: "Do you clean car parks and bin rooms?", a: "Yes. Bin rooms and car parks are common strata scope. Sweeping is part of regular cleans and pressure washing is available as an add-on." },
      { q: "Can you do a one-off deep clean before an AGM or sale period?", a: "Yes. We can quote a one-off deep clean or pressure wash." },
      { q: "Do you also quote for window cleaning?", a: "Yes, as an add-on or separately." },
    ],
    areas: { h2: "Strata cleaning across Greater Sydney", text: "Sydney CBD and fringe (Surry Hills, Pyrmont, Ultimo, Haymarket, Darling Harbour) · Parramatta · Inner West · Eastern Suburbs · North Shore · Western Sydney (Blacktown) · Hills District · South West · St George · Sutherland Shire" },
    finalCta: { h2: "Want one less thing on the committee agenda?", body: "Tell us about the building. We'll arrange a free inspection and send an itemised quote.", reassurance: "Free, no obligation. We reply within one business day." },
    whatsapp: null,
  },
];

// Pages served from a clean top-level URL (rewritten to /lp/[slug] in next.config.ts) instead of /lp/[slug].
export const lpTopLevel = new Set(["commercial-end-of-lease-cleaning-sydney"]);
export const lpPath = (slug: string) => (lpTopLevel.has(slug) ? `/${slug}` : `/lp/${slug}`);
export const lpBySlug = (slug: string) => landingPages.find((p) => p.slug === slug);
export const lpServiceTitles: Record<string, string> = Object.fromEntries(landingPages.map((p) => [p.service, p.serviceTitle]));
export const lpServiceSlugs = landingPages.map((p) => p.service);
