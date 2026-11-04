import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { services } from "@/content/services";
import { regions } from "@/content/areas";
import { Facebook, Instagram, Mail, Phone, Pin } from "./Icons";
import { OpenBadge } from "./OpenBadge";

export function Footer() {
  return (
    <footer className="bg-navy pb-28 text-white lg:pb-0">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[1.4fr_1fr_1fr_1fr_minmax(15.5rem,1.2fr)]">
        <div>
          <div className="inline-block rounded-2xl bg-white p-3">
            <Image src="/logo-horizontal.png" alt={site.name} width={1200} height={341} className="h-16 w-auto sm:h-20" />
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/80">Triple SR Commercial Cleaning provides reliable, tailored commercial cleaning for offices, schools, care facilities and industrial sites across Sydney, with the CBD as our focus. Free on-site quotes.</p>
          {site.confirmed.abn && <p className="mt-3 text-xs text-white/70">ABN {site.confirmed.abn}</p>}
          <div className="mt-4 flex gap-3">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Triple SR on Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Instagram className="h-5 w-5" /></a>
            <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Triple SR on Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"><Facebook className="h-5 w-5" /></a>
          </div>
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold !text-white">Services</h2>
          <ul className="space-y-2 text-sm text-white/80">
            {services.map((s) => (
              <li key={s.slug}><Link className="hover:text-white hover:underline" href={`/services/${s.slug}`}>{s.title}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold !text-white">Company</h2>
          <ul className="space-y-2 text-sm text-white/80">
            {[["/about", "About us"], ["/areas", "Areas we service"], ["/areas/sydney-cbd", "Sydney CBD cleaning"], ["/gallery", "Gallery"], ["/reviews", "Google reviews"], ["/blog", "Blog"], ["/faq", "FAQ"], ["/contact", "Contact"], ["/get-a-quote", "Get a free quote"], ["/privacy-policy", "Privacy policy"], ["/terms", "Terms"]].map(([h, l]) => (
              <li key={h}><Link className="hover:text-white hover:underline" href={h}>{l}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold !text-white">Areas we service</h2>
          <ul className="space-y-2 text-sm text-white/80">
            {regions.slice(0, 8).map((r) => (
              <li key={r.slug}><Link className="hover:text-white hover:underline" href={`/areas/${r.slug}`}>{r.name.replace(" (Blacktown base)", "")}</Link></li>
            ))}
            <li><Link className="font-bold text-green-bright hover:underline" href="/areas">All areas →</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 font-display text-lg font-bold !text-white">Contact</h2>
          <ul className="space-y-3 text-sm text-white/90">
            <li className="flex gap-2"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-green-bright" /><a href={`tel:${site.phoneTel}`} className="hover:underline">{site.phoneDisplay}</a></li>
            <li className="flex gap-2"><Mail className="mt-0.5 h-5 w-5 shrink-0 text-green-bright" /><a href={`mailto:${site.email}`} className="whitespace-nowrap hover:underline">{site.email}</a></li>
            <li className="flex gap-2"><Pin className="mt-0.5 h-5 w-5 shrink-0 text-green-bright" />{site.address.text}</li>
          </ul>
          <dl className="mt-4 space-y-1 text-sm text-white/80">
            {site.hoursText.map((h) => (
              <div key={h.days} className="flex justify-between gap-4"><dt>{h.days}</dt><dd>{h.time}</dd></div>
            ))}
          </dl>
          <div className="mt-3"><OpenBadge tone="dark" /></div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/70">
        © {new Date().getFullYear()} {site.name}. Servicing Sydney CBD and Greater Sydney from Blacktown, NSW.
      </div>
    </footer>
  );
}
