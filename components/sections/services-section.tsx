"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

type ServiceData = {
  id: string
  title: string
  description: string
  price: string
  sort_order: number
}

export function ServicesSection({ services }: { services: ServiceData[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="servicios" className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
      <ScrollReveal>
        <p
          className="text-xs uppercase tracking-[0.3em] mb-4"
          style={{ color: "var(--site-accent)" }}
        >
          Nuestros Servicios
        </p>
        <h2
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight max-w-2xl"
          style={{ color: "var(--site-fg)" }}
        >
          Experiencias que transforman
        </h2>
      </ScrollReveal>

      <div className="mt-16 md:mt-20 grid lg:grid-cols-2 gap-0 lg:gap-16">
        {/* Services list */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <button
                type="button"
                className="service-card w-full text-left py-7 border-b flex items-start justify-between gap-4 group"
                style={{ borderColor: "var(--site-border)" }}
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="flex-1">
                  <div className="flex items-baseline gap-4">
                    <span
                      className="text-sm md:text-base font-mono"
                      style={{ color: "var(--site-fg-muted)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium transition-colors duration-300"
                      style={{
                        color:
                          activeIndex === i
                            ? "var(--site-accent)"
                            : "var(--site-fg)",
                      }}
                    >
                      {service.title}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {activeIndex === i && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-base md:text-lg font-light leading-relaxed mt-3 ml-10 max-w-md"
                        style={{ color: "var(--site-fg-muted)" }}
                      >
                        {service.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                <span
                  className="text-sm md:text-base uppercase tracking-wider mt-2 whitespace-nowrap"
                  style={{ color: "var(--site-fg-muted)" }}
                >
                  {service.price}
                </span>
              </button>
            </ScrollReveal>
          ))}
        </div>

        {/* Image column */}
        <ScrollReveal
          delay={0.2}
          className="hidden lg:block sticky top-32 h-fit"
        >
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/services.jpg"
              alt="Estilista profesional en acción"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--site-bg) 5%, transparent 45%)",
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
