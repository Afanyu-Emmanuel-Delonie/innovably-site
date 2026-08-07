import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/start-a-project"],
      },
    ],
    sitemap: "https://innovably.digital/sitemap.xml",
  };
}
