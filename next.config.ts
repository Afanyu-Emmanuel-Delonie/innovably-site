import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "i.pravatar.cc" }, { hostname: "picsum.photos" }],
  },
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
};

export default nextConfig;
