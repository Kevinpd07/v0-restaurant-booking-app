"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  ShoppingCart,
  CalendarDays,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MenuItemCard } from "@/components/menu-item-card"
import { ReservationForm } from "@/components/reservation-form"
import { useCartStore } from "@/lib/cart-store"
import type { RestaurantWithMenu } from "@/lib/supabase-data"

export function RestaurantDetail({
  restaurant,
}: {
  restaurant: RestaurantWithMenu
}) {
  const [reservationOpen, setReservationOpen] = useState(false)
  const itemCount = useCartStore((s) => s.getItemCount())

  // Handle hours as either string or JSON
  const hoursText = typeof restaurant.hours === 'string' 
    ? restaurant.hours 
    : restaurant.hours 
      ? `${restaurant.hours.mon || '9-22'}` 
      : 'Call for hours'

  const categories = [...new Set(restaurant.menu.map((m) => m.category))]

  return (
    <main className="flex-1">
      {/* Hero */}
      <div className="relative h-64 overflow-hidden md:h-80 lg:h-96">
        <Image
          src={restaurant.image_url || '/images/hero-granada.jpg'}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-8 lg:px-8">
            <Link
              href="/"
              className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to restaurants
            </Link>
            <h1 className="font-serif text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              {restaurant.name}
            </h1>
            <p className="mt-2 max-w-xl text-primary-foreground/80">
              {restaurant.description}
            </p>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-6 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-1.5 text-sm">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-bold text-card-foreground">
              {restaurant.rating}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {hoursText}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            {restaurant.address}
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            {restaurant.phone}
          </div>
          <div className="ml-auto flex gap-3">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setReservationOpen(true)}
            >
              <CalendarDays className="h-4 w-4" />
              Book a Table
            </Button>
            {itemCount > 0 && (
              <Link href="/cart">
                <Button className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  View Cart ({itemCount})
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Menu */}
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
          Our Menu
        </h2>
        <p className="mt-1 text-muted-foreground">
          Select the dishes you want for your home delivery order
        </p>

        {categories.length > 0 ? (
          <Tabs defaultValue={categories[0]} className="mt-6">
            <TabsList className="flex flex-wrap gap-1 bg-secondary">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="text-sm">
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat} value={cat} className="mt-6">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {restaurant.menu
                    .filter((m) => m.category === cat)
                    .map((item) => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        restaurantId={restaurant.id}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="mt-10 flex flex-col items-center py-16 text-center">
            <p className="text-lg text-muted-foreground">No menu items available yet.</p>
            <p className="mt-1 text-sm text-muted-foreground">The admin can add items from the admin panel.</p>
          </div>
        )}
      </section>

      {/* Reservation Dialog */}
      <Dialog open={reservationOpen} onOpenChange={setReservationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-xl">
              Book a Table - {restaurant.name}
            </DialogTitle>
          </DialogHeader>
          <ReservationForm
            restaurantId={restaurant.id}
            restaurantName={restaurant.name}
            onSuccess={() => setReservationOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </main>
  )
}
