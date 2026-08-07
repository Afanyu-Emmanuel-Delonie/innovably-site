import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow the unload event so Firebase Analytics' internal beacon
          // listener isn't blocked by the browser's default Permissions-Policy.
          // Without this, Firebase SDK init can stall and block Firestore writes.
          { key: "Permissions-Policy", value: "unload=*" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        // The dashboard route was renamed from /analytics to /innovably —
        // redirect rather than let the old path 404.
        source: "/analytics",
        destination: "/innovably",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
