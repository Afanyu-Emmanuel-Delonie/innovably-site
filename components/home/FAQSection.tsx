"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type Faq = { question: string; answer: string };

const defaultFaqs: Faq[] = [
  {
    question: "Do you work with startups or only larger companies?",
    answer:
      "Both. Some of our clients are early-stage teams shipping a first product, others are established companies extending existing systems.",
  },
  {
    question: "Do you build your own products too?",
    answer:
      "Yes — alongside client work, we build and maintain our own products, using the same process and standards.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "It starts with a short discovery call to scope the problem, followed by a proposal covering timeline and cost. From there we work in short, reviewable cycles rather than one long handoff at the end.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes. Every project includes a support window after launch, and we offer ongoing retainers for teams that want us to keep maintaining and extending the product.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "We're not tied to one stack — we pick what fits the problem, spanning web, mobile, cloud, and AI/ML integrations. Get in touch if you want specifics for your case.",
  },
];

type FAQSectionProps = {
  eyebrow?: string;
  heading?: string;
  faqs?: Faq[];
};

export default function FAQSection({
  eyebrow = "FAQ",
  heading = "Questions, answered.",
  faqs = defaultFaqs,
}: FAQSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".faq-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".faq-item", {
        x: -24,
        opacity: 0,
        stagger: { amount: 0.5, from: "start" },
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-3xl px-6 py-24 sm:px-10"
    >
      <div className="faq-heading mb-12 text-center">
        <span className="label">{eyebrow}</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {heading}
        </h2>
      </div>

      <div className="flex flex-col gap-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="faq-item group rounded-lg border border-border bg-surface px-5 py-4 open:pb-4"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground marker:content-none">
              {faq.question}
              <span className="shrink-0 text-xl text-foreground-muted transition-transform duration-[var(--duration-base)] group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
