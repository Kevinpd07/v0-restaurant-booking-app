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
  LogIn,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthDialog } from "@/components/auth-dialog"
import { DeliveryMap } from "@/components/delivery-map"
import { useCartStore } from "@/lib/cart-store"
import { useAdminStore } from "@/lib/admin-store"
import { useMenuStore } from "@/lib/menu-store"
import { useUserStore } from "@/lib/user-store"
import { toast } from "sonner"

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart, getTotal } =
    useCartStore()
  const addOrder = useAdminStore((s) => s.addOrder)
  const restaurants = useMenuStore((s) => s.restaurants)
  const currentUser = useUserStore((s) => s.currentUser)
  const openAuthDialog = useUserStore((s) => s.openAuthDialog)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [, setDeliveryCoords] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [phone, setPhone] = useState("")
  const [orderPlaced, setOrderPlaced] = useState(false)

  const total = getTotal()
  const deliveryFee = total > 0 ? 3.5 : 0
  const finalTotal = total + deliveryFee

  const restaurantId = items[0]?.restaurantId || ""
  const restaurantName =
    restaurants.find((r) => r.id === restaurantId)?.name || ""

  const handleOrder = () => {
    if (!currentUser) {
      openAuthDialog()
      return
    }
    const customerPhone = phone || currentUser.phone
    if (!customerPhone) {
      toast.error("Please enter your phone number")
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
      customerName: currentUser.name,
      customerPhone,
      customerEmail: currentUser.email,
      customerAddress: deliveryAddress,
      userId: currentUser.id,
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
    toast.success("Order placed successfully!")
  }

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <AuthDialog />
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
      <AuthDialog />
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

                  {currentUser ? (
                    <div className="space-y-4">
                      {/* Show logged-in user info */}
                      <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-card-foreground">
                            {currentUser.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="del-phone"
                          className="flex items-center gap-1.5 text-card-foreground"
                        >
                          <Phone className="h-4 w-4 text-primary" />
                          Phone
                        </Label>
                        <Input
                          id="del-phone"
                          type="tel"
                          placeholder={currentUser.phone || "+34 600 000 000"}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        {currentUser.phone && !phone && (
                          <p className="text-xs text-muted-foreground">
                            Will use your account phone: {currentUser.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-border py-8 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                        <User className="h-7 w-7 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">
                          Sign in to place your order
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Your orders will be linked to your account
                        </p>
                      </div>
                      <Button
                        onClick={openAuthDialog}
                        className="gap-2"
                      >
                        <LogIn className="h-4 w-4" />
                        Sign In / Register
                      </Button>
                    </div>
                  )}

                  {currentUser && (
                    <>
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
                    </>
                  )}
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
