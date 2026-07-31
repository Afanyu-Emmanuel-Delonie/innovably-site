"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { MdEmail, MdEvent, MdPhone } from "react-icons/md";

const contactCards = [
  {
    Icon: MdEmail,
    title: "Email",
    body: (
      <span className="text-base text-foreground">support@innovably.cloud</span>
    ),
    footnote: "We aim to respond within 24 hours",
  },
  {
    Icon: MdPhone,
    title: "Phone",
    body: (
      <div className="flex flex-col gap-1 text-base">
        <span className="text-foreground">
          <span className="font-semibold">Canada:</span>{" "}
          <a href="tel:+16138508278" className="text-foreground hover:underline">
            +1 (613) 850-8278
          </a>
        </span>
        <span className="text-foreground">
          <span className="font-semibold">Rwanda:</span>{" "}
          <a href="tel:+250786653794" className="text-foreground hover:underline">
            +250 786 653 794
          </a>
        </span>
      </div>
    ),
    footnote: "Available Mon-Fri, 9AM-6PM EST",
  },
  {
    Icon: MdEvent,
    title: "Quick Chat",
    body: (
      <a href="#" className="text-base text-foreground hover:underline">
        Book a quick chat
      </a>
    ),
    footnote: "Schedule a 15-min call instantly",
  },
];

const topics = [
  "General inquiry",
  "New project",
  "Partnership",
  "Support",
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".contact-heading", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });

      gsap.from(".contact-info", {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });

      gsap.from(".contact-form", {
        x: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 72%" },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10"
    >
      <div className="contact-heading mb-14 max-w-lg">
        <span className="label">Contact</span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Tell us about your project.
        </h2>
        <p className="mt-4 text-lg leading-8 text-foreground-muted">
          Fill this in and we&apos;ll get back to you within a couple of
          business days.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
        <div className="contact-info flex flex-col gap-5">
          {contactCards.map(({ Icon, title, body, footnote }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Icon className="h-5 w-5 text-primary" />
              </span>
              <div className="flex flex-col gap-1.5">
                <span className="text-base font-semibold text-foreground">
                  {title}
                </span>
                {body}
                <span className="text-sm text-foreground-subtle">
                  {footnote}
                </span>
              </div>
            </div>
          ))}
        </div>

        <form className="contact-form flex flex-col gap-5 rounded-lg border border-border bg-surface p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-foreground-muted">
              Name
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder:text-foreground-subtle focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-foreground-muted">
              Email
              <input
                type="email"
                name="email"
                placeholder="jane@company.com"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder:text-foreground-subtle focus:outline-none"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-foreground-muted">
              Phone number
              <input
                type="tel"
                name="phone"
                placeholder="+1 (555) 010-0192"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder:text-foreground-subtle focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-foreground-muted">
              Topic
              <select
                name="topic"
                defaultValue=""
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-foreground focus:outline-none"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-foreground-muted">
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us a bit about the project..."
              className="resize-none rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder:text-foreground-subtle focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
