import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import type { Service } from "@/content/services";
import { img } from "@/lib/images";
import { Arrow, Phone, serviceIcons } from "./Icons";
import { Reveal } from "./Reveal";
import { JsonLd } from "./JsonLd";

export function PageHero({ eyebrow, title, lead, image, children }: { eyebrow?: string; title: string; lead?: string; image?: string; children?: ReactNode }) {
  const i = image ? img(image) : null;
  return (
    <section className="relative isolate overflow-hidden bg-navy text-white">
      {i && <Image src={i.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-40" />}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
      <div className="container-x py-16 sm:py-24">
        <Reveal>
          {eyebrow && <p className="eyebrow !text-green-bright">{eyebrow}</p>}
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold !text-white sm:text-5xl lg:text-6xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg text-white/85">{lead}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="container-x pt-5 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((it, i) => (
            <li key={it.href} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i === items.length - 1 ? <span aria-current="page" className="font-semibold text-navy">{it.name}</span> : <Link href={it.href} className="hover:text-teal hover:underline">{it.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.href}` })) }} />
    </>
  );
}

export function CtaBand({ title = "Ready for a cleaner, healthier workplace?", text = "Get a free, no-obligation quote. We'll reply within one business day." }: { title?: string; text?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-navy via-navy-2 to-teal py-16 text-white">
      <div className="container-x flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <Reveal>
          <h2 className="max-w-xl text-3xl font-extrabold !text-white sm:text-4xl">{title}</h2>
          <p className="mt-2 max-w-xl text-white/85">{text}</p>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-wrap gap-3">
          <Link href="/get-a-quote" className="btn btn-primary">Get a Free Quote <Arrow className="h-5 w-5" /></Link>
          <a href={`tel:${site.phoneTel}`} className="btn btn-ghost"><Phone className="h-5 w-5" /> {site.phoneDisplay}</a>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  const im = img(s.hero);
  const Icon = serviceIcons[s.icon];
  return (
    <Reveal delay={(i % 3) * 0.07}>
      <Link href={`/services/${s.slug}`} className="card-lift group block h-full overflow-hidden rounded-3xl border border-line bg-white">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image src={im.src} alt={im.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-2xl bg-white/95 text-teal shadow-lg"><Icon className="h-6 w-6" /></span>
          <span className="absolute bottom-3 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-navy">{s.group}</span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-extrabold">{s.title}</h3>
          <p className="mt-2 text-muted">{s.summary}</p>
          <span className="mt-4 inline-flex items-center gap-2 font-bold text-teal">Learn more <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
        </div>
      </Link>
    </Reveal>
  );
}

export function SectionHead({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {text && <p className="mt-3 text-lg text-muted">{text}</p>}
    </Reveal>
  );
}

export function Photo({ slug, className = "", sizes = "(max-width: 768px) 100vw, 50vw", priority = false, rounded = "rounded-3xl" }: { slug: string; className?: string; sizes?: string; priority?: boolean; rounded?: string }) {
  const i = img(slug);
  return (
    <div className={`relative overflow-hidden ${rounded} ${className}`}>
      <Image src={i.src} alt={i.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
