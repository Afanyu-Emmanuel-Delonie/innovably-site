"use client";

import { useRef, type MouseEvent } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  MdApps,
  MdArrowOutward,
  MdCampaign,
  MdCheck,
  MdCloud,
  MdCode,
  MdPhoneIphone,
  MdPsychology,
  MdSecurity,
} from "react-icons/md";
import { TbBrush } from "react-icons/tb";
import type { IconType } from "react-icons";

const services: {
  title: string;
  description: string;
  Icon: IconType;
  items: string[];
  featured?: boolean;
}[] = [
  {
    title: "AI & ML Solutions",
    description:
      "Transform operations with intelligent AI and ML solutions that automate tasks, analyze data, and improve business performance.",
    Icon: MdPsychology,
    items: ["AI Chatbot Development", "Generative AI Solutions", "Machine Learning Models"],
    featured: true,
  },
  {
    title: "UI/UX Design Services",
    description:
      "Create engaging digital experiences with modern and intuitive user interfaces.",
    Icon: TbBrush,
    items: ["Website UI Design", "Mobile App UI Design", "Wireframing & Prototyping"],
  },
  {
    title: "Website Development",
    description:
      "Build responsive, scalable, and SEO-friendly websites tailored to your business needs.",
    Icon: MdCode,
    items: ["Corporate Websites", "eCommerce Development", "Web Application Development"],
  },
  {
    title: "Mobile App Development",
    description:
      "Develop feature-rich mobile applications that deliver seamless user experiences.",
    Icon: MdPhoneIphone,
    items: ["Android App Development", "iOS App Development", "Flutter Development"],
  },
  {
    title: "Digital Marketing",
    description:
      "Grow your online presence and generate quality leads with strategic digital marketing campaigns.",
    Icon: MdCampaign,
    items: ["SEO Optimization", "Social Media Marketing", "Google Ads Management"],
  },
  {
    title: "Cloud Solutions",
    description:
      "Modern cloud technologies that enhance scalability, security, and business continuity.",
    Icon: MdCloud,
    items: ["Cloud Infrastructure Management", "Cloud Migration", "AWS & Azure Services"],
  },
  {
    title: "Cyber Security Services",
    description:
      "Protect your organization with advanced security solutions and proactive risk management.",
    Icon: MdSecurity,
    items: ["Security Audits", "Vulnerability Assessment", "Penetration Testing"],
  },
  {
    title: "Microsoft 365 Solutions",
    description:
      "Enhance productivity and collaboration with Microsoft's powerful cloud ecosystem.",
    Icon: MdApps,
    items: ["Microsoft 365 Setup", "Microsoft Teams Deployment", "SharePoint Solutions"],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Heading reveal
      gsap.from(".services-heading", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: { trigger: ".services-heading", start: "top 88%" },
      });

      // Ticker fades/slides in as a unit
      gsap.from(".services-marquee", {
        y: 16,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: ".services-marquee", start: "top 90%" },
      });

      // Background glow drifts on scroll
      gsap.to(".services-glow", {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Each card: clip-path wipe from bottom + fade + gentle scale-in
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card) => {
        gsap.from(card, {
          clipPath: "inset(0 0 100% 0)",
          opacity: 0,
          y: 24,
          scale: 0.97,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });

        // Icon pop-in slightly after card
        gsap.from(card.querySelector(".service-icon"), {
          scale: 0.5,
          opacity: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });
      });
    },
    { scope: sectionRef },
  );

  function handleCardMove(e: MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full overflow-hidden px-6 py-24 sm:px-10"
    >
      <div
        className="bg-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_20%,black,transparent)]"
        aria-hidden
      />
      <div
        className="services-glow pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(ellipse_55%_50%_at_50%_0%,rgba(59,99,245,0.14),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <div className="services-heading mb-10 flex flex-col gap-3 max-w-xl">
          <div className="flex items-center gap-3">
            <span className="label">Our Services</span>
            <span className="h-px w-8 bg-border-strong" aria-hidden />
            <span className="font-mono text-xs text-foreground-subtle">08 disciplines</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Full-stack capabilities,<br />under one roof.
          </h2>
          <p className="mt-1 text-base leading-7 text-foreground-muted">
            From strategy to execution — every discipline you need, working together.
          </p>
        </div>

        {/* Ticker */}
        <div
          className="services-marquee relative mb-12 overflow-hidden border-y border-border py-3.5 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-hidden
        >
          <div className="animate-marquee flex w-max items-center gap-8">
            {[...services, ...services].map(({ title }, i) => (
              <span key={i} className="flex shrink-0 items-center gap-8">
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-foreground-subtle">
                  {title}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-primary/60" />
              </span>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-border">
          {services.map(({ title, description, Icon, items }, i) => (
            <div
              key={title}
              onMouseMove={handleCardMove}
              className="service-card group relative flex flex-col gap-5 bg-surface p-6 transition-colors duration-300 hover:bg-surface-2"
              style={{ clipPath: "inset(0 0 0 0)" }}
            >
              {/* Cursor-tracked spotlight */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(59,99,245,0.10), transparent 70%)",
                }}
                aria-hidden
              />

              {/* Index / arrow swap */}
              <div className="absolute right-5 top-5 flex h-5 w-5 items-center justify-center">
                <span className="font-mono text-xs text-foreground-subtle transition-all duration-300 ease-out-quart group-hover:-translate-y-2 group-hover:opacity-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <MdArrowOutward className="absolute h-4 w-4 translate-y-2 text-primary opacity-0 transition-all duration-300 ease-out-quart group-hover:translate-y-0 group-hover:opacity-100" />
              </div>

              {/* Icon with orbiting gradient ring */}
              <span className="service-icon relative flex h-14 w-14 items-center justify-center">
                <span
                  className="animate-spin-slow absolute inset-0 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0%, rgba(59,99,245,0.7) 35%, transparent 55%)",
                  }}
                  aria-hidden
                />
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 ring-1 ring-inset ring-border transition-colors duration-300 group-hover:bg-primary/20">
                  <Icon className="h-5 w-5 text-primary" />
                </span>
              </span>

              <div className="flex flex-col gap-2 pr-6">
                <h3 className="text-base font-semibold text-foreground">{title}</h3>
                <p className="text-sm leading-6 text-foreground-muted">{description}</p>
              </div>

              <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground-muted">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MdCheck className="h-3 w-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
