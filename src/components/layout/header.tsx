'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { WhatsappLogo } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
              src=/images/sagrado-logo.png
              alt="Sagrado"
              width={120}
              height={60}
              className="h-auto"
              priority
            />
          </motion.div>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              className="font-semibold text-gray-700 hover:text-purple-700"
              onClick={() => document.getElementById('kits')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver kits
            </Button>
            <Button asChild className="gap-2 font-semibold">
              <a href="https://wa.me/5581999874547" target="_blank" rel="noopener noreferrer">
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
