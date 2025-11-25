import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Kit } from '@/lib/constants/kits'

export interface CartItem extends Kit {
  qty: number
}

interface CartState {
  items: Record<string, CartItem>
  addItem: (kit: Kit, qty: number) => void
  removeItem: (kitId: string) => void
  updateQty: (kitId: string, qty: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getSubtotal: () => number
  getItems: () => CartItem[]
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},
      
      addItem: (kit, qty) => {
        if (qty <= 0) return
        const current = get().items[kit.id]
        const newQty = (current?.qty || 0) + qty
        
        set({
          items: {
            ...get().items,
            [kit.id]: { ...kit, qty: newQty }
          }
        })
      },
      
      removeItem: (kitId) => {
        const items = { ...get().items }
        delete items[kitId]
        set({ items })
      },
      
      updateQty: (kitId, qty) => {
        if (qty <= 0) {
          get().removeItem(kitId)
          return
        }
        
        const item = get().items[kitId]
        if (item) {
          set({
            items: {
              ...get().items,
              [kitId]: { ...item, qty }
            }
          })
        }
      },
      
      clearCart: () => set({ items: {} }),
      
      getTotalItems: () => 
        Object.values(get().items).reduce((acc, item) => acc + item.qty, 0),
      
      getSubtotal: () =>
        Object.values(get().items).reduce((acc, item) => acc + item.price * item.qty, 0),
      
      getItems: () => Object.values(get().items)
    }),
    {
      name: 'sagrado-cart'
    }
  )
)