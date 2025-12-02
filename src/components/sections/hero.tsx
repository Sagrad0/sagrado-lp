'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Bloco da imagem de fundo */}
      <div className="relative min-h-[520px] w-full">
        {/* Imagem de fundo em full width */}
        <Image
          src="/images/hero-sagrado-full.jpg"
          alt="Kits Sagrado na mesa: pizzas, dadinhos e coxinhas"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Overlay de degradê pra leitura do texto */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />

        {/* Conteúdo por cima */}
        <div className="relative z-10">
          <div className="container mx-auto flex min-h-[520px] items-center px-4 pb-16 pt-28">
            <ScrollReveal className="max-w-xl space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#FFB100]">
                SAGRADO • COMER BEM É SAGRADO
              </p>

              <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                Lanches limpos, prontos em poucos minutos.
                <span className="block text-white/90">
                  Pizzas, coxinhas e dadinhos sem glúten e sem lactose.
                </span>
              </h1>

              <p className="text-sm text-white/85 sm:text-base">
                Você resolve o lanche da família com kits ultracongelados,
                rótulo limpo e sabor de comida de verdade. Sem culpa, sem
                improviso de última hora.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-[#FFB100] px-6 text-sm font-semibold text-slate-900 shadow-lg shadow-black/30 hover:bg-[#ffc52f] active:translate-y-[1px]"
                >
                  <a href="#kits">Ver kits disponíveis</a>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/60 bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/15 hover:text-white"
                >
                  <a
                    href="https://wa.me/5581999874547?text=Quero%20saber%20mais%20sobre%20os%20kits%20Sagrado"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Pedir pelo WhatsApp
                  </a>
                </Button>
              </div>

              {/* Bullets rápidos */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-medium text-white/80 sm:text-xs">
                <span>🍕 Pizzas crocantes</span>
                <span>•</span>
                <span>🟣 Coxinhas e dadinhos recheados</span>
                <span>•</span>
                <span>❄️ Ultracongelados, prontos em minutos</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
