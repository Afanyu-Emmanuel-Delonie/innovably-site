const STEP_LABELS = ["Contact info", "Project type", "Goal, budget & timeline", "Book a call"];

export default function ProgressIndicator({ step }: { step: number }) {
  const total = STEP_LABELS.length;
  const clampedStep = Math.min(step, total);
  const percent = (clampedStep / total) * 100;

  return (
    <div className="mx-auto w-full max-w-xl px-6 pt-8 sm:px-10">
      <div className="flex items-center justify-between text-sm text-foreground-muted">
        <span className="font-mono text-xs uppercase tracking-[0.08em]">
          Step {clampedStep} of {total}
        </span>
        <span>{STEP_LABELS[clampedStep - 1]}</span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div aria-live="polite" className="sr-only">
        Step {clampedStep} of {total}: {STEP_LABELS[clampedStep - 1]}
      </div>
    </div>
  );
}
