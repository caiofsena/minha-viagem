import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#2d3561] bg-[#252b48] px-4 py-2 text-sm text-white ring-offset-[#1a1f3d] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#718096] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ecdc4] focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
