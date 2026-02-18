"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

type TeamMember = {
  id: string
  name: string
  role: string
  image_url: string
}

export function TeamSection({ team }: { team: TeamMember[] }) {
  return (
    <section id="equipo" className="py-24 md:py-32 px-6 md:px-12 lg:px-16">
      <ScrollReveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-16 md:mb-20">
          <div>
            <p
              className="text-xs uppercase tracking-[0.3em] mb-4"
              style={{ color: "var(--site-accent)" }}
            >
              Nuestro Equipo
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-semibold leading-tight"
              style={{ color: "var(--site-fg)" }}
            >
              Artistas del estilo
            </h2>
          </div>
          <p
            className="text-sm font-light max-w-sm leading-relaxed"
            style={{ color: "var(--site-fg-muted)" }}
          >
            Un equipo de profesionales apasionados por la belleza y el
            bienestar, dedicados a realzar tu mejor versión.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-3 gap-6 md:gap-4">
        {team.map((member, i) => (
          <ScrollReveal key={member.name} delay={i * 0.15}>
            <motion.div
              className="group relative overflow-hidden cursor-pointer"
              whileHover="hover"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  variants={{
                    hover: { scale: 1.05 },
                  }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Image
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </motion.div>

                <motion.div
                  className="absolute inset-0 flex flex-col justify-end p-6"
                  initial={{ opacity: 0 }}
                  variants={{
                    hover: { opacity: 1 },
                  }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background:
                      "linear-gradient(to top, rgba(28,21,32,0.9) 0%, transparent 60%)",
                  }}
                >
                  <p
                    className="text-xs uppercase tracking-[0.2em] mb-1"
                    style={{ color: "var(--site-accent)" }}
                  >
                    {member.role}
                  </p>
                </motion.div>
              </div>

              <div className="mt-4">
                <h3
                  className="text-2xl md:text-3xl font-serif font-medium"
                  style={{ color: "var(--site-fg)" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-xs uppercase tracking-wider mt-1"
                  style={{ color: "var(--site-fg-muted)" }}
                >
                  {member.role}
                </p>
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
