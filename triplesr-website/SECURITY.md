# Security notes: Triple SR Commercial Cleaning

## Implemented
| Control | Where |
|---|---|
| Per-request CSP nonce, `strict-dynamic`, no `unsafe-inline` for scripts, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri`/`form-action` self | `src/proxy.ts` |
| HSTS, `nosniff`, `X-Frame-Options: DENY`, Referrer-Policy, Permissions-Policy, COOP/CORP, no `X-Powered-By` | `next.config.ts` |
| Same-origin (CSRF) check, JSON-only, body-size limit | `src/app/api/quote/route.ts` |
| Strict server-side Zod validation (unknown fields rejected), Unicode normalisation, control-character stripping (blocks email header injection), AU phone/email validation | `src/lib/validation.ts` |
| Honeypot, minimum fill time, link-stuffing and disposable-email checks, optional Cloudflare Turnstile (server-verified) | route + `QuoteForm.tsx` |
| Per-IP rate limit (5 / 15 min + 10 s burst), hashed IPs only, generic errors | route |
| Idempotency key (duplicate submissions ignored) | route + `QuoteForm.tsx` |
| Leads persisted before email; HTML-escaped email bodies; secrets only from env | route, `.env.example` |
| Consent banner (essential only by default), no analytics before consent | `ConsentBanner.tsx`, `lib/track.ts` |
| `security.txt`, `robots.txt` (blocks `/api/`, `/thank-you`), `noindex` on thank-you | `public/.well-known`, `src/app/robots.ts` |

## Verified locally (2026-11-04, dev server)
Wrong/missing Origin → 403; header-injection name → CR/LF stripped; unknown field → 400; invalid phone → 400; links in message → 400; disposable email → 400; no consent → 400; honeypot filled → 400; happy path → 200 and stored; 6th request in window → 429.

## Known gaps / before launch
- **Rate limiting and lead storage are in-process / local file.** On serverless or multi-instance hosting, swap for Upstash Redis/KV and a database (Supabase/Postgres) with encryption at rest and backups.
- **Email**: set `RESEND_API_KEY`, verify the sending domain, and publish SPF, DKIM and DMARC for `triplesrcommercialcleaning.com.au`. Without a key, leads are stored only.
- **Turnstile**: set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`, and add `https://challenges.cloudflare.com` to `script-src`/`frame-src` in `src/proxy.ts`.
- **Photo upload is intentionally not built** (needs private bucket, magic-byte checks and re-encoding).
- CSP uses `style-src 'unsafe-inline'` because the animation library sets inline style attributes; scripts remain strict. The nonce requires dynamic rendering, so pages are not statically cached.
- Add WAF/bot rules (Cloudflare), DNSSEC/CAA, 2FA on all accounts, Dependabot, CI secret scanning and `npm audit` gates.
- Privacy Policy and Terms are drafts and need legal review. Retention (24 months) is a suggestion to confirm.
- Incident response (NDB scheme): detect, contain, assess, notify affected people and the OAIC if serious harm is likely, then review.
