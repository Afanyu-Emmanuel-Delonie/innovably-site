"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  MdApps,
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
}[] = [
  {
    title: "AI & ML Solutions",
    description:
      "Transform operations with intelligent Artificial Intelligence and Machine Learning solutions that automate tasks, analyze data, and improve business performance.",
    Icon: MdPsychology,
    items: [
      "AI Chatbot Development",
      "Generative AI Solutions",
      "Machine Learning Models",
    ],
  },
  {
    title: "UI/UX Design Services",
    description:
      "Create engaging digital experiences with modern and intuitive user interfaces.",
    Icon: TbBrush,
    items: [
      "Website UI Design",
      "Mobile App UI Design",
      "Wireframing & Prototyping",
    ],
  },
  {
    title: "Website Development",
    description:
      "Build responsive, scalable, and SEO-friendly websites with our web development services tailored to your business needs.",
    Icon: MdCode,
    items: [
      "Corporate Websites",
      "eCommerce Development",
      "Web Application Development",
    ],
  },
  {
    title: "Mobile App Development",
    description:
      "Develop feature-rich mobile applications that deliver seamless user experiences.",
    Icon: MdPhoneIphone,
    items: [
      "Android App Development",
      "iOS App Development",
      "Flutter Development",
    ],
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
    items: [
      "Cloud Infrastructure Management",
      "Cloud Migration",
      "Azure Solutions",
      "AWS Services",
    ],
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
    items: [
      "Microsoft 365 Setup",
      "Microsoft Teams Deployment",
      "SharePoint Solutions",
    ],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".services-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".service-card", {
        y: 48,
        opacity: 0,
        scale: 0.94,
        stagger: { amount: 0.7, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10"
    >
      <div className="services-heading mb-14 max-w-lg">
        <span className="label">Our Services</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Full-stack capabilities, under one roof.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ title, description, Icon, items }) => (
          <div
            key={title}
            className="service-card flex flex-col gap-4 rounded-lg border border-border bg-surface p-6"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15">
              <Icon className="h-5 w-5 text-primary" />
            </span>

            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm leading-6 text-foreground-muted">
              {description}
            </p>

            <ul className="mt-auto flex flex-col gap-2 border-t border-border pt-4">
              {items.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/15">
                    <MdCheck className="h-3 w-3 text-primary" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
