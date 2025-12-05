"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Header() {
  function scrollToKits() {
    const el = document.getElementById("kits")
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="
        fixed top-0 z-50 w-full
        border-b border-black/15
        bg-gradient-to-r from-[#F4439D] via-[#E0006E] to-[#C30063]
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      "
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" className="flex items-center">
            <div className="relative h-16 w-[224px] md:h-[72px] md:w-[256px]">
              <Image
                src="/images/logo-sagrado.png"
                alt="Sagrado • Comer bem é Sagrado"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* CTAs HEADER */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* VER KITS — pill branca, clean, sem gritaria */}
            <Button
              variant="outline"
              size="sm"
              className="
                hidden md:inline-flex
                border-white/80 bg-white/8 text-[11px] font-semibold text-white
                rounded-full px-5
                shadow-[0_10px_26px_rgba(0,0,0,0.35)]
                hover:bg-white/18 hover:text-white
                hover:-translate-y-[1px]
                active:translate-y-[1px]
              "
              onClick={scrollToKits}
            >
              VER KITS
            </Button>

            {/* ATENDIMENTO — pill leve com foco no ícone */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="
                inline-flex items-center gap-1.5
                rounded-full border border-white/60 bg-white/10
                text-[11px] font-medium text-white
                hover:bg-white/18 hover:-translate-y-[1px]
                active:translate-y-[1px]
              "
            >
              <a
                href="https://wa.me/5581999874547?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <WhatsappLogo className="h-4 w-4 text-[#25D366]" weight="fill" />
                <span className="hidden sm:inline">Atendimento</span>
                <span className="sm:hidden">Whats</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
