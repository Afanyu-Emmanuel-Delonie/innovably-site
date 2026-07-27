"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Discover",
    description:
      "We start by understanding the problem, the users, and what success actually looks like.",
  },
  {
    title: "Design",
    description:
      "Interfaces and architecture get shaped together, so what we design is what we can build.",
  },
  {
    title: "Build",
    description:
      "Senior engineers ship in small, reviewable increments — not a black box at the end.",
  },
  {
    title: "Support",
    description:
      "Launch isn't the finish line. We stay on to fix, extend, and improve what we shipped.",
  },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".process-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".process-step", {
        y: 36,
        opacity: 0,
        stagger: { amount: 0.6, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      // scrubbed road line
      gsap.to(".road-progress-h", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.8,
        },
      });

      gsap.to(".road-progress-v", {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          end: "bottom 70%",
          scrub: 0.8,
        },
      });

      // step number nodes light up as line passes
      document.querySelectorAll<HTMLElement>(".process-node").forEach((node, i) => {
        gsap.to(node, {
          backgroundColor: "rgba(59,99,245,0.2)",
          borderColor: "rgb(59,99,245)",
          color: "#f2f3f5",
          duration: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${i * 18}% 65%`,
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10"
    >
      <div className="process-heading mb-16 max-w-lg">
        <span className="label">How we work</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          A process built on transparency, not guesswork.
        </h2>
      </div>

      <div className="relative">
        {/* vertical roadmap line — mobile */}
        <div
          className="absolute top-2 bottom-2 left-4.5 w-px bg-border sm:hidden"
          aria-hidden
        />
        <div
          className="road-progress-v absolute top-2 bottom-2 left-4.5 w-px origin-top scale-y-0 bg-primary sm:hidden"
          aria-hidden
        />

        {/* horizontal roadmap line — desktop */}
        <div
          className="absolute top-4.5 right-[12.5%] left-[12.5%] hidden h-px bg-border sm:block"
          aria-hidden
        />
        <div
          className="road-progress-h absolute top-4.5 right-[12.5%] left-[12.5%] hidden h-px origin-left scale-x-0 bg-primary sm:block"
          aria-hidden
        />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-4 sm:gap-6">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="process-step relative flex gap-4 sm:flex-col sm:items-center sm:gap-3 sm:text-center"
            >
              <span className="process-node relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-foreground-muted transition-colors duration-300">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5 sm:items-center">
                <h3 className="text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm leading-6 text-foreground-muted sm:max-w-56">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
