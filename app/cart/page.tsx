"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  User,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DeliveryMap } from "@/components/delivery-map"
import { useCartStore } from "@/lib/cart-store"
import { useAdminStore } from "@/lib/admin-store"
import { useMenuStore } from "@/lib/menu-store"
import { toast } from "sonner"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } =
    useCartStore()
  const addOrder = useAdminStore((s) => s.addOrder)
  const restaurants = useMenuStore((s) => s.restaurants)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [, setDeliveryCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [form, setForm] = useState({ name: "", phone: "" })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = getTotal()
  const deliveryFee = total > 0 ? 3.5 : 0
  const finalTotal = total + deliveryFee

  const restaurantId = items[0]?.restaurantId || ""
  const restaurantName =
    restaurants.find((r) => r.id === restaurantId)?.name || ""

  const handleOrder = () => {
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number")
      return
    }
    if (!deliveryAddress) {
      toast.error("Please select your location on the map")
      return
    }

    addOrder({
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      restaurantId,
      restaurantName,
      items: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
      total: finalTotal,
      type: "delivery",
      customerName: form.name,
      customerPhone: form.phone,
      customerAddress: deliveryAddress,
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "pending",
      createdAt: new Date().toISOString(),
    })

    clearCart()
    setOrderPlaced(true)
    toast.success("Order placed successfully")
  }

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Truck className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground">
              Order Confirmed
            </h1>
            <p className="mt-3 text-muted-foreground">
              Your order is on its way. You will receive a notification when it
              is ready. Estimated delivery time: 30-45 minutes.
            </p>
            <Link href="/">
              <Button className="mt-8" size="lg">
                Back to Restaurants
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to restaurants
          </Link>

          <h1 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Your Order
          </h1>

          {items.length === 0 ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingCart className="h-10 w-10 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mt-2 text-muted-foreground">
                Add dishes from one of our restaurants
              </p>
              <Link href="/">
                <Button className="mt-6">Browse Restaurants</Button>
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-5">
              {/* Cart items */}
              <div className="lg:col-span-3">
                <div className="rounded-xl border border-border bg-card p-6">
                  <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-card-foreground">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    {restaurantName}
                  </h2>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-card-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            &euro;{item.price.toFixed(2)} / unit
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Remove one</span>
                          </Button>
                          <span className="w-6 text-center text-sm font-bold text-card-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Add one</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                        <p className="w-20 text-right font-semibold text-card-foreground">
                          &euro;{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-card-foreground">
                      &euro;{total.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Delivery fee
                    </span>
                    <span className="font-medium text-card-foreground">
                      &euro;{deliveryFee.toFixed(2)}
                    </span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between">
                    <span className="font-serif text-lg font-bold text-card-foreground">
                      Total
                    </span>
                    <span className="font-serif text-lg font-bold text-primary">
                      &euro;{finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery form */}
              <div className="lg:col-span-2">
                <div className="space-y-6 rounded-xl border border-border bg-card p-6">
                  <h2 className="flex items-center gap-2 font-serif text-xl font-bold text-card-foreground">
                    <Truck className="h-5 w-5 text-primary" />
                    Delivery Details
                  </h2>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="del-name" className="flex items-center gap-1.5 text-card-foreground">
                        <User className="h-4 w-4 text-primary" />
                        Name
                      </Label>
                      <Input
                        id="del-name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="del-phone" className="flex items-center gap-1.5 text-card-foreground">
                        <Phone className="h-4 w-4 text-primary" />
                        Phone
                      </Label>
                      <Input
                        id="del-phone"
                        type="tel"
                        placeholder="+34 600 000 000"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <DeliveryMap
                    onLocationSelect={(lat, lng, address) => {
                      setDeliveryCoords({ lat, lng })
                      setDeliveryAddress(address)
                    }}
                    selectedAddress={deliveryAddress}
                  />

                  <Button
                    onClick={handleOrder}
                    className="w-full"
                    size="lg"
                  >
                    Confirm Order (&euro;{finalTotal.toFixed(2)})
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
