import {
  Globe,
  Layers,
  MonitorSmartphone,
  MousePointerClick,
  Sparkles,
  Type,
} from "lucide-react"

const features = [
  {
    icon: Layers,
    title: "Estructura de Páginas",
    items: [
      "Home (hero + servicios + galería + equipo + prensa)",
      "Treatments (categorías: Hair, Face, Hands, Body)",
      "The Salon (historia, espacios, galería interactiva)",
      "Artists/Equipo (carousel de profesionales)",
      "Book (redirige a sistema de reservas externo)",
      "Legal (Privacy, Terms)",
    ],
  },
  {
    icon: Sparkles,
    title: "Animaciones y UX",
    items: [
      "Transiciones de página suaves con fade/slide",
      "Scroll-triggered reveals (texto e imágenes)",
      "Parallax sutil en secciones hero con imágenes",
      "Carousel de artistas con transición animada",
      "Galería de imágenes con lightbox y hover effects",
      "Navegación con menú overlay animado (mobile)",
      "Cursor custom en hover sobre elementos interactivos",
    ],
  },
  {
    icon: Type,
    title: "Tipografía y Diseño",
    items: [
      "Uso de serif para headings (elegancia editorial)",
      "Sans-serif limpia para body text",
      "Gran uso de whitespace y composición asimétrica",
      "Paleta neutra: cremas, negro, tonos tierra",
      "Imágenes de alta calidad como elemento principal",
      "Layout editorial con grids asimétricos",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive Design",
    items: [
      "Diseño mobile-first con hamburger menú",
      "Imágenes adaptables con art-direction",
      "Tipografía fluida con clamp()",
      "Grids que colapsan elegantemente en mobile",
      "Touch-friendly con areas de toque generosas",
    ],
  },
  {
    icon: MousePointerClick,
    title: "Interacciones Clave",
    items: [
      "CTA 'Book a Treatment' siempre visible",
      "Cards de servicios con hover expandible",
      "Carousel del equipo con bio animada",
      "Galería de espacios con tabs interactivas",
      "Quotes/testimonios con animación de entrada",
      "Sección de prensa con links externos",
    ],
  },
  {
    icon: Globe,
    title: "SEO y Performance",
    items: [
      "Metadata optimizada por página",
      "Imágenes en formato moderno (WebP/AVIF)",
      "Lazy loading de imágenes below-the-fold",
      "Server-Side Rendering con Next.js",
      "Sitemap.xml y robots.txt",
      "Schema markup para negocio local",
    ],
  },
]

export function ReferenceAnalysis() {
  return (
    <section id="analisis" className="px-6 py-24 md:px-16 lg:px-24">
      <div className="flex items-baseline justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
            02
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Análisis de Referencia
          </h2>
        </div>
        <a
          href="https://www.thesix.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-mono text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors"
        >
          thesix.com
        </a>
      </div>

      <p className="max-w-2xl text-muted-foreground leading-relaxed mb-16">
        The Six es un salón de belleza premium en Mayfair, Londres.
        Su web presenta una estética editorial sofisticada, con animaciones sutiles,
        tipografía elegante y fotografía de alta calidad como pilar del diseño.
        A continuación, el desglose de los patrones y decisiones de diseño
        que replicaremos y adaptaremos para Piega.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-md bg-primary flex items-center justify-center">
                <feature.icon className="h-4 w-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-medium tracking-wide">
                {feature.title}
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {feature.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground leading-relaxed flex items-start gap-2"
                >
                  <span className="text-accent mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
