import { tv, type VariantProps } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

const button = tv({
  base: "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  variants: {
    variant: {
      default: "bg-[#E07A5F] text-white hover:bg-[#E07A5F]/90",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-[#E5DFD7] bg-[#FAF7F2] text-[#2D2A26] hover:bg-[#F2EDE7]",
      secondary: "bg-[#F2EDE7] text-[#8C8680] hover:bg-[#E5DFD7]",
      ghost: "text-[#8C8680] hover:bg-[#F2EDE7] hover:text-[#2D2A26]",
      link: "text-[#E07A5F] underline-offset-4 hover:underline",
    },
    size: {
      default: "h-11 px-5",
      sm: "h-9 rounded-lg px-3 text-xs",
      lg: "h-12 rounded-xl px-8 text-base",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={button({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, button };
