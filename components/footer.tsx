import { UtensilsCrossed } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center lg:px-8">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg font-bold text-foreground">
            Flavors of Granada
          </span>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Discover authentic Granada gastronomy. Order delivery or book a table
          at the best restaurants in the city.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Flavors of Granada. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
