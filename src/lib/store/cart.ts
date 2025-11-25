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

// CRITICAL FIX: Remove middleware, use direct storage with SSR safety
const createStore = (): CartState => ({
  items: {},
  
  addItem: (kit, qty) => {
    if (qty <= 0) return
    if (typeof window === 'undefined') return
    
    try {
      const current = JSON.parse(localStorage.getItem('sagrado-cart') || '{}').items || {}
      const newQty = (current[kit.id]?.qty || 0) + qty
      
      const newItems = {
        ...current,
        [kit.id]: { ...kit, qty: newQty }
      }
      
      localStorage.setItem('sagrado-cart', JSON.stringify({ items: newItems }))
    } catch (error) {
      console.warn('Error saving to localStorage:', error)
    }
  },
  
  removeItem: (kitId) => {
    if (typeof window === 'undefined') return
    
    try {
      const current = JSON.parse(localStorage.getItem('sagrado-cart') || '{}').items || {}
      const newItems = { ...current }
      delete newItems[kitId]
      
      localStorage.setItem('sagrado-cart', JSON.stringify({ items: newItems }))
    } catch (error) {
      console.warn('Error removing from localStorage:', error)
    }
  },
  
  updateQty: (kitId, qty) => {
    if (qty <= 0 || typeof window === 'undefined') return
    
    try {
      const current = JSON.parse(localStorage.getItem('sagrado-cart') || '{}').items || {}
      const item = current[kitId]
      
      if (item) {
        const newItems = {
          ...current,
          [kitId]: { ...item, qty }
        }
        
        localStorage.setItem('sagrado-cart', JSON.stringify({ items: newItems }))
      }
    } catch (error) {
      console.warn('Error updating localStorage:', error)
    }
  },
  
  clearCart: () => {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem('sagrado-cart', JSON.stringify({ items: {} }))
    } catch (error) {
      console.warn('Error clearing localStorage:', error)
    }
  },
  
  getTotalItems: () => {
    if (typeof window === 'undefined') return 0
    try {
      const stored = JSON.parse(localStorage.getItem('sagrado-cart') || '{}').items || {}
      return Object.values(stored).reduce((acc: number, item: any) => acc + (item.qty || 0), 0)
    } catch {
      return 0
    }
  },
  
  getSubtotal: () => {
    if (typeof window === 'undefined') return 0
    try {
      const stored = JSON.parse(localStorage.getItem('sagrado-cart') || '{}').items || {}
      return Object.values(stored).reduce((acc: number, item: any) => acc + (item.price * item.qty || 0), 0)
    } catch {
      return 0
    }
  },
  
  getItems: () => {
    if (typeof window === 'undefined') return []
    try {
      return Object.values(JSON.parse(localStorage.getItem('sagrado-cart') || '{}').items || {})
    } catch {
      return []
    }
  }
})

// Use create directly without middleware for SSR safety
export const useCart = create<CartState>(createStore)