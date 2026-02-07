import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "destructive";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-slate-900 text-white",
      secondary: "bg-slate-100 text-slate-900",
      success: "bg-green-100 text-green-900",
      warning: "bg-yellow-100 text-yellow-900",
      destructive: "bg-red-100 text-red-900",
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${variants[variant]} ${
          className || ""
        }`}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
