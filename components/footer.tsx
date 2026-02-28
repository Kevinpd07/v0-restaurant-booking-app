import { UtensilsCrossed } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-10 text-center lg:px-8">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-primary" />
          <span className="font-serif text-lg font-bold text-foreground">
            Sabores de Granada
          </span>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Descubre la auténtica gastronomía granadina. Pide a domicilio o reserva
          mesa en los mejores restaurantes de la ciudad.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Sabores de Granada. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
