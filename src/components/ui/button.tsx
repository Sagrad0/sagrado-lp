"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#6C2DC7] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // CTA principal
        default:
          "bg-gradient-to-r from-[#6C2DC7] to-[#4B1D96] text-white shadow-md hover:brightness-110 hover:shadow-lg active:translate-y-[1px]",

        // Perigo / excluir
        destructive:
          "bg-red-600 text-white shadow-sm hover:bg-red-700 active:translate-y-[1px]",

        // Contorno roxo
        outline:
          "border border-[#6C2DC7] bg-transparent text-[#6C2DC7] hover:bg-[#F6F3EF] hover:border-[#4B1D96] hover:text-[#4B1D96] active:translate-y-[1px]",

        // Fundo claro
        secondary:
          "bg-[#F6F3EF] text-[#3A265F] shadow-sm hover:bg-[#e8e0d7] active:translate-y-[1px]",

        // Fantasma
        ghost:
          "bg-transparent text-[#3A265F] hover:bg-[#F6F3EF]/80 active:translate-y-[1px]",

        // Link
        link:
          "bg-transparent text-[#6C2DC7] underline-offset-4 hover:underline px-0 h-auto",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
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
