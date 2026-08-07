"use client";

import { useRef, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
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
          <a href="https://wa.me/16138508278?text=Hi%20Innovably%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
            +1 (613) 850-8278
          </a>
        </span>
        <span className="text-foreground">
          <span className="font-semibold">Rwanda:</span>{" "}
          <a href="https://wa.me/250786653794?text=Hi%20Innovably%2C%20I%27d%20like%20to%20discuss%20a%20project." target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
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
      <a href="https://cal.com/innovably/quick-chat" target="_blank" rel="noopener noreferrer" className="text-base text-foreground hover:underline">
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

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) return;

    setStatus("submitting");
    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        phone: String(data.get("phone") || "").trim() || null,
        topic: String(data.get("topic") || "").trim() || null,
        message,
        submittedAt: serverTimestamp(),
      });
      form.reset();
      setStatus("success");
    } catch (err) {
      console.error("[contact] failed to save message", err);
      setStatus("error");
    }
  }

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

        <form
          onSubmit={handleSubmit}
          className="contact-form flex flex-col gap-5 rounded-lg border border-border bg-surface p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-foreground-muted">
              Name
              <input
                type="text"
                name="name"
                required
                placeholder="Jane Doe"
                className="rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-foreground placeholder:text-foreground-subtle focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-foreground-muted">
              Email
              <input
                type="email"
                name="email"
                required
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

          {status === "success" && (
            <p className="text-sm text-primary" role="status">
              Message sent — we&apos;ll get back to you within a couple of business days.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-danger" role="alert">
              Something went wrong sending that. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "submitting" ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </section>
  );
}
