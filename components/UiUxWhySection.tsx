"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MdHandyman, MdInsights, MdLayers, MdPeopleAlt } from "react-icons/md";

const values = [
  {
    Icon: MdPeopleAlt,
    title: "User-centered, not decorative",
    body: "Every layout decision is backed by a use case, not a trend we thought looked good.",
  },
  {
    Icon: MdLayers,
    title: "Systems, not one-off screens",
    body: "We design in reusable components from day one, so the work scales past the first release.",
  },
  {
    Icon: MdHandyman,
    title: "Built for handoff",
    body: "Specs, tokens, and states your engineers can implement without pinging us to ask what we meant.",
  },
  {
    Icon: MdInsights,
    title: "Iteration built in",
    body: "We test the interface with real users, not just the mockup with the internal team.",
  },
];

export default function UiUxWhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".uiux-why-heading h2", { type: "lines" });

      gsap.from(".uiux-why-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });
      gsap.from(split.lines, {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.utils.toArray<HTMLElement>(".uiux-why-card").forEach((card, i) => {
        gsap.from(card, {
          y: 32,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        });

        gsap.from(card.querySelector(".uiux-why-icon"), {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(2)",
          delay: i * 0.08 + 0.18,
          scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
        });
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-6xl border-t border-border px-6 py-24 sm:px-10"
    >
      <div className="uiux-why-heading mb-14 flex flex-col gap-3">
        <span className="uiux-why-eyebrow label">Why Innovably</span>
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Design that has to survive contact with engineering.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, body }) => (
          <div
            key={title}
            onMouseMove={handleMove}
            className="uiux-why-card group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-7"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(59,99,245,0.10), transparent 70%)",
              }}
              aria-hidden
            />
            <span className="uiux-why-icon relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
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
