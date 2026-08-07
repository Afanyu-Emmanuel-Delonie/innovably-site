import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AiMlHero from "@/components/AiMlHero";
import AiMlStatsSection from "@/components/AiMlStatsSection";
import AiMlOfferingsSection from "@/components/AiMlOfferingsSection";
import AiMlProcessSection from "@/components/AiMlProcessSection";
import AiMlToolsSection from "@/components/AiMlToolsSection";
import AiMlWhySection from "@/components/AiMlWhySection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "AI & Machine Learning Solutions — Innovably",
  description:
    "Production-ready AI and ML solutions from Innovably — custom models, generative AI, chatbots, and MLOps pipelines built to hold up beyond the demo.",
  alternates: { canonical: "https://innovably.digital/services/ai-ml-solutions" },
  openGraph: {
    title: "AI & Machine Learning Solutions — Innovably",
    description:
      "Custom models, generative AI, chatbots, and MLOps pipelines built to hold up in production, not just in the demo.",
    url: "https://innovably.digital/services/ai-ml-solutions",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    title: "AI & Machine Learning Solutions — Innovably",
    description:
      "Custom models, generative AI, chatbots, and MLOps pipelines built to hold up in production.",
    images: ["/og-default.png"],
  },
};

const faqs = [
  {
    question: "Do we need our own dataset to get started?",
    answer:
      "Ideally yes, even a small one — models trained or fine-tuned on your data perform far better than a generic off-the-shelf solution. We can also help you figure out what data you need to collect.",
  },
  {
    question: "Can you build on top of models like GPT or Claude instead of training our own?",
    answer:
      "Often, yes — many use cases are better served by a well-engineered layer on top of an existing foundation model than training something from scratch. We'll recommend whichever is actually right for your case.",
  },
  {
    question: "How do you handle model accuracy and bias?",
    answer:
      "Every model ships with an evaluation process — accuracy against held-out data, and checks for the kinds of bias that matter for your use case, before it ever reaches production.",
  },
  {
    question: "What happens after the model is deployed?",
    answer:
      "We set up monitoring for model drift and retraining pipelines, so performance doesn't quietly degrade as real-world data changes.",
  },
  {
    question: "Can you integrate AI into an existing product?",
    answer:
      "Yes — most of our AI/ML work is integrated into an existing codebase and workflow, not built as a separate standalone tool.",
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

export default function AiMlSolutionsPage() {
  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main>
        <AiMlHero />
        <AiMlStatsSection />
        <AiMlOfferingsSection />
        <AiMlProcessSection />
        <AiMlToolsSection />
        <AiMlWhySection />
        <FAQSection
          eyebrow="AI/ML FAQ"
          heading="Questions about building with AI."
          faqs={faqs}
        />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
