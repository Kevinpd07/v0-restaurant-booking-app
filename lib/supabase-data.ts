import { supabase } from './supabase'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  is_available?: boolean
}

export interface Restaurant {
  id: string
  name: string
  description: string
  cuisine: string
  rating: number
  address: string
  phone: string
  hours: any
  image_url?: string
  lat: number
  lng: number
  menu?: MenuItem[]
}

export interface RestaurantWithMenu extends Restaurant {
  menu: MenuItem[]
}

// Fetch all active restaurants
export async function getRestaurants(): Promise<Restaurant[]> {
  console.log('Fetching restaurants from Supabase...')
  
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('is_active', true)
    .order('rating', { ascending: false })

  if (error) {
    console.error('Error fetching restaurants:', error.message, error.details)
    return []
  }

  console.log('Restaurants fetched:', data?.length || 0)

  // Fetch menu items for each restaurant
  if (data && data.length > 0) {
    const restaurantIds = data.map(r => r.id)
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('*')
      .in('restaurant_id', restaurantIds)
      .eq('is_available', true)

    if (!menuError && menuItems) {
      // Attach menu items to each restaurant
      return data.map(restaurant => ({
        ...restaurant,
        menu: menuItems.filter(m => m.restaurant_id === restaurant.id).map(m => ({
          id: m.id,
          name: m.name,
          description: m.description,
          price: m.price,
          category: m.category,
          image_url: m.image_url
        }))
      })) as Restaurant[]
    }
  }

  return data || []
}

// Fetch restaurant by ID with menu
export async function getRestaurantById(restaurantId: string): Promise<RestaurantWithMenu | null> {
  // Fetch restaurant
  const { data: restaurant, error: restaurantError } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single()

  if (restaurantError || !restaurant) {
    console.error('Error fetching restaurant:', restaurantError)
    return null
  }

  // Fetch menu items
  const { data: menuItems, error: menuError } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('is_available', true)
    .order('category', { ascending: true })

  if (menuError) {
    console.error('Error fetching menu items:', menuError)
  }

  return {
    ...restaurant,
    menu: menuItems || []
  }
}

// Fetch all menu items for a restaurant
export async function getMenuItems(restaurantId: string): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .eq('is_available', true)
    .order('category', { ascending: true })

  if (error) {
    console.error('Error fetching menu items:', error)
    return []
  }

  return data || []
}

// Search restaurants by name or cuisine
export async function searchRestaurants(query: string): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('is_active', true)
    .or(`name.ilike.%${query}%,cuisine.ilike.%${query}%`)
    .order('rating', { ascending: false })

  if (error) {
    console.error('Error searching restaurants:', error)
    return []
  }

  return data || []
}

// Menu Item CRUD operations
export async function addMenuItem(restaurantId: string, item: Omit<MenuItem, 'id'>): Promise<MenuItem | null> {
  console.log('Adding menu item:', { restaurantId, item })
  
  const { data, error } = await supabase
    .from('menu_items')
    .insert({
      restaurant_id: restaurantId,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      image_url: item.image_url,
      is_available: true,
    })
    .select()
    .single()

  if (error) {
    console.error('Error adding menu item:', error.message, error.details)
    return null
  }

  return data
}

export async function updateMenuItem(itemId: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
  const { data, error } = await supabase
    .from('menu_items')
    .update({
      name: updates.name,
      description: updates.description,
      price: updates.price,
      category: updates.category,
      image_url: updates.image_url,
      is_available: updates.is_available,
    })
    .eq('id', itemId)
    .select()
    .single()

  if (error) {
    console.error('Error updating menu item:', error)
    return null
  }

  return data
}

export async function deleteMenuItem(itemId: string): Promise<boolean> {
  const { error } = await supabase
    .from('menu_items')
    .delete()
    .eq('id', itemId)

  if (error) {
    console.error('Error deleting menu item:', error)
    return false
  }

  return true
}
