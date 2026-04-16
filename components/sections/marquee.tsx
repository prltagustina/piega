"use client"

type ServiceData = {
  id: string
  title: string
}

const defaultItems = [
  "Corte & Estilo",
  "Color & Mechas",
  "Tratamientos Capilares",
  "Spa & Bienestar",
  "Maquillaje Profesional",
  "Novias & Eventos",
]

export function Marquee({ services }: { services?: ServiceData[] }) {
  const items = services && services.length > 0 
    ? services.map(s => s.title) 
    : defaultItems

  return (
    <div
      className="py-6 overflow-hidden border-y"
      style={{ borderColor: "var(--site-border)" }}
    >
      <div className="marquee-track flex items-center gap-12 whitespace-nowrap w-max">
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="text-xs uppercase tracking-[0.3em] font-light flex items-center gap-12"
            style={{ color: "var(--site-fg-muted)" }}
          >
            {item}
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: "var(--site-pink)" }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
