import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-bold transition-transform active:scale-95 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // White "Sticker" button with black border and shadow
        primary: 
          "bg-white text-black border-2 border-black shadow-[4px_4px_0px_#000] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]",
        
        // Black button, simple
        secondary:
          "bg-brand-black text-white hover:bg-black/90",
        
        // Yellow button
        accent:
          "bg-brand-yellow text-black border-2 border-black shadow-[3px_3px_0px_#000]",

        ghost: "hover:bg-black/5 text-black",
      },
      size: {
        default: "h-12 px-8 rounded-full",
        sm: "h-9 px-4 rounded-full text-xs",
        lg: "h-14 px-8 rounded-full text-lg",
        icon: "h-12 w-12 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
