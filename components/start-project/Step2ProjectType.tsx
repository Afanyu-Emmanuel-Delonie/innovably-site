"use client";

import { PROJECT_TYPES, type ProjectType } from "@/lib/booking";

export default function Step2ProjectType({
  projectType,
  projectTypeOther,
  onChange,
  onContinue,
  onBack,
}: {
  projectType: ProjectType | null;
  projectTypeOther: string;
  onChange: (projectType: ProjectType, other: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const isValid = projectType !== null && (projectType !== "Other" || projectTypeOther.trim().length > 0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isValid) onContinue();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          What kind of project is this?
        </h2>
        <p className="mt-2 text-base text-foreground-muted">Pick the closest fit.</p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Project type</legend>
        {PROJECT_TYPES.map((type) => {
          const checked = projectType === type;
          return (
            <label
              key={type}
              className={`flex min-h-[44px] cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 transition-colors duration-[var(--duration-fast)] ${
                checked
                  ? "border-primary bg-primary/10"
                  : "border-border bg-surface hover:border-border-strong"
              }`}
            >
              <input
                type="radio"
                name="projectType"
                value={type}
                checked={checked}
                onChange={() => onChange(type, projectTypeOther)}
                className="h-4 w-4 shrink-0 accent-[var(--color-primary)] focus-visible:outline-none"
              />
              <span className="text-base text-foreground">{type}</span>
            </label>
          );
        })}
      </fieldset>

      {projectType === "Other" && (
        <label className="flex flex-col gap-2 text-sm text-foreground-muted">
          Tell us briefly what you have in mind
          <input
            type="text"
            value={projectTypeOther}
            onChange={(e) => onChange("Other", e.target.value)}
            placeholder="A quick description"
            className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-foreground placeholder:text-foreground-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
        </label>
      )}

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
          disabled={!isValid}
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-primary px-6 text-base font-medium text-primary-foreground transition-colors duration-[var(--duration-base)] ease-out-quart hover:bg-primary-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
