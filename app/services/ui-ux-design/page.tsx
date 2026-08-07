import type { Metadata } from "next";
import Nav from "@/components/layout/Nav";
import UiUxHero from "@/components/services/ui-ux/UiUxHero";
import UiUxOfferingsSection from "@/components/services/ui-ux/UiUxOfferingsSection";
import UiUxProcessSection from "@/components/services/ui-ux/UiUxProcessSection";
import UiUxToolsSection from "@/components/services/ui-ux/UiUxToolsSection";
import UiUxWhySection from "@/components/services/ui-ux/UiUxWhySection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";

export const metadata: Metadata = {
  title: "UI/UX Design Services — Research to Design System",
  description:
    "UI/UX design from Innovably — user research, wireframes, prototypes, and production-ready design systems built for real users and clean developer handoff.",
  alternates: { canonical: "https://innovably.digital/services/ui-ux-design" },
  openGraph: {
    title: "UI/UX Design Services — Research to Design System — Innovably",
    description:
      "User research, wireframes, prototypes, and production-ready design systems built for real users and clean developer handoff.",
    url: "https://innovably.digital/services/ui-ux-design",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "UI/UX Design Services — Research to Design System — Innovably",
    description:
      "User research, wireframes, prototypes, and production-ready design systems built for real users.",
    images: ["/og-default.png"],
  },
};

const faqs = [
  {
    question: "What's included in a typical UI/UX engagement?",
    answer:
      "Scope discovery, wireframes, clickable prototypes, full UI design, and a documented design system — the same seven-step process we walk through above, tailored to your project's size.",
  },
  {
    question: "Do you design for web, mobile, or both?",
    answer:
      "Both. We design responsive web interfaces and native-feeling iOS/Android apps, and often the same project needs each.",
  },
  {
    question: "How many rounds of revisions are included?",
    answer:
      "We work in short review cycles rather than a fixed revision count — you see progress every few days and give feedback continuously, not just at one big reveal.",
  },
  {
    question: "What do we actually receive at the end?",
    answer:
      "Structured Figma files, a documented design system with tokens and components, and developer-ready specs — not a folder of disconnected screens.",
  },
  {
    question: "Can you work with our existing brand or design system?",
    answer:
      "Yes — we regularly extend an existing system rather than starting from scratch, as long as there's something usable to build on.",
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

export default function UiUxDesignPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main>
        <UiUxHero />
        <UiUxOfferingsSection />
        <UiUxProcessSection />
        <UiUxToolsSection />
        <UiUxWhySection />
        <FAQSection
          eyebrow="UI/UX FAQ"
          heading="Questions about the design process."
          faqs={faqs}
        />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
