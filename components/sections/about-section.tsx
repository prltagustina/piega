"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ScrollReveal } from "./scroll-reveal"
import Image from "next/image"

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1])
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"])

  return (
    <section
      ref={sectionRef}
      id="salon"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image with parallax */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{ scale: imageScale, y: imageY }}
            >
              <Image
                src="/images/salon.jpg"
                alt="Interior del salón Piega"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </ScrollReveal>

        {/* Text content */}
        <div className="flex flex-col gap-8">
          <ScrollReveal delay={0.1}>
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--site-accent)" }}
            >
              El Salón
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2
              className="text-4xl md:text-5xl font-serif font-light leading-tight"
              style={{ color: "var(--site-fg)" }}
            >
              Un espacio pensado para vos
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p
              className="text-sm md:text-base font-light leading-relaxed"
              style={{ color: "var(--site-fg-muted)" }}
            >
              Piega nació con la visión de crear un salón donde la calidad, el
              diseño y la calidez humana se fusionan. Cada detalle de nuestro
              espacio fue cuidadosamente pensado para que te sientas en un
              lugar único desde el momento en que entrás.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p
              className="text-sm md:text-base font-light leading-relaxed"
              style={{ color: "var(--site-fg-muted)" }}
            >
              Trabajamos con productos de primera línea y un equipo de
              profesionales apasionados por lo que hacen. Porque creemos que
              cada persona merece una experiencia de belleza excepcional.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex gap-12 mt-4">
              {[
                { number: "10+", label: "Años de experiencia" },
                { number: "5k+", label: "Clientes felices" },
                { number: "15", label: "Profesionales" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl md:text-4xl font-serif font-light"
                    style={{ color: "var(--site-accent)" }}
                  >
                    {stat.number}
                  </p>
                  <p
                    className="text-xs uppercase tracking-wider mt-1"
                    style={{ color: "var(--site-fg-muted)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
