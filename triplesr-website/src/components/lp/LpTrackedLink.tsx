"use client";

import { track } from "@/lib/track";

// Anchor that fires an analytics event (phone / WhatsApp / scroll-to-form) when clicked.
export function LpLink({
  href, event, page, location, className, children, external,
}: { href: string; event: string; page: string; location: string; className?: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { location, page })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
