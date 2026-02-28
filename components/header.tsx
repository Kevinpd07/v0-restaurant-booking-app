"use client"

import Link from "next/link"
import { UtensilsCrossed, ShoppingCart, Shield, Menu, X } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount())
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-bold text-foreground">
            Sabores de Granada
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Restaurantes
          </Link>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Shield className="h-4 w-4" />
            Admin
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="sm" className="relative gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Carrito</span>
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-medium text-muted-foreground"
            >
              Restaurantes
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
            >
              <Shield className="h-4 w-4" />
              Admin
            </Link>
            <Link href="/cart" onClick={() => setMobileOpen(false)}>
              <Button variant="outline" size="sm" className="relative gap-2">
                <ShoppingCart className="h-4 w-4" />
                Carrito
                {itemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
