"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Placeholder figures — swap for real numbers once available.
const stats = [
  { value: "5+", label: "Years building software" },
  { value: "20+", label: "Projects shipped" },
  { value: "2", label: "Products of our own" },
  { value: "24/7", label: "Support & availability" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".stat-tile", {
        y: 40,
        opacity: 0,
        scale: 0.92,
        stagger: { amount: 0.5, from: "start" },
        ease: "power4.out",
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      // number roll-up for each stat value
      sectionRef.current?.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
        const raw = el.dataset.value ?? "";
        const num = parseFloat(raw);
        if (isNaN(num)) return;
        const suffix = raw.slice(String(Math.floor(num)).length);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: num,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
          onUpdate() {
            el.textContent = Math.round(obj.val) + suffix;
          },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-10"
    >
      <div className="grid grid-cols-2 gap-6 border-t border-border pt-14 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-tile flex flex-col items-center gap-2 text-center"
          >
            <span
              className="stat-number text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              data-value={stat.value}
            >
              {stat.value}
            </span>
            <span className="text-sm text-foreground-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
