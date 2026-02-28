import { create } from "zustand"
import { defaultRestaurants, type Restaurant, type MenuItem } from "./data"

interface MenuState {
  restaurants: Restaurant[]
  getRestaurant: (id: string) => Restaurant | undefined
  addMenuItem: (restaurantId: string, item: MenuItem) => void
  updateMenuItem: (restaurantId: string, itemId: string, updates: Partial<MenuItem>) => void
  deleteMenuItem: (restaurantId: string, itemId: string) => void
  addCategory: (restaurantId: string, category: string) => void
  getCategories: (restaurantId: string) => string[]
}

export const useMenuStore = create<MenuState>((set, get) => ({
  restaurants: defaultRestaurants,
  getRestaurant: (id) => get().restaurants.find((r) => r.id === id),
  addMenuItem: (restaurantId, item) =>
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === restaurantId ? { ...r, menu: [...r.menu, item] } : r
      ),
    })),
  updateMenuItem: (restaurantId, itemId, updates) =>
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === restaurantId
          ? {
              ...r,
              menu: r.menu.map((m) =>
                m.id === itemId ? { ...m, ...updates } : m
              ),
            }
          : r
      ),
    })),
  deleteMenuItem: (restaurantId, itemId) =>
    set((state) => ({
      restaurants: state.restaurants.map((r) =>
        r.id === restaurantId
          ? { ...r, menu: r.menu.filter((m) => m.id !== itemId) }
          : r
      ),
    })),
  addCategory: (_restaurantId, _category) => {
    // categories are derived from menu items, no explicit storage needed
  },
  getCategories: (restaurantId) => {
    const r = get().restaurants.find((r) => r.id === restaurantId)
    if (!r) return []
    return [...new Set(r.menu.map((m) => m.category))]
  },
}))
