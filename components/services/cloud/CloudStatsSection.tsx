"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const stats = [
  { value: 30, suffix: "+", label: "Migrations completed" },
  { value: 5, suffix: "+", label: "Years in cloud" },
  { value: 99, suffix: ".9%", label: "Avg uptime delivered" },
  { value: 0, suffix: "", label: "Surprise outages" },
];

export default function CloudStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".cloud-stats-line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".cloud-stat-block", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      stats.forEach(({ value }, i) => {
        const obj = { n: 0 };
        gsap.to(obj, {
          n: value,
          duration: 1.4,
          ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          onUpdate() {
            const el = sectionRef.current?.querySelectorAll(".cloud-stat-number")[i];
            if (el) el.textContent = String(Math.round(obj.n));
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <div className="cloud-stats-line mb-10 h-px w-full bg-border" />
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
        {stats.map(({ value, suffix, label }) => (
          <div key={label} className="cloud-stat-block flex flex-col gap-1.5">
            <span className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              <span className="cloud-stat-number">{value}</span>
              <span className="text-primary">{suffix}</span>
            </span>
            <span className="text-sm text-foreground-muted">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
