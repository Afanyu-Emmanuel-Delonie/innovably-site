import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import Hero from "@/components/home/Hero";
import StatsSection from "@/components/home/StatsSection";
import ServicesSection from "@/components/home/ServicesSection";
import CTASection from "@/components/home/CTASection";
import ProcessSection from "@/components/home/ProcessSection";
import ContactSection from "@/components/home/ContactSection";
import FAQSection from "@/components/home/FAQSection";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";

export const metadata: Metadata = {
  title: "Custom Software & AI Solutions — Innovably",
  description:
    "Innovably builds custom software, AI/ML integrations, cloud infrastructure, and UI/UX design for startups and growing businesses. From first idea to shipped product.",
  alternates: { canonical: "https://innovably.digital" },
  openGraph: {
    title: "Custom Software & AI Solutions — Innovably",
    description:
      "Innovably builds custom software, AI/ML integrations, cloud infrastructure, and UI/UX design for startups and growing businesses.",
    url: "https://innovably.digital",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Custom Software & AI Solutions — Innovably",
    description:
      "Innovably builds custom software, AI/ML integrations, cloud infrastructure, and UI/UX design for startups and growing businesses.",
    images: ["/og-default.png"],
  },
};

const homeFaqs = [
  {
    question: "Do you work with startups or only larger companies?",
    answer: "Both. Some of our clients are early-stage teams shipping a first product, others are established companies extending existing systems.",
  },
  {
    question: "Do you build your own products too?",
    answer: "Yes — alongside client work, we build and maintain our own products, using the same process and standards.",
  },
  {
    question: "What does a typical engagement look like?",
    answer: "It starts with a short discovery call to scope the problem, followed by a proposal covering timeline and cost. From there we work in short, reviewable cycles rather than one long handoff at the end.",
  },
  {
    question: "Do you offer support after launch?",
    answer: "Yes. Every project includes a support window after launch, and we offer ongoing retainers for teams that want us to keep maintaining and extending the product.",
  },
  {
    question: "What technologies do you work with?",
    answer: "We’re not tied to one stack — we pick what fits the problem, spanning web, mobile, cloud, and AI/ML integrations.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main>
        <Hero />
        <StatsSection />
        <ServicesSection />
        <CTASection />
        <ProcessSection />
        <ContactSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
