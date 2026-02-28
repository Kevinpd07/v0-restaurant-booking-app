import Image from "next/image"

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-granada.jpg"
          alt="Gastronomía de Granada"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-24 lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">
            Descubre la gastronomía granadina
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
            Sabores de Granada
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80 text-pretty">
            Los mejores restaurantes de Granada a tu alcance. Pide a domicilio o reserva tu mesa
            con un solo clic.
          </p>
        </div>
      </div>
    </section>
  )
}
