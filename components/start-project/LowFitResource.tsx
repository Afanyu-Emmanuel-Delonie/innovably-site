"use client";

import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";

export default function LowFitResource({ onBookAnyway }: { onBookAnyway: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Let&apos;s point you in the right direction.
        </h2>
        <p className="mt-3 text-base leading-7 text-foreground-muted">
          Based on your answers, a call might be more than you need right now — here are a
          couple of places to start instead. If you&apos;d still like to talk, that&apos;s
          completely fine too.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { href: "/services/ui-ux-design", label: "Browse what we build" },
          { href: "/#faq", label: "Read frequently asked questions" },
          { href: "/#contact", label: "Send a quick message instead" },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 text-base text-foreground transition-colors duration-[var(--duration-fast)] hover:border-border-strong hover:bg-surface-2"
          >
            {label}
            <MdArrowOutward className="h-4 w-4 text-foreground-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>

      <button
        type="button"
        onClick={onBookAnyway}
        className="mt-2 flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-base font-medium text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
      >
        I&apos;d still like to book a call
      </button>
    </div>
  );
}
