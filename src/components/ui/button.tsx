import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "secondary"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const buttonVariants = {
  default:
    "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  outline:
    "inline-flex items-center justify-center whitespace-nowrap rounded-full border border-primary bg-transparent px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  ghost:
    "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-transparent px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  secondary:
    "inline-flex items-center justify-center whitespace-nowrap rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background shadow transition hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
  link:
    "inline-flex items-center justify-center text-sm font-semibold text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-10 px-4",
  sm: "h-9 px-3",
  lg: "h-11 px-6 text-base",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        className={cn(buttonVariants[variant], buttonSizes[size], className)}
        ref={ref as never}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
