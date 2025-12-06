"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `
  relative inline-flex items-center justify-center
  whitespace-nowrap rounded-full text-sm font-semibold
  overflow-hidden
  transition-all duration-200
  focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-[#6C2DC7]
  disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          bg-gradient-to-r from-[#F4439D] to-[#6C2DC7]
          text-white
          shadow-[0_14px_28px_rgba(0,0,0,0.35)]
          hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          hover:brightness-110
          hover:-translate-y-[1px]
          active:translate-y-[1px] active:shadow-[0_10px_20px_rgba(0,0,0,0.45)]
          border border-white/10
          before:pointer-events-none before:absolute before:inset-0
          before:bg-[radial-gradient(circle_at_0_0,rgba(255,255,255,0.55),transparent_60%)]
          before:opacity-80
        `,
        destructive: `
          bg-gradient-to-r from-[#F97373] via-[#EF4444] to-[#B91C1C]
          text-white
          shadow-[0_10px_24px_rgba(0,0,0,0.35)]
          hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]
          hover:brightness-110
          hover:-translate-y-[1px]
          active:translate-y-[1px] active:shadow-[0_8px_18px_rgba(0,0,0,0.45)]
          border border-white/5
        `,
        outline: `
          bg-white/5
          text-white
          border border-white/70
          backdrop-blur-md
          shadow-[0_10px_26px_rgba(0,0,0,0.25)]
          hover:bg-white/12
          hover:shadow-[0_14px_32px_rgba(0,0,0,0.35)]
          hover:-translate-y-[1px]
          active:translate-y-[1px] active:shadow-[0_8px_18px_rgba(0,0,0,0.4)]
        `,
        secondary: `
          bg-gradient-to-r from-[#F6F3EF] via-[#E9E0D7] to-[#F6F3EF]
          text-[#3A265F]
          border border-black/5
          shadow-[0_10px_22px_rgba(0,0,0,0.18)]
          hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)]
          hover:-translate-y-[1px]
          active:translate-y-[1px] active:shadow-[0_8px_16px_rgba(0,0,0,0.3)]
        `,
        ghost: `
          bg-transparent
          text-[#3A265F]
          hover:bg-black/5
          hover:-translate-y-[1px]
          active:translate-y-[1px]
        `,
        link: `
          bg-transparent
          text-[#6C2DC7]
          underline-offset-4 hover:underline
          px-0 h-auto
        `,
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 p-0",
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
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
