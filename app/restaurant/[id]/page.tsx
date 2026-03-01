"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { RestaurantDetail } from "./restaurant-detail"
import { getRestaurantById, type RestaurantWithMenu } from "@/lib/supabase-data"

export default function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const [restaurant, setRestaurant] = useState<RestaurantWithMenu | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRestaurant() {
      const data = await getRestaurantById(id)
      setRestaurant(data)
      setLoading(false)
    }
    fetchRestaurant()
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading restaurant...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!restaurant) notFound()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <RestaurantDetail restaurant={restaurant} />
      <Footer />
    </div>
  )
}
