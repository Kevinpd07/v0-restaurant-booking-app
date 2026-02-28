import { restaurants } from "@/lib/data"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RestaurantDetail } from "./restaurant-detail"

export function generateStaticParams() {
  return restaurants.map((r) => ({ id: r.id }))
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const restaurant = restaurants.find((r) => r.id === id)
  if (!restaurant) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <RestaurantDetail restaurant={restaurant} />
      <Footer />
    </div>
  )
}
