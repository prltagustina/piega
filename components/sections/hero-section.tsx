"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.7], [0.45, 0.8])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <section ref={ref} id="inicio" className="relative h-screen overflow-hidden">
      {/* Parallax background image */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <Image
          src="/images/hero.jpg"
          alt="Interior del salón Piega Hair & Beauty"
          fill
          className="object-cover scale-110"
          priority
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor: "var(--site-bg)",
          opacity: overlayOpacity,
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
        style={{ y: textY }}
      >
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xs uppercase tracking-[0.4em] mb-6"
          style={{ color: "var(--site-accent)" }}
        >
          Salón de belleza premium
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[0.95] tracking-tight text-balance"
          style={{ color: "var(--site-fg)" }}
        >
          El arte de
          <br />
          <span style={{ color: "var(--site-accent)" }}>ser vos</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8 text-sm md:text-base font-light max-w-md leading-relaxed"
          style={{ color: "var(--site-fg-muted)" }}
        >
          Un espacio donde el estilo se encuentra con la sofisticación.
          Experiencias de belleza personalizadas para cada persona.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#reservar"
            className="px-10 py-4 text-xs uppercase tracking-[0.25em] font-medium transition-all duration-300"
            style={{
              backgroundColor: "var(--site-accent)",
              color: "var(--site-bg)",
            }}
          >
            Reservar turno
          </a>
          <a
            href="#servicios"
            className="px-10 py-4 text-xs uppercase tracking-[0.25em] font-light border transition-colors duration-300"
            style={{
              borderColor: "var(--site-fg-muted)",
              color: "var(--site-fg)",
            }}
          >
            Nuestros servicios
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-[1px] h-12"
            style={{ backgroundColor: "var(--site-accent)", opacity: 0.5 }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
