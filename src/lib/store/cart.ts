import { create } from 'zustand'
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

// Store simplificado para evitar uso de Context API no SSR
export const useCart = create<CartState>((set, get) => ({
  items: {},

  addItem: (kit, qty) => {
    if (qty <= 0) return
    if (typeof window === 'undefined') return

    try {
      const current = get().items || {}
      const newQty = (current[kit.id]?.qty || 0) + qty

      const newItems = {
        ...current,
        [kit.id]: { ...kit, qty: newQty },
      }

      set({ items: newItems })
      localStorage.setItem('sagrado-cart', JSON.stringify({ items: newItems }))
    } catch (error) {
      console.warn('Error saving to localStorage:', error)
    }
  },

  removeItem: (kitId) => {
    if (typeof window === 'undefined') return

    try {
      const current = get().items || {}
      const newItems = { ...current }
      delete newItems[kitId]

      set({ items: newItems })
      localStorage.setItem('sagrado-cart', JSON.stringify({ items: newItems }))
    } catch (error) {
      console.warn('Error removing from localStorage:', error)
    }
  },

  updateQty: (kitId, qty) => {
    if (qty <= 0 || typeof window === 'undefined') return

    try {
      const current = get().items || {}
      const item = current[kitId]
      if (item) {
        const newItems = {
          ...current,
          [kitId]: { ...item, qty },
        }
        set({ items: newItems })
        localStorage.setItem('sagrado-cart', JSON.stringify({ items: newItems }))
      }
    } catch (error) {
      console.warn('Error updating localStorage:', error)
    }
  },

  clearCart: () => {
    if (typeof window === 'undefined') return

    try {
      set({ items: {} })
      localStorage.setItem('sagrado-cart', JSON.stringify({ items: {} }))
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
  },

  getTotalItems: () => {
    const items = get().items || {}
    return Object.values(items).reduce((acc: number, item: any) => acc + (item.qty || 0), 0)
  },

  getSubtotal: () => {
    const items = get().items || {}
    return Object.values(items).reduce(
      (acc: number, item: any) => acc + (item.price * item.qty || 0),
      0,
    )
  },

  getItems: () => {
    const items = get().items || {}
    return Object.values(items)
  },
}))
