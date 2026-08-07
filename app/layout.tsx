import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import PageLoader from "@/components/layout/PageLoader";
import JsonLd from "@/components/layout/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/schema";

const SITE_URL = "https://innovably.digital";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Innovably — Custom Software, AI & Cloud Solutions",
    template: "%s — Innovably",
  },
  description:
    "Innovably builds custom software, AI/ML solutions, cloud infrastructure, and UI/UX design for startups and growing businesses worldwide.",
  openGraph: {
    siteName: "Innovably",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Innovably" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@innovably",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=fragment-mono@400,500&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <SmoothScroll />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
