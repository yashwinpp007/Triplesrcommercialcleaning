# MASTER BUILD PROMPT — Triple SR Commercial Cleaning Website

> Paste this whole file into Claude Code (or any coding agent) from inside the project folder. Build the site end to end, then verify it against the checklist in section 17.

---

## 0. Role and Mission

You are a senior full-stack engineer, conversion-focused UX designer and security engineer. Build a **top-tier, premium, high-converting website** for **Triple SR Commercial Cleaning**, an Australian commercial cleaning company based in Blacktown, NSW.

- **Domain:** triplesrcommercialcleaning.com.au
- **Primary goal:** turn visitors into quote requests and phone calls.
- **Geographic focus:** serve **all of Greater Sydney**, with **Sydney CBD as the primary target market** (Blacktown is the home base, but copy, SEO and maps must position the company as a Sydney-wide commercial cleaner that services the CBD first). Confirm no claim implies a presence the business doesn't have (e.g. say "servicing Sydney CBD", not "our CBD office").
- **Search goals:** the site must be optimised for **SEO** (classic search), **AEO** (answer engines and AI assistants: Google AI Overviews, ChatGPT, Perplexity, Gemini, voice search) and **SXO** (search experience optimisation: ranking *and* converting). See section 11.
- **Secondary goals:** build trust (real photos, real Google reviews, compliance signals), rank locally for commercial cleaning searches across Western Sydney and Greater Sydney, and look more premium than any local competitor.
- **Tone:** professional, reliable, clean, confident. Australian English everywhere (organisation, specialise, colour, programme only where idiomatic, "tradies", "end of lease"). No American spellings, no filler marketing fluff.

Do not ask me questions unless truly blocked. Make sensible decisions, document them in `README.md`, and keep going.

---

## 1. Business Details (single source of truth)

Store these in one config file (`src/config/site.ts`) and import everywhere. Never hard-code them in components.

| Field | Value |
|---|---|
| Business name | Triple SR Commercial Cleaning |
| Domain | https://triplesrcommercialcleaning.com.au |
| Address | Blacktown, NSW, Australia |
| Email | triplesrservicespty@gmail.com |
| Phone (display) | 0427 724 809 |
| Phone (tel link) | +61427724809 |
| Instagram | https://www.instagram.com/servicestriplesr?xtok=a2R4aWptYXI5eHFw |
| Facebook | https://www.facebook.com/share/1F8SsdzSqZ/ |

**Opening hours**

| Day | Hours |
|---|---|
| Monday – Sunday | Open 24 hours (7 days, 24/7) |

- Show an **"Open 24/7"** badge (or a live "Open now / Closed" badge if hours ever change) in the header or contact section, calculated in the `Australia/Sydney` timezone (handle daylight saving correctly).
- Use the same data for the footer, contact page and `LocalBusiness` schema `openingHoursSpecification`.
- Do **not** invent an ABN, licence numbers, insurance figures, years in business, staff counts or client names. If a field is needed and unknown, leave a clearly marked `TODO` in the config and hide the UI element until it is filled.

---

## 2. Brand, Logo and Visual Direction

**Logo:** `Triple SR Commercial Cleaning Logo.png` (in the project root folder).

1. Inspect the logo (view it). Extract its dominant colours and build the design system **from the logo** (primary, accent, neutrals). Do not invent an unrelated palette.
2. Produce optimised derivatives: SVG-traced or high-res PNG/WebP for header (light + dark variants if needed), favicon set (`favicon.ico`, 16/32/180/192/512 PNG, `apple-touch-icon`), and an Open Graph image (1200×630) with logo and tagline.
3. Ensure the logo has adequate clear space and never sits on a low-contrast background.

**Design language (premium, trustworthy, clean):**
- Generous white space, large confident typography, crisp grid. Think high-end corporate service brand, not a clip-art cleaning flyer.
- Palette: logo-derived primary + one accent for CTAs + soft neutrals. CTA buttons must be the most visually prominent element on any screen and must pass WCAG AA contrast (4.5:1 text, 3:1 UI).
- Typography: one display font + one text font max (self-hosted via `next/font` or `@fontsource`, no render-blocking third-party font requests). Fluid type scale with `clamp()`.
- Imagery: real photos only (section 5). Rounded corners, subtle shadows, soft glass/blur accents sparingly.
- Light theme default; add dark mode only if it can be done with full contrast QA.

---

## 3. Recommended Tech Stack

Choose this unless you can justify better in the README:

- **Next.js (App Router, latest stable) + TypeScript (strict)**, static generation (SSG) for all marketing pages, server actions / route handlers only for the lead form.
- **Tailwind CSS** + CSS variables for design tokens.
- **Motion** (Framer Motion / `motion`) for component animation; **GSAP + ScrollTrigger** or CSS scroll-driven animations for scroll storytelling. Optional: **Lenis** for smooth scroll (must be disabled under reduced motion).
- **Zod** for validation (shared by client and server).
- **sharp / next/image** for image optimisation.
- Email delivery: **Resend** (or Postmark / AWS SES) via server-side API key. Do **not** use client-side EmailJS or any approach that exposes keys in the browser.
- Lead storage: a database table or hosted store (e.g. Supabase/Postgres/Vercel KV) so no lead is lost if email fails. Store only what is needed.
- Bot protection: **Cloudflare Turnstile** (preferred, privacy-friendly) or hCaptcha; plus honeypot and rate limiting.
- Hosting target: **Vercel** or **Cloudflare Pages/Workers**, with DNS for the `.com.au` domain. Include deployment instructions.
- Analytics: privacy-respecting (Plausible/Umami) or GA4 loaded **only after consent**. Include conversion events (section 9).

Pin dependency versions, commit the lockfile, and run `npm audit` at the end.

---

## 4. Site Map and Routes

