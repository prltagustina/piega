const categories = [
  {
    name: "Framework y Core",
    tools: [
      {
        name: "Next.js 16",
        role: "Framework full-stack con App Router",
        why: "SSR/SSG, optimización de imágenes, rutas API, excelente SEO out-of-the-box. Ideal para sitios con contenido dinámico y panel admin.",
      },
      {
        name: "TypeScript",
        role: "Tipado estatico",
        why: "Previene errores en tiempo de desarrollo, mejor DX, codigo mas mantenible y escalable.",
      },
      {
        name: "React 19",
        role: "Libreria de UI",
        why: "Server Components, Suspense, mejor performance. Ecosistema robusto para animaciones.",
      },
    ],
  },
  {
    name: "Estilos y UI",
    tools: [
      {
        name: "Tailwind CSS",
        role: "Utility-first CSS",
        why: "Desarrollo rapido, diseno consistente, purge automatico para bundles minimos. Responsive nativo.",
      },
      {
        name: "shadcn/ui",
        role: "Componentes base del admin",
        why: "Componentes accesibles y customizables para el panel administrativo (tablas, formularios, modals).",
      },
    ],
  },
  {
    name: "Animaciones",
    tools: [
      {
        name: "Framer Motion",
        role: "Animaciones de layout y transiciones",
        why: "API declarativa para React, AnimatePresence para transiciones de pagina, scroll animations, gestos.",
      },
      {
        name: "GSAP + ScrollTrigger",
        role: "Animaciones avanzadas y parallax",
        why: "Precision frame-perfect para parallax, timelines complejas, pinning de secciones. Estandar de la industria para webs premium.",
      },
      {
        name: "Lenis",
        role: "Smooth scrolling",
        why: "Scroll suave y performante que complementa las animaciones de GSAP y Framer Motion.",
      },
    ],
  },
  {
    name: "Base de Datos y Backend",
    tools: [
      {
        name: "PostgreSQL (Neon/Supabase)",
        role: "Base de datos relacional",
        why: "Almacenamiento de servicios, equipo, imagenes, contenido editable. Serverless-ready.",
      },
      {
        name: "Prisma / Drizzle ORM",
        role: "ORM tipado",
        why: "Queries type-safe, migraciones automaticas, esquema declarativo. Integra perfecto con TypeScript.",
      },
      {
        name: "NextAuth.js / Auth propio",
        role: "Autenticacion del panel admin",
        why: "Login seguro con hash bcrypt, sesiones HTTP-only, proteccion de rutas admin.",
      },
    ],
  },
  {
    name: "Media y Assets",
    tools: [
      {
        name: "Vercel Blob / Cloudinary",
        role: "Storage de imagenes",
        why: "Upload desde el panel admin, optimizacion automatica, CDN global, formatos modernos (WebP/AVIF).",
      },
      {
        name: "next/image",
        role: "Componente de imagen optimizado",
        why: "Lazy loading, responsive sizes, placeholder blur, optimizacion automatica de formato y calidad.",
      },
    ],
  },
  {
    name: "Deploy e Infraestructura",
    tools: [
      {
        name: "Vercel",
        role: "Hosting y deploy",
        why: "Deploy automatico desde Git, previews por PR, edge network global, analytics integrados, ideal para Next.js.",
      },
      {
        name: "GitHub",
        role: "Control de versiones",
        why: "Repositorio privado, CI/CD con Vercel, historial completo de cambios, branching strategy.",
      },
    ],
  },
]

export function TechStack() {
  return (
    <section className="px-6 py-24 md:px-16 lg:px-24">
      <div className="flex items-baseline justify-between mb-16 border-b border-border pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-2">
            04
          </p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            Stack Tecnologico
          </h2>
        </div>
      </div>

      <p className="max-w-2xl text-muted-foreground leading-relaxed mb-16">
        Seleccion tecnologica orientada a performance, escalabilidad y
        mantenibilidad a largo plazo. Cada herramienta esta elegida para
        maximizar la calidad del producto final y minimizar la deuda tecnica.
      </p>

      <div className="flex flex-col gap-10">
        {categories.map((category) => (
          <div key={category.name}>
            <h3 className="text-xs uppercase tracking-widest text-muted-foreground font-mono mb-5">
              {category.name}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="bg-card border border-border rounded-lg p-5"
                >
                  <h4 className="text-sm font-medium mb-1">{tool.name}</h4>
                  <p className="text-xs text-accent font-mono mb-3">
                    {tool.role}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tool.why}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
