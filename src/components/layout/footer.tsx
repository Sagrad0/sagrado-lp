"use client"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">
            © 2025 Sagrado. Comer bem é sagrado.
          </p>
          <Button asChild size="sm" className="rounded-full">
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
