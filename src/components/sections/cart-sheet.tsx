'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '@/lib/store/cart'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { CheckoutForm } from './checkout-form'
import { toast } from 'sonner'
import { Minus, Plus, Trash, ShoppingCart } from '@phosphor-icons/react'

export function CartSheet() {
  const { items, removeItem, updateQty, getTotalItems, getSubtotal } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <motion.button
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-2xl"
        >
          <ShoppingCart className="h-6 w-6" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-600 text-xs font-bold text-white"
              >
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </SheetTrigger>
      
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-serif">Seu Pedido</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[60vh] mt-6">
          <div className="space-y-4 pr-2">
            {Object.values(items).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 rounded-xl border p-4 transition-all hover:shadow-md"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    {formatPrice(item.price)} x {item.qty}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                    onClick={() => updateQty(item.id, item.qty - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  
                  <span className="w-8 text-center font-semibold">{item.qty}</span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full"
                    onClick={() => updateQty(item.id, item.qty + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      removeItem(item.id)
                      toast.success('🗑️ Item removido', {
                        description: item.name,
                      })
                    }}
                  >
                    <Trash className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>

        <div className="mt-6 border-t pt-6">
          <div className="flex items-center justify-between mb-6">
            <span className="text-lg font-semibold">Subtotal:</span>
            <motion.span
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent"
            >
              {formatPrice(getSubtotal())}
            </motion.span>
          </div>

          <CheckoutForm onSuccess={() => setIsOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}