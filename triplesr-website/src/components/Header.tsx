"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/config/site";
import { serviceGroups, services } from "@/content/services";
import { Chevron, Close, Menu, Phone, serviceIcons } from "./Icons";
import { OpenBadge } from "./OpenBadge";
import { track } from "@/lib/track";

const links = [
  { href: "/about", label: "About" },
  { href: "/areas", label: "Areas" },
  { href: "/gallery", label: "Gallery" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  // Menus are tied to the page they were opened on, so navigating closes them without an effect.
  const [megaFor, setMegaFor] = useState<string | null>(null);
  const [openFor, setOpenFor] = useState<string | null>(null);
  const mega = megaFor === pathname;
  const open = openFor === pathname;
  const setMega = (v: boolean | ((m: boolean) => boolean)) => setMegaFor((cur) => ((typeof v === "function" ? v(cur === pathname) : v) ? pathname : null));
  const setOpen = (v: boolean) => setOpenFor(v ? pathname : null);
  const last = useRef(0);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > last.current && y > 400 && !open);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) drawerRef.current?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); setMega(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setters are stable wrappers over state setters
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"} ${
          scrolled ? "glass shadow-[0_8px_30px_-18px_rgba(11,42,91,.45)]" : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4 py-2">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Image src="/logo-horizontal.png" alt={site.name} width={1200} height={341} priority className={`w-auto transition-all duration-300 ${scrolled ? "h-10 sm:h-11 xl:h-12" : "h-12 lg:h-14 xl:h-16"}`} />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <div onMouseEnter={() => setMega(true)} onMouseLeave={() => setMega(false)}>
              <button
                className="flex items-center gap-1 rounded-full px-4 py-2 font-semibold text-navy hover:bg-soft"
                aria-expanded={mega}
                aria-haspopup="true"
                onClick={() => setMega(true)}
              >
                Services <Chevron className={`h-4 w-4 transition-transform ${mega ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mega && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-x-0 top-full flex justify-center px-4 pt-1"
                  >
                    <div className="grid w-[52rem] max-w-full grid-cols-4 gap-6 rounded-3xl border border-line bg-white p-6 shadow-2xl">
                      {serviceGroups.map((g) => (
                        <div key={g}>
                          <p className="eyebrow mb-3">{g}</p>
                          <ul className="space-y-1">
                            {services.filter((s) => s.group === g).map((s) => {
                              const I = serviceIcons[s.icon];
                              return (
                                <li key={s.slug}>
                                  <Link href={`/services/${s.slug}`} className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-semibold text-ink hover:bg-teal-soft hover:text-teal">
                                    <I className="h-4 w-4 shrink-0 text-teal" /> {s.title}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                      <div className="col-span-4 -mb-2 border-t border-line pt-3 text-sm">
                        <Link href="/services" className="font-bold text-teal hover:underline">View all services →</Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-full px-4 py-2 font-semibold hover:bg-soft ${pathname === l.href ? "text-teal" : "text-navy"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden 2xl:block"><OpenBadge /></div>
            <a
              href={`tel:${site.phoneTel}`}
              onClick={() => track("phone_click", { location: "header" })}
              className="hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 font-bold text-navy hover:bg-soft md:inline-flex"
            >
              <Phone className="h-5 w-5 text-teal" /> {site.phoneDisplay}
            </a>
            <Link href="/get-a-quote" className="btn btn-primary hidden px-5 sm:inline-flex">Get a Free Quote</Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-full text-navy hover:bg-soft lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] overflow-y-auto bg-white lg:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28 }}
          >
            <div className="container-x flex items-center justify-between py-3">
              <Image src="/logo-horizontal.png" alt={site.name} width={1200} height={341} className="h-12 w-auto" />
              <button className="grid h-11 w-11 place-items-center rounded-full hover:bg-soft" aria-label="Close menu" onClick={() => setOpen(false)}>
                <Close className="h-6 w-6 text-navy" />
              </button>
            </div>
            <nav aria-label="Mobile" className="container-x pb-32 pt-2">
              {serviceGroups.map((g) => (
                <div key={g} className="mb-5">
                  <p className="eyebrow mb-2">{g}</p>
                  {services.filter((s) => s.group === g).map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} className="block rounded-xl px-3 py-3 text-lg font-semibold text-navy active:bg-soft">{s.title}</Link>
                  ))}
                </div>
              ))}
              <div className="border-t border-line pt-4">
                {[{ href: "/", label: "Home" }, ...links].map((l) => (
                  <Link key={l.href} href={l.href} className="block rounded-xl px-3 py-3 text-lg font-semibold text-navy active:bg-soft">{l.label}</Link>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link href="/get-a-quote" className="btn btn-primary">Get a Free Quote</Link>
                <a href={`tel:${site.phoneTel}`} className="btn btn-outline"><Phone className="h-5 w-5" /> {site.phoneDisplay}</a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
