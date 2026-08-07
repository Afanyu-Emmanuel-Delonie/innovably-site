type StartProjectButtonProps = {
  href?: string;
  variant?: "pill" | "large" | "outline";
  className?: string;
  children?: string;
};

export default function StartProjectButton({
  href = "/start-a-project",
  variant = "large",
  className = "",
  children = "Start a project",
}: StartProjectButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-colors duration-[var(--duration-base)] ease-out-quart";
  const variants: Record<NonNullable<StartProjectButtonProps["variant"]>, string> = {
    pill: "h-9 rounded-full bg-primary px-4 text-sm text-primary-foreground hover:bg-primary-600",
    large: "h-12 rounded-full bg-primary px-6 text-base text-primary-foreground hover:bg-primary-600",
    outline:
      "h-12 rounded-full border border-border bg-surface px-6 text-base text-foreground hover:border-border-strong hover:bg-surface-2",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </a>
  );
}
