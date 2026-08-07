"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import {
  MdAssignmentTurnedIn,
  MdGridView,
  MdPhoneIphone,
  MdSearch,
  MdWeb,
  MdWidgets,
} from "react-icons/md";
import type { IconType } from "react-icons";

const offerings: { title: string; description: string; Icon: IconType }[] = [
  {
    title: "Website UI Design",
    description: "Marketing sites and web apps designed to convert, not just look good in a deck.",
    Icon: MdWeb,
  },
  {
    title: "Mobile App UI Design",
    description: "iOS and Android interfaces that respect platform conventions users already know.",
    Icon: MdPhoneIphone,
  },
  {
    title: "Wireframing & Prototyping",
    description: "Low-fidelity structure and clickable prototypes, validated before pixels get polished.",
    Icon: MdGridView,
  },
  {
    title: "Design Systems",
    description: "Tokens, components, and documentation your team can actually build on after we leave.",
    Icon: MdWidgets,
  },
  {
    title: "UX Research & Audits",
    description: "Heuristic evaluations and user research that tell us what's actually broken.",
    Icon: MdSearch,
  },
  {
    title: "Usability Testing",
    description: "Real users, real tasks — we find the friction before your customers do.",
    Icon: MdAssignmentTurnedIn,
  },
];

export default function UiUxOfferingsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".offerings-heading h2", { type: "lines" });

      gsap.from(".offerings-eyebrow", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
      });
      gsap.from(split.lines, {
        y: 28,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
      });
      gsap.from(".offerings-subtext", {
        y: 14,
        opacity: 0,
        duration: 0.5,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".offering-card").forEach((card) => {
        gsap.from(card, {
          y: 32,
          opacity: 0,
          duration: 0.65,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 90%" },
        });

        gsap.from(card.querySelector(".offering-icon"), {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(2)",
          delay: 0.15,
          scrollTrigger: { trigger: card, start: "top 90%" },
        });
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  function handleCardMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <div className="offerings-heading mb-12 flex flex-col gap-3">
        <span className="offerings-eyebrow label">What We Deliver</span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Every layer of the design work, covered.
        </h2>
        <p className="offerings-subtext mt-1 text-base leading-7 text-foreground-muted">
          From the first sketch to a system your engineers can implement without guessing.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {offerings.map(({ title, description, Icon }, i) => (
          <div
            key={title}
            onMouseMove={handleCardMove}
            className="offering-card group relative flex flex-col gap-5 bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(59,99,245,0.10), transparent 70%)",
              }}
              aria-hidden
            />

            <span className="absolute right-5 top-5 font-mono text-xs text-foreground-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="offering-icon relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-inset ring-border transition-colors duration-300 group-hover:bg-primary/20">
              <Icon className="h-5 w-5 text-primary" />
            </span>

            <div className="flex flex-col gap-2 pr-6">
              <h3 className="text-base font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-6 text-foreground-muted">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
