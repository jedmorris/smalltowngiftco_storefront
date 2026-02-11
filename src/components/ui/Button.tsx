"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-brand-gold text-white hover:bg-brand-gold/90 hover:shadow-[var(--shadow-medium)]",
  secondary: "bg-brand-forest text-white hover:bg-brand-forest/90 hover:shadow-[var(--shadow-medium)]",
  outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white hover:shadow-[var(--shadow-soft)]",
  ghost: "text-brand-charcoal hover:bg-brand-pink/50",
  text: "text-brand-gold hover:text-brand-gold/80 underline underline-offset-4 decoration-brand-gold/30 hover:decoration-brand-gold",
};

const sizes = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3.5 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const isText = variant === "text";
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97] ${
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
