import type { Faq } from "@/content/services";

// Inline links use [label](/path) inside paragraph and list text.
export type Block =
  | { t: "h2"; id: string; text: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "img"; slug: string; caption: string }
  | { t: "callout"; title: string; text: string };

export type Post = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  category: string;
  date: string; // ISO with offset
  readMinutes: number;
  hero: string; // image slug
  keywords: string[];
  related: string[]; // service slugs
  body: Block[];
  faqs: Faq[];
};

export const posts: Post[] = [
  {
    slug: "end-of-year-office-cleaning-checklist-sydney",
    title: "End-of-Year Office Cleaning Checklist for Sydney Businesses",
    metaTitle: "End-of-Year Office Cleaning Checklist Sydney 2026 | Triple SR",
    description:
      "A practical end-of-year office cleaning checklist for Sydney businesses: what to clean, when to book before the Christmas shutdown, how to prepare and what affects cost.",
    excerpt:
      "Closing for Christmas? Use this practical checklist to reset your Sydney office before the holiday shutdown, from floors and kitchens to glass, restrooms and waste.",
    category: "Office cleaning",
    date: "2026-11-04T09:00:00+11:00",
    readMinutes: 6,
    hero: "office-lounge-city",
    keywords: ["end of year office clean sydney", "office cleaning checklist", "commercial cleaning sydney cbd", "christmas shutdown cleaning", "deep clean office"],
    related: ["regular-office-cleaning", "regular-window-cleaning", "commercial-end-of-lease-cleaning"],
    body: [
      {
        t: "callout",
        title: "The short answer",
        text: "An end-of-year office clean resets your workspace before the holiday shutdown so you return in January to a fresh, tidy office instead of stale air, old food and a layer of dust. Cover floors, kitchens, restrooms, glass, high-touch points and waste, book your cleaners early, and give them clear access.",
      },
      { t: "h2", id: "why", text: "Why do an end-of-year office clean in Sydney?" },
      {
        t: "p",
        text: "For many Sydney businesses the last weeks of December are a natural pause. Teams take leave, premises sit empty for days or weeks, and whatever was left behind (food in the fridge, bins, damp cloths, dust on desks) has time to turn into a problem. Coming back to a clean office sets the tone for the new year.",
      },
      {
        t: "p",
        text: "It's also a good moment to catch jobs that routine cleaning doesn't cover. Whether you're in a CBD tower, a Parramatta office or a business park in Western Sydney, the end of the year is the easiest time to schedule a deeper clean without disrupting the team.",
      },
      { t: "img", slug: "office-workstations", caption: "A cleared, freshly cleaned open-plan office is ready for the first day back." },
      { t: "h2", id: "checklist", text: "What should an end-of-year office cleaning checklist include?" },
      {
        t: "p",
        text: "Use the lists below as a starting point and adjust them for your premises. A good cleaner will walk the site with you and write a checklist for your building.",
      },
      { t: "h3", text: "Floors and carpets" },
      {
        t: "ul",
        items: [
          "Vacuum all carpet, including under desks once they're cleared and along skirting edges",
          "Mop hard floors in kitchens, reception, corridors and restrooms",
          "Spot-treat marks and spills, and consider steam cleaning carpets if they're due",
        ],
      },
      { t: "h3", text: "Desks, workstations and shared tables" },
      {
        t: "ul",
        items: [
          "Clear desks so every surface can be wiped, and move personal items into drawers",
          "Wipe monitors, keyboards and phones only if staff are happy for cleaners to do so",
          "Dust shelves, partitions, filing cabinets and the tops of cupboards",
        ],
      },
      { t: "img", slug: "office-high-shelf-dusting", caption: "High shelves and ledges collect dust that routine cleans often miss." },
      { t: "h3", text: "Kitchens and breakout areas" },
      {
        t: "ul",
        items: [
          "Empty the fridge, freezer and pantry of anything that won't last the break",
          "Clean the inside and outside of the microwave, fridge, dishwasher and kettle",
          "Wipe benches, sinks, taps and splashbacks, then mop the floor",
        ],
      },
      { t: "h3", text: "Restrooms" },
      {
        t: "ul",
        items: [
          "Descale and sanitise basins, toilets, urinals and fittings",
          "Clean mirrors, dispensers and partitions",
          "Restock paper, soap and sanitary supplies so you're covered when staff return",
        ],
      },
      { t: "img", slug: "restroom-vanity", caption: "Restrooms get a full sanitise and a restock before the shutdown." },
      { t: "h3", text: "Glass, doors and high-touch points" },
      {
        t: "ul",
        items: [
          "Clean internal glass, partitions and entry doors (see our [commercial window cleaning](/services/regular-window-cleaning))",
          "Disinfect door handles, light switches, lift buttons and shared touch screens",
          "Wipe reception counters, meeting-room tables and the front entry",
        ],
      },
      { t: "h3", text: "Waste, recycling and air vents" },
      {
        t: "ul",
        items: [
          "Empty and relined every bin, and clear recycling and cardboard",
          "Dust accessible air vents and ceiling fixtures",
          "Check that nothing perishable is left in bins before the building closes",
        ],
      },
      { t: "h2", id: "deep-vs-regular", text: "Deep clean or regular clean: what's the difference?" },
      {
        t: "p",
        text: "A regular [office clean](/services/regular-office-cleaning) keeps the space tidy week to week: floors, bins, benches, restrooms and touch points. A deep clean goes further, with detail work such as skirting boards, vents, the insides of appliances, glass, carpets and anywhere dust and grime have built up over months.",
      },
      {
        t: "p",
        text: "Many businesses keep their regular schedule and add a deeper clean once a year, usually before the Christmas shutdown. If you're moving premises instead, you may need a [commercial end of lease clean](/services/commercial-end-of-lease-cleaning), which follows the lease and the agent's checklist.",
      },
      { t: "img", slug: "team-corridor-vacuuming", caption: "Corridors, entries and carpet edges are covered in a deep clean." },
      { t: "h2", id: "when-to-book", text: "When should you book your clean before Christmas?" },
      {
        t: "p",
        text: "Book as early as you can. The last fortnight before Christmas is busy for cleaners because many businesses want the same dates, and the best slots, usually the final evening or the weekend before you close, fill first.",
      },
      {
        t: "ul",
        items: [
          "Confirm your last working day and your reopening date",
          "Ask for a free on-site quote and agree the scope in writing",
          "Pick a time that works with other trades, such as IT, security or maintenance",
          "Plan a second, lighter clean on the day before reopening if your office sits empty for weeks",
        ],
      },
      { t: "h2", id: "prepare", text: "How do you prepare your office for the cleaners?" },
      {
        t: "ol",
        items: [
          "Tell your team the clean-up date so they clear desks and take valuables and personal items",
          "Remove food, drinks and anything perishable from the fridge, pantry and desks",
          "Secure confidential papers and any equipment cleaners shouldn't touch",
          "Arrange access: keys, cards, alarm codes and building management approvals",
          "Mention any no-go rooms, fragile items or safety rules in advance",
        ],
      },
      { t: "img", slug: "glass-door-vacuum-city", caption: "Glass partitions and doors are cleaned inside and out for a bright start to the year." },
      { t: "h2", id: "cost", text: "How much does an end-of-year office clean cost?" },
      {
        t: "p",
        text: "The price depends on the size of the office, the number of restrooms and kitchens, how much detail work you want, access hours and how dirty things are. A small suite and a multi-floor CBD office are very different jobs, so any honest quote starts with an inspection.",
      },
      {
        t: "p",
        text: "At Triple SR we inspect your premises and send a clear written quote with no obligation. Ask for a breakdown so you can see what's included and what's optional, such as carpet steam cleaning or window cleaning.",
      },
      { t: "h2", id: "professional", text: "Should you hire professional commercial cleaners?" },
      {
        t: "p",
        text: "You can ask staff to tidy up, but a professional team brings the equipment, the products and the time to do the detail work properly, and they're accountable for the result. That frees your people to finish the year on their own work rather than scrubbing the kitchen.",
      },
      {
        t: "p",
        text: "Triple SR Commercial Cleaning is based in Blacktown and cleans offices across Sydney, with the CBD as a primary focus. See our [service areas](/areas), or [contact us](/get-a-quote) for a free quote.",
      },
    ],
    faqs: [
      {
        q: "How far ahead should I book an end-of-year office clean in Sydney?",
        a: "As early as possible. Slots in the final fortnight before Christmas fill quickly, so confirm your last working day and request a quote a few weeks ahead.",
      },
      {
        q: "What's included in an end-of-year office deep clean?",
        a: "Typically floors and carpets, desks and shared surfaces, kitchens and appliances, restrooms, glass and partitions, high-touch points, bins and accessible vents. Your quote lists exactly what's covered.",
      },
      {
        q: "Can the clean happen after hours or on the weekend?",
        a: "Yes. Evening and weekend cleans are common for end-of-year jobs so your team isn't disturbed. Tell us your building's access times and alarm procedures.",
      },
      {
        q: "Do I need to clear my desks before the cleaners arrive?",
        a: "It helps. Clearing desks and securing personal and confidential items means every surface can be wiped, and nothing important is moved.",
      },
      {
        q: "Does Triple SR clean offices in the Sydney CBD?",
        a: "Yes, Sydney CBD is our primary focus. We can coordinate inductions, access cards and lift bookings with your building manager.",
      },
    ],
  },
];

export const postBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const formatPostDate = (iso: string) =>
  new Intl.DateTimeFormat("en-AU", { day: "numeric", month: "long", year: "numeric", timeZone: "Australia/Sydney" }).format(new Date(iso));
