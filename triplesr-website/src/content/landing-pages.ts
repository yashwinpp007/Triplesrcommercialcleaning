import { site } from "@/config/site";
import type { Faq } from "@/content/services";

// Copy for the Google Ads landing pages (/lp/[slug]). Source of truth: google-ads-landing-pages/*.md.
// Rules: no invented claims, no prices, reviews come verbatim from reviews.json by id.
// Insurance / police-check chips only appear when site.confirmed says they are true.

export type FieldOption = [value: string, label: string];
export type LpField = {
  key: string;
  label: string;
  type: "text" | "tel" | "email" | "select" | "date";
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
  hero: { h1: string; sub: string; bullets: string[]; image: string; cta: string; microcopy: string };
  form: { heading: string; button: string; fields: LpField[] };
  trust: string[];
  problem: { h2: string; paras: string[] };
  included: { h2: string; groups: LpList[]; extras?: LpList; note?: string };
  table?: { id: string; h2: string; headers: string[]; rows: string[][]; listTitle?: string; list?: string[]; footnote?: string };
  steps: { h2: string; items: { title: string; body: string }[] };
  why?: { h2: string; items: { title: string; body: string }[] };
  pricing?: { h2: string; intro: string; items: string[]; outro: string };
  documents?: { id: string; h2: string; items: string[] };
  beforeAfter?: { before: string; after: string; caption: string };
  gallery?: { slugs: string[]; caption: string };
  reviews: { h2: string; ids: number[]; note?: string };
  faqs: Faq[];
  areas: { h2: string; text: string };
  finalCta: { h2: string; body: string; reassurance: string };
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
  // ───────────────────────── End of lease ─────────────────────────
  {
    slug: "end-of-lease-cleaning-sydney",
    service: "end-of-lease-lp",
    serviceTitle: "End of Lease Cleaning (ads page)",
    brandName: "Triple SR Cleaning Services",
    metaTitle: "End of Lease Cleaning Sydney | Free Quote | Triple SR",
    metaDescription: "Sydney end of lease cleaning, done to the agent's checklist. Oven, bathrooms, windows and floors. Free quote. Call 0427 724 809.",
    hero: {
      h1: "End of Lease Cleaning in Sydney",
      sub: "We clean your rental top to bottom against the agent's checklist, so you can hand back the keys and get on with your move.",
      bullets: ["Oven, rangehood, bathrooms, kitchen, windows and floors", "Flexible days, including evenings and weekends", "Free, no-obligation written quote"],
      image: "tile-floor-after",
      cta: "Get My Free Quote",
      microcopy: "Free and no obligation. We reply within one business day.",
    },
    form: {
      heading: "Get your free end of lease quote",
      button: "Get My Free Quote",
      fields: [
        { key: "name", label: "Your name", type: "text", required: true, autoComplete: "name" },
        { key: "phone", label: "Mobile number", type: "tel", required: true, placeholder: "04xx xxx xxx", autoComplete: "tel" },
        { key: "suburb", label: "Suburb", type: "text", required: true, placeholder: "e.g. Parramatta", autoComplete: "address-level2" },
        { key: "property", label: "Property type", type: "select", required: true, options: propertyTypes, half: true },
        { key: "bedrooms", label: "Bedrooms", type: "select", required: true, options: bedrooms, half: true },
        { key: "date", label: "Preferred clean date (optional)", type: "date" },
        { key: "email", label: "Email (optional)", type: "email", autoComplete: "email" },
      ],
    },
    trust: base(["Local Sydney team, based in Blacktown", "Free written quotes", "Open 24 hours, 7 days"]),
    problem: {
      h2: "Moving out is stressful enough",
      paras: [
        "You have boxes to pack, keys to return and a bond on the line. The last thing you need is spending your final weekend scrubbing an oven.",
        "Agents inspect every room against a checklist. Miss a shower screen, a window track or the inside of the oven, and you could be asked to go back and clean again.",
        "We take the cleaning off your list and work through the same places the agent checks.",
      ],
    },
    included: {
      h2: "What's included in your end of lease clean",
      groups: [
        { title: "Kitchen", items: ["Oven inside and out", "Rangehood and filter", "Cooktop, sink and benchtops", "Cupboards and drawers, inside and out", "Fridge and freezer (if left in place)"] },
        { title: "Bathrooms and laundry", items: ["Shower, screen, bath and tiles", "Toilet, basin and vanity", "Mirrors, taps and fixtures", "Laundry tub and cabinets"] },
        { title: "Bedrooms and living areas", items: ["Wardrobes and built-ins, inside and out", "Skirting boards, doors and door frames", "Light switches and power points", "Light fittings and ceiling fans (accessible)", "Marks and scuffs on walls where they come off"] },
        { title: "Windows, floors and extras", items: ["Internal windows, sills and tracks", "Blinds and curtain tracks", "Vacuuming and mopping of all floors", "Balcony or patio sweep"] },
      ],
      extras: { title: "Add-ons (quoted separately)", items: ["Carpet steam cleaning", "Pressure washing of balcony, patio or driveway"] },
      note: "We don't do repairs, painting or make-good work. If the agent lists those, you'll need a separate trade, and we can clean around them.",
    },
    steps: {
      h2: "Four simple steps",
      items: [
        { title: "Tell us about the place", body: "Fill in the form or call. We ask the size, the suburb and your move-out date." },
        { title: "Get a clear written quote", body: "No hidden extras. We confirm what's included and the price." },
        { title: "We clean", body: "A uniformed team arrives on the day, with the equipment and products, and works through the checklist." },
        { title: "Hand back the keys", body: "Walk through, then book the agent's inspection. If something reasonable within scope was missed, tell us and we'll arrange a return visit." },
      ],
    },
    pricing: {
      h2: "How we price your clean",
      intro: "We give a fixed written quote, so you know the cost before we start. The price depends on:",
      items: ["Number of bedrooms and bathrooms", "Size and condition of the property", "Whether you need carpet steam cleaning, balcony washing or other add-ons", "How soon you need it, and the day and time"],
      outro: "Not sure? Send us the suburb, bedrooms and move-out date, and we'll reply with a quote.",
    },
    beforeAfter: { before: "tile-floor-before", after: "tile-floor-after", caption: "A real floor we cleaned. Photos are from our own jobs." },
    reviews: { h2: "What our customers say", ids: [4, 13, 14] },
    faqs: [
      { q: "What does an end of lease clean include?", a: "A top-to-bottom clean of kitchen, bathrooms, bedrooms, living areas, windows and floors, including the oven and rangehood. The checklist above shows what we cover, and your quote lists what's included for your property." },
      { q: "Will it pass the agent's inspection?", a: "We clean to the standard agents check, but the agent or landlord makes the final decision. If they raise a reasonable item within the scope of your clean, tell us promptly and we'll arrange a return visit." },
      { q: "Can I get my full bond back?", a: "We can't promise that. The bond depends on the whole condition of the property, including damage and wear that cleaning can't fix. A thorough clean removes the most common reason for deductions." },
      { q: "Do I need to be home?", a: "No. Many customers hand over the keys or arrange access with the agent. We'll agree the plan when you book." },
      { q: "Do you bring your own equipment and products?", a: "Yes. We bring professional equipment and products." },
      { q: "Do you clean carpets?", a: "Carpet steam cleaning is available as an add-on and is quoted separately." },
      { q: "How far ahead should I book?", a: "As early as you can. Final weeks before a move are busy, so contact us once your vacate date is set." },
      { q: "What if I only need part of the property cleaned?", a: "Tell us what you need. We can quote a smaller scope, but check your lease and the agent's requirements first." },
      { q: "Do you service my suburb?", a: "We cover Greater Sydney. Enter your suburb in the form and we'll confirm." },
    ],
    areas: { h2: "End of lease cleaning across Greater Sydney", text: sydneyAreas },
    finalCta: { h2: "Ready to hand back the keys?", body: "Tell us the suburb and your move-out date. We'll send a clear written quote.", reassurance: "Free quote. No obligation. Open 24 hours, 7 days." },
    whatsapp: "Hi, I'd like a quote for an end of lease clean. Suburb: ___, bedrooms: ___, move-out date: ___.",
  },

  // ───────────────────────── Regular house cleaning ─────────────────────────
  {
    slug: "house-cleaning-sydney",
    service: "house-cleaning-lp",
    serviceTitle: "Regular House Cleaning (ads page)",
    brandName: "Triple SR Cleaning Services",
    metaTitle: "House Cleaning Sydney | Regular Cleaners | Triple SR",
    metaDescription: "Reliable weekly and fortnightly house cleaning across Sydney. Same friendly team each visit. Rated 4.6 on Google. Free quote: 0427 724 809.",
    hero: {
      h1: "House Cleaning in Sydney, Done Properly",
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
    hero: {
      h1: "Strata Cleaning in Sydney",
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
    gallery: { slugs: ["team-corridor-vacuuming", "stairs-mopping", "glass-door-vacuum-city"], caption: "Our team at work" },
    reviews: { h2: "From our regular cleaning clients", ids: [1, 2, 11], note: "These reviews are from our office and regular cleaning clients, not strata buildings." },
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

export const lpBySlug = (slug: string) => landingPages.find((p) => p.slug === slug);
export const lpServiceTitles: Record<string, string> = Object.fromEntries(landingPages.map((p) => [p.service, p.serviceTitle]));
export const lpServiceSlugs = landingPages.map((p) => p.service);
