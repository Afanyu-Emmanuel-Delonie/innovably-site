"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import {
  SiFigma,
  SiSketch,
  SiFramer,
  SiNotion,
  SiWebflow,
  SiMiro,
  SiStorybook,
  SiBlender,
} from "react-icons/si";
import type { IconType } from "react-icons";

const tools: { label: string; Icon: IconType }[] = [
  { label: "Figma", Icon: SiFigma },
  { label: "Sketch", Icon: SiSketch },
  { label: "Framer", Icon: SiFramer },
  { label: "Webflow", Icon: SiWebflow },
  { label: "Miro", Icon: SiMiro },
  { label: "Notion", Icon: SiNotion },
  { label: "Storybook", Icon: SiStorybook },
  { label: "Blender", Icon: SiBlender },
];

export default function UiUxToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitText(".tools-label", { type: "chars" });

      gsap.from(split.chars, {
        y: 10,
        opacity: 0,
        stagger: 0.025,
        duration: 0.4,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
      });

      gsap.from(".tools-border", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
      });

      gsap.from(".tools-marquee", {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: "top 84%" },
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <span className="tools-label label mb-8 block text-center">Tools We Design With</span>

      <div className="tools-border mb-0 h-px w-full bg-border" />

      <div
        className="tools-marquee relative overflow-hidden border-b border-border py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        aria-hidden
      >
        <div className="animate-marquee flex w-max items-center gap-10">
          {[...tools, ...tools].map(({ label, Icon }, i) => (
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
