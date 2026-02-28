import { create } from "zustand"
import type { MenuItem } from "./data"

export interface CartItem extends MenuItem {
  quantity: number
  restaurantId: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: MenuItem, restaurantId: string) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (item, restaurantId) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return {
        items: [...state.items, { ...item, quantity: 1, restaurantId }],
      }
    })
  },
  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    }))
  },
  updateQuantity: (itemId, quantity) => {
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.id !== itemId)
          : state.items.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
    }))
  },
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },
  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))
