import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Validate that environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Type definitions for better TypeScript support
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          role: 'customer' | 'admin' | 'restaurant_owner'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin' | 'restaurant_owner'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          role?: 'customer' | 'admin' | 'restaurant_owner'
          created_at?: string
        }
      }
      restaurants: {
        Row: {
          id: string
          owner_id: string | null
          name: string
          description: string | null
          cuisine: string | null
          address: string | null
          phone: string | null
          hours: Json
          location: unknown | null
          rating: number
          image_url: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          owner_id?: string | null
          name: string
          description?: string | null
          cuisine?: string | null
          address?: string | null
          phone?: string | null
          hours?: Json
          location?: unknown | null
          rating?: number
          image_url?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          owner_id?: string | null
          name?: string
          description?: string | null
          cuisine?: string | null
          address?: string | null
          phone?: string | null
          hours?: Json
          location?: unknown | null
          rating?: number
          image_url?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      tables: {
        Row: {
          id: string
          restaurant_id: string | null
          table_number: number
          capacity: number
          is_available: boolean
        }
        Insert: {
          id?: string
          restaurant_id?: string | null
          table_number: number
          capacity: number
          is_available?: boolean
        }
        Update: {
          id?: string
          restaurant_id?: string | null
          table_number?: number
          capacity?: number
          is_available?: boolean
        }
      }
      reservations: {
        Row: {
          id: string
          user_id: string | null
          restaurant_id: string | null
          table_id: string | null
          reservation_date: string
          reservation_time: string
          party_size: number
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          restaurant_id?: string | null
          table_id?: string | null
          reservation_date: string
          reservation_time: string
          party_size: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          restaurant_id?: string | null
          table_id?: string | null
          reservation_date?: string
          reservation_time?: string
          party_size?: number
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          special_requests?: string | null
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          restaurant_id: string | null
          name: string
          description: string | null
          price: number
          category: string | null
          image_url: string | null
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          restaurant_id?: string | null
          name: string
          description?: string | null
          price: number
          category?: string | null
          image_url?: string | null
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          restaurant_id?: string | null
          name?: string
          description?: string | null
          price?: number
          category?: string | null
          image_url?: string | null
          is_available?: boolean
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          restaurant_id: string | null
          status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_address: string | null
          delivery_notes: string | null
          payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          restaurant_id?: string | null
          status?: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
          total_amount: number
          delivery_address?: string | null
          delivery_notes?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          restaurant_id?: string | null
          status?: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
          total_amount?: number
          delivery_address?: string | null
          delivery_notes?: string | null
          payment_status?: 'pending' | 'paid' | 'failed' | 'refunded'
          payment_method?: string | null
          created_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          menu_item_id: string | null
          quantity: number
          unit_price: number
          subtotal: number
        }
        Insert: {
          id?: string
          order_id?: string | null
          menu_item_id?: string | null
          quantity: number
          unit_price: number
          subtotal: number
        }
        Update: {
          id?: string
          order_id?: string | null
          menu_item_id?: string | null
          quantity?: number
          unit_price?: number
          subtotal?: number
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
    CompositeTypes: {}
  }
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]
