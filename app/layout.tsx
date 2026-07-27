import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import PageLoader from "@/components/PageLoader";

export const metadata: Metadata = {
  title: "Innovably",
  description: "Innovably",
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
        <SmoothScroll />
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
