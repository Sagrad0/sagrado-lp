"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="fixed top-0 z-50 w-full border-b border-white/10 bg-gradient-to-b from-black/60 via-black/35 to-transparent backdrop-blur"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Marca */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1.5 shadow-sm"
            >
              <Image
                src="/images/sagrado-logo.png"
                alt="Sagrado"
                width={110}
                height={40}
                className="h-7 w-auto"
                priority
              />
            </Link>

            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/80 sm:inline">
              Lanches limpos • Sem glúten • Sem lactose
            </span>
          </div>

          {/* Navegação + CTAs */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Links desktop */}
            <nav className="hidden items-center gap-6 text-xs font-medium text-white/80 md:flex">
              <a href="#kits" className="hover:text-white">
                Kits heróis
              </a>
              <a href="#como-funciona" className="hover:text-white">
                Como funciona
              </a>
            </nav>

            {/* Botão "Ver kits" */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white md:inline-flex"
            >
              <a href="#kits">Ver kits</a>
            </Button>

            {/* Botão WhatsApp – CTA principal */}
            <Button
              asChild
              size="sm"
              className="gap-2 bg-white px-4 text-xs font-semibold text-[#6C2DC7] shadow-lg shadow-black/30 hover:bg-[#F6F3EF] active:translate-y-[1px]"
            >
              <a
                href="https://wa.me/5581999874547"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo className="h-4 w-4" weight="fill" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
