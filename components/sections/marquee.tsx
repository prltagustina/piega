"use client"

export function Marquee() {
  const items = [
    "Corte & Estilo",
    "Color & Mechas",
    "Tratamientos Capilares",
    "Spa & Relax",
    "Maquillaje",
    "Novias",
    "Alisado",
    "Manicura",
  ]

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
              style={{ backgroundColor: "var(--site-accent)" }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}
