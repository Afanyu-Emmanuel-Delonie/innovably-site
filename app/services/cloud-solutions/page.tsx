import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import CloudHero from "@/components/services/cloud/CloudHero";
import CloudStatsSection from "@/components/services/cloud/CloudStatsSection";
import CloudOfferingsSection from "@/components/services/cloud/CloudOfferingsSection";
import CloudProcessSection from "@/components/services/cloud/CloudProcessSection";
import CloudToolsSection from "@/components/services/cloud/CloudToolsSection";
import CloudWhySection from "@/components/services/cloud/CloudWhySection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";

export const metadata: Metadata = {
  title: "Cloud Solutions — Migration, IaC & Cost Optimisation",
  description:
    "Cloud migration, infrastructure as code, cost optimisation, and monitoring from Innovably — built for uptime and predictable spend on AWS and Google Cloud.",
  alternates: { canonical: "https://innovably.digital/services/cloud-solutions" },
  openGraph: {
    title: "Cloud Solutions — Migration, IaC & Cost Optimisation — Innovably",
    description:
      "Cloud migration, infrastructure as code, cost optimisation, and monitoring built for uptime and predictable spend.",
    url: "https://innovably.digital/services/cloud-solutions",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Cloud Solutions — Migration, IaC & Cost Optimisation — Innovably",
    description:
      "Cloud migration, infrastructure as code, cost optimisation, and monitoring built for uptime and predictable spend.",
    images: ["/og-default.png"],
  },
};

const faqs = [
  {
    question: "Which cloud providers do you work with?",
    answer:
      "Primarily AWS and Google Cloud, though we adapt to whatever platform your team already runs on rather than forcing a migration you don't need.",
  },
  {
    question: "Can you migrate us without downtime?",
    answer:
      "Yes — migrations are planned and executed in stages with rollback points, so production stays up throughout the process.",
  },
  {
    question: "Do you manage infrastructure long-term, or just set it up?",
    answer:
      "Both — some clients want a one-time migration and handoff, others want ongoing management. We scope it to what you actually need.",
  },
  {
    question: "How do you keep our cloud costs under control?",
    answer:
      "Right-sizing resources, reserved capacity where it makes sense, and alerting before spend drifts — not a surprise bill at the end of the month.",
  },
  {
    question: "What does 'infrastructure as code' actually get us?",
    answer:
      "Every environment becomes reproducible and version-controlled, so 'it works on staging' failures and manual configuration drift stop happening.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function CloudSolutionsPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main>
        <CloudHero />
        <CloudStatsSection />
        <CloudOfferingsSection />
        <CloudProcessSection />
        <CloudToolsSection />
        <CloudWhySection />
        <FAQSection
          eyebrow="Cloud FAQ"
          heading="Questions about our cloud work."
          faqs={faqs}
        />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
