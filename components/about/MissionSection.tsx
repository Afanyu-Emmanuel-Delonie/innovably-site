"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MdFlag, MdVisibility } from "react-icons/md";

export default function MissionSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".mission-card", {
        y: 32,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="mission-card flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <MdFlag className="h-5 w-5 text-primary" />
          </span>
          <span className="label">Our Mission</span>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Close the gap between idea and impact.
          </h2>
          <p className="text-base leading-7 text-foreground-muted">
            Too many great ideas die in spreadsheets or get buried under slow,
            expensive development cycles. We exist to change that — combining
            sharp engineering, thoughtful design, and real business sense under
            one roof, so what you ship actually moves the needle.
          </p>
        </div>

        <div className="mission-card flex flex-col gap-4 rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
            <MdVisibility className="h-5 w-5 text-primary" />
          </span>
          <span className="label">Our Vision</span>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            The senior team every serious founder wishes they&apos;d hired first.
          </h2>
          <p className="text-base leading-7 text-foreground-muted">
            We&apos;re building toward a studio businesses return to every time —
            not because we&apos;re the cheapest option, but because we&apos;re
            the safest bet on a project that actually has to work.
          </p>
        </div>
      </div>
    </section>
  );
}
