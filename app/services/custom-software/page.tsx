import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import CustomSoftwareHero from "@/components/services/custom-software/CustomSoftwareHero";
import CustomSoftwareStatsSection from "@/components/services/custom-software/CustomSoftwareStatsSection";
import CustomSoftwareTypesSection from "@/components/services/custom-software/CustomSoftwareTypesSection";
import CustomSoftwareProcessSection from "@/components/services/custom-software/CustomSoftwareProcessSection";
import CustomSoftwareTechSection from "@/components/services/custom-software/CustomSoftwareTechSection";
import CustomSoftwareWhySection from "@/components/services/custom-software/CustomSoftwareWhySection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";

export const metadata: Metadata = {
  title: "Custom Software Development Services — Innovably",
  description:
    "Custom web apps, mobile apps, internal tools, and system integrations built to scale. Innovably delivers software engineered right from day one.",
  alternates: { canonical: "https://innovably.digital/services/custom-software" },
  openGraph: {
    title: "Custom Software Development Services — Innovably",
    description:
      "Custom web apps, mobile apps, internal tools, and system integrations built to scale. Engineered right from day one.",
    url: "https://innovably.digital/services/custom-software",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "Custom Software Development Services — Innovably",
    description:
      "Custom web apps, mobile apps, internal tools, and system integrations built to scale.",
    images: ["/og-default.png"],
  },
};

const faqs = [
  {
    question: "How does a custom software engagement typically work?",
    answer:
      "We start with scoping the actual problem, then move in short build-and-review cycles so you see working software early and often — not one big reveal at the end.",
  },
  {
    question: "Are we locked into a specific tech stack?",
    answer:
      "No. We pick standard, widely-supported technologies suited to your project — nothing proprietary that only we can maintain after we leave.",
  },
  {
    question: "How do you estimate timelines?",
    answer:
      "After scoping, we break the project into milestones with their own estimates, so you know what's shipping and when rather than a single end-to-end guess.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We stay on for bug fixes, iteration, and scaling as needs change — most of our custom software clients are long-term relationships, not one-off builds.",
  },
  {
    question: "Can you work inside our existing codebase?",
    answer:
      "Yes — we regularly extend or modernize an existing system rather than starting from scratch, as long as there's something usable to build on.",
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

export default function CustomSoftwarePage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main>
        <CustomSoftwareHero />
        <CustomSoftwareStatsSection />
        <CustomSoftwareTypesSection />
        <CustomSoftwareProcessSection />
        <CustomSoftwareTechSection />
        <CustomSoftwareWhySection />
        <FAQSection
          eyebrow="Custom Software FAQ"
          heading="Questions about building with us."
          faqs={faqs}
        />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
