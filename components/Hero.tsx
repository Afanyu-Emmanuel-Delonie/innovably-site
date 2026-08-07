"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";
import { MdDesignServices, MdPhoneIphone, MdCloud, MdPsychology, MdBusinessCenter } from "react-icons/md";
import { TbBrush } from "react-icons/tb";
import StartProjectButton from "@/components/StartProjectButton";

const skeletonLayouts = [
  // UI/UX — 2-col card grid
  <div key="uiux" className="flex flex-1 flex-col divide-y divide-border">
    <div className="grid grid-cols-2 gap-4 p-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3 rounded-xl bg-surface-2 p-4">
          <span className="h-2 w-3/4 animate-pulse rounded-full bg-surface-3" />
          <span className="h-16 w-full animate-pulse rounded-lg bg-surface-3" />
          <span className="h-2 w-1/2 animate-pulse rounded-full bg-surface-3" />
        </div>
      ))}
    </div>
    <div className="flex items-center gap-4 px-5 py-4">
      <span className="h-2 w-20 animate-pulse rounded-full bg-surface-3" />
      <div className="flex-1 h-1.5 animate-pulse rounded-full bg-surface-3" />
      <span className="h-5 w-14 animate-pulse rounded-full bg-surface-3" />
    </div>
  </div>,
  // Web Design — wide banner + rows
  <div key="web" className="flex flex-1 flex-col divide-y divide-border">
    <div className="p-5 flex flex-col gap-3">
      <span className="h-24 w-full animate-pulse rounded-xl bg-surface-2" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className="h-12 animate-pulse rounded-lg bg-surface-2" />
        ))}
      </div>
    </div>
    <div className="flex flex-col gap-2 p-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-surface-3" />
          <span className="h-2 animate-pulse rounded-full bg-surface-3" style={{ width: `${60 + i * 15}%` }} />
        </div>
      ))}
    </div>
  </div>,
  // App Development — list with status dots
  <div key="app" className="flex flex-1 flex-col divide-y divide-border">
    <div className="flex flex-col gap-2 p-5">
      <div className="flex items-center justify-between mb-2">
        <span className="h-2 w-24 animate-pulse rounded-full bg-surface-3" />
        <span className="h-5 w-16 animate-pulse rounded-full bg-surface-3" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-surface-3" />
            <span className="h-2 animate-pulse rounded-full bg-surface-3" style={{ width: `${80 + i * 10}px` }} />
          </div>
          <span className="h-2 w-10 animate-pulse rounded-full bg-surface-3" />
        </div>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-3 p-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg bg-surface-2 p-3">
          <span className="h-1.5 w-12 animate-pulse rounded-full bg-surface-3" />
          <span className="h-5 w-8 animate-pulse rounded-full bg-surface-3" />
        </div>
      ))}
    </div>
  </div>,
  // Cloud Integration — progress bars
  <div key="cloud" className="flex flex-1 flex-col divide-y divide-border">
    <div className="flex flex-col gap-4 p-5">
      <span className="h-2 w-28 animate-pulse rounded-full bg-surface-3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className="flex justify-between">
            <span className="h-2 w-20 animate-pulse rounded-full bg-surface-3" />
            <span className="h-2 w-8 animate-pulse rounded-full bg-surface-3" />
          </div>
          <div className="h-1.5 w-full rounded-full bg-surface-2">
            <div className="h-full animate-pulse rounded-full bg-surface-3" style={{ width: `${40 + i * 15}%` }} />
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3 p-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-lg bg-surface-2 px-3 py-3">
          <span className="h-1.5 w-16 animate-pulse rounded-full bg-surface-3" />
          <span className="h-4 w-10 animate-pulse rounded-full bg-surface-3" />
        </div>
      ))}
    </div>
  </div>,
  // AI/ML — bar chart skeleton
  <div key="ai" className="flex flex-1 flex-col divide-y divide-border">
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-end gap-1.5 h-24">
        {[40, 65, 50, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
          <div key={i} className="flex-1 animate-pulse rounded-t bg-surface-3" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex justify-between">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="h-1.5 w-8 animate-pulse rounded-full bg-surface-3" />
        ))}
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 p-5">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-4">
          <span className="h-2 w-3/4 animate-pulse rounded-full bg-surface-3" />
          <span className="h-2 w-full animate-pulse rounded-full bg-surface-3" />
          <span className="h-2 w-2/3 animate-pulse rounded-full bg-surface-3" />
        </div>
      ))}
    </div>
  </div>,
  // Consulting — timeline
  <div key="consulting" className="flex flex-1 flex-col divide-y divide-border">
    <div className="flex flex-col gap-3 p-5">
      <span className="h-2 w-24 animate-pulse rounded-full bg-surface-3" />
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-3">
          <div className="flex flex-col items-center gap-1">
            <span className="h-3 w-3 shrink-0 animate-pulse rounded-full bg-surface-3" />
            {i < 3 && <span className="w-px h-6 animate-pulse bg-surface-3" />}
          </div>
          <div className="flex flex-col gap-1.5 pb-3 flex-1">
            <span className="h-2 w-32 animate-pulse rounded-full bg-surface-3" />
            <span className="h-2 w-full animate-pulse rounded-full bg-surface-3" />
            <span className="h-2 w-3/4 animate-pulse rounded-full bg-surface-3" />
          </div>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-4 px-5 py-4">
      <span className="h-2 w-20 animate-pulse rounded-full bg-surface-3" />
      <div className="flex-1 h-1.5 animate-pulse rounded-full bg-surface-3" />
      <span className="h-5 w-16 animate-pulse rounded-full bg-surface-3" />
    </div>
  </div>,
];

