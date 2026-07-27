"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { MdMenu, MdClose } from "react-icons/md";

const navLinks: { label: string; href: string; section?: string }[] = [
  { label: "Home", href: "/", section: "home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services", section: "services" },
  { label: "Solutions", href: "/#" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll sentinel for bg
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

  // Section observer — only on home page
  useEffect(() => {
    if (pathname !== "/") return;

    const sectionIds = navLinks.map((l) => l.section).filter(Boolean) as string[];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [pathname]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Animate mobile menu open/close
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.fromTo(
        menu,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.25, ease: "power2.out" },
      );
      gsap.fromTo(
        menu.querySelectorAll(".mobile-link"),
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.25, ease: "power2.out" },
      );
    }
  }, [menuOpen]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(navRef.current, { y: -16, opacity: 0 });
    },
    { scope: navRef },
  );

  const isActive = (link: (typeof navLinks)[number]) => {
    if (!link.section) return pathname === link.href;
    return pathname === "/" && activeSection === link.section;
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`sticky top-0 z-50 px-6 py-4 transition-colors duration-[var(--duration-base)] sm:px-10 ${
          scrolled || menuOpen
            ? "border-b border-border/60 bg-background/60 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            <Image src="/img/logo-dark.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
            Innovably
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 text-sm md:flex">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className={`relative transition-colors duration-[var(--duration-fast)] hover:text-foreground ${
                      active ? "text-foreground" : "text-foreground-muted"
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 h-px w-full rounded-full bg-primary" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/#contact"
            className="hidden rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600 md:block"
          >
            Start a project
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground-muted transition-colors hover:text-foreground md:hidden"
          >
            {menuOpen ? <MdClose className="h-5 w-5" /> : <MdMenu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed inset-0 top-[57px] z-40 flex flex-col bg-background/95 px-6 py-8 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const active = isActive(link);
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-link flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-[var(--duration-fast)] ${
                      active
                        ? "bg-surface text-foreground"
                        : "text-foreground-muted hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {link.label}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto">
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-600"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
