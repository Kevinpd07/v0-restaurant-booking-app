"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin, Locate } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DeliveryMapProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void
  selectedAddress: string
}

export function DeliveryMap({
  onLocationSelect,
  selectedAddress,
}: DeliveryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markerRef = useRef<L.Marker | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import("leaflet")).default
      await import("leaflet/dist/leaflet.css")

      const map = L.map(mapRef.current!, {
        center: [37.176, -3.5988],
        zoom: 14,
      })

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map)

      const customIcon = L.divIcon({
        html: `<div style="background:#c0392b;width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        className: "",
      })

      map.on("click", (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng
        if (markerRef.current) {
          markerRef.current.setLatLng([lat, lng])
        } else {
          markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(
            map
          )
        }
        onLocationSelect(
          lat,
          lng,
          `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)} - Granada`
        )
      })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLocate = () => {
    if (!navigator.geolocation) return
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        const L = (await import("leaflet")).default

        const customIcon = L.divIcon({
          html: `<div style="background:#c0392b;width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3);"></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          className: "",
        })

        if (mapInstanceRef.current) {
          mapInstanceRef.current.setView([latitude, longitude], 16)
          if (markerRef.current) {
            markerRef.current.setLatLng([latitude, longitude])
          } else {
            markerRef.current = L.marker([latitude, longitude], {
              icon: customIcon,
            }).addTo(mapInstanceRef.current)
          }
          onLocationSelect(
            latitude,
            longitude,
            `My location: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          )
        }
        setLoading(false)
      },
      () => {
        setLoading(false)
      }
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-card-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          Select your location on the map
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleLocate}
          disabled={loading}
          className="gap-1.5"
        >
          <Locate className="h-4 w-4" />
          {loading ? "Locating..." : "My location"}
        </Button>
      </div>
      <div
        ref={mapRef}
        className="h-64 w-full overflow-hidden rounded-lg border border-border md:h-80"
      />
      {selectedAddress && (
        <p className="rounded-md bg-secondary px-3 py-2 text-sm text-secondary-foreground">
          <span className="font-medium">Address:</span> {selectedAddress}
        </p>
      )}
    </div>
  )
}
