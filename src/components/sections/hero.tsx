'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Leaf, CheckCircle, Clock } from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ArrowRight } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-purple-200 px-4 py-2 text-sm font-semibold text-purple-700"
              >
                <Leaf className="h-4 w-4" weight="fill" />
                Rótulo limpo, sem glúten/lactose
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-balance bg-gradient-to-r from-gray-900 to-purple-700 bg-clip-text text-transparent"
              >
                Comida de verdade sem você virar refém da cozinha
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-lg text-gray-600 text-balance"
              >
                Kits ultracongelados de pizzas e salgados, feitos com ingredientes de verdade, 
                rótulo curto e opções sem glúten e sem lactose pra casa toda.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Button size="lg" className="text-base font-semibold">
                  Ver kits
                </Button>
                <Button size="lg" variant="outline" className="text-base font-semibold">
                  Falar no WhatsApp
                </Button>
              </motion.div>
            </div>
          </ScrollReveal>
          
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
              className="relative"
            >
              <Image
                src="/images/hero.svg"
                alt="Produtos Sagrado"
                width={500}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
              {/* Glow effect */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-purple-400/10 to-purple-600/10 blur-2xl" />
            </motion.div>
          </ScrollReveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <ScrollReveal>
            <FeatureCard 
              icon={<Leaf weight="fill" />}
              title="Rótulo limpo"
              description="Ingredientes de verdade, sem firula, que você reconhece e confia."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FeatureCard 
              icon={<CheckCircle weight="fill" />}
              title="Sem glúten/lactose"
              description="Linha pensada pra quem precisa cuidar das restrições alimentares."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FeatureCard 
              icon={<Clock weight="fill" />}
              title="Práticos"
              description="Do freezer pra mesa em poucos minutos: forno, air fryer ou micro-ondas."
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 transition-transform group-hover:scale-110">
          {icon}
        </div>
        <h3 className="mb-2 font-serif text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
