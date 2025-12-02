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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/sagrado-logo.png"
              alt="Sagrado"
              width={120}
              height={60}
              className="h-8 w-auto md:h-9"
              priority
            />
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-white/85 sm:inline">
              LANCHES LIMPOS • SEM GLÚTEN • SEM LACTOSE
            </span>
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

            {/* Botão “Ver kits” – secundário */}
            <Button
              variant="outline"
              size="sm"
              className="hidden rounded-full border-white/60 bg-white/10 px-5 text-xs text-white hover:bg-white/20 hover:text-white md:inline-flex"
              onClick={() => {
                const el = document.getElementById("kits")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Ver kits
            </Button>

            {/* Botão WhatsApp – CTA principal */}
            <Button
              asChild
              size="sm"
              className="
                gap-2 rounded-full
                bg-white px-5 text-xs font-semibold text-[#6C2DC7]
                shadow-md shadow-black/30
                hover:bg-[#F6F3EF] active:translate-y-[1px]
              "
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
