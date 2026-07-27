import Nav from "@/components/Nav";
import AboutHero from "@/components/AboutHero";
import OurStorySection from "@/components/OurStorySection";
import MissionSection from "@/components/MissionSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import TeamSection from "@/components/TeamSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About — Innovably",
  description: "Learn about Innovably, our mission, values, and the team behind the work.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <AboutHero />
      <OurStorySection />
      <MissionSection />
      <CoreValuesSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </>
  );
}
