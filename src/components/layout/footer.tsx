"use client"

import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-700">
            © 2025 Sagrado. Comer bem é sagrado.
          </p>
          <Button
            asChild
            size="sm"
            className="
              hidden md:flex
              rounded-full bg-gradient-to-r from-[#F4439D] to-[#6C2DC7]
              text-white shadow-[0_14px_32px_rgba(0,0,0,0.4)]
              hover:brightness-110 hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)]
            "
          >
            <a
              href="https://wa.me/5581999874547"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <WhatsappLogo className="h-4 w-4" weight="fill" />
              Falar com atendente
            </a>
          </Button>
        </div>
      </div>
    </footer>
  )
}
