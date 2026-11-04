import type { Faq } from "@/content/services";
import { regions, type Region } from "@/content/areas";
import { site } from "@/config/site";

export const homeFaqs: Faq[] = [
  { q: "Do you provide commercial cleaning in the Sydney CBD?", a: "Yes. Sydney CBD is our primary service area. We clean offices, retail and strata buildings and can coordinate inductions, access cards and lift bookings with your building manager." },
  { q: "How do I get a quote for commercial cleaning?", a: "Send the quote form or call 0427 724 809. We'll arrange a free on-site inspection or review your plans, then send a written quote with no obligation." },
  { q: "What types of businesses do you clean for?", a: "Offices, schools, childcare centres, aged care and health facilities, hospitals, warehouses, factories and industrial sites, plus window cleaning and end of lease cleans." },
  { q: "Can you clean after hours?", a: "Yes. Most commercial cleans run after hours or early in the morning, and we can also schedule weekend work." },
  { q: "Do you bring your own equipment and products?", a: "Yes. We bring professional equipment and products. If your site needs particular products, tell us and we'll work with them." },
  { q: "How quickly will you reply to my enquiry?", a: site.responseSla },
];

export const servicesFaqs: Faq[] = [
  { q: "Which cleaning services does Triple SR offer?", a: "Regular office cleaning, commercial end of lease, health and aged care, hospital, warehouse, industrial, factory, education and childcare, school and window cleaning." },
  { q: "Can I combine several services into one contract?", a: "Yes. Many clients combine office cleaning with window cleaning or periodic deep cleans for one simple schedule and one contact." },
  { q: "Do you work on short-term or one-off jobs?", a: "Yes. End of lease cleans, deep cleans and project clean-ups are common one-off jobs." },
  { q: "How do I choose between similar services?", a: "Each service page explains the difference, such as warehouse versus factory or aged care versus hospital. If you're still unsure, call us and we'll point you to the right scope." },
];

export const aboutFaqs: Faq[] = [
  { q: "Where is Triple SR Commercial Cleaning based?", a: "We're based in Blacktown, NSW, and service commercial clients across Greater Sydney, with Sydney CBD as a primary focus." },
  { q: "Who will be cleaning my premises?", a: "A consistent team wearing Triple SR uniforms. We tell you if the roster changes." },
  { q: "How do you keep quality consistent?", a: "We write a site-specific checklist, inspect the first cleans closely and stay in touch so any issue gets fixed quickly." },
  { q: "How can I check your reviews?", a: "Our Google Business Profile lists customer reviews, and we've featured a selection on our reviews page." },
];

export const galleryFaqs: Faq[] = [
  { q: "Are these photos of real Triple SR jobs?", a: "Yes. They are photos from our own jobs, with client details removed or cropped out." },
  { q: "Can I see examples for my industry?", a: "Each service page includes photos relevant to that service. Call us if you'd like to see more examples for your sector." },
  { q: "Do you share before and after results?", a: "Yes. The before and after slider shows results from a real tiled entry floor we cleaned, and more examples can be arranged on request." },
  { q: "Can I follow your work on social media?", a: "Yes. We share work on Instagram and Facebook; the links are in the footer of every page." },
];

export const reviewsFaqs: Faq[] = [
  { q: "Where do these reviews come from?", a: "They are copied word for word from our Google Business Profile." },
  { q: "What is your overall Google rating?", a: `${site.googleRating.value} out of 5 from ${site.googleRating.count} Google reviews, as at the date we last checked our profile.` },
  { q: "How can I leave a review?", a: "Use the Leave us a review button on this page to go to our Google profile." },
  { q: "Do you reply to reviews?", a: "Yes. We read and respond to reviews, and we aim to put things right if a client is unhappy." },
];

export const contactFaqs: Faq[] = [
  { q: "What are your opening hours?", a: "We're available 24 hours a day, 7 days a week. Call 0427 724 809 any time and we'll get back to you as soon as we can." },
  { q: "How fast will you respond?", a: site.responseSla },
  { q: "Do you offer free quotes?", a: "Yes. We offer free, no-obligation quotes, usually after a short on-site inspection." },
  { q: "What's the best way to reach you?", a: "Call 0427 724 809 for the fastest response, or send the quote form and we'll reply by phone or email." },
];

