"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { site } from "@/config/site";

export const CONSENT_EVENT = "tsr-consent-change";
export const READY_EVENT = "tsr-gtag-ready";

export const hasAllConsent = () => {
  try { return localStorage.getItem("tsr-consent") === "all"; } catch { return false; }
};

// Google tag for Google Ads. Loads only after the visitor chooses "Allow analytics" in the cookie banner.
export function GoogleAds() {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const sync = () => setOk(hasAllConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);
  if (!ok) return null;
  const id = site.googleAds.id;
  return (
    <>
      <Script id="google-tag-src" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="google-tag" strategy="afterInteractive">{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');
window.__tsrGtagReady = true;
window.dispatchEvent(new Event('${READY_EVENT}'));
`}</Script>
    </>
  );
}
