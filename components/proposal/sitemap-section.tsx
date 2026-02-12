import { ExternalLink } from "lucide-react"

const pages = [
  {
    route: "/",
    name: "Home",
    description:
      "Página principal con hero full-screen, resumen de servicios, galería del salón, slider del equipo, sección de prensa/testimonios y CTA de reserva.",
    sections: [
      "Hero con video/imagen + CTA",
      "Grilla de categorías de servicios",
      "Galería de imágenes del salón (carousel)",
      "Quote destacada con parallax",
      "Preview del equipo (carousel)",
      "Seccion de prensa / menciones",
      "Footer con datos de contacto",
    ],
    complexity: "Alta",
  },
  {
    route: "/servicios",
    name: "Servicios",
    description:
      "Catálogo completo de tratamientos organizados por categoría (Cabello, Rostro, Manos, Cuerpo), con precios y descripciones.",
    sections: [
      "Hero con imagen de categoría",
      "Navegación por tabs de categoría",
      "Cards de servicio con precio y descripción expandible",
      "CTA de reserva por servicio",
      "Imagenes de cierre por categoria",
    ],
    complexity: "Alta",
  },
  {
    route: "/salon",
    name: "El Salón",
    description:
      "Presentación del espacio físico con galería interactiva, historia del salón y recorrido por las distintas áreas.",
    sections: [
      "Hero con imagen del salón",
      "Descripción editorial del espacio",
      "Galería interactiva por áreas/pisos",
      "Quote del fundador con parallax",
      "Historia del fundador con FAQ accordion",
      "CTAs a Servicios y Equipo",
    ],
    complexity: "Media-Alta",
  },
  {
    route: "/equipo",
    name: "Equipo",
    description:
      "Presentación de los profesionales del salón con fotos, especialidades y biografías.",
    sections: [
      "Carousel/Grid de profesionales",
      "Bio expandible por profesional",
      "Especialidades y certificaciones",
      "Link a reserva directa con cada profesional",
    ],
    complexity: "Media",
  },
  {
    route: "/reservar",
    name: "Reservar",
    description:
      "Pagina puente que redirige a AgendaPro o embebe el widget de reservas del sistema externo.",
    sections: [
      "Mensaje de bienvenida breve",
      "Embed/iframe de AgendaPro o redirect automatico",
      "Informacion de contacto alternativa",
    ],
    complexity: "Baja",
  },
  {
    route: "/admin",
    name: "Panel Administrativo",
    description:
      "Dashboard protegido con autenticación donde el cliente puede gestionar contenido, imágenes, servicios y datos del equipo.",
    sections: [
      "Login con autenticación segura",
      "Dashboard con métricas básicas",
      "CRUD de servicios (nombre, precio, descripción, imagen)",
      "CRUD de miembros del equipo",
      "Gestión de imágenes de galería",
      "Edición de textos y quotes",
      "Gestión de artículos de prensa",
    ],
    complexity: "Alta",
  },
]

const complexityColor: Record<string, string> = {
  Baja: "bg-accent/20 text-accent",
  Media: "bg-amber-100 text-amber-700",
  "Media-Alta": "bg-orange-100 text-orange-700",
  Alta: "bg-red-100 text-red-700",
}

export function SitemapSection() {
  return (
    <section className="px-6 py-24 md:px-16 lg:px-24">
      <div className="flex items-baseline justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
            03
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Mapa del Sitio
          </h2>
        </div>
        <p className="text-sm font-mono text-muted-foreground">
          6 secciones principales
        </p>
      </div>

      <p className="max-w-2xl text-muted-foreground leading-relaxed mb-16">
        Estructura propuesta del sitio web para Piega Hair & Beauty, inspirada
        en la arquitectura de The Six pero adaptada a las necesidades específicas
        del salón, incluyendo integración con AgendaPro y un panel
        administrativo para gestión de contenido.
      </p>

      <div className="flex flex-col gap-6">
        {pages.map((page, index) => (
          <div
            key={page.route}
            className="bg-card border border-border rounded-lg overflow-hidden"
          >
            <div className="flex flex-col md:flex-row">
              <div className="flex-1 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium">{page.name}</h3>
                  <code className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded">
                    {page.route}
                  </code>
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${complexityColor[page.complexity] || ""}`}
                  >
                    {page.complexity}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {page.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {page.sections.map((section) => (
                    <span
                      key={section}
                      className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md"
                    >
                      {section}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-card border border-border rounded-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <ExternalLink className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-medium">Integración AgendaPro</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
          La integración con AgendaPro se realizará mediante link directo o
          embed (iframe) del widget de reservas. El cliente proporcionará
          AgendaPro ya configurado con sus servicios, profesionales y
          horarios. La implementación incluye: botón "Reservar" en el header
          (siempre visible), CTAs contextuales en cada servicio, y página
          dedicada /reservar con el widget embebido o redirección automática.
        </p>
      </div>
    </section>
  )
}
