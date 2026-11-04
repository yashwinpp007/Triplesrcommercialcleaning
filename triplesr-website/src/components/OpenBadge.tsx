"use client";

import { useEffect, useState } from "react";
import { sydneyStatus } from "@/lib/hours";

export function OpenBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [s, setS] = useState<ReturnType<typeof sydneyStatus> | null>(null);
  useEffect(() => {
    const tick = () => setS(sydneyStatus());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  if (!s) return <span className="inline-block h-6 w-40" aria-hidden />;
  const dark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${
        dark ? "bg-white/10 text-white" : "bg-soft text-navy"
      }`}
      role="status"
    >
      <span className={`h-2 w-2 rounded-full ${s.open ? "bg-green-bright" : "bg-amber-400"}`} />
      {s.open ? "Open now" : "Closed – we reply next business day"}
    </span>
  );
}
