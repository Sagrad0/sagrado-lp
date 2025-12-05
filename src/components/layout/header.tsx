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
          {/* LOGO SIMPLES, SEM PILL */}
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

          {/* SÓ OS DOIS BOTÕES – CONSISTENTES COM O HERO */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* CTA PRINCIPAL – MESMA LÓGICA VISUAL DO HERO */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden md:inline-flex border-white/60 text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="#kits">VER KITS</Link>
            </Button>

            {/* CTA SECUNDÁRIO – WHATS MAIS LEVE */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="inline-flex items-center gap-1.5 bg-white/5 text-white hover:bg-white/15"
            >
              <a
                href="https://wa.me/55SEUNUMEROAQUI?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5"
              >
                <WhatsappLogo
                  className="h-4 w-4 text-[#25D366]"
                  weight="fill"
                />
                <span>Atendimento</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
