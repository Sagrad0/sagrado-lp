"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { toast } from 'sonner'
import { Minus, Plus, Trash, ShoppingCart } from '@phosphor-icons/react'
import { CheckoutForm } from './checkout-form'

const MotionButton = motion(Button)

export function CartSheet() {
  const { items, removeItem, updateQty, getTotalItems, getSubtotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = getTotalItems()
  const subtotal = getSubtotal()

  const hasItems = totalItems > 0

  const handleDecrement = (id: string, currentQty: number) => {
    const next = currentQty - 1
    updateQty(id, next)
  }

  const handleIncrement = (id: string, currentQty: number) => {
    const next = currentQty + 1
    updateQty(id, next)
  }

  const handleOpenChange = (open: boolean) => {
    if (!hasItems && open) {
      toast.info('Adicione pelo menos um kit antes de abrir o carrinho.')
      return
    }
    setIsOpen(open)
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <MotionButton
          type="button"
          variant="secondary"
          size="lg"
          className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 shadow-lg md:bottom-6 md:right-6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.4,
          }}
        >
          <ShoppingCart className="h-6 w-6" weight="bold" />
          <AnimatePresence>
            {hasItems && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-full bg-[#6C2DC7] px-1.5 text-xs font-semibold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </MotionButton>
      </SheetTrigger>

      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Seu carrinho</SheetTitle>
        </SheetHeader>

        {!hasItems ? (
          <div className="mt-8 text-center text-sm text-gray-500">
            Seu carrinho está vazio. Escolha um kit e clique em “Adicionar ao
            carrinho”.
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            <div>
              <ScrollArea className="max-h-64 pr-2">
                <div className="space-y-4">
                  {Object.values(items).map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatPrice(item.price)} / kit
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            handleDecrement(item.id, item.quantity)
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="min-w-[1.5rem] text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            handleIncrement(item.id, item.quantity)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="mt-4 rounded-xl bg-gray-50 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  O valor final pode ajustar conforme frete ou condição combinada
                  com o atendimento.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Dados pra finalizar seu pedido
              </h3>
              <CheckoutForm />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
