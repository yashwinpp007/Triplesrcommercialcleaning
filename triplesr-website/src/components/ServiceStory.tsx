import Image from "next/image";
import type { Story } from "@/content/service-stories";
import { img } from "@/lib/images";
import { Reveal } from "./Reveal";

// Editorial rows: heading and paragraphs on one side, a framed photo on the other, alternating down the page.
export function ServiceStory({ items }: { items: Story[] }) {
  return (
    <section className="py-14 sm:py-20" aria-label="About this service">
      <div className="container-x space-y-16 sm:space-y-24">
        {items.map((it, i) => {
          const im = img(it.img);
          const flip = i % 2 === 1;
          return (
            <div key={it.h} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <Reveal className={flip ? "lg:order-2" : ""}>
                <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">{it.h}</h2>
                <div className="mt-5 space-y-4">
                  {it.p.map((para) => (
                    <p key={para.slice(0, 24)} className="text-lg leading-relaxed text-muted">{para}</p>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.1} y={32} className={`relative ${flip ? "lg:order-1" : ""}`}>
                <div aria-hidden className={`absolute -z-10 hidden h-3/4 w-3/4 rounded-[2rem] bg-gradient-to-br from-teal-soft to-green-bright/20 lg:block ${flip ? "-bottom-5 -left-5" : "-bottom-5 -right-5"}`} />
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(11,42,91,.55)] ring-1 ring-black/5">
                  <Image
                    src={im.src}
                    alt={im.alt}
                    fill
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className={`object-cover ${it.pos ?? "object-[50%_14%]"} transition-transform duration-[1200ms] ease-out hover:scale-105`}
                  />
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
