"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[620px] w-full md:min-h-[700px] lg:min-h-[760px]">
        {/* IMAGEM DE FUNDO */}
        <Image
          src="/images/hero-sagrado-full.jpg"
          alt="Kits Sagrado na mesa: pizzas, dadinhos e coxinhas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%] md:object-[50%_45%]"
        />

        {/* OVERLAY */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/78 via-black/50 to-black/10" />

        {/* CONTEÚDO */}
        <div className="relative z-10">
          <div className="container mx-auto flex min-h-[620px] items-center px-4 pb-20 pt-32 md:min-h-[700px] lg:min-h-[760px]">
            <ScrollReveal className="max-w-md space-y-5 md:max-w-xl">
              {/* Eyebrow */}
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FFB100]">
                SAGRADO • COMER BEM É SAGRADO
              </p>

              {/* Título */}
              <h1 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
                Lanche de verdade, pronto em poucos minutos.
                <span className="mt-1 block text-white/90">
                  Pizza, coxinha e dadinho sem glúten e sem lactose.
                </span>
              </h1>

              {/* Subtexto */}
              <p className="md:max-w-[30rem] text-xs text-white/80 sm:text-sm">
                Kits ultracongelados com rótulo limpo, pensados pra resolver o
                lanche da família sem improviso, sem culpa e sem ingrediente
                estranho.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* CTA principal: Ver kits */}
                <Button
                  size="lg"
                  className="
                    rounded-full bg-gradient-to-r from-[#F4439D] via-[#E0006E] to-[#6C2DC7]
                    px-7 text-sm
                    shadow-[0_18px_40px_rgba(0,0,0,0.6)]
                    hover:brightness-110 hover:shadow-[0_22px_52px_rgba(0,0,0,0.75)]
                    active:translate-y-[1px]
                  "
                  onClick={() => {
                    const el = document.getElementById("kits")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Ver kits disponíveis
                </Button>

                {/* CTA secundário: WhatsApp – pill branca/verde */}
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="
                    rounded-full bg-white/92 px-5 text-xs font-medium text-[#128C7E] sm:text-sm
                    shadow-[0_14px_36px_rgba(0,0,0,0.55)]
                    hover:bg-white hover:-translate-y-[1px]
                    active:translate-y-[1px]
                  "
                >
                  <a
                    href="https://wa.me/5581999874547?text=Quero%20tirar%20d%C3%BAvidas%20sobre%20os%20kits%20Sagrado"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <WhatsappLogo
                      className="h-4 w-4 text-[#25D366]"
                      weight="fill"
                    />
                    Atendimento WhatsApp
                  </a>
                </Button>
              </div>

              {/* Chips de benefício */}
              <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-black/35 px-3 py-1 text-[10px] font-medium text-white/85 sm:text-xs">
                <span>🍕 Pizzas crocantes</span>
                <span className="hidden sm:inline">•</span>
                <span>🟣 Coxinhas e dadinhos recheados</span>
                <span className="hidden sm:inline">•</span>
                <span>❄️ Ultracongelados, prontos em minutos</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
