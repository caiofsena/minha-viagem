import { tv, type VariantProps } from "@/lib/utils";
import type { HTMLAttributes } from "react";

const badge = tv({
  base: "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2",
  variants: {
    variant: {
      default: "border-transparent bg-zinc-900 text-zinc-50",
      secondary: "border-transparent bg-zinc-100 text-zinc-900",
      outline: "text-zinc-950",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline";
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={badge({ variant, className })} {...props} />
  );
}

export { Badge, badge };
