import { create } from "zustand"
import { 
  getRestaurants, 
  getRestaurantById, 
  addMenuItem as supabaseAddMenuItem,
  updateMenuItem as supabaseUpdateMenuItem,
  deleteMenuItem as supabaseDeleteMenuItem,
  type Restaurant, 
  type MenuItem 
} from "./supabase-data"

interface MenuState {
  restaurants: Restaurant[]
  isLoading: boolean
  error: string | null
  fetchRestaurants: () => Promise<void>
  fetchRestaurantById: (id: string) => Promise<Restaurant | null>
  getRestaurant: (id: string) => Restaurant | undefined
  getCategories: (restaurantId: string) => string[]
  addMenuItem: (restaurantId: string, item: Omit<MenuItem, 'id'>) => Promise<boolean>
  updateMenuItem: (itemId: string, updates: Partial<MenuItem>) => Promise<boolean>
  deleteMenuItem: (restaurantId: string, itemId: string) => Promise<boolean>
}

export const useMenuStore = create<MenuState>((set, get) => ({
  restaurants: [],
  isLoading: false,
  error: null,

  fetchRestaurants: async () => {
    set({ isLoading: true, error: null })
    try {
      const restaurants = await getRestaurants()
      set({ restaurants, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to fetch restaurants', isLoading: false })
    }
  },

  fetchRestaurantById: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const restaurant = await getRestaurantById(id)
      set({ isLoading: false })
      return restaurant
    } catch (error) {
      set({ error: 'Failed to fetch restaurant', isLoading: false })
      return null
    }
  },

  getRestaurant: (id) => get().restaurants.find((r) => r.id === id),
  
  getCategories: (restaurantId) => {
    const restaurant = get().restaurants.find((r) => r.id === restaurantId)
    if (!restaurant || !restaurant.menu) return []
    return [...new Set(restaurant.menu.map((m) => m.category))]
  },

  addMenuItem: async (restaurantId: string, item: Omit<MenuItem, 'id'>) => {
    const result = await supabaseAddMenuItem(restaurantId, item)
    if (result) {
      // Refresh restaurants to get updated menu
      await get().fetchRestaurants()
      return true
    }
    return false
  },

  updateMenuItem: async (itemId: string, updates: Partial<MenuItem>) => {
    const result = await supabaseUpdateMenuItem(itemId, updates)
    if (result) {
      // Refresh restaurants to get updated menu
      await get().fetchRestaurants()
      return true
    }
    return false
  },

  deleteMenuItem: async (restaurantId: string, itemId: string) => {
    const result = await supabaseDeleteMenuItem(itemId)
    if (result) {
      // Refresh restaurants to get updated menu
      await get().fetchRestaurants()
      return true
    }
    return false
  },
}))
