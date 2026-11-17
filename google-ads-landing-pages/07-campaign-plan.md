# Campaign Plan: Two Commercial Search Campaigns (Sydney)

Prepared 12 November 2026. Research and sources: `06-campaign-research.md`. Import file: `google-ads-editor-import-commercial.csv` (**every row Paused**). Nothing is live and no account was touched.

| | Campaign A | Campaign B |
|---|---|---|
| Name | `GOOG_Search_OfficeCommercial_Sydney` | `GOOG_Search_Strata_Sydney` |
| Daily budget | $50 (about $1,520 a month) | $30 (about $910 a month) |
| Landing page | `/lp/office-cleaning-sydney` (**to be built**, see section 5) | `/lp/strata-cleaning-sydney` (exists) |
| Bidding | Manual CPC, $12.00 max | Manual CPC, $8.00 max |

**Do not import `google-ads-editor-import.csv` (the earlier pack) and this file together.** Both contain a campaign named `GOOG_Search_Strata_Sydney`. Use this file for strata and skip the old strata rows.

## 0. Do first: conversion tracking

The Google tag is not installed. Without it Google cannot count leads and every optimisation rule below is blind.
1. Create a Google tag (or Tag Manager container) and add it to the site layout, loading only after consent (the site already stores `tsr-consent`). Consider Consent Mode v2.
2. Create a Google Ads conversion for the quote form: fire on `/thank-you` (the `?src=` parameter is already added).
3. Create call conversions: call asset with minimum call length 30 seconds, and a click-to-call (tel link) event.
4. Optional secondary: WhatsApp click.
5. Test with a real form submission and a real call. Confirm each shows in Google Ads before enabling anything.

## 1. Targeting and settings (both campaigns)

- Network: Search only. Search Partners and Display **off**.
- Location: Sydney, New South Wales, **Presence only** (set in the Locations options, the CSV cannot set it).
- Language: English. Schedule: all hours (open 24/7).
- Devices: no adjustments at the start. After 4 weeks, if mobile calls convert and desktop forms do not (or the reverse), adjust by up to 20%.
- Bidding: Manual CPC with the caps above. After about 15 conversions in a campaign, switch it to Maximise Conversions.
- Match types: exact and phrase only. Broad match only by the rules in the 30-day plan.
- Final URLs carry `utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}`.
- The Max CPC caps are below the Keyword Planner low top-of-page bids on purpose, to avoid overpaying. Expect fewer impressions at the start. Raise by 10 to 15% only if there are very few impressions after 7 days.


## 2. GOOG_Search_OfficeCommercial_Sydney

Daily budget $50.00. Max CPC $12.00. Final URL: `https://triplesrcommercialcleaning.com.au/lp/office-cleaning-sydney`. Display path: `/office-cleaning/sydney`.

### Ad group: Office cleaning

**Exact match:** [office cleaning sydney], [office cleaners sydney], [office cleaning services sydney], [office cleaning near me], [after hours office cleaning sydney], [office cleaning quote]

**Phrase match:** "office cleaning sydney", "office cleaners sydney", "office cleaning services"

**Headlines (15, each 30 characters or fewer; headline 1 is pinned to position 1):**

1. Office Cleaning Sydney (22)
2. Office Cleaners Sydney (22)
3. Regular Office Cleaning (23)
4. Rated 4.6 on Google (19)
5. 36 Google Reviews (17)
6. Call 1300 557 279 (17)
7. Open 24 Hours, 7 Days (21)
8. Free On-Site Walkthrough (24)
9. Written Itemised Quotes (23)
10. Uniformed Cleaning Teams (24)
11. After-Hours Office Cleans (25)
12. Consistent Cleaning Team (24)
13. Sydney CBD & Greater Sydney (27)
14. Reply Within 1 Business Day (27)
15. Switching Cleaners Is Easy (26)

**Descriptions (4, each 90 characters or fewer):**

1. Free site walkthrough and itemised written quote. Rated 4.6 on Google from 36 reviews. (86)
2. After-hours cleans by a regular uniformed team. Call 1300 557 279 or request a quote. (85)
3. Offices across Sydney CBD and Greater Sydney. Open 24 hours, 7 days. We reply in a day. (87)
4. Switching cleaner? We inspect, agree a scope and handle the changeover. Get a free quote. (89)

### Ad group: Commercial cleaning

**Exact match:** [commercial cleaning sydney], [commercial cleaners sydney], [commercial cleaning services sydney], [commercial cleaning near me], [commercial cleaning quote], [business cleaning sydney]

