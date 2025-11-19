import * as React from "react";
import { cn } from "../../lib/utils";
import { Button, buttonVariants } from "./button";
import type { VariantProps } from "class-variance-authority";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label: string;
  loading?: boolean;
  icon?: React.ReactElement;
}

export const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ label, loading = false, icon, className, variant = "default", disabled, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant={variant}
        disabled={disabled || loading}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {loading ? (
          <span className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full" />
        ) : (
          icon
        )}
        {label}
      </Button>
    );
  }
);

CustomButton.displayName = "CustomButton";
