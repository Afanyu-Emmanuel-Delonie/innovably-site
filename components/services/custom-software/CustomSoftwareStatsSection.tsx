"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  { value: 20, suffix: "+", label: "Apps shipped" },
  { value: 5, suffix: "+", label: "Years building" },
  { value: 100, suffix: "%", label: "Handoff rate" },
  { value: 0, suffix: "", label: "Missed deadlines" },
];

export default function CustomSoftwareStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // line draw
      gsap.from(".stats-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // stat blocks stagger in
      gsap.from(".stat-block", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      // counter roll-up
      stats.forEach(({ value }, i) => {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: value,
          duration: 1.4,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          onUpdate() {
            const el = sectionRef.current?.querySelectorAll(".stat-number")[i];
            if (el) el.textContent = String(Math.round(obj.n));
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-10"
    >
      <div className="stats-line mb-10 h-px w-full bg-border" />

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="stat-block flex flex-col gap-1.5">
            <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              <span className="stat-number">{value}</span>
              <span className="text-primary">{suffix}</span>
            </span>
            <span className="text-sm text-foreground-muted">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
