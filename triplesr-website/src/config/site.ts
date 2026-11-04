export const site = {
  name: "Triple SR Commercial Cleaning",
  shortName: "Triple SR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://triplesrcommercialcleaning.com.au",
  tagline: "Commercial cleaning across Sydney, led by the CBD.",
  description:
    "Triple SR Commercial Cleaning delivers reliable office, school, childcare, aged care, warehouse, industrial and window cleaning across Sydney, including the CBD. Free on-site quotes.",
  address: { locality: "Blacktown", region: "NSW", country: "AU", text: "Blacktown, NSW, Australia" },
  email: "triplesrservicespty@gmail.com",
  phoneDisplay: "0427 724 809",
  phoneTel: "+61427724809",
  // WhatsApp click-to-chat (international format, digits only) and the pre-filled opening message
  whatsappNumber: "61427724809",
  whatsappMessage: "Hi Triple SR Commercial Cleaning, I'd like a free quote for commercial cleaning.",
  social: {
    instagram: "https://www.instagram.com/triplesr_solutions?utm_source=qr",
    facebook:
      "https://www.facebook.com/people/Triple-SR-Services/61566346787467/?mibextid=wwXIfr&rdid=luDy7rq1QUVLvzg6&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DNFEQJoUy%2F%3Fmibextid%3DwwXIfr",
  },
  googleProfile: "https://www.google.com/search?q=triple+sr+services#lrd=0x4ff9a269be8bed0f:0x36e7f556a36a4983,1,,,,",
  googleRating: { value: 4.6, count: 36 }, // verified from the Google Business Profile on 2026-11-04
  // Opening hours in Australia/Sydney local time. Day 0 = Sunday. null = closed.
  hours: [
    null,
    { open: "09:00", close: "17:00" },
    { open: "09:00", close: "17:00" },
    { open: "09:00", close: "17:00" },
    { open: "09:00", close: "17:00" },
    { open: "09:00", close: "17:00" },
    { open: "10:00", close: "18:00" },
  ] as ({ open: string; close: string } | null)[],
  hoursText: [
    { days: "Mon – Fri", time: "9.00am – 5.00pm" },
    { days: "Saturday", time: "10.00am – 6.00pm" },
    { days: "Sunday", time: "Closed" },
  ],
  // Fill these in only when confirmed by the client; the UI hides anything left empty.
  confirmed: { abn: "", insurance: false, policeChecked: false, yearsInBusiness: "20+" },
  responseSla: "We reply to every quote request within one business day.",
};

export type Site = typeof site;
