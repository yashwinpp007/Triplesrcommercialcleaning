"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { site } from "@/config/site";
import { Phone } from "./Icons";
import { track } from "@/lib/track";

const WhatsAppIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const waUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(site.whatsappMessage)}`;

// Fixed WhatsApp (bottom-left) and call (bottom-right, wiggling) buttons on every page.
// On phones they sit above the sticky Call / Get a Quote bar.
export function FloatingContact() {
  const reduce = useReducedMotion();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setReady(true), reduce ? 0 : 900);
    return () => clearTimeout(id);
  }, [reduce]);
  if (!ready) return null;

  const base = "group fixed z-40 flex h-12 items-center overflow-hidden lg:h-14 rounded-full text-white shadow-[0_14px_34px_-10px_rgba(0,0,0,.55)] ring-2 ring-white/70 transition-[width,transform,box-shadow] duration-300 hover:shadow-[0_18px_40px_-10px_rgba(0,0,0,.65)] focus-visible:outline-offset-4";

  return (
    <>
      <motion.a
        href={`tel:${site.phoneTel}`}
        onClick={() => track("phone_click", { location: "floating_widget" })}
        aria-label={`Call Triple SR on ${site.phoneDisplay}`}
        initial={reduce ? false : { opacity: 0, scale: 0.4, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className={`${base} bottom-[4.6rem] right-3 w-12 flex-row-reverse bg-gradient-to-br from-navy-2 to-navy hover:w-[10.5rem] focus-visible:w-[10.5rem] sm:right-6 lg:bottom-6 lg:w-14`}
      >
        {!reduce && <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-navy/30 [animation-duration:2.8s]" />}
        <span className="grid h-12 w-12 shrink-0 place-items-center lg:h-14 lg:w-14"><Phone className="phone-wiggle h-6 w-6" /></span>
        <span className="whitespace-nowrap pl-5 text-sm font-bold">Call us now</span>
      </motion.a>

      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_click", { location: "floating_widget" })}
        aria-label="Chat with Triple SR on WhatsApp (opens in a new tab)"
        initial={reduce ? false : { opacity: 0, scale: 0.4, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: reduce ? 0 : 0.12 }}
        className={`${base} bottom-[4.6rem] left-3 w-12 bg-[#25D366] hover:w-[11.5rem] focus-visible:w-[11.5rem] sm:left-6 lg:bottom-6 lg:w-14`}
      >
        {!reduce && <span aria-hidden className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/50 [animation-duration:2.8s]" />}
        <span className="grid h-12 w-12 shrink-0 place-items-center lg:h-14 lg:w-14"><WhatsAppIcon className="h-7 w-7" /></span>
        <span className="whitespace-nowrap pr-5 text-sm font-bold">Chat on WhatsApp</span>
      </motion.a>
    </>
  );
}
