"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin } from "lucide-react"
import type { Restaurant } from "@/lib/supabase-data"

export function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  // Handle hours as either string or JSON
  const hoursText = typeof restaurant.hours === 'string' 
    ? restaurant.hours 
    : restaurant.hours 
      ? `${restaurant.hours.mon || '9-22'}` 
      : 'Call for hours'

  return (
    <Link href={`/restaurant/${restaurant.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={restaurant.image_url || '/images/hero-granada.jpg'}
            alt={restaurant.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
              {restaurant.cuisine}
            </span>
          </div>
        </div>
        <div className="p-5">
          <h3 className="font-serif text-xl font-bold text-card-foreground transition-colors group-hover:text-primary">
            {restaurant.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {restaurant.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold text-card-foreground">
                {restaurant.rating}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{hoursText}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{restaurant.address?.split(",")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
