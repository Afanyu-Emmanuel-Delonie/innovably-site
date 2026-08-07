"use client";

import { useRef } from "react";
import Image from "next/image";
import { MdCheckCircle } from "react-icons/md";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Solution } from "@/lib/solutions";

export default function SolutionSection({
  solution,
  reverse,
}: {
  solution: Solution;
  reverse: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".solution-copy-block", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".solution-image-block", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
      gsap.from(".solution-feature-item", {
        y: 16,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      id={solution.slug}
      ref={sectionRef}
      className="scroll-mt-24 border-b border-border py-20 first:pt-0 last:border-b-0"
    >
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 sm:px-10 lg:grid-cols-2">
        <div className={`solution-copy-block ${reverse ? "lg:order-2" : "lg:order-1"}`}>
          <span className="label">{solution.subtitle}</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {solution.name}
            <span className="text-primary">{solution.accent}</span>
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground-muted">{solution.desc}</p>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {solution.features.map((feature) => (
              <div
                key={feature}
                className="solution-feature-item flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
              >
                <MdCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`solution-image-block relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface ${reverse ? "lg:order-1" : "lg:order-2"}`}
        >
          <Image
            src={solution.image}
            alt={`${solution.name} ${solution.accent} product screenshot`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
