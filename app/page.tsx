import { restaurants } from "@/lib/data"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { RestaurantCard } from "@/components/restaurant-card"
import { Footer } from "@/components/footer"
import { MapPin, Truck, CalendarDays } from "lucide-react"

export default function HomePage() {
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
                title: "Envío a Domicilio",
                desc: "Recibe tu pedido en menos de 45 minutos",
              },
              {
                icon: CalendarDays,
                title: "Reserva Mesa",
                desc: "Reserva en tus restaurantes favoritos al instante",
              },
              {
                icon: MapPin,
                title: "Ubicación GPS",
                desc: "Comparte tu ubicación para entregas precisas",
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
              Nuestra selección
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl text-balance">
              Restaurantes en Granada
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground text-pretty">
              Elige entre los mejores restaurantes de la ciudad y disfruta de
              una experiencia gastronómica única.
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