**Phrase match:** "commercial cleaning sydney", "commercial cleaning services", "commercial cleaners"

**Headlines (15, each 30 characters or fewer; headline 1 is pinned to position 1):**

1. Commercial Cleaning Sydney (26)
2. Commercial Cleaners Sydney (26)
3. Business Cleaning Services (26)
4. Rated 4.6 on Google (19)
5. 36 Google Reviews (17)
6. Call 1300 557 279 (17)
7. Open 24 Hours, 7 Days (21)
8. Free On-Site Walkthrough (24)
9. Written Itemised Quotes (23)
10. Uniformed Cleaning Teams (24)
11. After-Hours Office Cleans (25)
12. Consistent Cleaning Team (24)
13. Sydney CBD & Greater Sydney (27)
14. Reply Within 1 Business Day (27)
15. Switching Cleaners Is Easy (26)

**Descriptions (4, each 90 characters or fewer):**

1. Free site walkthrough and itemised written quote. Rated 4.6 on Google from 36 reviews. (86)
2. After-hours cleans by a regular uniformed team. Call 1300 557 279 or request a quote. (85)
3. Offices across Sydney CBD and Greater Sydney. Open 24 hours, 7 days. We reply in a day. (87)
4. Switching cleaner? We inspect, agree a scope and handle the changeover. Get a free quote. (89)

**Negative keywords (campaign level, phrase match):** free, jobs, job, career, careers, employment, hiring, vacancy, salary, course, training, diy, how to, tutorial, youtube, reddit, cheap, cheapest, gumtree, airtasker, franchise, equipment, supplies, products, machine, second hand, used, uk, nz, qld, melbourne, brisbane, perth, adelaide, canberra, wikipedia, pdf, template, checklist, award, wage, pay rate, insurance quote, software, app, house, home, domestic, residential, bond, end of lease, vacate, move out, apartment, strata, body corporate, carpet only, car, vehicle, pest, lawn, gardening, babysitter, maid, au pair, live in, construction, builders

## 3. GOOG_Search_Strata_Sydney

Daily budget $30.00. Max CPC $8.00. Final URL: `https://triplesrcommercialcleaning.com.au/lp/strata-cleaning-sydney`. Display path: `/strata-cleaning/sydney`.

### Ad group: Strata cleaning

**Exact match:** [strata cleaning sydney], [strata cleaning services sydney], [strata cleaners sydney], [strata cleaning near me]

**Phrase match:** "strata cleaning", "strata cleaners"

**Headlines (15, each 30 characters or fewer; headline 1 is pinned to position 1):**

1. Strata Cleaning Sydney (22)
2. Strata Cleaners Sydney (22)
3. Strata Cleaning Services (24)
4. Rated 4.6 on Google (19)
5. 36 Google Reviews (17)
6. Call 1300 557 279 (17)
7. Open 24 Hours, 7 Days (21)
8. Free Site Inspection (20)
9. Itemised Written Quotes (23)
10. Uniformed Cleaning Teams (24)
11. Easy To Take To Committee (25)
12. Consistent Cleaning Team (24)
13. Sydney CBD & Greater Sydney (27)
14. Reply Within 1 Business Day (27)
15. Switching Cleaners Is Easy (26)

**Descriptions (4, each 90 characters or fewer):**

1. Lobbies, lifts, stairs, car parks and bin rooms. Free site inspection and written quote. (88)
2. Daily, weekly or fortnightly common-area cleans by a regular team. Rated 4.6 on Google. (87)
3. One number to call, a written scope and a consistent team. Call 1300 557 279 today. (83)
4. Switching cleaner? We inspect, write a scope and handle the handover. Request a quote. (86)

### Ad group: Common areas and buildings

**Exact match:** [common area cleaning sydney], [building cleaning sydney], [body corporate cleaning sydney], [apartment building cleaning sydney]

**Phrase match:** "common area cleaning", "apartment block cleaning", "building cleaning service"

**Headlines (15, each 30 characters or fewer; headline 1 is pinned to position 1):**

1. Common Area Cleaning Sydney (27)
2. Apartment Building Cleaning (27)
3. Body Corporate Cleaning (23)
4. Rated 4.6 on Google (19)
5. 36 Google Reviews (17)
6. Call 1300 557 279 (17)
7. Open 24 Hours, 7 Days (21)
8. Free Site Inspection (20)
9. Itemised Written Quotes (23)
10. Uniformed Cleaning Teams (24)
11. Easy To Take To Committee (25)
12. Consistent Cleaning Team (24)
13. Sydney CBD & Greater Sydney (27)
14. Reply Within 1 Business Day (27)
15. Switching Cleaners Is Easy (26)

