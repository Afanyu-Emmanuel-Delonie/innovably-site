"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  SiHuggingface,
  SiJupyter,
  SiLangchain,
  SiPandas,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import type { IconType } from "react-icons";

const tools: { label: string; Icon: IconType }[] = [
  { label: "PyTorch", Icon: SiPytorch },
  { label: "TensorFlow", Icon: SiTensorflow },
  { label: "Hugging Face", Icon: SiHuggingface },
  { label: "LangChain", Icon: SiLangchain },
  { label: "scikit-learn", Icon: SiScikitlearn },
  { label: "Pandas", Icon: SiPandas },
  { label: "Jupyter", Icon: SiJupyter },
];

export default function AiMlToolsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".aiml-tools-label", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%" },
      });

      gsap.from(".aiml-tools-marquee", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: ".aiml-tools-marquee", start: "top 90%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
      <span className="aiml-tools-label label mb-8 block text-center">Our Stack</span>

      <div
        className="aiml-tools-marquee relative overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
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
