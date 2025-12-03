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
            <div className="relative h-8 w-28 md:h-9 md:w-32">
              <Image
                src="/images/logo-sagrado.png" // troca pelo arquivo certo da logo
                alt="Sagrado • Comer bem é Sagrado"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* SÓ OS DOIS BOTÕES – CONSISTENTES COM O HERO */}
          <div className="flex items-center gap-2">
            {/* CTA PRINCIPAL – MESMA LÓGICA VISUAL DO HERO */}
            <Button
              size="sm"
              className="
                inline-flex items-center gap-2
                rounded-full bg-[#3E1B97] px-5 py-2.5
                text-[11px] font-semibold uppercase tracking-[0.18em]
                text-white
                shadow-lg shadow-black/25
                hover:bg-[#4C2AD9]
                hover:shadow-[0_18px_40px_rgba(0,0,0,0.45)]
                active:translate-y-[1px]
                transition-all duration-200
              "
              onClick={() => {
                const el = document.getElementById("kits")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
            >
              VER KITS
            </Button>

            {/* CTA SECUNDÁRIO – WHATS MAIS LEVE */}
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="
                rounded-full border border-white/40 bg-white/5 px-3 py-2
                text-[11px] font-medium text-white/80
                hover:bg-white/10 hover:border-white/80 hover:text-white
                active:translate-y-[1px]
                transition-all duration-200
              "
            >
              <a
                href="https://wa.me/55SEUNUMEROAQUI?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
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
    </motion.header>
  )
}
