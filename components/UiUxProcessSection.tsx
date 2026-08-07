"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Defining Scope",
    description:
      "We start by understanding the problem, the users, and what a successful outcome actually looks like.",
  },
  {
    title: "Mind Mapping",
    description:
      "Ideas get mapped visually before they're sketched, so we're solving the right problem before we design a screen.",
  },
  {
    title: "Wireframing",
    description:
      "Low-fidelity layouts establish structure and flow, so we can test the logic before it's dressed up.",
  },
  {
    title: "Prototyping",
    description:
      "Wireframes become clickable prototypes we can walk through with you and validate before full design work begins.",
  },
  {
    title: "UI Design",
    description:
      "Visual design, typography, and componentry come together into interfaces that are on-brand and production-ready.",
  },
  {
    title: "UX Design",
    description:
      "We stress-test flows for usability and accessibility, refining what doesn't hold up under real interaction.",
  },
  {
    title: "Design System",
    description:
      "Every project ends with a reusable design system — tokens, components, and documentation your team can build on.",
  },
];

const VB_W = 1000;
const R = 300;
const CX = VB_W / 2;
const CY = R;
const VB_H = R + 60;

const nodePositions = steps.map((_, i) => {
  const angle = Math.PI - (i * Math.PI) / (steps.length - 1);
  return {
    x: Math.round((CX + R * Math.cos(angle)) * 100) / 100,
    y: Math.round((CY - R * Math.sin(angle)) * 100) / 100,
  };
});

const arcPath = `M ${nodePositions[0].x},${nodePositions[0].y} A ${R},${R} 0 0 1 ${nodePositions[steps.length - 1].x},${nodePositions[steps.length - 1].y}`;

export default function UiUxProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressPathRef = useRef<SVGPathElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".uiux-process-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      const path = progressPathRef.current;
      if (!path) return;

      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        end: "bottom 45%",
        scrub: 1.5,
        onUpdate: (self) => {
          gsap.set(path, { strokeDashoffset: length * (1 - self.progress) });
          const idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
          setActiveIndex((prev) => (prev === idx ? prev : idx));
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div ref={sectionRef} id="process" className="relative w-full bg-background">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
        <div className="uiux-process-heading mb-16 max-w-lg">
          <span className="label">Our Process</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            From scope to a shippable design system.
          </h2>
          <p className="mt-3 text-base leading-7 text-foreground-muted">
            Seven steps, every time — nothing skipped, nothing handed off half-finished.
          </p>
        </div>

        {/* Desktop: arc */}
        <div className="relative hidden w-full lg:block" style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full overflow-visible"
            aria-hidden
          >
            <path d={arcPath} fill="none" stroke="var(--color-border)" strokeWidth={2} />
            <path
              ref={progressPathRef}
              d={arcPath}
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </svg>

          {steps.map((step, i) => {
            const { x, y } = nodePositions[i];
            const isBottomRow = i === 0 || i === steps.length - 1;
            const active = i === activeIndex;

            return (
              <button
                key={step.title}
                type="button"
                onMouseEnter={() => setActiveIndex(i)}
                onFocus={() => setActiveIndex(i)}
                onClick={() => setActiveIndex(i)}
                className={`absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border text-sm font-medium transition-colors duration-300 focus-visible:outline-none ${
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-foreground-muted"
                }`}
                style={{
                  left: `${Math.round((x / VB_W) * 10000) / 100}%`,
                  top: `${Math.round((y / VB_H) * 10000) / 100}%`,
                }}
              >
                {String(i + 1).padStart(2, "0")}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium transition-colors duration-300 ${
                    isBottomRow ? "top-full mt-2" : "bottom-full mb-2"
                  } ${active ? "text-primary" : "text-foreground-muted"}`}
                >
                  {step.title}
                </span>
              </button>
            );
          })}

          <div className="pointer-events-none absolute left-1/2 top-[56%] w-full max-w-xs -translate-x-1/2 -translate-y-1/2 text-center">
            <h3 className="text-lg font-semibold text-primary">{steps[activeIndex].title}</h3>
            <p className="mt-2 text-sm leading-6 text-foreground-muted">
              {steps[activeIndex].description}
            </p>
          </div>
        </div>

        {/* Mobile: vertical list */}
        <div className="relative lg:hidden">
          <div className="absolute bottom-2 left-[18px] top-2 w-px bg-border" aria-hidden />
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <div key={step.title} className="relative flex gap-4">
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-sm font-medium text-foreground-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-1.5 pt-1.5">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm leading-6 text-foreground-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
