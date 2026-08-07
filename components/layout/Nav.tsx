"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, useGSAP } from "@/lib/gsap";
import { MdMenu, MdClose, MdKeyboardArrowDown } from "react-icons/md";
import StartProjectButton from "@/components/home/StartProjectButton";

type NavLink = {
  label: string;
  href?: string;
  section?: string;
  children?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Home", href: "/", section: "home" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    children: [
      { label: "UI/UX Design", href: "/services/ui-ux-design" },
      { label: "Custom Software", href: "/services/custom-software" },
      { label: "Cloud Solutions", href: "/services/cloud-solutions" },
      { label: "AI/ML Solutions", href: "/services/ai-ml-solutions" },
    ],
  },
  { label: "Products", href: "/solutions" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
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

      // Stagger-in desktop links
      gsap.from(linksRef.current?.querySelectorAll("li") ?? [], {
        y: -10,
        opacity: 0,
        stagger: 0.07,
        duration: 0.5,
        delay: 0.2,
        ease: "power3.out",
      });

      // Magnetic hover on each desktop link
      const items = linksRef.current?.querySelectorAll<HTMLElement>(".nav-item") ?? [];
      const cleanups: (() => void)[] = [];

      items.forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
          gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
        };
        const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.4)" });
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: navRef },
  );

  const isActive = (link: NavLink) => {
    if (link.children) return link.children.some((c) => pathname === c.href.split("#")[0]);
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
            <Image src="/img/logo-dark.png" alt="Innovably logo" width={28} height={28} className="h-7 w-7 rounded-md" />
            Innovably
          </Link>

          {/* Desktop links */}
          <ul ref={linksRef} className="hidden items-center gap-8 text-sm md:flex">
            {navLinks.map((link) => {
              const active = isActive(link);

              if (link.children) {
                return (
                  <li key={link.label} className="group relative">
                    <span
                      tabIndex={0}
                      className={`nav-item relative flex cursor-default items-center gap-1 transition-colors duration-[var(--duration-fast)] hover:text-foreground focus-visible:text-foreground focus:outline-none ${
                        active ? "text-foreground" : "text-foreground-muted"
                      }`}
                    >
                      {link.label}
                      <MdKeyboardArrowDown className="h-4 w-4 transition-transform duration-[var(--duration-fast)] group-hover:rotate-180 group-focus-within:rotate-180" />
                      {active && (
                        <span className="absolute -bottom-1 left-0 h-px w-full rounded-full bg-primary" />
                      )}
                    </span>
                    <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility] duration-[var(--duration-fast)] group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="flex flex-col gap-1 rounded-xl border border-border bg-surface p-2 shadow-lg shadow-black/20">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block rounded-lg px-3 py-2 text-sm transition-colors duration-[var(--duration-fast)] ${
                                pathname === child.href.split("#")[0]
                                  ? "bg-surface-2 text-foreground"
                                  : "text-foreground-muted hover:bg-surface-2 hover:text-foreground"
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <Link
                    href={link.href!}
                    className={`nav-item relative transition-colors duration-[var(--duration-fast)] hover:text-foreground ${
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
          <div className="hidden items-center gap-3 md:flex">
            <StartProjectButton variant="pill" />
          </div>

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

              if (link.children) {
                return (
                  <li key={link.label} className="mobile-link flex flex-col gap-1">
                    <span className="px-4 pt-3 text-sm font-medium uppercase tracking-[0.08em] text-foreground-subtle">
                      {link.label}
                    </span>
                    {link.children.map((child) => {
                      const childActive = pathname === child.href.split("#")[0];
                      return (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-[var(--duration-fast)] ${
                            childActive
                              ? "bg-surface text-foreground"
                              : "text-foreground-muted hover:bg-surface hover:text-foreground"
                          }`}
                        >
                          {child.label}
                          {childActive && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        </Link>
                      );
                    })}
                  </li>
                );
              }

              return (
                <li key={link.label}>
                  <Link
                    href={link.href!}
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

          <div className="mt-auto pt-6">
            <StartProjectButton className="w-full" />
          </div>
        </div>
      )}
    </>
  );
}
