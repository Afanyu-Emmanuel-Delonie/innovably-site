"use client";

import { useState } from "react";
import { BUDGET_FLOOR, CURRENCY_SYMBOL } from "@/lib/booking";
import type { Currency } from "@/lib/currency";

const CURRENCIES: Currency[] = ["USD", "EUR", "RWF"];

/** Format a raw numeric string with thousand separators, no decimals */
function formatWithSeparators(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-US");
}

/** Strip separators to get the plain numeric string */
function stripSeparators(formatted: string): string {
  return formatted.replace(/,/g, "");
}

export default function Step3GoalBudgetTimeline({
  goal,
  budgetAmount,
  currency,
  timeline,
  onChange,
  onCurrencyChange,
  onContinue,
  onBack,
}: {
  goal: string;
  budgetAmount: string;
  currency: Currency;
  timeline: string;
  onChange: (patch: { goal?: string; budgetAmount?: string; timeline?: string }) => void;
  onCurrencyChange: (currency: Currency) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const [goalTouched, setGoalTouched] = useState(false);
  const [budgetTouched, setBudgetTouched] = useState(false);

  // Display value: formatted with separators
  const displayValue = formatWithSeparators(budgetAmount);

  const goalValid = goal.trim().length > 0;
  const floor = BUDGET_FLOOR[currency];
  const numericAmount = parseFloat(stripSeparators(budgetAmount));
  const budgetBelowFloor = budgetAmount !== "" && !isNaN(numericAmount) && numericAmount > 0 && numericAmount < floor;

  function handleBudgetInput(e: React.ChangeEvent<HTMLInputElement>) {
    // Strip everything except digits, then store as plain number string
    const plain = e.target.value.replace(/\D/g, "");
    onChange({ budgetAmount: plain });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setGoalTouched(true);
    setBudgetTouched(true);
    if (goalValid && !budgetBelowFloor) onContinue();
  }

  const symbol = CURRENCY_SYMBOL[currency];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Tell us what you&apos;re trying to achieve.
        </h2>
      </div>

      {/* Goal */}
      <label className="flex flex-col gap-2 text-sm text-foreground-muted">
        Goal / problem statement
        <textarea
          value={goal}
          onChange={(e) => onChange({ goal: e.target.value })}
          onBlur={() => setGoalTouched(true)}
          rows={4}
          placeholder="What are you trying to achieve?"
          aria-invalid={goalTouched && !goalValid}
          aria-describedby={goalTouched && !goalValid ? "error-goal" : undefined}
          className={`resize-none rounded-lg border bg-surface-2 px-4 py-3 text-foreground placeholder:text-foreground-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 ${
            goalTouched && !goalValid ? "border-danger focus:ring-danger" : "border-border"
          }`}
        />
        {goalTouched && !goalValid && (
          <span id="error-goal" className="text-sm text-danger">
            Tell us a bit about what you&apos;re trying to achieve.
          </span>
        )}
      </label>

      {/* Budget */}
      <div className="flex flex-col gap-3">
        <label htmlFor="budget-amount" className="text-sm text-foreground-muted">
          Budget <span className="text-foreground-subtle">(optional, helps us prepare)</span>
        </label>
        <div className="flex gap-2.5">
          {/* Currency selector */}
          <select
            value={currency}
            onChange={(e) => {
              onCurrencyChange(e.target.value as Currency);
              // Clear amount when currency changes so floor hint updates cleanly
              onChange({ budgetAmount: "" });
              setBudgetTouched(false);
            }}
            aria-label="Currency"
            className="rounded-lg border border-border bg-surface-2 px-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* Amount input with symbol prefix */}
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 select-none text-sm text-foreground-subtle">
              {symbol}
            </span>
            <input
              id="budget-amount"
              type="text"
              inputMode="numeric"
              value={displayValue}
              onChange={handleBudgetInput}
              onBlur={() => setBudgetTouched(true)}
              placeholder={floor.toLocaleString("en-US")}
              aria-invalid={budgetTouched && budgetBelowFloor}
              aria-describedby={budgetTouched && budgetBelowFloor ? "error-budget" : undefined}
              className={`w-full rounded-lg border bg-surface-2 py-3 pr-4 text-foreground placeholder:text-foreground-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 ${
                budgetTouched && budgetBelowFloor
                  ? "border-danger focus:ring-danger"
                  : "border-border"
              }`}
              style={{ paddingLeft: `${symbol.length * 0.6 + 2}rem` }}
            />
          </div>
        </div>

        {budgetTouched && budgetBelowFloor ? (
          <span id="error-budget" className="text-sm text-danger">
            Our minimum engagement starts at {symbol}
            {floor.toLocaleString("en-US")} — enter that or above, or leave it blank.
          </span>
        ) : (
          <span className="text-xs text-foreground-subtle">
            Engagements start from {symbol}
            {floor.toLocaleString("en-US")} — a rough number is fine, or skip it entirely.
          </span>
        )}
      </div>

      {/* Timeline */}
      <label className="flex flex-col gap-2 text-sm text-foreground-muted">
        <div className="flex">
          Timeline <span className="text-foreground-subtle">(optional)</span>
        </div>
        <input
          type="text"
          value={timeline}
          onChange={(e) => onChange({ timeline: e.target.value })}
          placeholder="e.g. 3 months, Q3 2025, ASAP…"
          className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-foreground placeholder:text-foreground-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
        />
        <span className="text-xs text-foreground-subtle">
          Most projects kick off 2–4 weeks after booking — no pressure if you&apos;re not sure yet.
        </span>
      </label>

      <div className="mt-2 flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex h-12 items-center justify-center rounded-full border border-border bg-surface px-6 text-base font-medium text-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:border-border-strong hover:bg-surface-2"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={!goalValid || budgetBelowFloor}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
