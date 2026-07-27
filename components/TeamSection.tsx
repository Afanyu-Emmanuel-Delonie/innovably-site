"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { FaChevronLeft, FaChevronRight, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const socials = [
  { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { Icon: MdEmail, href: "mailto:team@innovably.digital", label: "Email" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
];

const team: {
  name: string;
  role: string;
  image: string;
}[] = [
  {
    name: "Emmanuel Majariwa",
    role: "CEO & Co-founder",
    image: "/img/Emmanuel_Majariwa.jpeg",
  },
  {
    name: "Dan Ngenzi Ruty",
    role: "CTO & Co-founder",
    image: "/img/Dan_Ngenzi_Ruty.jpeg",
  },
  {
    name: "Bethelhem Feleke",
    role: "Product Developer",
    image: "/img/Bethelhem_Feleke.jpeg",
  },
  {
    name: "Kashif Bin Umer",
    role: "AI Engineer",
    image: "/img/kashif-bin-umer.png",
  },
];

const AUTO_ADVANCE_INTERVAL = 3500;
const RESUME_DELAY = 6000;

export default function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const updateScrollState = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollState();

    const resizeObserver = new ResizeObserver(updateScrollState);
    resizeObserver.observe(el);
    window.addEventListener("resize", updateScrollState);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  const pauseAutoAdvance = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => setIsPaused(false), RESUME_DELAY);
  };

  useEffect(() => () => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  const scrollByAmount = (direction: 1 | -1) => {
    pauseAutoAdvance();
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const hasOverflow = canScrollLeft || canScrollRight;

  // Auto-advance through the carousel when it overflows, pausing on any
  // manual interaction (arrow click, touch, drag) and resuming afterward.
  useEffect(() => {
    if (isPaused || !hasOverflow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      const card = el.querySelector<HTMLElement>(".team-card");
      const gap = 24;
      const step = card ? card.offsetWidth + gap : el.clientWidth * 0.8;
      el.scrollBy({ left: step, behavior: "smooth" });
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused, hasOverflow]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".team-heading", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      gsap.from(".team-card", {
        y: 48,
        opacity: 0,
        scale: 0.95,
        stagger: { amount: 0.5, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: ".team-card", start: "top 88%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10">
      <div className="team-heading mb-14 flex flex-col gap-3">
        <span className="label">The Team</span>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          The people behind the work.
        </h2>
        <p className="mt-1 max-w-md text-base leading-7 text-foreground-muted">
          A small, focused team with deep expertise across design, engineering, and product.
        </p>
      </div>

      <div className="relative">
        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          onPointerDown={pauseAutoAdvance}
          onWheel={pauseAutoAdvance}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-webkit-overflow-scrolling:touch] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {team.map(({ name, role, image }) => (
            <div
              key={name}
              className="team-card group flex w-[80vw] shrink-0 snap-start flex-col items-center sm:w-64 lg:w-[calc((100%-4.5rem)/4)]"
            >
              {/* Image */}
              <div className="relative w-full">
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-surface-2">
                  <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>

                {/* Socials, hanging off the bottom edge of the photo */}
                <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 gap-1.5 rounded-full border border-border bg-surface/95 p-1.5 shadow-lg backdrop-blur-sm">
                  {socials.map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface-2 text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:text-foreground"
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="mt-8 flex flex-col items-center gap-0.5 text-center">
                <span className="text-sm font-semibold text-foreground">{name}</span>
                <span className="text-sm text-foreground-muted">{role}</span>
              </div>
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => scrollByAmount(-1)}
            className="absolute left-0 top-[38%] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-2"
          >
            <FaChevronLeft className="h-3.5 w-3.5" />
          </button>
        )}

        {canScrollRight && (
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => scrollByAmount(1)}
            className="absolute right-0 top-[38%] flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-lg transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-2"
          >
            <FaChevronRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </section>
  );
}
