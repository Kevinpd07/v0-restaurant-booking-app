"use client"

import { useState } from "react"
import {
  Shield,
  LogOut,
  Package,
  CalendarDays,
  Clock,
  User,
  Phone,
  MapPin,
  ChefHat,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  UtensilsCrossed,
  Plus,
  Pencil,
  Trash2,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminStore, type Order } from "@/lib/admin-store"
import { useMenuStore } from "@/lib/menu-store"
import type { MenuItem } from "@/lib/data"
import { toast } from "sonner"
import Link from "next/link"

const statusConfig: Record<
  Order["status"],
  { label: string; variant: "default" | "secondary" | "outline" | "destructive"; icon: typeof Package }
> = {
  pending: { label: "Pending", variant: "secondary", icon: Clock },
  confirmed: { label: "Confirmed", variant: "default", icon: CheckCircle2 },
  preparing: { label: "Preparing", variant: "outline", icon: ChefHat },
  delivered: { label: "Delivered", variant: "default", icon: Truck },
  completed: { label: "Completed", variant: "default", icon: CheckCircle2 },
  cancelled: { label: "Cancelled", variant: "destructive", icon: XCircle },
}

/* ─── LOGIN ─── */
function LoginForm() {
  const login = useAdminStore((s) => s.login)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(username, password)
    if (!success) {
      setError(true)
      toast.error("Invalid credentials")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your admin credentials
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-user">Username</Label>
            <Input
              id="admin-user"
              placeholder="admin"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError(false)
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-pass">Password</Label>
            <Input
              id="admin-pass"
              type="password"
              placeholder="admin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
            />
          </div>
          {error && (
            <p className="text-sm text-destructive">
              Incorrect username or password
            </p>
          )}
          <Button type="submit" className="w-full" size="lg">
            Sign In
          </Button>
        </form>
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ─── MENU ITEM FORM DIALOG ─── */
function MenuItemFormDialog({
  open,
  onOpenChange,
  restaurantId,
  editItem,
  existingCategories,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  restaurantId: string
  editItem: MenuItem | null
  existingCategories: string[]
}) {
  const { addMenuItem, updateMenuItem } = useMenuStore()
  const [form, setForm] = useState<{
    name: string
    description: string
    price: string
    category: string
    newCategory: string
  }>({
    name: editItem?.name || "",
    description: editItem?.description || "",
    price: editItem?.price?.toString() || "",
    category: editItem?.category || (existingCategories[0] || ""),
    newCategory: "",
  })
  const [useNewCategory, setUseNewCategory] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const category = useNewCategory ? form.newCategory.trim() : form.category
    if (!form.name.trim() || !category || !form.price) {
      toast.error("Please fill in name, category, and price")
      return
    }
    const price = parseFloat(form.price)
    if (isNaN(price) || price <= 0) {
      toast.error("Please enter a valid price")
      return
    }

    if (editItem) {
      updateMenuItem(restaurantId, editItem.id, {
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        category,
      })
      toast.success("Menu item updated")
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now().toString(36)}`,
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        category,
      }
      addMenuItem(restaurantId, newItem)
      toast.success("Menu item added")
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {editItem ? "Edit Menu Item" : "Add Menu Item"}
          </DialogTitle>
          <DialogDescription>
            {editItem
              ? "Update the details of this menu item."
              : "Fill in the details to add a new item to the menu."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Name</Label>
            <Input
              id="item-name"
              placeholder="e.g. Grilled Sirloin"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="item-desc">Description</Label>
            <Textarea
              id="item-desc"
              placeholder="A short description of the dish..."
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-price">Price (&euro;)</Label>
              <Input
                id="item-price"
                type="number"
                step="0.01"
                min="0"
                placeholder="12.50"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              {!useNewCategory ? (
                <div className="flex gap-2">
                  {existingCategories.length > 0 ? (
                    <Select
                      value={form.category}
                      onValueChange={(v) => setForm({ ...form, category: v })}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {existingCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setUseNewCategory(true)}
                    title="Create new category"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="New category name"
                    value={form.newCategory}
                    onChange={(e) =>
                      setForm({ ...form, newCategory: e.target.value })
                    }
                    className="flex-1"
                  />
                  {existingCategories.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setUseNewCategory(false)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editItem ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

/* ─── DELETE CONFIRMATION DIALOG ─── */
function DeleteConfirmDialog({
  open,
  onOpenChange,
  itemName,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemName: string
  onConfirm: () => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Delete Item</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{itemName}&quot;? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* ─── MENU MANAGEMENT TAB ─── */
function MenuManagement() {
  const { restaurants } = useMenuStore()
  const deleteMenuItem = useMenuStore((s) => s.deleteMenuItem)
  const getCategories = useMenuStore((s) => s.getCategories)
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]?.id || "")
  const [formOpen, setFormOpen] = useState(false)
  const [editItem, setEditItem] = useState<MenuItem | null>(null)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  const restaurant = restaurants.find((r) => r.id === selectedRestaurant)
  const categories = restaurant ? getCategories(selectedRestaurant) : []

  const handleEdit = (item: MenuItem) => {
    setEditItem(item)
    setFormOpen(true)
  }

  const handleAdd = () => {
    setEditItem(null)
    setFormOpen(true)
  }

  const handleDelete = (item: MenuItem) => {
    setDeleteTarget({ id: item.id, name: item.name })
    setDeleteOpen(true)
  }

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteMenuItem(selectedRestaurant, deleteTarget.id)
      toast.success("Menu item deleted")
    }
  }

  return (
    <div className="space-y-6">
      {/* Restaurant selector + Add button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Label className="text-sm font-medium text-foreground">Restaurant:</Label>
          <Select value={selectedRestaurant} onValueChange={setSelectedRestaurant}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {restaurants.map((r) => (
                <SelectItem key={r.id} value={r.id}>
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Add Menu Item
        </Button>
      </div>

      {/* Menu items by category */}
      {restaurant && categories.length > 0 ? (
        <div className="space-y-6">
          {categories.map((cat) => {
            const items = restaurant.menu.filter((m) => m.category === cat)
            return (
              <div key={cat} className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <h3 className="font-serif text-lg font-bold text-card-foreground">
                    {cat}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </Badge>
                </div>
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-muted/30"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground">
                          {item.name}
                        </p>
                        <p className="mt-0.5 text-sm text-muted-foreground line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                      <p className="font-serif font-bold text-primary">
                        &euro;{item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleEdit(item)}
                          title="Edit item"
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(item)}
                          title="Delete item"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground">No menu items yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Click &quot;Add Menu Item&quot; to start building the menu for this restaurant.
          </p>
        </div>
      )}

      {/* Form dialog */}
      {formOpen && (
        <MenuItemFormDialog
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open)
            if (!open) setEditItem(null)
          }}
          restaurantId={selectedRestaurant}
          editItem={editItem}
          existingCategories={categories}
        />
      )}

      {/* Delete confirmation */}
      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        itemName={deleteTarget?.name || ""}
        onConfirm={confirmDelete}
      />
    </div>
  )
}

/* ─── ORDERS TAB ─── */
function OrdersManagement() {
  const { orders, updateOrderStatus } = useAdminStore()
  const [filter, setFilter] = useState<"all" | "delivery" | "reservation">("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filtered =
    filter === "all" ? orders : orders.filter((o) => o.type === filter)

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    delivery: orders.filter((o) => o.type === "delivery").length,
    reservations: orders.filter((o) => o.type === "reservation").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total Orders", value: stats.total, icon: Package },
          { label: "Pending", value: stats.pending, icon: Clock },
          { label: "Delivery", value: stats.delivery, icon: Truck },
          { label: "Reservations", value: stats.reservations, icon: CalendarDays },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        {(
          [
            { key: "all", label: "All" },
            { key: "delivery", label: "Delivery" },
            { key: "reservation", label: "Reservations" },
          ] as const
        ).map((f) => (
          <Button
            key={f.key}
            variant={filter === f.key ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Customer</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Restaurant</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Type</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Total</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const sc = statusConfig[order.status]
              return (
                <tr
                  key={order.id}
                  className="border-b border-border last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {order.id}
                  </td>
                  <td className="px-4 py-3 font-medium text-card-foreground">
                    {order.customerName}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {order.restaurantName}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs">
                      {order.type === "delivery" ? "Delivery" : "Reservation"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold text-card-foreground">
                    {order.total > 0 ? `\u20AC${order.total.toFixed(2)}` : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={sc.variant} className="gap-1 text-xs">
                      <sc.icon className="h-3 w-3" />
                      {sc.label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">View details</span>
                      </Button>
                      <Select
                        value={order.status}
                        onValueChange={(v) => {
                          updateOrderStatus(order.id, v as Order["status"])
                          toast.success("Status updated")
                        }}
                      >
                        <SelectTrigger className="h-8 w-32 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="preparing">Preparing</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  No orders to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Order detail dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Order Details
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-mono text-muted-foreground">
                  {selectedOrder.id}
                </span>
                <Badge
                  variant={statusConfig[selectedOrder.status].variant}
                  className="text-xs"
                >
                  {statusConfig[selectedOrder.status].label}
                </Badge>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-card-foreground">
                    {selectedOrder.customerName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {selectedOrder.customerPhone}
                  </span>
                </div>
                {selectedOrder.customerAddress && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {selectedOrder.customerAddress}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">
                    {selectedOrder.date} - {selectedOrder.time}
                  </span>
                </div>
                {selectedOrder.guests && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {selectedOrder.guests} guests
                    </span>
                  </div>
                )}
              </div>
              {selectedOrder.items.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-card-foreground">
                      Items:
                    </p>
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-medium text-card-foreground">
                          &euro;{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span className="text-card-foreground">Total</span>
                      <span className="text-primary">
                        &euro;{selectedOrder.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

/* ─── ADMIN DASHBOARD ─── */
function AdminDashboard() {
  const logout = useAdminStore((s) => s.logout)

  return (
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="sticky top-0 z-50 border-b border-border bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-6 w-6 text-sidebar-primary" />
            <div>
              <p className="font-serif text-lg font-bold">
                Flavors of Granada
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                Admin Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                View Website
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <Tabs defaultValue="orders">
          <TabsList className="mb-6 bg-secondary">
            <TabsTrigger value="orders" className="gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Menu Management
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersManagement />
          </TabsContent>

          <TabsContent value="menu">
            <MenuManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <AdminDashboard />
}
