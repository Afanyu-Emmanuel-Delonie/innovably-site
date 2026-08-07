import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AboutHero from "@/components/AboutHero";
import OurStorySection from "@/components/OurStorySection";
import MissionSection from "@/components/MissionSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
