"use client";

import Link from "next/link";
import { site } from "@/config/site";
import { Phone } from "./Icons";
import { track } from "@/lib/track";

export function MobileBar() {
  return (
    <div className="glass fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-3 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <a href={`tel:${site.phoneTel}`} onClick={() => track("phone_click", { location: "mobile_bar" })} className="btn btn-outline min-h-12">
        <Phone className="h-5 w-5" /> Call
      </a>
      <Link href="/get-a-quote" className="btn btn-primary min-h-12">Get a Quote</Link>
    </div>
  );
}
