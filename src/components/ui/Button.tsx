"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "soft" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-apricot-deep text-white hover:bg-apricot-deep/90 hover:shadow-medium",
  secondary: "bg-espresso text-paper hover:bg-espresso/90 hover:shadow-medium",
  outline: "border-[1.5px] border-espresso text-espresso hover:bg-espresso hover:text-paper",
  soft: "bg-peach-soft text-espresso hover:bg-peach",
  ghost: "text-ink hover:bg-peach-soft",
  text: "text-apricot-deep hover:text-apricot-deep/80 underline underline-offset-[5px] decoration-apricot-deep/30 hover:decoration-apricot-deep",
};

const sizes = {
  sm: "px-4 py-[7px] text-[13px]",
  md: "px-[26px] py-[11px] text-[15px]",
  lg: "px-8 py-[14px] text-[17px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const isText = variant === "text";
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 font-medium tracking-[0.02em] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] ${
          isText ? "" : "rounded-full"
        } ${variants[variant]} ${isText ? "" : sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
