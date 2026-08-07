"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const columns = [
  {
    heading: "Company",
    links: ["Work", "Products", "Studio", "Contact"],
  },
  {
    heading: "Services",
    links: [
      "AI & ML Solutions",
      "Web Development",
      "Mobile Development",
      "Cloud Solutions",
    ],
  },
];

const socials = [
  { Icon: FaGithub, label: "GitHub", href: "#" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { Icon: FaXTwitter, label: "X (Twitter)", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".footer-col", {
        y: 32,
        opacity: 0,
        stagger: { amount: 0.4, from: "start" },
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });

      gsap.from(".footer-bottom", {
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
      });
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 sm:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="footer-col col-span-2 flex flex-col gap-4 sm:col-span-1">
            <div className="flex items-center gap-2">
              <Image src="/img/logo-dark.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
              <span className="text-base font-semibold tracking-tight text-foreground">
                Innovably
              </span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-foreground-muted">
              We build software. Yours or ours.
            </p>
            <div className="flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.heading} className="footer-col flex flex-col gap-3">
              <span className="label">{column.heading}</span>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom flex flex-col gap-4 border-t border-border pt-8 text-sm text-foreground-subtle sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Innovably. All rights reserved.</span>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
