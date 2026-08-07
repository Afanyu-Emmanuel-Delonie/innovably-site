"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";

export default function OurStorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".story-image", {
        x: -32,
        opacity: 0,
        scale: 0.96,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });

      gsap.from(".story-text > *", {
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl border-b border-border px-6 py-24 sm:px-10"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="story-image relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-surface-2">
            <Image
              src="/img/emmy.jpg"
              alt="The Innovably team at work"
              fill
              className="object-cover grayscale"
            />
          </div>

          <div className="absolute bottom-6 left-6 flex flex-col gap-0.5 rounded-2xl border border-border bg-surface/90 px-5 py-4 shadow-lg backdrop-blur-sm">
            <span className="text-2xl font-semibold tracking-tight text-foreground">2021</span>
            <span className="text-xs text-foreground-muted">Where it started</span>
          </div>
        </div>

        <div className="story-text flex flex-col gap-5">
          <span className="label">Our Story</span>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            We started this because we were done watching good ideas ship badly.
          </h2>
          <p className="text-base leading-7 text-foreground-muted">
            Innovably began as two engineers moonlighting on client work, frustrated
            by how often &ldquo;agency process&rdquo; got in the way of just building
            the thing well. So we cut the layers — no account managers relaying half
            the brief, no juniors learning on your budget.
          </p>
          <p className="text-base leading-7 text-foreground-muted">
            Five years and twenty-plus shipped projects later, that&apos;s still the
            deal: a small, senior team that treats your product like it&apos;s
            ours to get right.
          </p>
        </div>
      </div>
    </section>
  );
}
