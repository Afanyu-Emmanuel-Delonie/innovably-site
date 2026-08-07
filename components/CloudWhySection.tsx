"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MdBolt, MdOutlineAttachMoney, MdShield, MdVisibility } from "react-icons/md";

const values = [
  {
    Icon: MdBolt,
    title: "Built for uptime",
    body: "Redundant by design — infrastructure that degrades gracefully instead of falling over.",
  },
  {
    Icon: MdOutlineAttachMoney,
    title: "No surprise bills",
    body: "Right-sized from day one, with alerts before spend drifts instead of after the invoice.",
  },
  {
    Icon: MdShield,
    title: "Secure by default",
    body: "Least-privilege access and hardened configs, not bolted on after an incident.",
  },
  {
    Icon: MdVisibility,
    title: "Full visibility",
    body: "Logs, metrics, and traces wired up from the start — nothing is a black box.",
  },
];

export default function CloudWhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".cloud-why-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".cloud-why-card", {
        y: 40,
        opacity: 0,
        stagger: { amount: 0.6, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".cloud-why-card", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl border-t border-border px-6 py-24 sm:px-10"
    >
      <div className="cloud-why-heading mb-14 flex flex-col gap-3">
        <span className="label">Why Innovably</span>
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Infrastructure you don't have to babysit.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="cloud-why-card flex flex-col gap-4 rounded-2xl border border-border bg-surface p-7"
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
