"use client"

import { useState } from "react"
import { Calculator, Info } from "lucide-react"

function formatUSD(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const lineItems = [
  {
    id: "discovery",
    category: "Fase 1: Discovery y Setup",
    items: [
      {
        name: "Analisis de referencia y planificacion",
        description:
          "Desglose de thesix.com, definicion de arquitectura, wireframes, mapa del sitio",
        hoursMin: 6,
        hoursMax: 8,
      },
      {
        name: "Setup del proyecto",
        description:
          "Configuracion de Next.js, TypeScript, Tailwind, GSAP, Framer Motion, repo Git, Vercel",
        hoursMin: 3,
        hoursMax: 4,
      },
      {
        name: "Implementacion del sistema de diseno",
        description:
          "Integracion del manual de marca: tipografias, colores, tokens, componentes base",
        hoursMin: 4,
        hoursMax: 6,
      },
    ],
  },
  {
    id: "frontend",
    category: "Fase 2: Desarrollo Frontend",
    items: [
      {
        name: "Home Page",
        description:
          "Hero full-screen, grilla de servicios, galeria carousel, equipo preview, prensa, CTAs",
        hoursMin: 16,
        hoursMax: 22,
      },
      {
        name: "Pagina de Servicios",
        description:
          "Categorias con tabs, cards expandibles, precios, imagenes, CTAs de reserva",
        hoursMin: 12,
        hoursMax: 16,
      },
      {
        name: "Pagina del Salon",
        description:
          "Galeria interactiva por areas, historia, quotes con parallax, FAQ accordion",
        hoursMin: 10,
        hoursMax: 14,
      },
      {
        name: "Pagina del Equipo",
        description:
          "Carousel/Grid de profesionales, bios expandibles, especialidades",
        hoursMin: 6,
        hoursMax: 8,
      },
      {
        name: "Pagina de Reserva + AgendaPro",
        description:
          "Pagina puente con embed/redirect de AgendaPro, CTAs globales",
        hoursMin: 3,
        hoursMax: 5,
      },
      {
        name: "Header, Footer, Navegacion",
        description:
          "Menu overlay animado mobile, header sticky, footer con datos de contacto y mapa",
        hoursMin: 6,
        hoursMax: 8,
      },
    ],
  },
  {
    id: "animations",
    category: "Fase 3: Animaciones y Transiciones",
    items: [
      {
        name: "Parallax y Scroll Animations (GSAP)",
        description:
          "ScrollTrigger en secciones hero, quotes, imagenes. Pinning. Parallax multicapa",
        hoursMin: 10,
        hoursMax: 14,
      },
      {
        name: "Transiciones de pagina (Framer Motion)",
        description:
          "AnimatePresence, fade/slide entre paginas, stagger de elementos",
        hoursMin: 6,
        hoursMax: 8,
      },
      {
        name: "Micro-interacciones y hover effects",
        description:
          "Hover en cards, cursor custom, reveals de texto, animaciones de entrada",
        hoursMin: 6,
        hoursMax: 10,
      },
      {
        name: "Smooth scroll (Lenis)",
        description:
          "Configuracion de smooth scroll, integracion con GSAP ScrollTrigger",
        hoursMin: 2,
        hoursMax: 3,
      },
    ],
  },
  {
    id: "backend",
    category: "Fase 4: Backend y Panel Admin",
    items: [
      {
        name: "Base de datos y esquema",
        description:
          "Diseño del schema (servicios, equipo, imagenes, textos), migraciones, seed data",
        hoursMin: 5,
        hoursMax: 7,
      },
      {
        name: "Autenticacion del admin",
        description:
          "Sistema de login seguro, hash bcrypt, sesiones HTTP-only, proteccion de rutas",
        hoursMin: 4,
        hoursMax: 6,
      },
      {
        name: "CRUD de Servicios",
        description:
          "Alta, baja, edicion de tratamientos con imagen, precio, descripcion, categoria",
        hoursMin: 6,
        hoursMax: 8,
      },
      {
        name: "CRUD de Equipo",
        description:
          "Gestion de profesionales: foto, nombre, rol, bio, especialidades",
        hoursMin: 4,
        hoursMax: 6,
      },
      {
        name: "Gestion de Imagenes y Galeria",
        description:
          "Upload de imagenes con optimizacion, gestion de galeria del salon y servicios",
        hoursMin: 5,
        hoursMax: 7,
      },
      {
        name: "Edicion de textos y contenido",
        description:
          "Quotes, descripciones de secciones, datos de contacto, articulos de prensa",
        hoursMin: 4,
        hoursMax: 6,
      },
    ],
  },
  {
    id: "optimization",
    category: "Fase 5: Optimizacion y Entrega",
    items: [
      {
        name: "Performance y Core Web Vitals",
        description:
          "Optimizacion de LCP, CLS, INP. Code splitting, lazy loading, font optimization",
        hoursMin: 4,
        hoursMax: 6,
      },
      {
        name: "SEO tecnico",
        description:
          "Metadata por pagina, sitemap.xml, robots.txt, schema markup local business, Open Graph",
        hoursMin: 3,
        hoursMax: 4,
      },
      {
        name: "Responsive testing y QA",
        description:
          "Testing en multiples dispositivos y navegadores, fixes de bugs, ajustes finales",
        hoursMin: 6,
        hoursMax: 8,
      },
      {
        name: "Deploy y configuracion en Vercel",
        description:
          "Configuracion de dominio, variables de entorno, analytics, preview deployments",
        hoursMin: 2,
        hoursMax: 3,
      },
      {
        name: "Capacitacion al cliente",
        description:
          "Sesion de capacitacion sobre uso del panel admin, documentacion basica",
        hoursMin: 2,
        hoursMax: 3,
      },
    ],
  },
]

export function BudgetSection() {
  const [hourlyRate, setHourlyRate] = useState(25)

  const totals = lineItems.map((category) => ({
    ...category,
    totalMin: category.items.reduce((acc, item) => acc + item.hoursMin, 0),
    totalMax: category.items.reduce((acc, item) => acc + item.hoursMax, 0),
  }))

  const grandTotalMin = totals.reduce((acc, cat) => acc + cat.totalMin, 0)
  const grandTotalMax = totals.reduce((acc, cat) => acc + cat.totalMax, 0)

  return (
    <section className="px-6 py-24 md:px-16 lg:px-24">
      <div className="flex items-baseline justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
            05
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Presupuesto Detallado
          </h2>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-10 max-w-lg">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-medium">Tarifa por hora (USD)</h3>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={15}
            max={50}
            step={1}
            value={hourlyRate}
            onChange={(e) => setHourlyRate(Number(e.target.value))}
            className="flex-1 accent-accent"
            aria-label="Tarifa por hora en USD"
          />
          <span className="text-2xl font-light font-mono w-20 text-right">
            ${hourlyRate}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
          <Info className="h-3 w-3" />
          Ajusta el slider para calcular el presupuesto total. Rango sugerido para Argentina: $20-35 USD/h
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {totals.map((category) => (
          <div key={category.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">{category.category}</h3>
              <div className="flex items-center gap-6 text-sm font-mono">
                <span className="text-muted-foreground">
                  {category.totalMin}-{category.totalMax}h
                </span>
                <span className="font-medium">
                  ${formatUSD(category.totalMin * hourlyRate)}-$
                  {formatUSD(category.totalMax * hourlyRate)}
                </span>
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <tbody>
                  {category.items.map((item, idx) => (
                    <tr
                      key={item.name}
                      className={
                        idx !== category.items.length - 1
                          ? "border-b border-border"
                          : ""
                      }
                    >
                      <td className="p-4 align-top">
                        <p className="text-sm font-medium mb-1">{item.name}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </td>
                      <td className="p-4 text-right align-top whitespace-nowrap">
                        <p className="text-sm font-mono text-muted-foreground">
                          {item.hoursMin}-{item.hoursMax}h
                        </p>
                        <p className="text-xs font-mono text-muted-foreground">
                          ${formatUSD(item.hoursMin * hourlyRate)}-$
                          {formatUSD(item.hoursMax * hourlyRate)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-primary text-primary-foreground rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-60 font-mono mb-2">
              Total Estimado del Proyecto
            </p>
            <p className="text-3xl md:text-4xl font-light font-mono">
              ${formatUSD(grandTotalMin * hourlyRate)} - $
              {formatUSD(grandTotalMax * hourlyRate)} USD
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="text-sm opacity-60 font-mono">
              {grandTotalMin} - {grandTotalMax} horas totales
            </p>
            <p className="text-sm opacity-60 font-mono">
              Tarifa: ${hourlyRate} USD/h
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-card border border-border rounded-lg p-6">
        <h3 className="text-sm font-medium mb-3">Notas sobre el presupuesto</h3>
        <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
            El rango de horas contempla variaciones segun la complejidad real del manual de marca y cantidad de contenido.
          </li>
          <li className="flex items-start gap-2">
            <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
            No incluye: creacion de contenido (textos, fotografias), diseno de marca, ni configuracion de AgendaPro.
          </li>
          <li className="flex items-start gap-2">
            <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
            El hosting en Vercel tiene un plan gratuito (Hobby) suficiente para arrancar. El plan Pro (USD $20/mes) se recomienda para produccion.
          </li>
          <li className="flex items-start gap-2">
            <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
            Se sugiere un esquema de pago: 40% al inicio, 30% al entregar frontend, 30% al entregar proyecto completo.
          </li>
          <li className="flex items-start gap-2">
            <span className="h-1 w-1 rounded-full bg-accent mt-2 shrink-0" />
            Revisiones incluidas: hasta 2 rondas de revision por pagina. Revisiones adicionales se cotizan por hora.
          </li>
        </ul>
      </div>
    </section>
  )
}
