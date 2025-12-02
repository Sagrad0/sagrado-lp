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
      className="fixed top-0 z-50 w-full border-b border-black/5 bg-[#FFF8EB]/90 backdrop-blur"
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Bloco da marca */}
          <div className="flex items-center gap-3">
            {/* Logo dentro de um “selo” */}
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full border border-[#6C2DC7]/18 bg-white/95 px-4 py-1.5 shadow-sm"
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

            {/* Slogan fino, só em tela maior */}
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500 sm:inline">
              Lanches limpos • Sem glúten • Sem lactose
            </span>
          </div>

          {/* Navegação + CTA */}
          <div className="flex items-center gap-3 md:gap-4">
            <nav className="hidden items-center gap-6 text-xs font-medium text-slate-700 md:flex">
              <a href="#kits" className="hover:text-[#6C2DC7]">
                Kits heróis
              </a>
              <a href="#como-funciona" className="hover:text-[#6C2DC7]">
                Como funciona
              </a>
            </nav>

            <Button
              asChild
              size="sm"
              className="gap-2 rounded-full bg-gradient-to-r from-[#6C2DC7] via-[#F44336] to-[#FFB100] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#6C2DC7]/30 hover:brightness-105 active:translate-y-[1px]"
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
