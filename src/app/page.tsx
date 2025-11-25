import { Hero } from '@/components/sections/hero'
import { Features } from '@/components/sections/features'
import { Kits } from '@/components/sections/kits'
import { HowItWorks } from '@/components/sections/how-it-works'
import dynamic from 'next/dynamic'

// CartSheet is loaded dynamically to avoid SSR issues with Zustand
const CartSheet = dynamic(
  () => import('@/components/sections/cart-sheet').then(mod => ({ default: mod.CartSheet })),
  { ssr: false }
)

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