```
/                                   Home
/services                           Services overview (all 10)
/services/regular-office-cleaning
/services/commercial-end-of-lease-cleaning
/services/health-aged-care-cleaning
/services/warehouse-cleaning
/services/education-childcare-cleaning
/services/regular-window-cleaning
/services/hospital-cleaning
/services/industrial-cleaning
/services/factory-cleaning
/services/school-cleaning
/about
/gallery                            Before/after + photo + video gallery
/reviews                            All Google 5-star reviews
/areas                              Sydney-wide service areas hub with interactive map
/areas/sydney-cbd                   Primary location page (flagship)
/areas/[region]                     Regional hubs: Sydney CBD, Inner West, Eastern Suburbs, North Shore,
                                    Northern Beaches, Parramatta & Central West, Western Sydney (Blacktown home base),
                                    Hills District, South West, Sutherland Shire, St George
/areas/[region]/[suburb]            Optional suburb pages (only with genuinely unique content)
/services/[service]/sydney-cbd      Service x CBD pages for the highest-value services (e.g. office cleaning,
                                    end of lease, window cleaning) with unique content
/faq
/contact                            Contact + quote form
/get-a-quote                        Dedicated quote funnel (also reachable from every CTA)
/thank-you                          Post-submission page (conversion tracking)
/privacy-policy
/terms
/sitemap.xml  /robots.txt  /404  /500
```

Navigation: sticky header with logo, **Services mega-menu** (grouped: *Offices & Retail*, *Health & Care*, *Education*, *Industrial & Logistics*, *Specialist*), About, Gallery, Reviews, Contact, a persistent phone button and a primary **"Get a Free Quote"** button. On mobile: a slim bottom **sticky action bar** with **Call**, **WhatsApp/SMS (optional)** and **Get Quote**.

Suggested service grouping:
- Offices & Retail: Regular Office Cleaning, Commercial End of Lease, Regular Window Cleaning
- Health & Care: Health / Aged Care, Hospital
- Education: Education / Childcare, School
- Industrial & Logistics: Warehouse, Industrial, Factory

---

## 5. Media Assets (use the real photos and videos)

Source folder: `tsr pics A/` containing sub-folders `tsr1` … `tsr5` (≈280 images + 9 videos, mostly WhatsApp exports with non-descriptive names).

| Folder | Images | Videos |
|---|---|---|
| tsr1 | ~62 | 3 |
| tsr2 | ~100 | 0 |
| tsr3 | ~99 | 1 |
| tsr4 | ~5 | 4 |
| tsr5 | ~14 | 1 |

**Required asset pipeline (do this first, before building pages):**

