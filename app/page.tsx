"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { RestaurantCard } from "@/components/restaurant-card"
import { Footer } from "@/components/footer"
import { MapPin, Truck, CalendarDays } from "lucide-react"
import { useMenuStore } from "@/lib/menu-store"

export default function HomePage() {
  const restaurants = useMenuStore((s) => s.restaurants)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Hero />
      <main className="flex-1">
        {/* Features */}
        <section className="border-b border-border bg-card">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 divide-y divide-border md:grid-cols-3 md:gap-0 md:divide-x md:divide-y-0">
            {[
              {
                icon: Truck,
                title: "Home Delivery",
                desc: "Receive your order in less than 45 minutes",
              },
              {
                icon: CalendarDays,
                title: "Book a Table",
                desc: "Reserve at your favorite restaurants instantly",
              },
              {
                icon: MapPin,
                title: "GPS Location",
                desc: "Share your location for accurate deliveries",
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="flex items-center gap-4 px-6 py-6 lg:px-10"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <feat.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Restaurants */}
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Our Selection
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Restaurants in Granada
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">
              Choose from the best restaurants in the city and enjoy a unique
              culinary experience.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
