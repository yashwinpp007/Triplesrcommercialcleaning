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
    instagram: "https://www.instagram.com/servicestriplesr?xtok=a2R4aWptYXI5eHFw",
    facebook: "https://www.facebook.com/share/1F8SsdzSqZ/",
  },

  googleProfile: "https://www.google.com/search?q=triple+sr+services#lrd=0x4ff9a269be8bed0f:0x36e7f556a36a4983,1,,,,",
  googleRating: { value: 4.6, count: 36 }, // verified from the Google Business Profile on 2026-11-04
  // Opening hours in Australia/Sydney local time. Day 0 = Sunday. null = closed. Currently open 24 hours, 7 days.
  hours: Array.from({ length: 7 }, () => ({ open: "00:00", close: "24:00" })) as ({ open: string; close: string } | null)[],
  hoursText: [{ days: "Monday – Sunday", time: "Open 24 hours" }],
  // Fill these in only when confirmed by the client; the UI hides anything left empty.
  confirmed: { abn: "", insurance: false, policeChecked: false, yearsInBusiness: "20+" },
  responseSla: "We reply to every quote request within one business day.",
};

export type Site = typeof site;