**Descriptions (4, each 90 characters or fewer):**

1. Lobbies, lifts, stairs, car parks and bin rooms. Free site inspection and written quote. (88)
2. Daily, weekly or fortnightly common-area cleans by a regular team. Rated 4.6 on Google. (87)
3. One number to call, a written scope and a consistent team. Call 1300 557 279 today. (83)
4. Switching cleaner? We inspect, write a scope and handle the handover. Request a quote. (86)

**Negative keywords (campaign level, phrase match):** free, jobs, job, career, careers, employment, hiring, vacancy, salary, course, training, diy, how to, tutorial, youtube, reddit, cheap, cheapest, gumtree, airtasker, franchise, equipment, supplies, products, machine, second hand, used, uk, nz, qld, melbourne, brisbane, perth, adelaide, canberra, wikipedia, pdf, template, checklist, award, wage, pay rate, insurance quote, software, app, house, home, domestic, bond, end of lease, vacate, move out, office, strata title, strata lawyer, strata levy, strata fees, strata law, strata act, strata manager jobs, strata search, strata report, strata insurance, strata plan, construction, builders, post construction, pool, garden, gardening, pest, lawn, car park jobs, maid

## 4. Assets (add in Google Ads, the CSV does not carry them)

### Campaign A
- **Sitelinks:** (1) Free Office Quote, `/lp/office-cleaning-sydney`, "Walkthrough and written quote"; (2) Reviews, `/reviews`, "Rated 4.6 on Google"; (3) Our Services, `/services`, "Offices, schools, aged care and more". Check each link opens on mobile.
- **Callouts:** Free On-Site Quotes; Open 24 Hours, 7 Days; After-Hours Cleaning; Uniformed Teams; Written Itemised Quotes.
- **Structured snippet (Service catalogue):** Office Cleaning; Commercial Cleaning; Window Cleaning; Carpet Steam Cleaning.
- **Call asset:** 1300 557 279, Australia, call reporting on, count calls over 30 seconds as conversions.
- Link the Google Business Profile for the location and rating assets.

### Campaign B
- **Sitelinks:** (1) Free Site Inspection, `/lp/strata-cleaning-sydney`, "Itemised quote for your committee"; (2) Reviews, `/reviews`, "Rated 4.6 on Google"; (3) Our Services, `/services`, "Offices, schools, aged care and more".
- **Callouts:** Free Site Inspection; Written Itemised Quotes; Uniformed Teams; Open 24 Hours, 7 Days; Common Area Cleaning.
- **Structured snippet (Types):** Lobbies and Entries; Lifts and Stairwells; Car Parks; Bin Rooms.
- **Call asset:** same number and settings.

Rules for all copy: no prices, no "best", "#1" or "guaranteed", no insurance, police-check, ABN or licence claims, rating always 4.6 from 36 reviews.

## 5. Landing pages

**Campaign B** uses the existing `/lp/strata-cleaning-sydney`. Fixes before launch: confirm insurance status (the page only shows it when `site.confirmed.insurance` is true), and get one strata-specific review.

**Campaign A** has no fitting page, so a new one is needed. It is not built yet, at the owner's request to decide first. Spec, in the same format as the existing `/lp` pages (add to `landing-pages.ts`, slug `office-cleaning-sydney`, service `office-cleaning-lp`, brand "Triple SR Commercial Cleaning"):
- **Hero:** H1 "Office Cleaning in Sydney CBD and Greater Sydney". Sub: "A consistent, uniformed team cleans your office after hours, so your staff and clients walk into a fresh workplace every morning." Bullets: daily, weekly or fortnightly after hours; free site walkthrough and itemised written quote; open 24 hours, 7 days. CTA "Get My Free Office Quote".
- **Form fields:** name, mobile, work email, office suburb, floors, approximate size (sqm), how often, visits per week.
- **Trust strip:** 4.6 on Google (36 reviews), free on-site quotes, written itemised quotes, uniformed teams, open 24 hours 7 days. Insurance and police-check chips only if confirmed.
- **What's included:** work areas (floors, desks, reception, glass), kitchens and amenities (kitchenette, restrooms, consumables, rubbish), touch points; add-ons quoted separately (carpet steam, windows, deep clean, floor polish).
- **How it works:** tell us about the office, free walkthrough, written quote and checklist, we start.
- **Reviews, verbatim from `reviews.json`:** ids 1, 2 and 11 only (1 and 2 mention offices; 11 is communication).
- **FAQ:** cost (depends on area, restrooms, frequency, access hours), after hours, CBD access, same cleaners, products and equipment, missed items (return visit within scope), switching cleaners, windows and carpets.
- **Final CTA:** "Ready for a cleaner workplace?"

