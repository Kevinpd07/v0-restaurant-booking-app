import { create } from "zustand"

export interface Order {
  id: string
  restaurantId: string
  restaurantName: string
  items: { name: string; quantity: number; price: number }[]
  total: number
  type: "delivery" | "reservation"
  customerName: string
  customerPhone: string
  customerEmail?: string
  customerAddress?: string
  userId?: string
  date: string
  time: string
  guests?: number
  status: "pending" | "confirmed" | "preparing" | "delivered" | "completed" | "cancelled"
  createdAt: string
}

interface AdminState {
  isAuthenticated: boolean
  orders: Order[]
  login: (username: string, password: string) => boolean
  logout: () => void
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  orders: [
    {
      id: "ORD-001",
      restaurantId: "la-alhambra-dorada",
      restaurantName: "La Alhambra Dorada",
      items: [
        { name: "Broad Beans with Ham", quantity: 2, price: 12.5 },
        { name: "Nazari Paella", quantity: 1, price: 22.0 },
      ],
      total: 47.0,
      type: "delivery",
      customerName: "Maria Garcia",
      customerPhone: "+34 612 345 678",
      customerEmail: "maria@example.com",
      customerAddress: "Calle Gran Via, 45, Granada",
      userId: "USR-DEMO1",
      date: "2026-02-28",
      time: "14:00",
      status: "preparing",
      createdAt: "2026-02-28T12:30:00",
    },
    {
      id: "ORD-002",
      restaurantId: "el-carmen-del-albaicin",
      restaurantName: "El Carmen del Albaicin",
      items: [
        { name: "Iberian Ham Croquettes", quantity: 3, price: 9.0 },
        { name: "Oxtail Stew", quantity: 2, price: 19.0 },
      ],
      total: 65.0,
      type: "reservation",
      customerName: "Carlos Lopez",
      customerPhone: "+34 678 901 234",
      customerEmail: "carlos@example.com",
      userId: "USR-DEMO2",
      date: "2026-03-01",
      time: "21:00",
      guests: 4,
      status: "confirmed",
      createdAt: "2026-02-27T18:15:00",
    },
    {
      id: "ORD-003",
      restaurantId: "mirador-de-san-nicolas",
      restaurantName: "Mirador de San Nicolas",
      items: [
        { name: "Red Tuna Tartare", quantity: 1, price: 16.0 },
        { name: "Duck Breast Magret", quantity: 1, price: 23.0 },
        { name: "Chocolate Lava Cake", quantity: 2, price: 9.0 },
      ],
      total: 57.0,
      type: "delivery",
      customerName: "Ana Martinez",
      customerPhone: "+34 654 321 987",
      customerEmail: "ana@example.com",
      customerAddress: "Avenida de la Constitucion, 22, Granada",
      userId: "USR-DEMO3",
      date: "2026-02-28",
      time: "20:30",
      status: "pending",
      createdAt: "2026-02-28T19:45:00",
    },
  ],
  login: (username, password) => {
    if (username === "admin" && password === "admin") {
      set({ isAuthenticated: true })
      return true
    }
    return false
  },
  logout: () => set({ isAuthenticated: false }),
  addOrder: (order) =>
    set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
    })),
}))
