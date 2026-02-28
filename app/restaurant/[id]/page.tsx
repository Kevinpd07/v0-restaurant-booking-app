"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RestaurantDetail } from "./restaurant-detail"
import { useMenuStore } from "@/lib/menu-store"

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const restaurant = useMenuStore((s) => s.getRestaurant(id))
  if (!restaurant) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <RestaurantDetail restaurant={restaurant} />
      <Footer />
    </div>
  )
}
