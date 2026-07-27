"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // parallax glow
      gsap.to(".cta-glow", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const split = new SplitText(".cta-heading", { type: "lines" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%" },
      });

      tl.from(".cta-label", { y: 16, opacity: 0, duration: 0.5 })
        .from(split.lines, { y: 32, opacity: 0, stagger: 0.1, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .from(".cta-body", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".cta-buttons > *", { y: 16, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24 sm:py-32"
    >
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      <div
        className="cta-glow pointer-events-none absolute inset-x-0 top-1/2 h-[32rem] -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(59,99,245,0.24),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-6 text-center sm:px-10">
        <span className="cta-label label">Let&apos;s build</span>
        <h2 className="cta-heading max-w-xl text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
          Have a project in mind?
        </h2>
        <p className="cta-body max-w-md text-lg leading-8 text-foreground-muted">
          Whether it&apos;s custom software or your next product, let&apos;s
          talk about what you&apos;re building.
        </p>
        <div className="cta-buttons flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600"
          >
            Start a project
          </a>
          <a
            href="#contact"
            className="flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-base font-medium text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
