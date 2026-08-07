"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MdDataUsage, MdGppGood, MdSpeed, MdVerified } from "react-icons/md";

const values = [
  {
    Icon: MdDataUsage,
    title: "Built on your data",
    body: "Models trained and validated on your actual data, not a generic public benchmark.",
  },
  {
    Icon: MdSpeed,
    title: "Production-ready, not a demo",
    body: "Shipped with monitoring, versioning, and retraining — not a notebook that never leaves staging.",
  },
  {
    Icon: MdGppGood,
    title: "Responsible by default",
    body: "Bias checks, evaluation, and guardrails built in from the start, not bolted on after launch.",
  },
  {
    Icon: MdVerified,
    title: "Measured against outcomes",
    body: "We track whether the model actually improves the metric you care about, not just accuracy.",
  },
];

export default function AiMlWhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".aiml-why-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".aiml-why-card", {
        y: 40,
        opacity: 0,
        stagger: { amount: 0.6, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".aiml-why-card", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl border-t border-border px-6 py-24 sm:px-10"
    >
      <div className="aiml-why-heading mb-14 flex flex-col gap-3">
        <span className="label">Why Innovably</span>
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          AI that earns its place in production.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="aiml-why-card flex flex-col gap-4 rounded-2xl border border-border bg-surface p-7"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </span>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            <p className="text-sm leading-6 text-foreground-muted">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
