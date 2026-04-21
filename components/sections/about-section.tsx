"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AboutImage = {
  id: string
  image_url: string
  alt_text: string
  sort_order: number
}

type AboutData = {
  subtitle?: string
  title?: string
  paragraph1?: string
  paragraph2?: string
  image_url?: string
  stat1_number?: string
  stat1_label?: string
  stat2_number?: string
  stat2_label?: string
  stat3_number?: string
  stat3_label?: string
} | null

export function AboutSection({ about, aboutImages }: { about: AboutData; aboutImages?: AboutImage[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.15, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Build images array: use aboutImages if available, otherwise fallback to single image
  const images = aboutImages && aboutImages.length > 0 
    ? aboutImages.map(img => ({ src: img.image_url, alt: img.alt_text || "Imagen del salon" }))
    : [{ src: about?.image_url || "/images/salon.jpg", alt: "Interior del salon Piega" }];

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const showNavigation = images.length > 1;

  return (
    <section
      ref={sectionRef}
      id="salon"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-16"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Image with parallax and carousel */}
        <ScrollReveal direction="left">
          <div className="relative aspect-[4/5] overflow-hidden group">
            {/* Parallax container for scaling effect */}
            <motion.div
              className="absolute inset-0"
              style={{ scale: imageScale, y: imageY }}
            >
              {/* Image carousel with smooth transitions */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentIndex].src || "/placeholder.svg"}
                    alt={images[currentIndex].alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            {/* Navigation buttons - positioned outside parallax for stable positioning */}
            {showNavigation && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--site-bg)]/80 backdrop-blur-sm border border-[var(--site-border)] text-[var(--site-fg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[var(--site-accent)] hover:text-[var(--site-bg)] z-10"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-[var(--site-bg)]/80 backdrop-blur-sm border border-[var(--site-border)] text-[var(--site-fg)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[var(--site-accent)] hover:text-[var(--site-bg)] z-10"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
          
          {/* Dots indicator - positioned completely outside the image container for stable positioning */}
          {showNavigation && (
            <div className="flex justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: i === currentIndex ? "24px" : "8px",
                    backgroundColor: i === currentIndex 
                      ? "var(--site-accent)" 
                      : "var(--site-fg-muted)",
                  }}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          )}
        </ScrollReveal>

        {/* Text content */}
        <div className="flex flex-col gap-8">
          <ScrollReveal delay={0.1}>
            <p
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "var(--site-accent)" }}
            >
              {about?.subtitle || "El Salon"}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h2
              className="text-3xl sm:text-4xl md:text-6xl font-heading font-medium leading-tight"
              style={{ color: "var(--site-fg)" }}
            >
              {about?.title || "Un espacio pensado para vos"}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <p
              className="text-sm md:text-base font-light leading-relaxed"
              style={{ color: "var(--site-fg-muted)" }}
            >
              {about?.paragraph1 || "Piega nacio con la vision de crear un salon donde la calidad, el diseno y la calidez humana se fusionan. Cada detalle de nuestro espacio fue cuidadosamente pensado para que te sientas en un lugar unico desde el momento en que entras."}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p
              className="text-sm md:text-base font-light leading-relaxed"
              style={{ color: "var(--site-fg-muted)" }}
            >
              {about?.paragraph2 || "Trabajamos con productos de primera linea y un equipo de profesionales apasionados por lo que hacen. Porque creemos que cada persona merece una experiencia de belleza excepcional."}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap gap-8 sm:gap-12 mt-4">
              {[
                { number: about?.stat1_number || "10+", label: about?.stat1_label || "Anos de experiencia" },
                { number: about?.stat2_number || "5k+", label: about?.stat2_label || "Clientes felices" },
                { number: about?.stat3_number || "15", label: about?.stat3_label || "Profesionales" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-3xl md:text-4xl font-heading font-medium"
                    style={{ color: "var(--site-accent-secondary)" }}
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
  );
}
