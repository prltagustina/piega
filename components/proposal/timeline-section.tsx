import { AlertTriangle } from "lucide-react"

const phases = [
  {
    week: "Semana 1",
    dates: "9 - 15 Feb",
    title: "Discovery + Setup + Sistema de Diseño",
    tasks: [
      "Análisis final de referencia y wireframes",
      "Setup del proyecto (Next.js, Git, Vercel)",
      "Integración del manual de marca (tipografía, colores, tokens)",
      "Estructura de carpetas y arquitectura",
      "Componentes base (header, footer, layout)",
    ],
    milestone: "Proyecto configurado con sistema de diseño implementado",
  },
  {
    week: "Semana 2",
    dates: "16 - 22 Feb",
    title: "Home + Servicios (Desarrollo Frontend)",
    tasks: [
      "Home Page completa con todas las secciones",
      "Página de Servicios con categorías y cards",
      "Animaciones GSAP de scroll y parallax (Home)",
      "Responsive de Home y Servicios",
    ],
    milestone: "Home y Servicios navegables con animaciones base",
  },
  {
    week: "Semana 3",
    dates: "23 Feb - 1 Mar",
    title: "Salón + Equipo + Reservar + Animaciones",
    tasks: [
      "Página del Salón con galería interactiva",
      "Página del Equipo con carousel",
      "Página de Reserva con integración AgendaPro",
      "Transiciones de página (Framer Motion)",
      "Smooth scroll (Lenis) + micro-interacciones",
      "Animaciones avanzadas en todas las páginas",
    ],
    milestone: "Todas las páginas públicas completas con animaciones",
  },
  {
    week: "Semana 4",
    dates: "2 - 8 Mar",
    title: "Panel Admin + Backend",
    tasks: [
      "Configuración de base de datos y esquema",
      "Sistema de autenticación del admin",
      "CRUD completo: servicios, equipo, galería",
      "Gestión de imágenes con upload",
      "Edición de textos y contenido",
      "Conexión frontend con datos dinámicos del admin",
    ],
    milestone: "Panel admin funcional con todos los CRUD",
  },
  {
    week: "Semana 5",
    dates: "9 - 14 Mar",
    title: "QA + Optimización + Deploy Final",
    tasks: [
      "Performance y Core Web Vitals",
      "SEO técnico (metadata, sitemap, schema)",
      "Testing cross-browser y cross-device",
      "Fixes de bugs y ajustes finales",
      "Deploy en produccion con dominio",
      "Capacitación al cliente sobre el panel admin",
    ],
    milestone: "Sitio en producción, entrega 14-15 de Marzo",
  },
]

export function TimelineSection() {
  return (
    <section className="px-6 py-24 md:px-16 lg:px-24">
      <div className="flex items-baseline justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
            06
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Cronograma
          </h2>
        </div>
        <p className="text-sm font-mono text-muted-foreground">
          5 semanas / 9 Feb - 14 Mar
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-10 flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium mb-1">Timeline ajustado</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            La fecha de entrega (14-15 de Marzo) implica un cronograma de 5
            semanas desde hoy. Es un timeline factible pero ajustado.
            Requiere que el cliente entregue el manual de marca, textos,
            imágenes y AgendaPro configurado durante la primera semana.
            Cualquier demora en la entrega de materiales impactará
            directamente en la fecha de entrega.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-0">
        {phases.map((phase, index) => (
          <div key={phase.week} className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-mono shrink-0">
                {index + 1}
              </div>
              {index < phases.length - 1 && (
                <div className="w-px flex-1 bg-border" />
              )}
            </div>

            <div className="pb-10 flex-1">
              <div className="flex items-baseline gap-4 mb-1">
                <h3 className="text-sm font-medium">{phase.week}</h3>
                <span className="text-xs font-mono text-muted-foreground">
                  {phase.dates}
                </span>
              </div>
              <p className="text-lg font-light mb-4">{phase.title}</p>

              <div className="bg-card border border-border rounded-lg p-5">
                <ul className="flex flex-col gap-2 mb-4">
                  {phase.tasks.map((task) => (
                    <li
                      key={task}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
                      {task}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border pt-3">
                  <p className="text-xs font-mono text-accent">
                    Hito: {phase.milestone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