const sidebarItems = [
  { label: "UI/UX", Icon: TbBrush },
  { label: "Web Design", Icon: MdDesignServices },
  { label: "App Development", Icon: MdPhoneIphone },
  { label: "Cloud Integration", Icon: MdCloud },
  { label: "AI/ML Integration", Icon: MdPsychology },
  { label: "Consulting", Icon: MdBusinessCenter },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) return;

      const split = new SplitText(".hero-heading", { type: "lines" });

      const tl = gsap.timeline();

      tl.from(".hero-badge", { y: 12, opacity: 0 })
        .from(split.lines, { y: 24, opacity: 0, stagger: 0.08 }, "-=0.3")
        .from(".hero-copy", { y: 16, opacity: 0 }, "-=0.4")
        .from(".hero-cta > *", { y: 16, opacity: 0, stagger: 0.08 }, "-=0.4");

      gsap.fromTo(
        mockupRef.current,
        { y: 120, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mockupRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      gsap.fromTo(
        ".hero-glow-bottom",
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: mockupRef.current,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: rootRef },
  );

  return (
    <div id="home" ref={rootRef} className="relative overflow-hidden bg-background">
      <div className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div
        className="hero-glow pointer-events-none absolute inset-x-0 top-[-12rem] h-[36rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(59,99,245,0.22),transparent_70%)]"
        aria-hidden
      />

      <section className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center px-6 pt-16 pb-20 text-center sm:pt-20">
        <div className="hero-badge mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-foreground-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Crafting Custom Solutions
        </div>

        <h1 className="hero-heading max-w-4xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          From idea to product built right.
        </h1>

        <p className="hero-copy mt-6 max-w-md text-lg leading-8 text-foreground-muted">
         Custom solutions and products, engineered right from the first idea to shipping and everything after.
        </p>

        <div className="hero-cta mt-10 flex flex-col gap-4 text-base font-medium sm:flex-row">
          <StartProjectButton />
          <a
            href="#"
            className="flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
          >
            View our work
          </a>
        </div>
      </section>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-32 sm:px-10">
        <div className="relative">
          <div
            className="hero-glow-bottom pointer-events-none absolute inset-x-16 -bottom-16 h-48 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(59,99,245,0.3),transparent_70%)] blur-2xl"
            aria-hidden
          />

          <div
            ref={mockupRef}
            className="relative overflow-hidden rounded-2xl border border-border bg-surface/80 shadow-2xl backdrop-blur-xl mask-[linear-gradient(to_bottom,black_75%,transparent_100%)]"
          >
            {/* header */}
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
                  I
                </span>
                <span className="text-sm font-semibold text-foreground">
                  Innovably
                </span>
              </div>

              <div className="flex flex-1 items-center justify-end gap-3">
                <span className="hidden h-8 max-w-xs flex-1 rounded-full bg-surface-2 sm:block" />
                <span className="h-7 w-7 rounded-full bg-surface-3" />
                <span className="h-7 w-7 rounded-full bg-surface-3" />
                <span className="h-8 w-20 rounded-full bg-primary" />
              </div>
            </div>

            <div className="flex">
              {/* sidebar */}
              <aside className="hidden w-56 shrink-0 flex-col gap-1 self-stretch border-r border-border p-4 sm:flex">
                {sidebarItems.map(({ label, Icon }, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm leading-snug ${
                      i === 0
                        ? "bg-primary/15 font-medium text-foreground"
                        : "text-foreground-subtle"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </div>
                ))}
              </aside>

              {/* content: skeleton */}
              <div className="flex flex-1 flex-col divide-y divide-border">
                {/* top row */}
                <div className="grid grid-cols-2 divide-x divide-border">
                  <div className="flex flex-col gap-4 p-5">
                    <div className="flex items-center justify-between">
                      <span className="h-2 w-24 animate-pulse rounded-full bg-surface-3" />
                      <span className="h-5 w-16 animate-pulse rounded-full bg-surface-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-surface-3" />
                            <span className="h-2 w-28 animate-pulse rounded-full bg-surface-3" />
                          </div>
                          <span className="h-2 w-12 animate-pulse rounded-full bg-surface-3" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 p-5">
                    <span className="h-2 w-28 animate-pulse rounded-full bg-surface-3" />
                    <div className="grid grid-cols-2 gap-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-2 rounded-lg bg-surface-2 px-3 py-3">
                          <span className="h-1.5 w-16 animate-pulse rounded-full bg-surface-3" />
                          <span className="h-4 w-10 animate-pulse rounded-full bg-surface-3" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* bottom row */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <span className="h-2 w-20 animate-pulse rounded-full bg-surface-3" />
                  <div className="flex-1 h-1.5 animate-pulse rounded-full bg-surface-3" />
                  <span className="h-2 w-8 animate-pulse rounded-full bg-surface-3" />
                  <span className="h-5 w-16 animate-pulse rounded-full bg-surface-3" />
                </div>

                {/* extra skeleton row to fill height */}
                <div className="grid grid-cols-3 gap-4 p-5">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-2 rounded-xl bg-surface-2 p-4">
                      <span className="h-2 w-3/4 animate-pulse rounded-full bg-surface-3" />
                      <span className="h-2 w-full animate-pulse rounded-full bg-surface-3" />
                      <span className="h-2 w-2/3 animate-pulse rounded-full bg-surface-3" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
