"use client"

import { ScrollReveal } from "./scroll-reveal"

export function Footer() {
  return (
    <footer
      className="py-16 md:py-20 px-6 md:px-12 lg:px-16 border-t"
      style={{ borderColor: "var(--site-border)" }}
    >
      <div className="grid md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <ScrollReveal className="md:col-span-1">
          <div>
            <span
              className="text-3xl font-serif font-light tracking-wide"
              style={{ color: "var(--site-fg)" }}
            >
              Piega
            </span>
            <p
              className="text-[9px] uppercase tracking-[0.35em]"
              style={{ color: "var(--site-fg-muted)" }}
            >
              hair & beauty
            </p>
            <p
              className="mt-4 text-xs font-light leading-relaxed max-w-xs"
              style={{ color: "var(--site-fg-muted)" }}
            >
              Un espacio donde el estilo se encuentra con la
              sofisticación. Experiencias de belleza que transforman.
            </p>
          </div>
        </ScrollReveal>

        {/* Navigation */}
        <ScrollReveal delay={0.1}>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "var(--site-accent)" }}
            >
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {["Inicio", "Servicios", "El Salón", "Equipo", "Galería"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(" ", "-")}`}
                      className="site-link text-sm font-light"
                      style={{ color: "var(--site-fg-muted)" }}
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </ScrollReveal>

        {/* Servicios */}
        <ScrollReveal delay={0.2}>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "var(--site-accent)" }}
            >
              Servicios
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                "Corte & Estilo",
                "Color & Mechas",
                "Tratamientos",
                "Spa & Bienestar",
                "Novias",
              ].map((item) => (
                <li key={item}>
                  <span
                    className="text-sm font-light"
                    style={{ color: "var(--site-fg-muted)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={0.3}>
          <div>
            <h4
              className="text-xs uppercase tracking-[0.2em] mb-4 font-medium"
              style={{ color: "var(--site-accent)" }}
            >
              Contacto
            </h4>
            <div className="flex flex-col gap-3">
              <p
                className="text-sm font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                Av. Ejemplo 1234, Santa Fe
              </p>
              <a
                href="tel:+5493426000000"
                className="site-link text-sm font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                +54 9 342 600 0000
              </a>
              <a
                href="mailto:hola@piega.com.ar"
                className="site-link text-sm font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                hola@piega.com.ar
              </a>

              {/* Social */}
              <div className="flex gap-6 mt-4">
                {["Instagram", "WhatsApp", "Facebook"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="site-link text-xs uppercase tracking-wider"
                    style={{ color: "var(--site-fg-muted)" }}
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom bar */}
      <div
        className="mt-16 pt-6 border-t flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        style={{ borderColor: "var(--site-border)" }}
      >
        <p
          className="text-xs font-light"
          style={{ color: "var(--site-fg-muted)" }}
        >
          2026 Piega Hair & Beauty. Todos los derechos reservados.
        </p>
        <p
          className="text-xs font-light"
          style={{ color: "var(--site-fg-muted)" }}
        >
          Sitio desarrollado con Next.js
        </p>
      </div>
    </footer>
  )
}
