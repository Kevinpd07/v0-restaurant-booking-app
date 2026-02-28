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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useAdminStore, type Order } from "@/lib/admin-store"
import { toast } from "sonner"
import Link from "next/link"

const statusConfig: Record<
  Order["status"],
  { label: string; variant: "default" | "secondary" | "outline" | "destructive"; icon: typeof Package }
> = {
  pending: { label: "Pendiente", variant: "secondary", icon: Clock },
  confirmed: { label: "Confirmado", variant: "default", icon: CheckCircle2 },
  preparing: { label: "Preparando", variant: "outline", icon: ChefHat },
  delivered: { label: "Entregado", variant: "default", icon: Truck },
  completed: { label: "Completado", variant: "default", icon: CheckCircle2 },
  cancelled: { label: "Cancelado", variant: "destructive", icon: XCircle },
}

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
      toast.error("Credenciales incorrectas")
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
            Panel de Administración
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Accede con tus credenciales de administrador
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-user">Usuario</Label>
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
            <Label htmlFor="admin-pass">Contraseña</Label>
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
              Usuario o contraseña incorrectos
            </p>
          )}
          <Button type="submit" className="w-full" size="lg">
            Iniciar Sesión
          </Button>
        </form>
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard() {
  const { orders, logout, updateOrderStatus } = useAdminStore()
  const [filter, setFilter] = useState<"all" | "delivery" | "reservation">(
    "all"
  )
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
    <div className="min-h-screen bg-background">
      {/* Admin header */}
      <header className="sticky top-0 z-50 border-b border-border bg-sidebar text-sidebar-foreground">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-3">
            <UtensilsCrossed className="h-6 w-6 text-sidebar-primary" />
            <div>
              <p className="font-serif text-lg font-bold">
                Sabores de Granada
              </p>
              <p className="text-xs text-sidebar-foreground/60">
                Panel de Administración
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
                Ver Web
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-1.5 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <LogOut className="h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            {
              label: "Total Pedidos",
              value: stats.total,
              icon: Package,
            },
            {
              label: "Pendientes",
              value: stats.pending,
              icon: Clock,
            },
            {
              label: "A Domicilio",
              value: stats.delivery,
              icon: Truck,
            },
            {
              label: "Reservas",
              value: stats.reservations,
              icon: CalendarDays,
            },
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
        <div className="mt-8 flex items-center gap-3">
          {(
            [
              { key: "all", label: "Todos" },
              { key: "delivery", label: "Domicilio" },
              { key: "reservation", label: "Reservas" },
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
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  ID
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Cliente
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Restaurante
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Tipo
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Total
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Estado
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Acciones
                </th>
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
                        {order.type === "delivery" ? "Domicilio" : "Reserva"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-semibold text-card-foreground">
                      {order.total > 0
                        ? `${order.total.toFixed(2)} \u20AC`
                        : "-"}
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
                          <span className="sr-only">Ver detalles</span>
                        </Button>
                        <Select
                          value={order.status}
                          onValueChange={(v) => {
                            updateOrderStatus(
                              order.id,
                              v as Order["status"]
                            )
                            toast.success("Estado actualizado")
                          }}
                        >
                          <SelectTrigger className="h-8 w-32 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pendiente</SelectItem>
                            <SelectItem value="confirmed">
                              Confirmado
                            </SelectItem>
                            <SelectItem value="preparing">
                              Preparando
                            </SelectItem>
                            <SelectItem value="delivered">
                              Entregado
                            </SelectItem>
                            <SelectItem value="completed">
                              Completado
                            </SelectItem>
                            <SelectItem value="cancelled">
                              Cancelado
                            </SelectItem>
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
                    No hay pedidos para mostrar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order detail dialog */}
      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Detalle del Pedido
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
                      {selectedOrder.guests} comensales
                    </span>
                  </div>
                )}
              </div>
              {selectedOrder.items.length > 0 && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-card-foreground">
                      Artículos:
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
                          {(item.price * item.quantity).toFixed(2)} &euro;
                        </span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span className="text-card-foreground">Total</span>
                      <span className="text-primary">
                        {selectedOrder.total.toFixed(2)} &euro;
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

export default function AdminPage() {
  const isAuthenticated = useAdminStore((s) => s.isAuthenticated)

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return <AdminDashboard />
}
