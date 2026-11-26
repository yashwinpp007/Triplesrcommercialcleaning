import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Per-request CSP nonce. Scripts are locked to 'self' + nonce (+ strict-dynamic); no unsafe-inline for scripts.
export function proxy(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const dev = process.env.NODE_ENV !== "production";
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${dev ? " 'unsafe-eval'" : ""}`,
    // Inline style attributes are needed by the animation library; scripts stay strict.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://www.facebook.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleadservices.com https://www.google.com https://www.google.com.au https://*.doubleclick.net https://pagead2.googlesyndication.com",
    "font-src 'self' data:",
    "media-src 'self'",
    `connect-src 'self' https://www.facebook.com https://connect.facebook.net https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleadservices.com https://www.google.com https://www.google.com.au https://*.doubleclick.net https://pagead2.googlesyndication.com${dev ? " ws: wss:" : ""}`,
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  const headers = new Headers(request.headers);
  headers.set("x-nonce", nonce);
  headers.set("content-security-policy", csp);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [{ source: "/((?!api|_next/static|_next/image|images|video|favicon.ico|.*\\.(?:png|jpg|webp|svg|ico|txt|xml)$).*)" }],
};
