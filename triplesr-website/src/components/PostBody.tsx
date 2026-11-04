import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/content/posts";
import { img } from "@/lib/images";

// Renders [label](/path) markup inside text as internal links
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="font-semibold text-teal underline decoration-teal/40 underline-offset-2 hover:decoration-teal">{m[1]}</Link>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-lg leading-relaxed text-ink/90">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return <h2 key={i} id={b.id} className="scroll-mt-28 pt-6 text-3xl font-extrabold leading-tight sm:text-4xl">{b.text}</h2>;
          case "h3":
            return <h3 key={i} className="pt-2 text-xl font-extrabold">{b.text}</h3>;
          case "p":
            return <p key={i}><Rich text={b.text} /></p>;
          case "ul":
            return (
              <ul key={i} className="space-y-2.5">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3"><span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-green-bright" /><span><Rich text={it} /></span></li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="space-y-3">
                {b.items.map((it, n) => (
                  <li key={it} className="flex gap-3"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy text-sm font-bold text-white">{n + 1}</span><span><Rich text={it} /></span></li>
                ))}
              </ol>
            );
          case "img": {
            const im = img(b.slug);
            return (
              <figure key={i} className="py-3">
                <div className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
                  <Image src={im.src} alt={im.alt} fill sizes="(max-width: 1024px) 92vw, 720px" className="object-cover object-[50%_20%]" />
                </div>
                <figcaption className="mt-2.5 text-center text-sm text-muted">{b.caption}</figcaption>
              </figure>
            );
          }
          case "callout":
            return (
              <aside key={i} className="rounded-3xl border border-teal/25 bg-teal-soft p-6">
                <p className="eyebrow">{b.title}</p>
                <p className="mt-2 text-lg font-medium text-navy">{b.text}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
