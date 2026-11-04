"use client";

type Props = Record<string, string | number | boolean>;

/** Fires analytics events only if a consented analytics layer exists on the page. */
export function track(event: string, props: Props = {}) {
  try {
    const w = window as unknown as { dataLayer?: unknown[]; plausible?: (e: string, o?: { props: Props }) => void };
    if (localStorage.getItem("tsr-consent") !== "all") return;
    w.dataLayer?.push({ event, ...props });
    w.plausible?.(event, { props });
  } catch {
    /* storage may be unavailable */
  }
}
