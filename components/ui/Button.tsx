import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
        variant === "secondary" && "border border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--sidebar-hover)]",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700",
        variant === "ghost" && "text-[var(--muted)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--foreground)]",
        size === "sm" && "px-3 py-1.5 text-xs",
        size === "md" && "px-4 py-2.5 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
