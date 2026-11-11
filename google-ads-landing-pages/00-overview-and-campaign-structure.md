# Google Ads Launch Pack: Overview and Campaign Structure

Three Search campaigns, three dedicated landing pages (one message, one CTA each).

| # | Campaign | Landing page (suggested URL) | Primary conversion |
|---|---|---|---|
| 1 | End of Lease Cleaning | `/lp/end-of-lease-cleaning-sydney` | Quote form or call |
| 2 | Regular House Cleaning | `/lp/house-cleaning-sydney` | Quote form or call |
| 3 | Strata Cleaning | `/lp/strata-cleaning-sydney` | Quote form or call |

Page copy: `01-end-of-lease-cleaning.md`, `02-regular-house-cleaning.md`, `03-strata-cleaning.md`.

---

## 1. Decisions and facts to confirm BEFORE launch

Everything in the pages uses only facts already on your website, in `site.ts`, or in your Google reviews. Items marked `TODO` in the pages are things I could not verify, and I did not make them up.

| # | Issue | Why it matters | Recommendation |
|---|---|---|---|
| 1 | **Brand mismatch.** The site is "Triple SR Commercial Cleaning" and sells only commercial services. Two of the three campaigns (end of lease, house cleaning) are mostly **residential** searches. | Someone searching "house cleaner near me" who lands on a "Commercial Cleaning" page may bounce. Residential reviews on your Google profile sit under the name **Triple SR Cleaning Services Pty Ltd**. | Use "Triple SR Cleaning Services" as the brand on the residential pages and ads. Keep "Commercial" on the strata page. |
| 2 | **Insurance and police checks are unconfirmed** (`confirmed.insurance` and `policeChecked` are `false` in `site.ts`). | Strata managers ask for a Certificate of Currency before they will even quote. Residents trust "insured" and "police-checked". | Confirm. If true, add them as trust chips on all three pages. If not, leave them out. |
| 3 | **Residential service scope.** Your site has no residential service page. | The ads promise a service the website does not currently describe. | Confirm the scope on page 01 and 02 (what's included, carpet steam, oven, windows). Edit anything you don't offer. |
| 4 | **Service area.** Your site says Greater Sydney. | Ads set to all of Sydney can burn budget on suburbs you can't reach. | Start with Western Sydney + Parramatta + Hills + Inner West + CBD, then expand on data. |
| 5 | **Re-clean policy.** Your Terms say you'll arrange "a return visit for reasonable issues within scope". | End of lease buyers need to know what happens if the agent finds something. | Pages use that wording. Don't upgrade it to "guarantee" unless you decide to offer one. |
| 6 | **Bond.** One review says the customer got their full bond back. | You can't promise bond outcomes. The agent or landlord decides. | Pages say "cleaned to the standard agents inspect". Never "bond back guaranteed". |
| 7 | **Strata proof.** You have no strata-specific Google review. | Strata decision-makers want a reference. | Ask one managed building or strata manager for a Google review (or a written reference) before spending heavily. |
| 8 | **Ratings.** Verified aggregate is **4.6 from 36 Google reviews**. | Showing 5.0 is false and risks a trust and ad-policy problem. | Pages use 4.6 / 36 everywhere. Review quotes are verbatim from `reviews.json`. |
| 9 | **Years in business.** `site.ts` has `yearsInBusiness: "20+"`. | Unclear whether this is verified. | Not used in the copy. Add it only if true. |
| 10 | **Prices.** No prices were provided. | Price-led ads convert well but only if accurate. | No prices appear. If you want "from $X", send me the price list and I'll add it. |

---

## 2. Landing-page rules (apply to all three)

1. **Separate, focused pages.** Build them as `/lp/…` routes with `noindex` (they exist for ads; the SEO pages stay separate). Add them to the sitemap only if you want them indexed.
2. **No main navigation.** Logo (not clickable away) + phone number + one CTA button. Fewer exits means more leads.
3. **Match the ad.** The H1 repeats the searcher's words (message match raises both Quality Score and conversion rate).
4. **One conversion goal per page:** the quote form, with the phone number as the second path.
5. **Sticky mobile bar:** Call / WhatsApp / Get Quote (you already have `MobileBar` and `FloatingContact` components).
6. **Hero form above the fold**, short: name, phone, suburb, service detail (4 to 5 fields). Email optional. Reuse `/api/quote` and `/thank-you`.
7. **Speed:** hero image as WebP, no video autoplay on mobile, page under 3 seconds on 4G.
8. **Photos:** use the real photos already in `public/images` (see the "Image picks" on each page). Don't show clients' signage, children or residents.
9. **Tone:** plain Australian English, short sentences, no exclamation marks, no unverifiable superlatives.
10. **Form fields to add** for residential: bedrooms, bathrooms, property type (house, apartment, townhouse), "Is the property furnished or empty?", preferred date. For strata: building type, number of floors/units, current provider (optional), contact role.

---

## 3. Conversion tracking (set up first, test before spending a dollar)

| Conversion | How | Value |
|---|---|---|
| Quote form submitted | GA4 event on `/thank-you` import into Google Ads (your `track()` helper already fires events after consent) | Primary |
| Phone call click (mobile) | Click-to-call event on the tel: link | Primary |
| Calls from ad (call asset) | Call asset with conversion tracking, minimum call length 30 seconds | Primary |
| WhatsApp click | Event on the WhatsApp link | Secondary |

Notes:
- Consent: your site only fires analytics after consent. That means some conversions won't be measured. Consider Google Consent Mode v2 so Google can model the gap.
- Add UTM parameters in the final URL: `?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}`.
- Pass the service and suburb into the form as hidden fields so each lead is tagged to its campaign.
- Enhanced conversions: send hashed email or phone with the form submission.

---

## 4. Account and campaign structure

```
Google Ads account
├── GOOG_Search_EndOfLease_Sydney
│   ├── Ad group: End of lease cleaning (exact + phrase)
│   ├── Ad group: Bond cleaning (exact + phrase)
│   ├── Ad group: Move out / vacate cleaning (phrase)
│   └── Ad group: Apartment / unit end of lease (phrase)
├── GOOG_Search_HouseCleaning_Sydney
│   ├── Ad group: House cleaning (exact + phrase)
│   ├── Ad group: Regular / weekly / fortnightly cleaner (phrase)
│   ├── Ad group: Home cleaning services (phrase)
│   └── Ad group: Apartment cleaning (phrase)
└── GOOG_Search_Strata_Sydney
    ├── Ad group: Strata cleaning (exact + phrase)
    ├── Ad group: Building / common area cleaning (phrase)
    └── Ad group: Apartment block cleaning (phrase)
```

Naming convention: `GOOG_Search_[Service]_[Area]`.

### Settings (all three campaigns)

- **Network:** Search only. Turn OFF Search Partners and Display expansion for the first 4 weeks.
- **Location:** "Presence" targeting only (people in the area), not "presence or interest".
- **Language:** English.
- **Bidding:** start with **Maximise Clicks with a max CPC cap** (or Manual CPC) until about 15 conversions per campaign, then switch to **Maximise Conversions**, and later to Target CPA once you have 30+ conversions.
- **Ad schedule:** your business is open 24/7, so run all hours. Review hour-of-day data after 4 weeks and trim wasted hours.
- **Assets (extensions):** sitelinks, callouts, structured snippets, call asset, location asset (link your Google Business Profile), and your 4.6 rating via review extension only if eligible.
- **Budget:** you did not give a budget, so I did not guess. Split it roughly **40% end of lease, 35% house cleaning, 25% strata** at the start, then rebalance to the lowest cost per lead.
- **Testing rule:** run 2 to 3 responsive search ads per ad group, pin only headline 1 position where noted, and don't change anything for the first 2 weeks.

### Negative keywords

Add at campaign level. Review the search terms report weekly.

**Shared across all three:** free, jobs, job, career, careers, employment, hiring, vacancy, salary, course, training, diy, how to, tutorial, youtube, reddit, cheap, cheapest, gumtree, airtasker, franchise, equipment, supplies, products, machine, vacuum for sale, second hand, used, uk, nz, qld, melbourne, brisbane, perth, adelaide, canberra.

| Campaign | Extra negatives |
|---|---|
| End of lease | commercial, office, warehouse, factory, school, car, vehicle, ac, air con, bin, gutter, solar, `checklist` (informational, add as exact-match negative unless you want a content funnel), template, form, nsw fair trading, tribunal, bond refund, bond return |
| House cleaning | commercial, office, industrial, end of lease (send to the other campaign), bond, carpet only, pest, lawn, gardening, window only, jobs for cleaners, babysitter, au pair, maid agency, live in |
| Strata | house cleaning, home, domestic, residential, end of lease, bond, strata title, strata lawyer, strata levy, strata fees, strata law, strata act, strata manager jobs, strata search, strata report, strata insurance, strata plan |

---

## 5. Keyword plan

Start tight. Use exact match and phrase match. Avoid broad match until conversions exist.

### Campaign 1: End of Lease

| Ad group | Exact `[ ]` | Phrase `" "` |
|---|---|---|
| End of lease cleaning | [end of lease cleaning sydney], [end of lease cleaners], [end of lease cleaning near me], [end of tenancy cleaning sydney] | "end of lease cleaning" , "end of lease cleaners sydney" |
| Bond cleaning | [bond cleaning sydney], [bond back cleaning sydney], [bond cleaners near me] | "bond cleaning", "bond cleaners" |
| Move out / vacate | [vacate cleaning sydney], [move out cleaning sydney] | "move out cleaning", "vacate clean" |
| Apartment / unit | [apartment end of lease cleaning sydney], [unit end of lease cleaning] | "apartment end of lease clean" |

Suburb variants worth adding once the base is working (one phrase-match keyword per suburb group, not hundreds): Parramatta, Blacktown, Penrith, Castle Hill, Bondi, Surry Hills, Chatswood, Liverpool.

### Campaign 2: Regular House Cleaning

| Ad group | Exact | Phrase |
|---|---|---|
| House cleaning | [house cleaning sydney], [house cleaners sydney], [house cleaning near me] | "house cleaning services", "house cleaner sydney" |
| Regular cleaner | [weekly house cleaning sydney], [fortnightly house cleaner], [regular home cleaning sydney] | "weekly cleaner", "fortnightly cleaning" |
| Home cleaning | [home cleaning sydney], [home cleaning services sydney] | "home cleaning service" |
| Apartment | [apartment cleaning sydney], [unit cleaning service sydney] | "apartment cleaner" |

### Campaign 3: Strata

| Ad group | Exact | Phrase |
|---|---|---|
| Strata cleaning | [strata cleaning sydney], [strata cleaning services sydney], [strata cleaners sydney], [strata cleaning near me] | "strata cleaning", "strata cleaners" |
| Building / common areas | [common area cleaning sydney], [building cleaning sydney], [body corporate cleaning sydney] | "common area cleaning", "building cleaning service" |
| Apartment blocks | [apartment building cleaning sydney], [residential building cleaning sydney] | "apartment block cleaning" |

---

## 6. Ad copy (Responsive Search Ads)

Limits: headline 30 characters, description 90 characters. All headlines (≤30) and descriptions (≤90) in the three page files were checked by script.
See each landing page file for the ad copy for that campaign. Keep headline 1 pinned to the keyword theme.

---

## 7. Launch checklist

- [ ] Conversion tracking tested end to end (form + call + WhatsApp)
- [ ] Insurance / police-check status confirmed and reflected on all three pages
- [ ] Residential scope confirmed (page 01 and 02)
- [ ] Google Business Profile linked (location asset + reviews)
- [ ] Landing pages load in under 3 seconds on mobile
- [ ] Phone number tested on a real phone (tap to call)
- [ ] Form submits to Formspree and the lead email arrives
- [ ] Negative keyword lists added
- [ ] Search Partners and Display OFF
- [ ] Location set to Presence only
- [ ] Budget and max CPC cap set

## 8. Weekly review routine (first 8 weeks)

1. Search terms report: add negatives, add winning terms as exact match.
2. Cost per lead by campaign, ad group, device and hour.
3. Landing page conversion rate (no benchmark assumed; set your own target once you have 100+ clicks per page. Strata will convert at a lower rate because the lead is higher value).
4. Lead quality: how many leads became booked jobs? Track this in a simple sheet. It is the only number that really matters.
5. Test one thing at a time: headline angle first, then offer, then page layout.