SEO and conversion audit points for both pages: `noindex` (kept out of search), one H1 matching the ad, form above the fold, sticky mobile call bar, title under 60 characters, meta description under 160, page load under 3 seconds on mobile, thank-you page fires the conversion.

## 6. 30-day plan

Budget stays fixed for the first 14 days.

**Before day 1 (setup week):** build and test tracking (section 0); build the office page; secure a strata review; confirm insurance status; import the CSV into Google Ads Editor; add assets; set Presence only; review every ad for approval status.

**Week 1 (days 1 to 7)**
- Enable strata first (day 1), then office (day 2). Staggering catches tracking or form problems early.
- Daily: spend, clicks, impressions, whether leads in the inbox match conversions in Google Ads, and ad disapprovals.
- Every 2 days: search terms report. Add junk terms as negatives.
- Do not change bids or ad copy.

**Week 2 (days 8 to 14)**
- Daily: spend and search terms.
- Day 7 check: if a campaign has under 20 impressions a day, raise Max CPC by 10 to 15% (once).
- Day 14 review: cost per lead by campaign, lead quality (booked jobs or real enquiries), search terms.

**Week 3 (days 15 to 21)**
- Move budget by the rule below. Pause losing keywords. Add winning search terms as exact match.
- Test one thing only: a new headline angle in the strongest ad group.

**Week 4 (days 22 to 30)**
- Re-export Keyword Planner data for real volumes and bids.
- If a campaign has about 15 conversions, switch it to Maximise Conversions.
- Month review: cost per lead, cost per booked job, which ad group won, what to scale.

**Daily checks (5 minutes):** spend against budget; any disapproved ads; new leads match conversions.
**Weekly checks (30 minutes):** search terms; cost per lead by campaign, ad group and device; lead quality; negatives.

**Decision rules**
- **Pause a keyword** after 15 clicks with no conversion, once the landing page and tracking are confirmed working.
- **Add a negative** whenever a search term shows jobs, DIY, residential, free, or a competitor name you do not want.
- **Shift budget after day 14:** if one campaign's cost per lead is under half the other's (and it has at least 2 leads), move $10 a day to it. Never take a campaign below $20 a day. Re-check after 7 days.
- **Zero leads after 14 days and 40 or more clicks on a campaign:** stop and diagnose before moving money. Check the form, phone number, tracking, ad-to-page match, then search terms.
- **Add broad match** to a single ad group only after at least 15 conversions in that campaign, with Maximise Conversions on, and a daily check of search terms for the first week.
- **Do not edit ads** in the first 14 days unless disapproved.
- **Cost per lead target:** none assumed. Set it after day 14 from your average job value and close rate.

## 7. Launch checklist

- [ ] Google tag installed and consented; form, call and click-to-call conversions tested end to end
- [ ] Office landing page built, reviewed on a phone, loads in under 3 seconds
- [ ] Strata page checked; insurance status confirmed or left out
- [ ] Google Business Profile linked
- [ ] CSV imported with all rows Paused; Editor errors cleared
- [ ] Presence only, Search Partners off, Display off
- [ ] Max CPC and daily budgets match this plan
- [ ] Sitelinks, callouts, snippet and call asset added
- [ ] Billing set up; enable only after your explicit say-so

## 8. Five things you must confirm or test yourself

1. **The Google tag and conversions.** Submit the form and place a test call, then check Google Ads shows both.
2. **Insurance, police checks, ABN and licence.** Confirm what is true; nothing in the ads claims them.
3. **A strata reference.** Ask one managed building for a Google review before spending on Campaign B.
4. **The phone and inbox.** Call 1300 557 279 from a mobile, and confirm the Formspree lead email arrives.
5. **Budget and bids.** Confirm $50 and $30 a day and the Max CPC caps are acceptable. Keyword Planner low bids are $8 to $20 a click, so each campaign buys only a few clicks a day.
