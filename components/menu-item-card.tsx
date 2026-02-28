"use client"

import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/cart-store"
import type { MenuItem } from "@/lib/data"
import { toast } from "sonner"

export function MenuItemCard({
  item,
  restaurantId,
}: {
  item: MenuItem
  restaurantId: string
}) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore()
  const cartItem = items.find((i) => i.id === item.id)
  const quantity = cartItem?.quantity || 0

  const handleAdd = () => {
    const otherRestaurant = items.find(
      (i) => i.restaurantId !== restaurantId
    )
    if (otherRestaurant) {
      toast.error(
        "Solo puedes pedir de un restaurante a la vez. Vacía el carrito primero."
      )
      return
    }
    addItem(item, restaurantId)
    toast.success(`${item.name} añadido al carrito`)
  }

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary/50">
      <div className="flex-1">
        <h4 className="font-semibold text-card-foreground">{item.name}</h4>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {item.description}
        </p>
        <p className="mt-2 font-serif text-lg font-bold text-primary">
          {item.price.toFixed(2)} &euro;
        </p>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2">
        {quantity > 0 ? (
          <>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() =>
                quantity === 1
                  ? removeItem(item.id)
                  : updateQuantity(item.id, quantity - 1)
              }
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Quitar uno</span>
            </Button>
            <span className="w-6 text-center text-sm font-bold text-card-foreground">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={handleAdd}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Añadir uno</span>
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            className="gap-1"
            onClick={handleAdd}
          >
            <Plus className="h-4 w-4" />
            Añadir
          </Button>
        )}
      </div>
    </div>
  )
}
