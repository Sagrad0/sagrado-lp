"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"
import { motion } from "framer-motion"

export function Header() {
  return (
    <motion.header
      // Animação de entrada do header (já está perfeita)
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="
        fixed top-0 z-50 w-full
        border-b border-black/20
        bg-[#E0006E] // Fundo Magenta garante contraste para a logo
        shadow-[0_8px_30px_rgba(0,0,0,0.25)] // Sombra sutil para destacar
      "
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo e Tagline */}
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
            {/* Navegação desktop (OK) */}
            <nav className="hidden items-center gap-6 text-xs font-medium text-white/85 md:flex">
              <a href="#kits" className="hover:text-white transition-colors">
                Kits heróis
              </a>
              <a href="#como-funciona" className="hover:text-white transition-colors">
                Como funciona
              </a>
            </nav>

            {/* CTA primário: Ver kits (Estilizado) */}
            <Button
              size="sm"
              className="
                hidden rounded-full 
                bg-[#E91E63]                 
                px-4 py-2 text-xs font-semibold text-white 
                shadow-lg                    
                hover:bg-[#C91A54]           
                hover:-translate-y-1         
                hover:shadow-xl              
                active:translate-y-0 active:shadow-lg transition-all duration-200 
                md:inline-flex
              "
              onClick={() => {
                const el = document.getElementById("kits")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Ver kits
            </Button>

            {/* CTA secundário: WhatsApp (Estilizado) */}
            <Button
              asChild
              size="sm"
              className="
                rounded-full 
                bg-[#25D366] px-3 py-2 text-xs font-semibold text-white 
                shadow-lg                    
                hover:bg-[#1EB358]           
                hover:-translate-y-1         
                hover:shadow-xl              
                active:translate-y-0 active:shadow-lg transition-all duration-200
              "
            >
              <a
                href="https://wa.me/5581999874547?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <WhatsappLogo className="h-4 w-4 text-white" weight="fill" />
                <span className="hidden sm:inline">Pedir pelo WhatsApp</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
