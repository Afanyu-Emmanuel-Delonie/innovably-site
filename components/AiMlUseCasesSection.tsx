"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import {
  MdArticle,
  MdAutoAwesome,
  MdModelTraining,
  MdQueryStats,
  MdRocketLaunch,
  MdSmartToy,
} from "react-icons/md";
import type { IconType } from "react-icons";

const useCases: { title: string; description: string; Icon: IconType; examples: string[] }[] = [
  {
    title: "AI Chatbots & Assistants",
    description:
      "Conversational agents trained on your data and wired into the tools your team already uses — not a generic wrapper around a public API.",
    Icon: MdSmartToy,
    examples: ["Customer support bots", "Internal knowledge assistants", "Sales qualification agents"],
  },
  {
    title: "Generative AI Products",
    description:
      "Content, code, and workflow generation built around your actual use case — prompt engineering, RAG pipelines, and fine-tuning included.",
    Icon: MdAutoAwesome,
    examples: ["Document generation", "Code assistants", "Automated reporting"],
  },
  {
    title: "Custom ML Models",
    description:
      "Models trained, validated, and tuned on your data — not a generic API call dressed up as a solution.",
    Icon: MdModelTraining,
    examples: ["Classification & tagging", "Recommendation engines", "Anomaly detection"],
  },
  {
    title: "Predictive Analytics",
    description:
      "Forecasting and anomaly detection that turns historical data into a decision your team can act on.",
    Icon: MdQueryStats,
    examples: ["Demand forecasting", "Churn prediction", "Risk scoring"],
  },
  {
    title: "NLP & Document Intelligence",
    description:
      "Extract, classify, and summarize text and documents at a scale humans can't match — structured output from unstructured input.",
    Icon: MdArticle,
    examples: ["Contract analysis", "Sentiment classification", "Entity extraction"],
  },
  {
    title: "MLOps & Model Deployment",
    description:
      "Models shipped to production with monitoring, versioning, and retraining pipelines — so performance doesn't quietly degrade.",
    Icon: MdRocketLaunch,
    examples: ["CI/CD for models", "Drift monitoring", "A/B model testing"],
  },
];

export default function AiMlUseCasesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".aiml-usecases-heading", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ".aiml-usecases-heading", start: "top 88%" },
      });

      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": () => {
          const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
          if (cards.length < 2) return;

          gsap.set(cards.slice(1), { yPercent: 6, opacity: 0, scale: 0.94 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: pinRef.current,
              start: "top top",
              end: () => `+=${cards.length * window.innerHeight * 0.9}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, i) => {
            if (i === 0) return;
            tl.to(card, { yPercent: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
            tl.to(cards[i - 1], { scale: 0.94, opacity: 0.35, duration: 1 }, "<");
          });

          return () => tl.scrollTrigger?.kill();
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="use-cases" ref={sectionRef} className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 pt-24 sm:px-10">
        <div className="aiml-usecases-heading mb-16 flex max-w-xl flex-col gap-3">
          <span className="label">What We Build</span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Six AI use cases, one engineering standard.
          </h2>
          <p className="mt-1 text-base leading-7 text-foreground-muted">
            From a first prototype to a model your systems depend on.
          </p>
        </div>
      </div>

      {/* Desktop: pinned stacked cards */}
      <div
        ref={pinRef}
        className="relative mx-auto hidden w-full max-w-6xl px-6 pb-24 sm:px-10 lg:block"
      >
        <div className="relative flex flex-col gap-6 motion-safe:h-[30rem]">
          {useCases.map(({ title, description, Icon, examples }, i) => (
            <div
              key={title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative flex items-center gap-14 rounded-2xl border border-border bg-surface p-14 shadow-xl shadow-black/30 motion-safe:absolute motion-safe:inset-0"
              style={{ zIndex: i + 1 }}
            >
              <div className="flex w-56 shrink-0 flex-col items-start gap-6">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-inset ring-border">
                  <Icon className="h-7 w-7 text-primary" />
                </span>
                <span className="font-mono text-xs text-foreground-subtle">
                  {String(i + 1).padStart(2, "0")} / {String(useCases.length).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-3xl font-semibold tracking-tight text-foreground">{title}</h3>
                <p className="max-w-xl text-base leading-7 text-foreground-muted">{description}</p>
                <ul className="mt-2 flex flex-wrap gap-2.5">
                  {examples.map((example) => (
                    <li
                      key={example}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-foreground-muted"
                    >
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile/tablet: static vertical list */}
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-24 sm:px-10 lg:hidden">
        {useCases.map(({ title, description, Icon, examples }, i) => (
          <div
            key={title}
            className="flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="flex flex-row items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-inset ring-border">
                <Icon className="h-6 w-6 text-primary" />
              </span>
              <span className="font-mono text-xs text-foreground-subtle">
                {String(i + 1).padStart(2, "0")} / {String(useCases.length).padStart(2, "0")}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="text-sm leading-6 text-foreground-muted">{description}</p>
              <ul className="mt-1 flex flex-wrap gap-2">
                {examples.map((example) => (
                  <li
                    key={example}
                    className="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-foreground-muted"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
