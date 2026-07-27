import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import ServicesSection from "@/components/ServicesSection";
import CTASection from "@/components/CTASection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <StatsSection />
      <ServicesSection />
      <CTASection />
      <ProcessSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  );
}
