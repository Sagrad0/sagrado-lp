import { Leaf, CheckCircle, Clock } from '@phosphor-icons/react'
import { ScrollReveal } from '@/components/scroll-reveal'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3">
          <ScrollReveal>
            <FeatureCard 
              icon={<Leaf weight="fill" />}
              title="Rótulo limpo"
              description="Ingredientes de verdade, sem firula, que você reconhece, sabe pronunciar e confia."
            />
          </ScrollReveal>
          <ScrollReveal>
            <FeatureCard 
              icon={<CheckCircle weight="fill" />}
              title="Sem glúten / sem lactose"
              description="Linha pensada pra quem precisa cuidar das restrições, com opções claramente identificadas no rótulo."
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
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-xl">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-purple-200 text-purple-600 transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 font-serif text-lg font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  )
}