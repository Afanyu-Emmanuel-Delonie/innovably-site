"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Discovery & Scoping",
    description:
      "We map the actual problem, the users, and the constraints before a single line of code is written.",
  },
  {
    title: "Architecture & Planning",
    description:
      "Stack decisions, data models, and milestones are locked in so the build has no surprises.",
  },
  {
    title: "Iterative Build Cycles",
    description:
      "Short sprints with working software at the end of each — you see progress, not promises.",
  },
  {
    title: "Testing & QA",
    description:
      "Automated tests and manual QA run in parallel with development, not as an afterthought.",
  },
  {
    title: "Launch & Handoff",
    description:
      "Deployment, documentation, and a handoff your team can actually use — no black boxes.",
  },
  {
    title: "Ongoing Support",
    description:
      "Bug fixes, feature iterations, and scaling support as your product grows past launch.",
  },
];

export default function CustomSoftwareProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".process-heading h2", { type: "lines" });

      gsap.from(".process-eyebrow", {
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
      gsap.from(".process-subtext", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      // vertical line draw
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".process-steps", start: "top 80%", end: "bottom 60%", scrub: 1 },
      });

      // each step slides in from left
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((step, i) => {
        gsap.from(step, {
          x: -32,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: step, start: "top 85%" },
        });

        gsap.from(step.querySelector(".step-dot"), {
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
      <div className="process-heading mb-16 max-w-lg flex flex-col gap-3">
        <span className="process-eyebrow label">How We Work</span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Six steps from idea to shipped product.
        </h2>
        <p className="process-subtext mt-1 text-base leading-7 text-foreground-muted">
          No big-bang reveals. You see working software at every milestone.
        </p>
      </div>

      <div className="process-steps relative">
        {/* vertical track */}
        <div className="absolute left-[18px] top-2 bottom-2 w-px bg-border lg:left-1/2" aria-hidden />
        {/* animated fill */}
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
                className={`process-step relative flex items-start gap-6 pb-14 lg:w-1/2 lg:gap-10 ${
                  isRight ? "lg:ml-auto lg:pl-14" : "lg:pr-14 lg:text-right lg:flex-row-reverse"
                }`}
              >
                {/* dot */}
                <span
                  className={`step-dot relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-foreground-muted lg:absolute lg:top-0 ${
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
