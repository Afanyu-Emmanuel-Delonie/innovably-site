"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MdAllInclusive, MdDescription, MdHandshake, MdTrendingUp } from "react-icons/md";

const values = [
  {
    Icon: MdTrendingUp,
    title: "Built to scale",
    body: "Architecture decisions are made for where the product is going, not just where it is today.",
  },
  {
    Icon: MdAllInclusive,
    title: "No vendor lock-in",
    body: "Standard, widely-used technologies — nothing proprietary that only we can maintain.",
  },
  {
    Icon: MdDescription,
    title: "Documented & maintainable",
    body: "Code and decisions are documented as we go, not reconstructed for a handoff at the end.",
  },
  {
    Icon: MdHandshake,
    title: "A long-term partner",
    body: "We stick around past launch — bug fixes, iteration, and scaling as your needs change.",
  },
];

export default function CustomSoftwareWhySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".custom-sw-why-heading h2", { type: "lines" });

      gsap.from(".why-eyebrow", {
        y: 16,
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

      gsap.utils.toArray<HTMLElement>(".custom-sw-why-card").forEach((card, i) => {
        gsap.from(card, {
          clipPath: "inset(0 0 100% 0 round 16px)",
          opacity: 0,
          y: 20,
          rotateX: 6,
          transformOrigin: "top center",
          duration: 0.65,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: { trigger: ".custom-sw-why-card", start: "top 85%" },
        });
        gsap.set(card, { clipPath: "inset(0 0 0% 0 round 16px)" });

        gsap.from(card.querySelector(".why-icon"), {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          ease: "back.out(2)",
          delay: i * 0.08 + 0.2,
          scrollTrigger: { trigger: ".custom-sw-why-card", start: "top 85%" },
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
      <div className="custom-sw-why-heading mb-14 flex flex-col gap-3">
        <span className="why-eyebrow label">Why Innovably</span>
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Engineering that holds up after we leave.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {values.map(({ Icon, title, body }) => (
          <div
            key={title}
            onMouseMove={handleMove}
            className="custom-sw-why-card group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface p-7"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), rgba(59,99,245,0.12), transparent 70%)",
              }}
              aria-hidden
            />
            <span className="why-icon relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
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
