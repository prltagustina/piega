import { Check, FileCode, ImageIcon, Lock, Monitor, Rocket, Users } from "lucide-react"

const deliverables = [
  {
    icon: Monitor,
    title: "Sitio Web Completo",
    items: [
      "5 paginas publicas con animaciones premium",
      "Diseño responsive (mobile, tablet, desktop)",
      "Parallax, transiciones y micro-interacciones",
      "Integracion con AgendaPro para reservas",
      "SEO optimizado con metadata por pagina",
    ],
  },
  {
    icon: Lock,
    title: "Panel Administrativo",
    items: [
      "Login seguro con autenticacion propia",
      "CRUD de servicios/tratamientos",
      "CRUD del equipo/profesionales",
      "Gestion de galeria de imagenes",
      "Edicion de textos y contenido",
    ],
  },
  {
    icon: FileCode,
    title: "Codigo y Repositorio",
    items: [
      "Repositorio Git privado con historial completo",
      "Codigo documentado y organizado",
      "TypeScript tipado de punta a punta",
      "Arquitectura escalable y mantenible",
    ],
  },
  {
    icon: Rocket,
    title: "Deploy y Hosting",
    items: [
      "Deploy en Vercel con dominio configurado",
      "SSL/HTTPS automatico",
      "CDN global para maxima velocidad",
      "Preview deployments por cambio",
    ],
  },
  {
    icon: ImageIcon,
    title: "Assets y Media",
    items: [
      "Imagenes optimizadas (WebP/AVIF)",
      "Sistema de upload en panel admin",
      "Lazy loading y placeholders blur",
    ],
  },
  {
    icon: Users,
    title: "Entrega y Soporte",
    items: [
      "Sesion de capacitacion del panel admin",
      "Documentacion basica de uso",
      "30 dias de soporte post-entrega para bugs",
      "Traspaso completo de accesos",
    ],
  },
]

const notIncluded = [
  "Creacion de contenido (textos, copy, traducciones)",
  "Fotografia y produccion de video",
  "Diseno de marca (logo, tipografia, paleta de colores)",
  "Configuracion de AgendaPro (servicio del cliente)",
  "Registro y renovacion de dominio",
  "Mantenimiento mensual post-30 dias (cotizar aparte)",
  "Funcionalidades no detalladas en este documento",
]

export function DeliverablesSection() {
  return (
    <section className="px-6 py-24 md:px-16 lg:px-24">
      <div className="flex items-baseline justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
            07
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Entregables y Alcance
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {deliverables.map((d) => (
          <div
            key={d.title}
            className="bg-card border border-border rounded-lg p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-md bg-accent/10 flex items-center justify-center">
                <d.icon className="h-4 w-4 text-accent" />
              </div>
              <h3 className="text-sm font-medium">{d.title}</h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {d.items.map((item) => (
                <li
                  key={item}
                  className="text-sm text-muted-foreground flex items-start gap-2"
                >
                  <Check className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6 md:p-8">
        <h3 className="text-sm font-medium mb-4">
          No incluido en este presupuesto
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {notIncluded.map((item) => (
            <p
              key={item}
              className="text-sm text-muted-foreground flex items-start gap-2"
            >
              <span className="text-destructive mt-1.5">{'--'}</span>
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
