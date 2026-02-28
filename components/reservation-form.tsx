"use client"

import { useState } from "react"
import { CalendarDays, Clock, Users, User, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAdminStore } from "@/lib/admin-store"
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
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.date || !form.time) {
      toast.error("Por favor, completa todos los campos")
      return
    }

    addOrder({
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      restaurantId,
      restaurantName,
      items: [],
      total: 0,
      type: "reservation",
      customerName: form.name,
      customerPhone: form.phone,
      date: form.date,
      time: form.time,
      guests: parseInt(form.guests),
      status: "confirmed",
      createdAt: new Date().toISOString(),
    })

    toast.success("Reserva confirmada con éxito")
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="res-name" className="flex items-center gap-1.5 text-card-foreground">
          <User className="h-4 w-4 text-primary" />
          Nombre
        </Label>
        <Input
          id="res-name"
          placeholder="Tu nombre completo"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="res-phone" className="flex items-center gap-1.5 text-card-foreground">
          <Phone className="h-4 w-4 text-primary" />
          Teléfono
        </Label>
        <Input
          id="res-phone"
          type="tel"
          placeholder="+34 600 000 000"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="res-date" className="flex items-center gap-1.5 text-card-foreground">
            <CalendarDays className="h-4 w-4 text-primary" />
            Fecha
          </Label>
          <Input
            id="res-date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-time" className="flex items-center gap-1.5 text-card-foreground">
            <Clock className="h-4 w-4 text-primary" />
            Hora
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
        <Label htmlFor="res-guests" className="flex items-center gap-1.5 text-card-foreground">
          <Users className="h-4 w-4 text-primary" />
          Comensales
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
        Confirmar Reserva
      </Button>
    </form>
  )
}
