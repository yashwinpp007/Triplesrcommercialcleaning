import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: { formats: ["image/avif", "image/webp"], deviceSizes: [480, 768, 1080, 1440, 1920] },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
  async redirects() {
    return [
      { source: "/lp/end-of-lease-cleaning-sydney", destination: "/commercial-end-of-lease-cleaning-sydney", permanent: true },
      { source: "/lp/commercial-end-of-lease-cleaning-sydney", destination: "/commercial-end-of-lease-cleaning-sydney", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/commercial-end-of-lease-cleaning-sydney", destination: "/lp/commercial-end-of-lease-cleaning-sydney" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-site" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
};

export default nextConfig;
