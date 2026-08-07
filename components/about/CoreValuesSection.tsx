"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  MdLightbulb,
  MdHandshake,
  MdRocketLaunch,
  MdVerified,
  MdSpeed,
  MdForum,
} from "react-icons/md";

const values = [
  {
    Icon: MdLightbulb,
    title: "Innovation first",
    body: "We challenge assumptions and explore new approaches before defaulting to the obvious solution.",
  },
  {
    Icon: MdHandshake,
    title: "Partnership over transactions",
    body: "We embed ourselves in your goals, not just your backlog. Your success is our success.",
  },
  {
    Icon: MdRocketLaunch,
    title: "Ship, then improve",
    body: "We believe in getting real software in front of real users fast, then iterating with purpose.",
  },
  {
    Icon: MdVerified,
    title: "No shortcuts on quality",
    body: "Tested, reviewed, production-ready code — every time, not just when someone's watching.",
  },
  {
    Icon: MdForum,
    title: "Radical transparency",
    body: "You see the backlog, the blockers, and the reasoning. No surprises at the end of a sprint.",
  },
  {
    Icon: MdSpeed,
    title: "Bias toward speed",
    body: "Momentum compounds. We move fast on decisions and slow down only where precision actually matters.",
  },
];

export default function CoreValuesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".values-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".value-card", {
        y: 40,
        opacity: 0,
        stagger: { amount: 0.6, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".value-card", start: "top 85%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl border-t border-border px-6 py-24 sm:px-10"
    >
      <div className="values-heading mb-14 flex flex-col gap-3">
        <span className="label">What Drives Us</span>
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The values we actually hold ourselves to.
        </h2>
        <p className="mt-1 max-w-md text-base leading-7 text-foreground-muted">
          Not framed posters — the standards behind every project we take on.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {values.map(({ Icon, title, body }) => (
          <div
            key={title}
            className="value-card flex flex-col gap-4 rounded-2xl border border-border bg-surface p-7"
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
