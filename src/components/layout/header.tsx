"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="
        fixed top-0 z-50 w-full
        border-b border-black/20
        bg-[#E0006E]
        shadow-[0_10px_30px_rgba(0,0,0,0.18)]
      "
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO / WORDMARK – usando o banner */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/sagrado-social-banner.png"
              alt="Sagrado • Comer bem é Sagrado"
              width={320}
              height={80}
              className="h-12 w-auto md:h-14"
              priority
            />
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Navegação desktop */}
            <nav className="hidden items-center gap-6 text-xs font-medium text-white/85 md:flex">
              <a href="#kits" className="hover:text-white">
                Kits heróis
              </a>
              <a href="#como-funciona" className="hover:text-white">
                Como funciona
              </a>
            </nav>

            {/* CTA primário: Ver kits disponíveis (roxo / sacola) */}
            <Button
              size="sm"
              className="hidden rounded-full bg-[#3E1B97] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-[#5531B5] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] active:translate-y-0 transition-all duration-200 md:inline-flex"
              onClick={() => {
                const el = document.getElementById("kits")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Ver kits disponíveis
            </Button>

            {/* CTA secundário: WhatsApp verde */}
            <Button
              asChild
              size="sm"
              className="rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-[#1EB358] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] active:translate-y-0 transition-all duration-200"
            >
              <a
                href="https://wa.me/5581999874547?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsappLogo className="h-4 w-4 text-white" weight="fill" />
                Pedir pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
