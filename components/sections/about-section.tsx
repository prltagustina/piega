"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Reduced parallax values for smoother mobile experience
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;

    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setIsScrolling(false);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = Math.abs(touch.clientY - touchStartY);

    // If this is the first move and horizontal movement is detected, start scrolling
    if (!isScrolling && Math.abs(deltaX) > 10 && Math.abs(deltaX) > deltaY) {
      setIsScrolling(true);
    }

    // If we're scrolling horizontally, handle it manually
    if (isScrolling) {
      e.preventDefault();
      scrollContainerRef.current.scrollLeft = scrollLeft - deltaX;
    }
  };

  const handleTouchEnd = () => {
    setIsScrolling(false);
  };

  // Mouse drag handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;

    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Increased sensitivity
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Prioritize the image already saved on the main about section, then append carousel images.
  const images = [
    ...(about?.image_url
      ? [{ src: about.image_url, alt: about?.title || "Interior del salon Piega" }]
      : []),
    ...((aboutImages ?? [])
      .filter((img) => img.image_url && img.image_url !== about?.image_url)
      .map((img) => ({ src: img.image_url, alt: img.alt_text || "Imagen del salon" }))),
  ]

  if (images.length === 0) {
    images.push({ src: "/images/salon.jpg", alt: "Interior del salon Piega" })
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const slides = Array.from(
        container.querySelectorAll<HTMLElement>("[data-salon-slide]")
      )
      if (slides.length === 0) return

      let activeSlide = 0
      let minDistance = Number.POSITIVE_INFINITY

      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - container.scrollLeft)
        if (distance < minDistance) {
          minDistance = distance
          activeSlide = index
        }
      })

      setCurrentIndex(activeSlide)
    }

    handleScroll()
    container.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      container.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [images.length])

  const nextSlide = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const nextIndex = (currentIndex + 1) % images.length
    const slide = container.querySelectorAll<HTMLElement>("[data-salon-slide]")[nextIndex]
    if (slide) {
      container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
    }
  }

  const prevSlide = () => {
    const container = scrollContainerRef.current
    if (!container) return
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    const slide = container.querySelectorAll<HTMLElement>("[data-salon-slide]")[prevIndex]
    if (slide) {
      container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
    }
  }

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
          <div className="flex flex-col gap-4">
            <div
              ref={scrollContainerRef}
              className={`flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              } select-none`}
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-x pinch-zoom",
                scrollPaddingLeft: "0px",
                scrollPaddingRight: "0px",
                userSelect: "none",
                overscrollBehaviorX: "contain",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {images.map((image) => (
                <motion.div
                  key={image.src}
                  data-salon-slide
                  className="relative aspect-[4/5] min-w-full snap-center overflow-hidden"
                  style={{ scale: imageScale, y: imageY }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                  />
                </motion.div>
              ))}
            </div>
          
            {showNavigation && (
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
                  style={{ color: "var(--site-fg-muted)" }}
                  aria-label="Imagen anterior"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                
                <div className="flex gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const container = scrollContainerRef.current
                        const slide = container?.querySelectorAll<HTMLElement>("[data-salon-slide]")[i]
                        if (!container || !slide) return
                        container.scrollTo({ left: slide.offsetLeft, behavior: "smooth" })
                      }}
                      className="h-1.5 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: i === currentIndex ? "28px" : "8px",
                        backgroundColor:
                          i === currentIndex
                            ? "var(--site-accent)"
                            : "rgba(212, 204, 196, 0.45)",
                      }}
                      aria-label={`Ir a imagen ${i + 1}`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full transition-colors duration-200 hover:bg-white/10"
                  style={{ color: "var(--site-fg-muted)" }}
                  aria-label="Imagen siguiente"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>
              </div>
            )}
          </div>
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
