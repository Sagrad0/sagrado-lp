"use client"

import Image from "next/image"
import { ScrollReveal } from "@/components/scroll-reveal"
import { Button } from "@/components/ui/button"
import { WhatsappLogo } from "@phosphor-icons/react"

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="relative min-h-[620px] w-full md:min-h-[700px] lg:min-h-[760px]">
        <Image
          src="/images/hero-sagrado-full.jpg"
          alt="Kits Sagrado na mesa: pizzas, dadinhos e coxinhas"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_40%] md:object-[50%_45%]"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/35" />

        <div className="relative z-10">
          <div className="container mx-auto flex min-h-[620px] items-center px-4 pb-20 pt-32 md:min-h-[700px] lg:min-h-[760px]">
            <ScrollReveal className="max-w-md space-y-5 md:max-w-xl">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F4439D]"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
              >
                COMER BEM É SAGRADO
              </p>

              <h1
                className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
              >
                Lanche de verdade, pronto em poucos minutos.
                <span className="mt-1 block text-white/90">
                  Pizza, coxinha, dadinhos e tortinhas sem glúten e sem lactose.
                </span>
              </h1>

              <p
                className="md:max-w-[30rem] text-xs text-white/80 sm:text-sm"
                style={{ textShadow: "0 2px 12px rgba(0,0,0,0.75)" }}
              >
                Kits ultracongelados com rótulo limpo, pensados pra resolver o
                lanche da família sem improviso, sem culpa e sem ingrediente
                estranho.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="default"
                  size="lg"
                  className="rounded-full px-7 text-sm"
                  onClick={() => {
                    const el = document.getElementById("kits")
                    if (el) el.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  Ver kits
                </Button>

                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="rounded-full px-5 text-xs font-medium text-[#128C7E] sm:text-sm"
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
                    Atendimento
                  </a>
                </Button>
              </div>

              <div className="mt-3 inline-flex flex-wrap items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs font-medium text-white/85 sm:text-sm border border-white/20">
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
