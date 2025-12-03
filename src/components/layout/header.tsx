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
        border-b border-black/15
        bg-gradient-to-r from-[#F4439D] via-[#E0006E] to-[#C30063]
        backdrop-blur-xl
        shadow-[0_10px_30px_rgba(0,0,0,0.25)]
      "
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* LOGO EM PILL CLARA */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center rounded-full bg-[#F6F3EF]/95 px-3 py-1 shadow-sm">
              <div className="relative h-8 w-28 md:h-9 md:w-32">
                <Image
                  src="/images/logo-sagrado.png" // aqui você troca pelo arquivo novo da logo
                  alt="Sagrado • Comer bem é Sagrado"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
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

            {/* CTAs lado a lado */}
            <div className="flex items-center gap-2">
              {/* CTA PRINCIPAL: VER KITS / CARRINHO (APARECE NO MOBILE) */}
              <Button
                size="sm"
                className="
                  inline-flex items-center gap-2
                  rounded-full bg-white px-4 py-2
                  text-[11px] font-semibold uppercase tracking-wide
                  text-[#E0006E]
                  shadow-md shadow-black/20
                  hover:bg-[#F6F3EF]
                  hover:shadow-lg
                  active:translate-y-[1px]
                  transition-all duration-200
                "
                onClick={() => {
                  const el = document.getElementById("kits")
                  if (el) el.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Ver kits
              </Button>

              {/* CTA SECUNDÁRIO: WHATSAPP (APOIO) */}
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="
                  rounded-full border border-white/35 bg-white/5 px-3 py-2
                  text-[11px] font-medium text-white/85
                  hover:bg:white/10 hover:border-white/70 hover:text-white
                  active:translate-y-[1px]
                  transition-all duration-200
                "
              >
                <a
                  href="https://wa.me/5581999874547?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5"
                >
                  <WhatsappLogo className="h-4 w-4 text-[#25D366]" weight="fill" />
                  <span>Atendimento</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
