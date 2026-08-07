"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { MdCloud } from "react-icons/md";
import {
  SiDocker,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";

const tech: { label: string; Icon: IconType }[] = [
  { label: "React", Icon: SiReact },
  { label: "Next.js", Icon: SiNextdotjs },
  { label: "Node.js", Icon: SiNodedotjs },
  { label: "TypeScript", Icon: SiTypescript },
  { label: "Python", Icon: SiPython },
  { label: "PostgreSQL", Icon: SiPostgresql },
  { label: "AWS", Icon: MdCloud },
  { label: "Docker", Icon: SiDocker },
];

export default function CustomSoftwareTechSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".tech-label", { type: "chars" });

      gsap.from(split.chars, {
        y: 12,
        opacity: 0,
        stagger: 0.03,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
      });

      // border lines draw in
      gsap.from(".tech-border-top", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".tech-marquee", start: "top 90%" },
      });

      // marquee fades in after border
      gsap.from(".tech-marquee", {
        opacity: 0,
        duration: 0.5,
        delay: 0.4,
        scrollTrigger: { trigger: ".tech-marquee", start: "top 90%" },
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10"
    >
      <span className="tech-label label mb-8 block text-center">Our Stack</span>

      <div
        className="tech-marquee relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <div className="tech-border-top" />
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...tech, ...tech].map(({ label, Icon }, i) => (
            <span key={i} className="group flex shrink-0 items-center gap-10">
              <span className="flex items-center gap-2.5 text-foreground-subtle transition-colors duration-200 hover:text-foreground">
                <Icon className="h-5 w-5 shrink-0" />
                <span className="font-mono text-xs uppercase tracking-[0.08em]">{label}</span>
              </span>
              <span className="h-1 w-1 shrink-0 rounded-full bg-primary/40" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
