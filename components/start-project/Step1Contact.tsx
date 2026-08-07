"use client";

import { useState } from "react";
import type { ContactInfo } from "@/lib/booking";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "rounded-lg border border-border bg-surface-2 px-4 py-3 text-foreground placeholder:text-foreground-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400";
const errorInputClass = "border-danger focus:ring-danger";

type Errors = Partial<Record<keyof ContactInfo, string>>;

function validate(data: ContactInfo): Errors {
  const errors: Errors = {};
  if (!data.name.trim()) errors.name = "Full name is required.";
  if (!data.email.trim()) errors.email = "Work email is required.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.company.trim()) errors.company = "Company name is required.";
  return errors;
}

export default function Step1Contact({
  data,
  onChange,
  onContinue,
}: {
  data: ContactInfo;
  onChange: (data: ContactInfo) => void;
  onContinue: () => void;
}) {
  const [touched, setTouched] = useState<Partial<Record<keyof ContactInfo, boolean>>>({});
  const errors = validate(data);
  const isValid = Object.keys(errors).length === 0;

  function field<K extends keyof ContactInfo>(key: K, value: ContactInfo[K]) {
    onChange({ ...data, [key]: value });
  }

  function markTouched(key: keyof ContactInfo) {
    setTouched((t) => ({ ...t, [key]: true }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, company: true, role: true });
    if (isValid) onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Let&apos;s start with the basics.
        </h2>
        <p className="mt-2 text-base text-foreground-muted">
          Just enough to know who we&apos;re talking to.
        </p>
      </div>

      <label className="flex flex-col gap-2 text-sm text-foreground-muted">
        Full name
        <input
          type="text"
          value={data.name}
          onChange={(e) => field("name", e.target.value)}
          onBlur={() => markTouched("name")}
          placeholder="Jane Doe"
          aria-invalid={touched.name && !!errors.name}
          aria-describedby={touched.name && errors.name ? "error-name" : undefined}
          className={`${inputClass} ${touched.name && errors.name ? errorInputClass : ""}`}
        />
        {touched.name && errors.name && (
          <span id="error-name" className="text-sm text-danger">
            {errors.name}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm text-foreground-muted">
        Work email
        <input
          type="email"
          value={data.email}
          onChange={(e) => field("email", e.target.value)}
          onBlur={() => markTouched("email")}
          placeholder="jane@company.com"
          aria-invalid={touched.email && !!errors.email}
          aria-describedby={touched.email && errors.email ? "error-email" : undefined}
          className={`${inputClass} ${touched.email && errors.email ? errorInputClass : ""}`}
        />
        {touched.email && errors.email && (
          <span id="error-email" className="text-sm text-danger">
            {errors.email}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm text-foreground-muted">
        Company name
        <input
          type="text"
          value={data.company}
          onChange={(e) => field("company", e.target.value)}
          onBlur={() => markTouched("company")}
          placeholder="Acme Inc."
          aria-invalid={touched.company && !!errors.company}
          aria-describedby={touched.company && errors.company ? "error-company" : undefined}
          className={`${inputClass} ${touched.company && errors.company ? errorInputClass : ""}`}
        />
        {touched.company && errors.company && (
          <span id="error-company" className="text-sm text-danger">
            {errors.company}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2 text-sm text-foreground-muted">
        Role / title <span className="text-foreground-subtle">(optional)</span>
        <input
          type="text"
          value={data.role}
          onChange={(e) => field("role", e.target.value)}
          placeholder="Head of Product"
          className={inputClass}
        />
      </label>

      <button
        type="submit"
        disabled={!isValid}
        className="mt-2 flex h-12 items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
      >
        Continue
      </button>
    </form>
  );
}
