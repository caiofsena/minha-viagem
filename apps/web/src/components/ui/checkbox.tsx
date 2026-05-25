import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      type="checkbox"
      ref={ref}
      className={cn("h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900", className)}
      {...props}
    />
  )
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
