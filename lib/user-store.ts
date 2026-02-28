import { create } from "zustand"

export interface UserAccount {
  id: string
  name: string
  email: string
  phone: string
  password: string
  createdAt: string
}

interface UserState {
  currentUser: UserAccount | null
  users: UserAccount[]
  authDialogOpen: boolean
  openAuthDialog: () => void
  closeAuthDialog: () => void
  register: (name: string, email: string, phone: string, password: string) => { success: boolean; error?: string }
  login: (email: string, password: string) => { success: boolean; error?: string }
  logout: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUser: null,
  users: [],
  authDialogOpen: false,
  openAuthDialog: () => set({ authDialogOpen: true }),
  closeAuthDialog: () => set({ authDialogOpen: false }),
  register: (name, email, phone, password) => {
    const { users } = get()
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: "An account with this email already exists" }
    }
    const newUser: UserAccount = {
      id: `USR-${Date.now().toString(36).toUpperCase()}`,
      name,
      email: email.toLowerCase(),
      phone,
      password,
      createdAt: new Date().toISOString(),
    }
    set((state) => ({
      users: [...state.users, newUser],
      currentUser: newUser,
      authDialogOpen: false,
    }))
    return { success: true }
  },
  login: (email, password) => {
    const { users } = get()
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }
    set({ currentUser: user, authDialogOpen: false })
    return { success: true }
  },
  logout: () => set({ currentUser: null }),
}))
