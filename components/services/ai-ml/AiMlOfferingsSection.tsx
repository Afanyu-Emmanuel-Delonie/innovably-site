"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  MdArticle,
  MdAutoAwesome,
  MdModelTraining,
  MdQueryStats,
  MdRocketLaunch,
  MdSmartToy,
} from "react-icons/md";
import type { IconType } from "react-icons";

const offerings: { title: string; description: string; Icon: IconType }[] = [
  {
    title: "AI Chatbot Development",
    description:
      "Conversational assistants trained on your data, wired into the tools your team already uses.",
    Icon: MdSmartToy,
  },
  {
    title: "Generative AI Solutions",
    description: "Content, code, and workflow generation built around your actual use case.",
    Icon: MdAutoAwesome,
  },
  {
    title: "Machine Learning Models",
    description: "Custom models trained, validated, and tuned on your data — not a generic API call.",
    Icon: MdModelTraining,
  },
  {
    title: "Predictive Analytics",
    description: "Forecasting and anomaly detection that turns historical data into a decision.",
    Icon: MdQueryStats,
  },
  {
    title: "NLP & Document Processing",
    description: "Extract, classify, and summarize text and documents at a scale humans can't match.",
    Icon: MdArticle,
  },
  {
    title: "MLOps & Model Deployment",
    description: "Models shipped to production with monitoring, versioning, and retraining pipelines.",
    Icon: MdRocketLaunch,
  },
];

export default function AiMlOfferingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".aiml-offerings-heading", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ".aiml-offerings-heading", start: "top 88%" },
      });

      gsap.utils.toArray<HTMLElement>(".aiml-offering-card").forEach((card) => {
        gsap.from(card, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          y: 24,
          scale: 0.97,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });

        gsap.from(card.querySelector(".aiml-offering-icon"), {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: card, start: "top 85%" },
        });
      });
    },
    { scope: sectionRef },
  );

  function handleCardMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <section id="offerings" ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <div className="aiml-offerings-heading mb-12 flex flex-col gap-3 max-w-xl">
        <span className="label">What We Deliver</span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          AI that ships to production, not just a notebook.
        </h2>
        <p className="mt-1 text-base leading-7 text-foreground-muted">
          From a first prototype to a model your systems depend on.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map(({ title, description, Icon }, i) => (
          <div
            key={title}
            onMouseMove={handleCardMove}
            className="aiml-offering-card group relative flex flex-col gap-5 bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
            style={{ clipPath: "inset(0 0 0 0)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(59,99,245,0.10), transparent 70%)",
              }}
              aria-hidden
            />

            <span className="absolute right-5 top-5 font-mono text-xs text-foreground-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="aiml-offering-icon relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-inset ring-border transition-colors duration-300 group-hover:bg-primary/20">
              <Icon className="h-5 w-5 text-primary" />
            </span>

            <div className="flex flex-col gap-2 pr-6">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-6 text-foreground-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
