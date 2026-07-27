"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const navLinks = ["Work", "Products", "Studio", "Contact"];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText = "position:absolute;top:1px;height:1px;width:1px;pointer-events:none";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      gsap.from(navRef.current, { y: -16, opacity: 0 });
    },
    { scope: navRef },
  );

  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 px-6 py-4 transition-colors duration-[var(--duration-base)] sm:px-10 ${
        scrolled
          ? "border-b border-border/60 bg-background/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <span className="text-base font-semibold tracking-tight text-foreground">
          Innovably
        </span>
        <ul className="hidden items-center gap-8 text-sm text-foreground-muted md:flex">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href="#"
                className="transition-colors duration-[var(--duration-fast)] hover:text-foreground"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600"
        >
          Start a project
        </a>
      </div>
    </nav>
  );
}
