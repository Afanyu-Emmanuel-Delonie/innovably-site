"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function PageLoader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => setDone(true),
    });

    tl.from(logoRef.current, {
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })
      .to(barRef.current, {
        scaleX: 1,
        duration: 0.7,
        ease: "power2.inOut",
      }, "-=0.1")
      .to(logoRef.current, {
        y: -12,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      }, "+=0.1")
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.7,
        ease: "power4.inOut",
      }, "-=0.1");
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
    >
      <span
        ref={logoRef}
        className="text-2xl font-semibold tracking-tight text-foreground"
      >
        Innovably
      </span>

      <div className="mt-6 h-px w-32 overflow-hidden rounded-full bg-border">
        <div
          ref={barRef}
          className="h-full w-full origin-left scale-x-0 rounded-full bg-primary"
        />
      </div>
    </div>
  );
}
