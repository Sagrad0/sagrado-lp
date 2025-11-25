import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Kits } from '@/components/sections/kits'
import { HowItWorks } from '@/components/sections/how-it-works'
import { CartSheet } from '@/components/sections/cart-sheet'

export default function Home() {
  return (
    <>
      <main className="pt-24">
        <Hero />
        <Features />
        <Kits />
        <HowItWorks />
      </main>
      <CartSheet />
    </>
  )
}