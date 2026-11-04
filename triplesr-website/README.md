# Triple SR Commercial Cleaning: website

Next.js 16 (App Router) + TypeScript + Tailwind v4 + Motion. Built from `TRIPLESR_WEBSITE_BUILD_PROMPT.md`.

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev -- -p 3100       # http://localhost:3100
npm run lint && npx tsc --noEmit
```

## Where to edit
- Business details, hours, social links, Google rating: `src/config/site.ts` (leave `confirmed.*` empty until the client confirms ABN/insurance/etc.)
- Services (10 pages, copy and FAQs): `src/content/services.ts`
- Areas and suburbs (also drives the map and suburb checker): `src/content/areas.ts`
- Reviews (verbatim, from Google): `src/content/reviews.json`
- Photos: curated and optimised into `public/images/` (about 40 images from `tsr pics A`, address stamps cropped or avoided, EXIF stripped). Metadata and alt text: `src/content/images.json`
- Videos: `public/video/` (3 clips with posters). Originals are untouched in `tsr pics A`.
- Page-level FAQs: `src/lib/faqs.ts` and each service in `services.ts`

## Before going live
1. Confirm service radius, CBD capability and after-hours availability with the client; edit `areas.ts`.
2. Confirm ABN, insurance, police checks and years in business, then add to `site.ts` and surface in the UI.
3. Set env vars (email, Turnstile, IP salt), verify domain email records. See `SECURITY.md`.
4. Replace the in-memory rate limiter and local lead file with Redis/DB if hosting on serverless.
5. Re-check the Google profile for new reviews and add them to `reviews.json`.
6. Have the Privacy Policy and Terms reviewed by a lawyer.
7. Run Lighthouse and a header scan on the deployed URL; submit the sitemap to Search Console and Bing.
