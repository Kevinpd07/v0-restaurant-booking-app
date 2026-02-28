"use client"

import { useState } from "react"
import { CalendarDays, Clock, Users, Phone, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdminStore } from "@/lib/admin-store"
import { useUserStore } from "@/lib/user-store"
import { toast } from "sonner"

interface ReservationFormProps {
  restaurantId: string
  restaurantName: string
  onSuccess: () => void
}

export function ReservationForm({
  restaurantId,
  restaurantName,
  onSuccess,
}: ReservationFormProps) {
  const addOrder = useAdminStore((s) => s.addOrder)
  const currentUser = useUserStore((s) => s.currentUser)
  const openAuthDialog = useUserStore((s) => s.openAuthDialog)
  const [form, setForm] = useState({
    phone: "",
    date: "",
    time: "",
    guests: "2",
  })

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center gap-4 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          Please sign in to make a reservation
        </p>
        <Button onClick={openAuthDialog} className="gap-2">
          <LogIn className="h-4 w-4" />
          Sign In / Register
        </Button>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.date || !form.time) {
      toast.error("Please fill in all fields")
      return
    }

    const customerPhone = form.phone || currentUser.phone

    addOrder({
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      restaurantId,
      restaurantName,
      items: [],
      total: 0,
      type: "reservation",
      customerName: currentUser.name,
      customerPhone,
      customerEmail: currentUser.email,
      userId: currentUser.id,
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    })

    toast.success("Reservation confirmed successfully!")
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* User info */}
      <div className="flex items-center gap-3 rounded-lg border border-border bg-secondary/50 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
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
          htmlFor="res-phone"
          className="flex items-center gap-1.5 text-card-foreground"
        >
          <Phone className="h-4 w-4 text-primary" />
          Phone
        </Label>
        <Input
          id="res-phone"
          type="tel"
          placeholder={currentUser.phone || "+34 600 000 000"}
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        {currentUser.phone && !form.phone && (
          <p className="text-xs text-muted-foreground">
            Will use your account phone: {currentUser.phone}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label
            htmlFor="res-date"
            className="flex items-center gap-1.5 text-card-foreground"
          >
            <CalendarDays className="h-4 w-4 text-primary" />
            Date
          </Label>
          <Input
            id="res-date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="res-time"
            className="flex items-center gap-1.5 text-card-foreground"
          >
            <Clock className="h-4 w-4 text-primary" />
            Time
          </Label>
          <Input
            id="res-time"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label
          htmlFor="res-guests"
          className="flex items-center gap-1.5 text-card-foreground"
        >
          <Users className="h-4 w-4 text-primary" />
          Guests
        </Label>
        <Input
          id="res-guests"
          type="number"
          min="1"
          max="20"
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: e.target.value })}
        />
      </div>
      <Button type="submit" className="w-full" size="lg">
        Confirm Reservation
      </Button>
    </form>
  )
}