1. **Review every image and video** (view them; do not guess from filenames). Build `assets-manifest.json` with, per file: new descriptive slug filename, category (`before-after`, `team-uniform`, `office`, `warehouse`, `industrial`, `medical`, `education`, `windows`, `equipment`, `other`), orientation, quality rating (1–5), whether it shows people/faces, and suggested alt text.
2. **Curate hard: do NOT use all the photos.** Use only the best and most apt images, and prefer fewer, stronger images over volume. Discard blurry, dark, badly framed, duplicate, near-duplicate, screenshot-like or low-quality images, and anything that doesn't clearly support a page's message. Hard cap: **about 40–50 images and 3–5 videos on the whole site**, and each image must earn its place by being (a) sharp and well lit, (b) relevant to the section it appears in, and (c) different from the others on the same page. Gallery page: at most ~24 images plus before/after pairs. Each service page: 1 hero plus 2–4 supporting images at most, none reused more than twice site-wide. Keep a `_rejected` list with reasons and a `_selected` list with the page/section each image is used on.
3. **Detect before/after pairs** and group them (`pairId`). These power the before/after slider (section 8). If pairing is ambiguous, flag it in the README rather than guessing.
4. **Team photos:** identify cleaners wearing Triple SR logo t-shirts. Use these prominently on Home, About and service pages for trust. Use only images where the logo shirt and team are clear.
5. **Privacy check:** flag any image that shows client signage, identifiable client premises with names, number plates, documents, or non-staff people (especially children, patients, or anyone in a school/childcare/health setting). **Exclude or blur** those. Never publish identifiable children or patients.
6. **Strip EXIF/GPS metadata** from every published image. Convert to **AVIF/WebP** with JPEG fallback, generate responsive sizes (480/768/1280/1920), generate tiny **blur placeholders**, and set explicit `width`/`height` to prevent layout shift.
7. **Videos:** transcode to H.264 MP4 + WebM, compress (target < 3 MB for background loops, ≤ 8 MB for feature clips), create poster frames. Background hero video must be muted, looped, `playsinline`, ≤ 10 s, and fall back to a poster image on slow connections, `prefers-reduced-motion` and `Save-Data`. Lazy-load all non-hero video.
8. Map the best images to services (e.g. warehouse photos → Warehouse/Industrial/Factory pages). Where no service-specific photo exists, use the closest honest match; **never present a photo as a different type of site than it is** (e.g. don't label an office as a hospital). Where a service has no relevant imagery, use a brand-coloured illustration/pattern instead of a misleading photo.
9. Keep the originals untouched; write optimised output to `public/images/` and `public/video/`.

---

## 6. Google Reviews (all 5-star)

Source: the Google Business Profile for "Triple SR Services" (search link supplied by the client):

```
https://www.google.com/search?q=triple+sr+services#lrd=0x4ff9a269be8bed0f:0x36e7f556a36a4983,1,,,,
```

**Pre-collected reviews (use these):** the client's 15 selected five-star reviews are already saved, verbatim, in **`reviews.json`** in the project root (retrieved 2026-11-04). Copy it to `src/content/reviews.json` and build from it. It includes each reviewer's name, Local Guide status, relative date, owner reply and suggested pages. The profile's verified aggregate is **4.6 from 36 Google reviews**: if you show an aggregate, use exactly that, never 5.0, and make it a config value. Most of the 15 are residential, apartment or end-of-lease jobs; only two mention offices. Do not present any review as being for a sector it doesn't mention (hospital, school, warehouse, etc.), and use the end-of-lease reviews only on the end-of-lease page and general pages.

**Rules:**
- Display only the reviews in `reviews.json` (all 5-star). Copy the text **verbatim**, including typos. **Never invent, paraphrase, embellish, merge or fabricate reviews or ratings.** Show Google's relative dates as given or omit dates; never invent exact dates.
- Build the reviews system so more reviews can be added by editing the JSON file only. If you can re-verify the profile, do so; if you cannot (login wall, consent wall, blocking), keep using the file as is and document in the README how to add or update reviews.
- Alternative supported path: integrate the **Google Places API (Place Details → reviews)** server-side, cached at build time/ISR, with the API key in an environment variable. Note the API returns a limited number of reviews, so the JSON file remains the source for the full set.
- Show the **true aggregate** rating and review count only if you verified them from the profile. Otherwise show the individual reviews without an aggregate.
- Attribute clearly: "Reviews from Google" with the Google logo/wording used per Google's branding guidance and a link to the profile and a **"Leave us a review"** button.
- Include `Review` / `AggregateRating` structured data **only** where it accurately reflects verifiable data and complies with Google's review-snippet policy (self-serving reviews for `LocalBusiness` are not eligible for rich results, so do not rely on it; keep markup honest or omit).

**UI:**
- Home: animated review marquee/carousel (pause on hover/focus, keyboard navigable, no auto-advance under reduced motion) + big trust strip.
- `/reviews`: masonry grid of all 15 reviews, with the Google attribution, the 4.6 / 36 aggregate and the "Leave us a review" button.
- Use each review's `suggestedPages` to place reviews (e.g. the two office reviews on Regular Office Cleaning; the end-of-lease reviews on Commercial End of Lease). For service pages with no matching review, show a general review or none; do not force a mismatch.

---

## 7. Page-by-Page Content Requirements

Write original, specific, Australian-English copy. No lorem ipsum anywhere. No claims that cannot be substantiated (no "#1 in Sydney", no fake awards, no invented certifications). Phrase compliance as practice, not accreditation, unless the client confirms accreditation (e.g. "cleaning to infection-control best practice", not "certified").

### Home (`/`)
1. **Hero:** strong H1 (e.g. "Commercial Cleaning Across Western Sydney, Done Properly"), sub-headline, primary CTA **Get a Free Quote**, secondary CTA **Call 0427 724 809**, trust chips (e.g. "Free on-site quotes", "Flexible schedules", "Uniformed, trained teams" — only claims that are true/confirmable), hero video or photo of the uniformed team, and a compact **inline quick-quote form** (name, phone, service, suburb) above the fold.
2. **Trust strip:** Google rating/reviews (if verified), insured/police-checked **only if confirmed**, local Blacktown business.
3. **Services grid:** 10 animated service cards with image, short description, hover reveal, link.
4. **Why choose us:** 4–6 benefits with animated icons.
5. **How it works:** 3–4 step timeline (Request quote → Free site inspection → Tailored plan & price → We clean, you relax) with scroll-driven progress animation.
6. **Before/After showcase:** interactive slider(s).
7. **Industries we serve:** icon row linking to service pages.
8. **Reviews carousel.**
9. **Gallery teaser / short video.**
10. **Service coverage map (required on the homepage):** an interactive map of **Greater Sydney** with **Sydney CBD highlighted as the primary service hub** and Blacktown marked as the home base, plus region markers/polygons for the rest of Sydney. Requirements:
    - Click/tap a region to show a card (suburbs covered, services available, "Get a quote for [region]" CTA, link to the region page).
    - Implement with a lightweight, privacy-friendly option: a custom **inline SVG map** of Sydney regions (preferred: zero third-party requests, fastest, fully stylable and animated) or **MapLibre/Leaflet with OpenStreetMap tiles**. If using Google Maps, load it only on click (facade) and allow it in the CSP.
    - Animated entrance (CBD pin pulse, coverage area reveal), keyboard-accessible regions (`role="button"`, focus states, `aria-label`), and a text list of covered areas beside it for accessibility and SEO.
    - Also include a "Check we cover your suburb" input (autocomplete from the configured suburb list) that shows covered/not covered and routes to the quote form with the suburb prefilled.
    - Must be responsive and not cause layout shift; lazy-load below the fold.
    - Also embed a standard **Google Map of the Blacktown base** on `/contact` (click-to-load).
11. **FAQ** (accordion) – 6–8 questions with FAQ schema (see the FAQ rule in section 11.4).
12. **Final CTA band** with the full quote form.

### Services overview (`/services`)
Filterable grid by sector, comparison guidance ("Which service do I need?"), CTA.

### Each of the 10 service pages — shared template, unique content
Every page must have **unique, non-duplicated copy** (Google penalises thin/duplicate service pages) with:
- Hero with service-specific H1, 1-sentence value prop, CTA, relevant photo.
- "Who this is for" and typical sites.
- **What's included** checklist (specific tasks) and **optional extras**.
- Frequency options (daily/weekly/fortnightly/one-off) where relevant.
- Sector-specific standards and approach (e.g. colour-coded microfibre/mop systems and hospital-grade disinfectants for healthcare; out-of-hours cleaning for offices; high-reach and floor-scrubbing equipment for warehouses/factories; bond-back checklist style handover for end of lease; child-safe, non-toxic products for childcare/schools; safe working at height practices for windows). Keep technically accurate and non-misleading.
- Process, FAQs (4–6, unique to the service, with `FAQPage` schema), related services, before/after or gallery strip, relevant reviews, and a service-specific mini quote form with the service pre-selected.
- Internal links to related services and to `/areas`.
- **Distinguish clearly** between related pairs: *Health/Aged Care vs Hospital*, *Education/Childcare vs School*, *Industrial vs Factory vs Warehouse*. Each must have genuinely different content and a cross-link explaining which to choose.

| # | Service | Slug |
|---|---|---|
| 1 | Regular Office Cleaning | `regular-office-cleaning` |
| 2 | Commercial End of Lease Cleaning | `commercial-end-of-lease-cleaning` |
| 3 | Health / Aged Care Cleaning | `health-aged-care-cleaning` |
| 4 | Warehouse Cleaning Services | `warehouse-cleaning` |
| 5 | Education / Childcare Cleaning Services | `education-childcare-cleaning` |
| 6 | Regular Window Cleaning | `regular-window-cleaning` |
| 7 | Hospital Cleaning Services | `hospital-cleaning` |
| 8 | Industrial Cleaning Services | `industrial-cleaning` |
| 9 | Factory Cleaning Services | `factory-cleaning` |
| 10 | School Cleaning Services | `school-cleaning` |

### About
Story, values, the team (real uniformed-team photos), the Triple SR promise, local Blacktown roots. Only factual claims.

### Gallery
Filterable (by service/type), masonry layout, lightbox with keyboard/swipe, before/after sliders, video section. Lazy loaded, blur-up.

### Areas (whole of Sydney, CBD first)
Position Triple SR as covering **all of Greater Sydney**, led by **Sydney CBD**.
- `/areas` hub: the interactive coverage map (same component as the homepage), region list, "check your suburb" tool, and CTA.
- **`/areas/sydney-cbd` flagship page** (richest content on the site): CBD-specific commercial context (high-rise and multi-tenant office towers, strata/building managers, retail and hospitality, after-hours and out-of-hours access, building induction/security requirements, loading dock and lift booking, end-of-lease make-good), suburbs/precincts covered (Barangaroo, Circular Quay, The Rocks, Martin Place, Pitt St/George St, Town Hall, World Square, Haymarket, Darling Harbour, Pyrmont, Surry Hills, Ultimo, Chippendale, Redfern), the services most relevant there, FAQs, reviews, and a CBD-prefilled quote form.
- Regional hub pages for: Sydney CBD, Inner West, Eastern Suburbs, North Shore, Northern Beaches, Parramatta & Central West, Western Sydney (incl. Blacktown, Penrith, Mount Druitt, Rouse Hill, Seven Hills, Prospect, Eastern Creek, Wetherill Park), Hills District, South West (Liverpool, Campbelltown, Minto), Sutherland Shire, St George.
- Suburb and service x location pages are allowed **only** with genuinely unique, useful content (local landmarks, building types, access considerations, relevant FAQs). **No thin doorway pages and no mass-generated near-duplicate templates**; if you can't make a page meaningfully unique, don't build it.
- **Confirm the real service radius and CBD capability with the client** (e.g. parking/travel, minimum contract size, after-hours availability); keep the suburb/region lists editable in `src/content/areas.ts`; never claim coverage the client hasn't confirmed.

### Contact / Get a Quote
Full form (section 9), map embed (privacy-friendly, click-to-load), address, phone, email, hours with live open/closed badge, social links, and response-time expectation.

### Legal
Privacy Policy aligned with the **Australian Privacy Act 1988 / Australian Privacy Principles**, covering what is collected, why, storage, third parties (email provider, analytics, Turnstile), cookies, access/correction rights and contact. Terms of use. Plain-language, no copy-pasted US boilerplate. Mark with a note that it should be reviewed by a lawyer.

---

## 8. Animations and Interaction (premium, but fast and accessible)

Goal: "wow" without jank. Animate **transform and opacity only**; keep 60fps; no layout-shifting animations.

- **Page load:** logo + hero stagger reveal, headline word/line mask reveal, subtle parallax on hero media.
- **Scroll storytelling:** section reveal on enter (fade-up with stagger), sticky "how it works" timeline with progress line, scroll-linked counters (only for verified figures), image clip-path reveals.
- **Cards:** magnetic/tilt hover (desktop only), image zoom, arrow slide, gradient glow follow-cursor.
- **Before/After slider:** draggable handle with mouse, touch and keyboard (arrow keys, `role="slider"`, `aria-valuenow`), animated intro hint, labelled "Before"/"After".
- **Marquees:** reviews and "industries served" infinite marquee that pauses on hover/focus.
- **Buttons:** primary CTA with subtle shine sweep, micro-interactions on press, loading and success states.
- **Navigation:** header shrinks and gains blur on scroll, hide on scroll-down / show on scroll-up, animated mega-menu, smooth mobile drawer with focus trap.
- **Page transitions:** short, elegant (View Transitions API with graceful fallback). Never block navigation.
- **Cleaning-themed flourishes (tasteful):** a "sparkle/shine wipe" reveal on hero images and a squeegee-style wipe transition on the before/after intro. Subtle, not gimmicky.
- **Form:** field focus animations, inline validation, animated success state with checkmark.

**Non-negotiables**
- Respect `prefers-reduced-motion: reduce` — disable parallax, marquees autoplay, smooth scroll and large transitions; keep simple fades only.
- No animation may block LCP or interaction; lazy-load heavy animation libraries per route (dynamic import) and keep JS budget small.
- Pause offscreen video/animations (IntersectionObserver).
- Touch targets ≥ 44×44px; no hover-only functionality on touch devices.

---

## 9. Lead Capture System (conversion engine)

**Placement:** hero quick form, sticky header CTA, mobile bottom action bar, mid-page CTAs, every service page, exit-intent/scroll-triggered soft prompt (non-intrusive, dismissible, shown once per session, disabled on mobile if it harms UX), footer CTA, `/get-a-quote`.

**Multi-step quote form (reduces friction, increases completion):**
1. Service type (pre-selected from the page) + sector.
2. Site details: suburb/postcode, approximate size (small / medium / large / not sure) or sqm, number of floors (optional).
3. Frequency and preferred start (daily / weekly / fortnightly / monthly / one-off), plus preferred contact method.
4. Contact: name, business name, phone, email, optional message, optional **photo upload** (images only, strict limits, section 10).
5. Consent checkbox (Privacy Policy link) — not pre-ticked.

Form UX requirements:
- Progress indicator, back/next, auto-focus, inline errors, mobile-friendly input types (`type="tel"`, `inputmode`, `autocomplete` attributes), Australian phone and postcode validation (4-digit postcodes; mobile `04xx xxx xxx`, landlines with area codes, `+61` format).
- Save progress in memory (not sensitive data in localStorage) so a refresh doesn't lose entries within the session.
- Clear success state + redirect to `/thank-you` with next steps ("We'll call you within X business hours" — use real hours; do not promise what the client can't deliver; make the SLA configurable).
- Graceful failure: if email delivery fails, still store the lead and show a friendly message with the phone number.

**Backend behaviour:**
- Server-side Zod validation (never trust the client), sanitise and length-limit all fields.
- Send (a) an internal notification email to `triplesrservicespty@gmail.com` with all details and a one-tap call/reply, and (b) an auto-reply confirmation to the customer (plain, branded, includes phone number and hours). Use verified domain sending (SPF, DKIM, DMARC for `triplesrcommercialcleaning.com.au`) and a `from` address on that domain.
- Persist lead + UTM parameters, landing page, referrer, timestamp (UTC), and a hashed IP for abuse tracking (not raw IP unless justified).
- Optional webhook to a CRM/Google Sheet (configurable via env).
- Click-to-call (`tel:`), click-to-email, and (optional) WhatsApp links tracked as events.

**Tracking events:** `quote_form_start`, `quote_step_complete`, `quote_submit_success`, `phone_click`, `email_click`, `whatsapp_click`, `social_click`, `review_cta_click`, `gallery_open`, `video_play`. Fire the Google Ads / GA4 conversion on the `/thank-you` page and on successful submit; support GTM only behind consent.

---

## 10. SECURITY IMPLEMENTATION (mandatory — treat as acceptance criteria)

Implement **all** of the following. Document each control and where it lives in `SECURITY.md`.

### 10.1 Transport and headers
- HTTPS everywhere, **HSTS** (`max-age=63072000; includeSubDomains; preload`) once HTTPS is confirmed on all subdomains; redirect HTTP→HTTPS and non-canonical host (www/non-www) with a single 301.
- Strict **Content-Security-Policy** with per-request **nonces** (or hashes). No `unsafe-inline` / `unsafe-eval`. Explicit allow-lists only for: self, Turnstile, analytics (consent-gated), map embed (if used), image/video origins. Include `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, `object-src 'none'`, `upgrade-insecure-requests`. Start in `Report-Only` to tune, then enforce; add a CSP report endpoint (rate-limited).
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (plus CSP frame-ancestors)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`: disable camera, microphone, geolocation, payment, USB, etc. unless used.
- `Cross-Origin-Opener-Policy: same-origin`, `Cross-Origin-Resource-Policy: same-site`, and COEP only if it doesn't break embeds.
- Remove `X-Powered-By` and server version banners.
- Add `/.well-known/security.txt` (contact: the business email, expiry date, policy link).
- Target **A+** on securityheaders.com and Mozilla Observatory, and A on SSL Labs.

### 10.2 Form and API hardening
- **Validation + sanitisation on the server** with Zod; reject unknown fields; enforce max lengths; normalise Unicode; strip control characters; escape on output; never render user input as HTML.
- **CSRF protection:** same-site cookies, `Origin`/`Referer` verification on the form endpoint, and a per-session CSRF token (double-submit or signed token). Server actions must verify origin.
- **Bot protection:** Cloudflare Turnstile verified **server-side** (check token, hostname, action; reject replays), plus a hidden **honeypot** field and a **minimum fill-time** check (reject submissions faster than ~3 s).
- **Rate limiting:** per IP and per fingerprint (e.g. 5 submissions / 15 min, stricter burst limit) using a durable store (Upstash Redis / KV), with generic 429 responses and `Retry-After`. Also rate-limit the CSP report and any other public endpoint.
- **Email header injection** prevention: strip CR/LF from every value used in headers (name, email, subject), validate email format, never let user input choose recipients, use the provider SDK (no raw SMTP string building).
- **Spam/abuse:** block disposable email domains (configurable), detect link-stuffing and repeated content, cap links in message body, reject obvious spam patterns; log and quarantine rather than silently drop.
- **File uploads (if photo upload enabled):** images only (JPEG/PNG/WebP/HEIC), verify **magic bytes** not just extension/MIME, max 5 files × 5 MB, re-encode server-side (strips payloads/EXIF), random filenames, store in a **private** bucket with no public listing, serve via short-lived signed URLs, optional antivirus scan. If this can't be done safely, disable the upload and say so.
- Return **generic error messages** (no stack traces, no internal details). Log details server-side only.
- Use **parameterised queries/ORM** for all DB access (no string-built SQL).
- Idempotency key on submissions to prevent duplicate leads on retry/double-click.

### 10.3 Secrets and configuration
- All secrets in environment variables; **never** in the repo, client bundle or logs. Only `NEXT_PUBLIC_*` for genuinely public values (site key, analytics ID).
- Provide `.env.example` with placeholders; add `.env*` to `.gitignore`; add a **pre-commit secret scan** (gitleaks / secretlint) and a CI check.
- Validate env at boot with Zod and fail fast if misconfigured.
- Principle of least privilege on every API key (e.g. send-only email key, scoped DB role, no admin tokens in the runtime).

### 10.4 Dependency and supply-chain security
- Lockfile committed, `npm ci` in CI, **Dependabot/Renovate** enabled, `npm audit --omit=dev` gate in CI.
- Minimise dependencies; no abandoned packages; pin and review third-party scripts.
- **Subresource Integrity (SRI)** on any third-party script/style that must be loaded externally. Prefer self-hosting fonts and libraries.
- No inline third-party tag injection; analytics/GTM only after consent and under CSP.
- Enable CodeQL / Semgrep (or equivalent SAST) in CI.

### 10.5 Privacy and compliance (Australia)
- Comply with the **Privacy Act 1988 (Cth)** and **Australian Privacy Principles**; collection notice at the point of the form; data minimisation; retention policy (e.g. delete leads after N months unless converted — make it configurable and document it); a documented process for access/correction/deletion requests.
- **Cookie/consent banner:** essential-only by default, accept/reject equal prominence, granular choices, remembered preference; no analytics or marketing tags before consent.
- Anti-spam: send marketing email only with consent (**Spam Act 2003**); transactional replies are fine; include the business identity and an unsubscribe route on any marketing message.
- Do not log full IP addresses, message bodies or PII in application logs; if IPs are used for rate limiting, hash/salt and expire them.
- Notifiable Data Breaches (NDB) scheme: include a short incident response plan in `SECURITY.md` (detect, contain, assess, notify, review).

### 10.6 Hosting and infrastructure
- Use a host with managed TLS, DDoS mitigation and a WAF (Cloudflare in front is recommended). Enable WAF managed rules, bot fight mode, and rate-limit rules on `/api/*`.
- DNS: enable **DNSSEC**, add **CAA** records, **SPF**, **DKIM**, **DMARC** (start `p=none` with reporting, move to `quarantine/reject`), and **MTA-STS/TLS-RPT** if practical.
- Registrar: enforce domain **lock** and 2FA; recommend registry lock/auto-renew. (`.com.au` is administered via auDA-accredited registrars; make sure the registrant details and eligibility information are correct.)
- Production and preview environments separated; preview deployments **noindex** and password-protected; separate secrets per environment.
- Automated backups of the lead database with tested restore; encryption at rest.
- Enforce 2FA and least-privilege access on GitHub, hosting, email provider, DNS and analytics accounts. No shared passwords.

### 10.7 Application-level safeguards
- No `dangerouslySetInnerHTML` with untrusted data; if rendering rich content, sanitise (DOMPurify) with a strict allow-list.
- Safe external links: `rel="noopener noreferrer"` on `target="_blank"` (social links, review links).
- Validate and allow-list any redirect targets (no open redirects).
- Disable directory listing and source maps in production (or upload them privately to an error tracker).
- Custom 404/500 pages that leak nothing.
- Error monitoring (Sentry or equivalent) with PII scrubbing; uptime monitoring and alerts; alert on spikes in form submissions/429s.
- Third-party embeds (maps, video) load **on click** (facade pattern) to protect privacy and performance, and are allow-listed in CSP.
- `robots.txt` blocks `/api/`, `/thank-you` (and admin if any); `noindex` on `/thank-you`.

### 10.8 Verification (do and report results)
- Run: `npm audit`, ESLint security rules (`eslint-plugin-security`), type-check, build, **Lighthouse CI**, **axe** accessibility checks, and a header scan (securityheaders / Observatory equivalent locally via `curl -I`).
- Manually test: form with XSS payloads, header-injection strings (`\r\nBcc:`), oversized payloads, double submit, rate-limit trip, missing/invalid Turnstile token, wrong `Origin`, and a non-image file disguised as `.jpg` (if uploads enabled). Record outcomes in `SECURITY.md`.

---

## 11. SEO (local-first)

- **Metadata:** unique `title` (≤ 60 chars) and `meta description` (≤ 155 chars) per page, canonical URLs, Open Graph + Twitter cards (using the generated OG image), `lang="en-AU"`, `hreflang` not needed (single locale).
- **Structured data (JSON-LD):** `Organization`, `LocalBusiness` (use `CleaningService`/`ProfessionalService` type) with address (Blacktown NSW), phone, email, `openingHoursSpecification`, `areaServed`, `sameAs` (Instagram, Facebook, Google profile), `Service` per service page, `BreadcrumbList`, `FAQPage` where FAQs are visible. Validate with Google's Rich Results Test.
- **Technical:** XML sitemap, `robots.txt`, clean semantic URLs, breadcrumbs, internal linking between related services and areas, image `alt` text that is descriptive and honest, descriptive link text, no duplicate H1s, logical heading hierarchy.
- **NAP consistency:** Name / Address / Phone must match the Google Business Profile exactly everywhere.
- Target keywords naturally (e.g. "commercial cleaning Blacktown", "office cleaning Western Sydney", "end of lease cleaning commercial Sydney", "warehouse cleaning Sydney", "aged care cleaning Sydney", "school cleaning Sydney", "window cleaning Blacktown"). **No keyword stuffing.**
- Include a recommended **Google Business Profile** checklist in the README (categories, services, photos, posts, hours, link to site with UTM). Include guidance on listing Sydney CBD and other regions as service areas (a service-area business without a storefront in the CBD should **not** set up a fake CBD address; follow Google's guidelines).

### 11.1 SEO (classic search)
- Keyword map in `docs/keyword-map.md`: one primary intent per page, no cannibalisation. Primary clusters: "commercial cleaning Sydney", "office cleaning Sydney CBD", "commercial cleaners Sydney CBD", "end of lease commercial cleaning Sydney", "aged care cleaning Sydney", "hospital cleaning Sydney", "warehouse cleaning Sydney", "factory/industrial cleaning Sydney", "school cleaning Sydney", "childcare cleaning Sydney", "commercial window cleaning Sydney CBD", plus Western Sydney/Blacktown variants. Write for people first; no stuffing.
- Hub-and-spoke internal linking: Home → Services/Areas hubs → service and region pages → service x location pages, with descriptive anchor text and breadcrumbs.
- Topical authority: a `/resources` (or `/guides`) section with a few genuinely useful, original articles (e.g. "Commercial end of lease cleaning checklist NSW", "How much does office cleaning cost in Sydney?" (ranges only if the client approves pricing, otherwise explain cost factors), "Cleaning requirements for childcare centres", "How often should an office be cleaned?"). Each with author/business attribution, date, FAQs and internal links. Don't publish generic AI filler.
- Technical: clean URLs, canonical tags, XML sitemap segmented by type (pages, services, areas, resources), `lastmod` accurate, `robots.txt`, no orphan pages, no redirect chains, 404 handling, optimal crawl budget, `noindex` on thank-you/search/utility pages, image sitemap for the gallery.
- Entity SEO: consistent business entity across site, Google Business Profile, Facebook, Instagram; `sameAs` links; NAP consistency; add citations checklist (Yellow Pages AU, True Local, Hotfrog, Bing Places, Apple Business Connect, industry directories) to the README.

### 11.2 AEO (answer engine optimisation: AI Overviews, ChatGPT, Perplexity, Gemini, voice)
- **Answer-first writing:** under each key H2/H3 phrased as a question, give a direct 40–60 word answer first, then expand. Use clear, factual, quotable sentences; define terms; use lists and tables where they aid extraction.
- **Structured data everywhere it's true:** `FAQPage`, `HowTo` (for process/checklists where genuinely step-based), `Service`, `LocalBusiness`/`CleaningService`, `Organization`, `BreadcrumbList`, `Article` for resources, `WebSite` + `SearchAction` only if site search exists. Validate all with Google's Rich Results Test and Schema.org validator.
- **`/llms.txt`** summarising the business, services, areas, contact and key URLs for AI crawlers, plus a clean, crawlable HTML version of all content (no key content locked in JS, images or accordions that don't render server-side).
- **Crawler access policy:** allow reputable search and AI crawlers in `robots.txt` (Googlebot, Bingbot, OAI-SearchBot, PerplexityBot, etc.) unless the client prefers otherwise; document the decision in the README.
- **Voice/conversational queries:** include natural-language questions ("Who does commercial cleaning in Sydney CBD after hours?", "How much does end of lease cleaning cost for an office?", "What's included in aged care cleaning?").
- **E-E-A-T signals:** real team photos, real reviews, named business details, clear About page, last-updated dates on guides, accurate sourcing for regulatory claims (e.g. link to NSW Health/Safe Work NSW/ACECQA where referenced), no unverifiable claims.
- Keep facts consistent across the site and profiles so AI systems cite them correctly (hours, phone, areas, services).

### 11.3 SXO (search experience optimisation: rank *and* convert)
- Match **search intent per page**: service pages answer "what, who for, what's included, process, FAQs, how to get a quote"; location pages answer "do you cover my area and how fast can you start"; guides answer the question first, then soft-CTA.
- **Above-the-fold clarity** on every landing page: H1 that mirrors the query, one-line value proposition, trust signals (real reviews, real photos), phone and quote CTAs visible without scrolling on mobile.
- Remove friction: minimal form fields upfront (hero quick-form), prefilled service/suburb, click-to-call, short paths to quote (max 2 clicks from any page).
- Fast, stable, accessible (section 12/13 budgets are SXO requirements, not extras). Pass Core Web Vitals on mobile.
- Search-experience extras: breadcrumb navigation, "related services" and "nearby areas" modules, sticky CTA that appears after meaningful scroll, scannable layouts (short paragraphs, checklists, comparison tables), social proof placed beside CTAs.
- **Measure and iterate:** GA4/Plausible events (section 9), Search Console and Bing Webmaster Tools setup, scroll-depth and CTA-click tracking, heatmap/session recording **only with consent and with form fields masked**, and an A/B-test-ready structure for hero headline and CTA copy. Provide a `docs/cro-backlog.md` with the first 10 test ideas.

### 11.4 FAQ on every page (mandatory)
- **Every indexable page** (Home, Services overview, all 10 service pages, every area/region/CBD page, About, Gallery, Reviews, Contact, Get-a-Quote, resources/guides) must have a **visible FAQ section** of 4–8 questions with answers that are **unique to that page** (no copy-pasting the same FAQ across pages).
- Questions must reflect real buyer concerns for that page's topic and location (pricing factors, frequency, after-hours access, insurance/compliance *only as confirmed*, products used, supervision, how quotes work, start times, contracts vs one-off, areas covered, how to prepare for end of lease inspection, etc.).
- Mark up with `FAQPage` JSON-LD **matching the visible text exactly**. Render answers in the server HTML (accordion uses `<details>`/`<summary>` or an accessible button pattern; content must be crawlable when collapsed).
- Keep answers concise (40–80 words), factual, and linked to the relevant service/area page. Include a CTA after each FAQ block ("Still have a question? Call 0427 724 809 or get a free quote").
- Store FAQs in `src/content/faq/*.ts` keyed by page so they can be edited without touching components. Add a build-time check that fails if any indexable page has fewer than 4 FAQs or duplicate questions across pages.

---

## 12. Performance Budget

- Lighthouse (mobile): **Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95**.
- **LCP < 2.5 s, INP < 200 ms, CLS < 0.1** on a throttled mid-range mobile profile.
- Initial JS per route as small as possible (target < 150 KB gzipped for the home route excluding video); dynamic-import heavy libraries; no unused CSS.
- Hero image/video preloaded appropriately (`fetchpriority="high"`); all other media lazy.
- Self-hosted, subsetted fonts with `font-display: swap` and size-adjust fallbacks.
- Cache headers: immutable for hashed assets; sensible revalidation for HTML; CDN caching for images/video.

---

## 13. Accessibility (WCAG 2.2 AA)

- Semantic landmarks, skip-to-content link, visible focus rings, logical tab order, full keyboard operability (mega-menu, carousel, lightbox, before/after slider, accordion).
- ARIA only where native semantics are insufficient; accurate labels; live region for form errors/success.
- Colour contrast per AA; don't rely on colour alone; respect `prefers-reduced-motion` and `prefers-color-scheme` if dark mode exists.
- Alt text for all meaningful images; decorative images `alt=""`; captions/transcripts for videos where there is speech.
- Forms: associated labels, error messages linked via `aria-describedby`, no placeholder-only labels.

---

## 14. Responsive and UX Details

- Mobile-first; verify at 360, 390, 768, 1024, 1280, 1536+ px. No horizontal scroll at any width.
- Thumb-friendly mobile bottom bar (Call / Quote), collapsible sections, large form controls.
- Sticky header must not cover anchors (use `scroll-margin-top`).
- Fast perceived performance: skeletons/blur-up, optimistic UI states on the form.
- Trust signals near every CTA (e.g. "Free quote, no obligation", "Reply within one business day" — only if the client can deliver).

---

## 15. Project Structure and Quality

- Clean, typed, componentised code: `src/app`, `src/components/{ui,sections,forms,animation}`, `src/content/{services,reviews,faq,areas}.ts|json`, `src/config/site.ts`, `src/lib/{validation,email,security,analytics}`.
- Services content in data files so pages are generated from a template (but with unique copy per service).
- ESLint + Prettier + `tsc --noEmit` clean. Add basic tests: unit tests for validation and rate limiting, and Playwright e2e for the quote flow (happy path, validation errors, bot trap).
- GitHub Actions CI: install, lint, type-check, test, build, audit, secret scan, Lighthouse CI.
- `README.md`: setup, env vars, scripts, content editing guide (how to add reviews, photos, suburbs, services), deployment, DNS/email records, and a launch checklist.
- Commit in logical steps with clear messages.

---

## 16. Build Order (follow this sequence)

1. Inspect logo and all media; produce `assets-manifest.json`, curated optimised assets, and the design tokens from the logo.
2. Scaffold the project, config, env validation, security headers/middleware, and CI.
3. Build layout, header/footer, mega-menu, mobile action bar, cookie consent.
4. Build reusable sections and animation primitives.
5. Build Home, then the service template and all 10 service pages with unique copy.
6. Build About, Gallery, Reviews, Areas, FAQ, Contact, Get-a-Quote, Thank-you, legal pages.
7. Build the lead pipeline (validation, Turnstile, rate limit, email, storage, tracking).
8. SEO, structured data, sitemap, OG images.
9. Performance and accessibility passes; fix to budget.
10. Security verification (section 10.8) and write `SECURITY.md`.
11. Final report.

---

## 17. Definition of Done (verify, then report honestly)

- [ ] All 10 service pages exist with unique, accurate, Australian-English content and honest imagery.
- [ ] Logo used correctly; palette derived from it; favicons and OG image generated.
- [ ] Real photos/videos used, curated, EXIF-stripped, optimised; no identifiable children/patients/clients published.
- [ ] Before/after slider working with mouse, touch and keyboard.
- [ ] The 15 reviews from `reviews.json` displayed verbatim with Google attribution; aggregate shown only as 4.6 from 36 (if shown); no fabricated reviews or ratings; no review shown against a sector it doesn't mention.
- [ ] Contact details, hours, socials correct everywhere; live open/closed badge in `Australia/Sydney` time.
- [ ] Multi-step quote form works end to end: validation, Turnstile, rate limit, internal + customer emails, stored lead, thank-you page, tracked events.
- [ ] Every control in section 10 implemented and documented in `SECURITY.md`, with test results.
- [ ] Interactive Greater Sydney coverage map on the homepage with Sydney CBD highlighted, keyboard-accessible, and a suburb-check tool.
- [ ] `/areas/sydney-cbd` flagship page plus regional hubs live, each with unique content (no doorway pages).
- [ ] Every indexable page has 4–8 unique visible FAQs with matching `FAQPage` JSON-LD; the build-time FAQ check passes.
- [ ] SEO/AEO/SXO items in sections 11.1–11.4 implemented: keyword map, answer-first content, `llms.txt`, structured data validated, sitemap/robots, Search Console/Bing setup notes, CRO backlog.
- [ ] Lighthouse, accessibility and security-header targets met (include scores).
- [ ] `prefers-reduced-motion` honoured; no console errors; no layout shift from animations.
- [ ] README with deployment, DNS/email (SPF/DKIM/DMARC) and launch checklist.

**Final response format:** a concise summary of what was built, the verified scores/results, anything that could not be completed (e.g. reviews not retrievable, ABN/licence/insurance details needed, service radius to confirm, photo-consent questions), and the exact remaining steps for me to go live.

---

## 18. Things You Must Never Do

- Never fabricate reviews, ratings, awards, certifications, ABN, insurance, client logos, statistics or years in business.
- Never publish identifiable children, patients or client-confidential material.
- Never expose API keys or secrets client-side.
- Never ship lorem ipsum, placeholder phone numbers or placeholder images.
- Never copy competitor text or imagery.
- Never claim an office, address or coverage in Sydney CBD or elsewhere that the client hasn't confirmed, and never create doorway/near-duplicate location pages.
- Never block the main thread with animation or autoplay audio.
