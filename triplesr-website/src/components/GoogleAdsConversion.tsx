"use client";

import { useEffect } from "react";
import { site } from "@/config/site";
import { READY_EVENT, hasAllConsent } from "./GoogleAds";

// Fires the "quote form submitted" Google Ads conversion once per visit to /thank-you, only with consent.
export function GoogleAdsConversion() {
  useEffect(() => {
    const { id, formConversionLabel } = site.googleAds;
    if (!formConversionLabel) return;
    const fire = () => {
      // The event must be queued after the tag's js + config commands, so wait for the tag to report ready.
      if (!hasAllConsent() || !(window as unknown as { __tsrGtagReady?: boolean }).__tsrGtagReady) return;
      try {
        if (sessionStorage.getItem("tsr-ads-conv")) return;
        sessionStorage.setItem("tsr-ads-conv", "1");
      } catch { /* storage unavailable: fire anyway */ }
      const w = window as unknown as { dataLayer?: unknown[] };
      w.dataLayer = w.dataLayer || [];
      // gtag() pushes its `arguments` object; replicate that so the queued call is processed once the tag loads.
      // eslint-disable-next-line prefer-rest-params
      (function (..._args: unknown[]) { void _args; w.dataLayer!.push(arguments); })("event", "conversion", { send_to: `${id}/${formConversionLabel}`, value: 1.0, currency: "AUD" });
    };
    fire();
    window.addEventListener(READY_EVENT, fire);
    return () => window.removeEventListener(READY_EVENT, fire);
  }, []);
  return null;
}