export const quoteFaqs: Faq[] = [
  { q: "What information do you need for a quote?", a: "The type of site, suburb, approximate size, how often you need cleaning and your contact details." },
  { q: "Is the quote free?", a: "Yes. Quotes are free and come with no obligation." },
  { q: "Do you inspect the site first?", a: "For most commercial sites we do, so the quote is accurate. For simple jobs we may quote from details and photos." },
  { q: "How do you handle my details?", a: "We use your details only to respond to your enquiry. See our Privacy Policy for more." },
];

export const areasFaqs: Faq[] = [
  { q: "Which areas of Sydney do you service?", a: "We service Greater Sydney, with Sydney CBD as our primary focus and Blacktown and Western Sydney as our home base." },
  { q: "Do you service the Sydney CBD?", a: "Yes. We clean offices and commercial buildings in the CBD and fringe suburbs and can arrange building access with your manager." },
  { q: "Can I check whether you cover my suburb?", a: "Yes. Use the suburb checker on this page, or call us if your suburb isn't listed." },
  { q: "Is there a call-out fee for areas further away?", a: "Pricing depends on size, frequency and travel. We'll include everything in a single written quote." },
];

export const privacyFaqs: Faq[] = [
  { q: "What personal information do you collect?", a: "Only what you give us through the quote form or by contacting us: name, contact details, business details and your message." },
  { q: "Do you sell my information?", a: "No. We use it only to respond to your enquiry and run our business." },
  { q: "How can I access or delete my information?", a: `Email ${site.email} and we'll respond to access, correction or deletion requests.` },
  { q: "Do you use cookies?", a: "Essential cookies only by default. Analytics are off unless you choose to allow them." },
];

export const termsFaqs: Faq[] = [
  { q: "Are quotes binding?", a: "Quotes are valid for the period stated and are based on the scope we inspected or were given." },
  { q: "What happens if the scope changes?", a: "We'll discuss any change and confirm updated pricing in writing before extra work starts." },
  { q: "How do I raise an issue with a clean?", a: "Call or email us as soon as possible and we'll arrange a return visit for reasonable issues within scope." },
  { q: "Where can I find your policies?", a: "This website's Privacy Policy and these terms apply; contact us if you need more." },
];

export function regionFaqs(r: Region): Faq[] {
  const sub = r.suburbs.slice(0, 5).join(", ");
  const base: Faq[] = [
    { q: `Do you provide commercial cleaning in ${r.name}?`, a: `Yes. We clean commercial sites across ${r.name}, including ${sub} and nearby suburbs.` },
    { q: `What kinds of sites do you clean in ${r.name}?`, a: `Typical sites include ${r.context}. We also clean schools, childcare centres and offices; see the service pages for details.` },
    { q: `How do I get a quote for ${r.name}?`, a: "Send the quote form with your suburb or call 0427 724 809. We arrange a free inspection where needed and send a written quote." },
    { q: `Can you clean after hours in ${r.name}?`, a: "Yes. Evening, early-morning and weekend cleans are available and we'll work to your site's access rules." },
  ];
  if (r.primary) {
    base.push(
      { q: "Can you arrange building inductions and access cards in the CBD?", a: "Yes. We coordinate inductions, access cards, lift bookings and loading-dock arrangements with your building manager before starting." },
      { q: "Do you clean end of lease offices in the CBD?", a: "Yes. We clean to the agent's or landlord's checklist and can coordinate with make-good trades." },
    );
  }
  return base;
}

export const regionList = regions;

export const blogFaqs: Faq[] = [
  { q: "What does the Triple SR blog cover?", a: "Practical commercial cleaning advice for Sydney businesses: checklists, how to prepare for cleans, what affects cost and how to choose a cleaner." },
  { q: "How often do you publish new articles?", a: "We add new guides regularly, so check back or follow us on Instagram and Facebook for updates." },
  { q: "Can I ask for an article on a specific cleaning topic?", a: "Yes. Email triplesrservicespty@gmail.com or call 0427 724 809 with the topic you'd like us to cover." },
  { q: "Is the advice on the blog specific to Sydney?", a: "It's written for Sydney and NSW businesses, but most of the cleaning guidance applies to any commercial premises." },
];
