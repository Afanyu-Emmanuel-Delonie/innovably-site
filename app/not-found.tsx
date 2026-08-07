"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".nf-heading", { type: "lines" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".nf-code", { y: 20, opacity: 0, duration: 0.5 })
        .from(split.lines, { y: 28, opacity: 0, stagger: 0.08, duration: 0.7 }, "-=0.3")
        .from(".nf-body", { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".nf-ctas > *", { y: 16, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4")
        .from(".nf-grid-line", { scaleX: 0, transformOrigin: "left center", duration: 1.2, stagger: 0.05 }, 0)
        .from(".nf-orb", { scale: 0.6, opacity: 0, duration: 1.2, ease: "power2.out" }, 0);

      return () => split.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="flex min-h-screen flex-col bg-background">
      <Nav />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-24">
        {/* background grid */}
        <div className="bg-grid nf-grid-line pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />

        {/* glow orb */}
        <div
          className="nf-orb pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(59,99,245,0.18),transparent_70%)]"
          aria-hidden
        />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* 404 badge */}
          <span className="nf-code mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-sm text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            404 — Page not found
          </span>

          <h1 className="nf-heading max-w-2xl text-5xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Nothing here but empty space.
          </h1>

          <p className="nf-body mt-6 max-w-md text-lg leading-8 text-foreground-muted">
            The page you're looking for doesn't exist, was moved, or the URL has a typo in it.
          </p>

          <div className="nf-ctas mt-10 flex flex-col gap-4 text-base font-medium sm:flex-row">
            <a
              href="/"
              className="flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
            >
              ← Back to home
            </a>
            <a
              href="/#contact"
              className="flex h-12 items-center justify-center rounded-full bg-primary px-6 text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600"
            >
              Start a project
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
