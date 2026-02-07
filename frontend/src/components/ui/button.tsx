import React, { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const baseStyles =
      "font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      default: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900",
      outline:
        "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-900",
      ghost:
        "bg-transparent text-slate-900 hover:bg-slate-100 focus:ring-slate-900",
      destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
          className || ""
        }`}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
