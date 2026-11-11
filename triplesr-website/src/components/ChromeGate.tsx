"use client";

import { usePathname } from "next/navigation";

// Google Ads landing pages (/lp/...) are deliberately stripped of site navigation, footer and floating
// buttons so visitors have one job: request a quote or call. Everything else keeps the full site chrome.
const isLanding = (pathname: string | null) => !!pathname && (pathname === "/lp" || pathname.startsWith("/lp/"));

export function ChromeGate({ children }: { children: React.ReactNode }) {
  return isLanding(usePathname()) ? null : <>{children}</>;
}

export function MainShell({ children }: { children: React.ReactNode }) {
  const lp = isLanding(usePathname());
  return <main id="main" className={lp ? "flex-1" : "flex-1 pt-20"}>{children}</main>;
}
