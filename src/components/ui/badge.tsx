import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    "inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary",
  outline:
    "inline-flex items-center rounded-full border border-primary/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary",
};

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(variantStyles[variant], className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { Badge };
