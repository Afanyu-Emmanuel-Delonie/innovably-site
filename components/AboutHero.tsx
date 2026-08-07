"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import StartProjectButton from "@/components/StartProjectButton";

export default function AboutHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".about-heading", { type: "lines" });
      const tl = gsap.timeline();

      tl.from(".about-badge", { y: 12, opacity: 0 })
        .from(split.lines, { y: 24, opacity: 0, stagger: 0.08 }, "-=0.3")
        .from(".about-copy", { y: 16, opacity: 0 }, "-=0.4")
        .from(".about-cta > *", { y: 16, opacity: 0, stagger: 0.08 }, "-=0.4")
        .from(".about-stats > *", { y: 16, opacity: 0, stagger: 0.08 }, "-=0.3");

      return () => split.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative overflow-hidden bg-background">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-[-12rem] h-[36rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,99,245,0.22),transparent_70%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 pt-16 pb-24 text-center sm:pt-20">
        <div className="about-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Who We Are
        </div>

        <h1 className="about-heading max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Built by builders, trusted to deliver.
        </h1>

        <p className="about-copy mt-6 max-w-md text-lg leading-8 text-foreground-muted">
          The digital product studio businesses call when the idea is too important to hand off to guesswork.
        </p>

        <div className="about-cta mt-10 flex flex-col gap-4 text-base font-medium sm:flex-row">
          <StartProjectButton />
          <a
            href="/#services"
            className="flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
          >
            See what we do
          </a>
        </div>

        <div className="about-stats mt-14 grid grid-cols-2 gap-px rounded-2xl border border-border bg-border sm:grid-cols-4">
          {[
            { value: "5+", label: "Years of experience" },
            { value: "20+", label: "Projects shipped" },
            { value: "2", label: "Own products" },
            { value: "24/7", label: "Support" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 bg-background px-6 py-6 first:rounded-tl-2xl last:rounded-br-2xl sm:first:rounded-l-2xl sm:last:rounded-r-2xl"
            >
              <span className="text-2xl font-semibold tracking-tight text-foreground">
                {value}
              </span>
              <span className="text-xs text-foreground-muted">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
