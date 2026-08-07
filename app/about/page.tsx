import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import AboutHero from "@/components/about/AboutHero";
import OurStorySection from "@/components/about/OurStorySection";
import MissionSection from "@/components/about/MissionSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import TeamSection from "@/components/about/TeamSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "About Us — Our Story, Mission & Team",
  description:
    "Meet the Innovably team — a digital product studio operating in Canada and Rwanda, building software for startups and growing businesses worldwide.",
  alternates: { canonical: "https://innovably.digital/about" },
  openGraph: {
    title: "About Us — Our Story, Mission & Team — Innovably",
    description:
      "Meet the Innovably team — a digital product studio operating in Canada and Rwanda, building software for startups and growing businesses worldwide.",
    url: "https://innovably.digital/about",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "About Us — Our Story, Mission & Team — Innovably",
    description:
      "Meet the Innovably team — a digital product studio operating in Canada and Rwanda, building software for startups and growing businesses worldwide.",
    images: ["/og-default.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main>
        <AboutHero />
        <OurStorySection />
        <MissionSection />
        <CoreValuesSection />
        <TeamSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
