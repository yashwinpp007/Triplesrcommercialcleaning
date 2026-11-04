import { z } from "zod";
import { services } from "@/content/services";

export const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];
export const sizes = ["small", "medium", "large", "not-sure"] as const;
export const frequencies = ["daily", "weekly", "fortnightly", "monthly", "one-off", "not-sure"] as const;
export const contactMethods = ["phone", "email", "either"] as const;

// Strip control characters (incl. CR/LF, which prevents email header injection) and normalise Unicode.
const clean = (s: string) => s.normalize("NFKC").replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim();
const text = (max: number, min = 1) => z.string().transform(clean).pipe(z.string().min(min).max(max));

// Australian numbers: mobiles 04xx xxx xxx, landlines with area code, or +61 forms.
const auPhone = /^(?:\+?61|0)[2-478](?:[ -]?\d){8}$/;

export const quoteSchema = z
  .object({
    service: z.enum(serviceSlugs),
    suburb: text(80, 2),
    size: z.enum(sizes),
    floors: z.string().max(10).optional().default(""),
    frequency: z.enum(frequencies),
    contactMethod: z.enum(contactMethods),
    name: text(80, 2),
    business: z.string().max(120).transform(clean).optional().default(""),
    phone: z.string().transform(clean).pipe(z.string().regex(auPhone, "Enter a valid Australian phone number")),
    email: z.string().transform(clean).pipe(z.string().email().max(160)),
    message: z.string().max(1500).transform(clean).optional().default(""),
    consent: z.literal(true),
    // anti-abuse
    website: z.string().max(0).optional().default(""), // honeypot: must stay empty
    startedAt: z.number(),
    turnstileToken: z.string().max(4096).optional().default(""),
    idempotencyKey: z.string().min(8).max(64),
    source: z.string().max(300).optional().default(""),
  })
  .strict();

export type QuoteInput = z.infer<typeof quoteSchema>;

export const linkCount = (s: string) => (s.match(/https?:\/\/|www\./gi) ?? []).length;
