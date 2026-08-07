"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import StartProjectButton from "@/components/home/StartProjectButton";

export default function UiUxHero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".uiux-heading", { type: "lines" });
      const tl = gsap.timeline();

      // .uiux-copy is intentionally excluded from this timeline — it's the
      // LCP element, and animating its opacity from 0 delays LCP until this
      // whole sequence finishes. It renders at full opacity immediately.
      tl.from(".uiux-badge", { y: 12, opacity: 0 })
        .from(split.lines, { y: 24, opacity: 0, stagger: 0.08 }, "-=0.3")
        .from(".uiux-cta > *", { y: 16, opacity: 0, stagger: 0.08 }, "-=0.4");

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
        <div className="uiux-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          UI/UX Design Services
        </div>

        <h1 className="uiux-heading max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Interfaces people understand in the first three seconds.
        </h1>

        <p className="uiux-copy mt-6 max-w-md text-lg leading-8 text-foreground-muted">
          We design for how people actually use software — research, structure, and visual
          craft in service of the task, not the trend.
        </p>

        <div className="uiux-cta mt-10 flex flex-col gap-4 text-base font-medium sm:flex-row">
          <StartProjectButton />
          <a
            href="#process"
            className="flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
          >
            See our process
          </a>
        </div>
      </div>
    </div>
  );
}
