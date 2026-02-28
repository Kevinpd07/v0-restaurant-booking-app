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
  customerAddress?: string
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
        { name: "Habas con Jamón", quantity: 2, price: 12.5 },
        { name: "Paella Nazarí", quantity: 1, price: 22.0 },
      ],
      total: 47.0,
      type: "delivery",
      customerName: "María García",
      customerPhone: "+34 612 345 678",
      customerAddress: "Calle Gran Vía, 45, Granada",
      date: "2026-02-28",
      time: "14:00",
      status: "preparing",
      createdAt: "2026-02-28T12:30:00",
    },
    {
      id: "ORD-002",
      restaurantId: "el-carmen-del-albaicin",
      restaurantName: "El Carmen del Albaicín",
      items: [
        { name: "Croquetas de Jamón Ibérico", quantity: 3, price: 9.0 },
        { name: "Rabo de Toro Estofado", quantity: 2, price: 19.0 },
      ],
      total: 65.0,
      type: "reservation",
      customerName: "Carlos López",
      customerPhone: "+34 678 901 234",
      date: "2026-03-01",
      time: "21:00",
      guests: 4,
      status: "confirmed",
      createdAt: "2026-02-27T18:15:00",
    },
    {
      id: "ORD-003",
      restaurantId: "mirador-de-san-nicolas",
      restaurantName: "Mirador de San Nicolás",
      items: [
        { name: "Tartar de Atún Rojo", quantity: 1, price: 16.0 },
        { name: "Magret de Pato", quantity: 1, price: 23.0 },
        { name: "Coulant de Chocolate", quantity: 2, price: 9.0 },
      ],
      total: 57.0,
      type: "delivery",
      customerName: "Ana Martínez",
      customerPhone: "+34 654 321 987",
      customerAddress: "Avenida de la Constitución, 22, Granada",
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
