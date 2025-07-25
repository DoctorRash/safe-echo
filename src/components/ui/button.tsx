import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 transition-all duration-300 ease-comfort",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-glow shadow-comfort hover:shadow-soft rounded-lg",
        safe: "bg-hero-gradient text-primary-foreground hover:scale-[1.02] shadow-soft font-semibold rounded-xl",
        trust: "bg-success text-success-foreground hover:bg-success/90 shadow-comfort rounded-lg",
        gentle: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-comfort rounded-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-comfort rounded-lg",
        outline: "border border-border bg-card hover:bg-secondary hover:text-secondary-foreground shadow-comfort rounded-lg",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-comfort rounded-lg",
        ghost: "hover:bg-secondary hover:text-secondary-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 px-4 py-2 rounded-lg",
        lg: "h-14 px-8 py-4 text-base rounded-xl",
        icon: "h-12 w-12 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
