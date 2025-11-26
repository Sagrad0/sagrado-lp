'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { WhatsappLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo animada levemente no hover */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/sagrado-logo.png" // 👈 AQUI o caminho certo
                alt="Sagrado"
                width={120}
                height={60}
                className="h-auto"
                priority
              />
            </Link>
          </motion.div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden font-semibold text-gray-700 hover:text-purple-700 md:inline-flex"
              onClick={() => {
                const el = document.getElementById('kits')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Ver kits
            </Button>

            <Button asChild className="gap-2 font-semibold">
              <a
                href="https://wa.me/5581999874547"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsappLogo className="h-5 w-5" weight="fill" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
