"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Essential cookies only by default. No analytics or marketing tags load before consent.
export function ConsentBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser storage must happen after hydration
      if (!localStorage.getItem("tsr-consent")) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);
  if (!show) return null;
  const choose = (v: "all" | "essential") => {
    try { localStorage.setItem("tsr-consent", v); } catch { /* ignore */ }
    setShow(false);
  };
  return (
    <div role="dialog" aria-label="Cookie preferences" className="fixed bottom-44 left-3 right-3 z-50 max-w-md rounded-2xl border border-line bg-white p-4 shadow-2xl sm:left-6 lg:bottom-6 lg:left-24">
      <p className="text-sm text-ink">
        We use essential cookies to run this site. With your permission we'd also use analytics to improve it. See our <Link href="/privacy-policy" className="font-bold text-teal underline">Privacy Policy</Link>.
      </p>
      <div className="mt-3 flex gap-2">
        <button onClick={() => choose("essential")} className="btn btn-outline min-h-11 flex-1 px-4 py-2 text-sm">Essential only</button>
        <button onClick={() => choose("all")} className="btn btn-outline min-h-11 flex-1 px-4 py-2 text-sm">Allow analytics</button>
      </div>
    </div>
  );
}
