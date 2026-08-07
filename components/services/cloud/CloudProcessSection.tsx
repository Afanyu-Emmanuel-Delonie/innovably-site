"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Discovery & Audit",
    description:
      "We map your current infrastructure, costs, and pain points before recommending anything.",
  },
  {
    title: "Architecture Design",
    description:
      "Target architecture, tooling choices, and a migration or build plan with clear milestones.",
  },
  {
    title: "Infrastructure as Code",
    description:
      "Everything is written as code from day one — reproducible, version-controlled, and reviewable.",
  },
  {
    title: "Migration or Build",
    description:
      "Staged execution with rollback points at every step, so production stays up throughout.",
  },
  {
    title: "Observability Setup",
    description:
      "Logs, metrics, traces, and alerts wired up before we hand anything over — not as an afterthought.",
  },
  {
    title: "Handoff & Ongoing Support",
    description:
      "Full documentation, runbooks, and ongoing support as your infrastructure grows and changes.",
  },
];

export default function CloudProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".cloud-process-heading h2", { type: "lines" });

      gsap.from(".cloud-process-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(split.lines, {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      gsap.from(".cloud-process-subtext", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".cloud-process-steps", start: "top 80%", end: "bottom 60%", scrub: 1 },
      });

      gsap.utils.toArray<HTMLElement>(".cloud-process-step").forEach((step) => {
        gsap.from(step, {
          x: -32,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
        gsap.from(step.querySelector(".cloud-step-dot"), {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl border-t border-border px-6 py-24 sm:px-10"
    >
      <div className="cloud-process-heading mb-16 max-w-lg flex flex-col gap-3">
        <span className="cloud-process-eyebrow label">How We Work</span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Six steps from audit to production-ready infrastructure.
        </h2>
        <p className="cloud-process-subtext mt-1 text-base leading-7 text-foreground-muted">
          No big-bang cutovers. Every stage has a rollback and a clear deliverable.
        </p>
      </div>

      <div className="cloud-process-steps relative">
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border lg:left-1/2" aria-hidden />
        <div
          ref={lineRef}
          className="absolute left-[18px] top-2 bottom-2 w-px bg-primary lg:left-1/2"
          aria-hidden
        />

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={step.title}
                className={`cloud-process-step relative flex items-start gap-6 pb-14 lg:w-1/2 lg:gap-10 ${
                  isRight ? "lg:ml-auto lg:pl-14" : "lg:pr-14 lg:text-right lg:flex-row-reverse"
                }`}
              >
                <span
                  className={`cloud-step-dot relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-foreground-muted lg:absolute lg:top-0 ${
                    isRight ? "lg:-left-[calc(18px+1.125rem)]" : "lg:-right-[calc(18px+1.125rem)]"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-6 text-foreground-muted max-w-xs">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
