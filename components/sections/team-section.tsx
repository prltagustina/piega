"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "./scroll-reveal";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  image_url: string;
};

type TeamSectionData = {
  subtitle?: string;
  title?: string;
  description?: string;
} | null;

const defaultTeam: TeamMember[] = [
  {
    id: "1",
    name: "Sofia Martinez",
    role: "Directora Creativa",
    image_url: "/images/team.jpg",
  },
  {
    id: "2",
    name: "Valentina Rossi",
    role: "Colorista Senior",
    image_url: "/images/gallery-1.jpg",
  },
  {
    id: "3",
    name: "Camila Torres",
    role: "Especialista en Spa",
    image_url: "/images/gallery-2.jpg",
  },
  {
    id: "4",
    name: "Lucia Fernandez",
    role: "Estilista",
    image_url: "/images/gallery-3.jpg",
  },
];

export function TeamSection({ team: propTeam, teamSection }: { team: TeamMember[]; teamSection?: TeamSectionData }) {
  const team = propTeam.length > 0 ? propTeam : defaultTeam;
  
  // Use provided section data or defaults
  const sectionData = teamSection || {
    subtitle: "Nuestro Equipo",
    title: "Artistas del estilo",
    description: "Un equipo de profesionales apasionadas por la belleza y el bienestar, dedicadas a realzar tu mejor versión.",
  };
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10,
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateHoverSupport = () => setCanHover(mediaQuery.matches);

    updateHoverSupport();
    mediaQuery.addEventListener("change", updateHoverSupport);

    return () => mediaQuery.removeEventListener("change", updateHoverSupport);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth =
        container.querySelector(".team-card")?.clientWidth || 400;
      const scrollAmount =
        direction === "left" ? -cardWidth - 24 : cardWidth + 24;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 1.5;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <section id="equipo" className="py-24 md:py-32 overflow-hidden">
      <div className="px-6 md:px-12 lg:px-16">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12 md:mb-16">
            <div>
              <p
                className="text-xs uppercase tracking-[0.3em] mb-4"
                style={{ color: "var(--site-accent)" }}
              >
                {sectionData?.subtitle || "Nuestro Equipo"}
              </p>
              <h2
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-medium leading-tight"
                style={{ color: "var(--site-fg)" }}
              >
                {sectionData?.title || "Artistas del estilo"}
              </h2>
            </div>
            <p
              className="text-sm font-light max-w-sm leading-relaxed"
              style={{ color: "var(--site-fg-muted)" }}
            >
              {sectionData?.description || "Un equipo de profesionales apasionadas por la belleza y el bienestar, dedicadas a realzar tu mejor versión."}
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll container */}
      <div className="relative">
        {/* Navigation buttons - hidden on mobile, visible from sm up */}
        <button
          onClick={() => scroll("left")}
          className={`absolute left-8 md:left-14 lg:left-20 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 hidden sm:flex items-center justify-center rounded-full bg-[var(--site-bg)]/90 backdrop-blur-sm border border-[var(--site-border)] text-[var(--site-fg)] transition-all duration-300 hover:bg-[var(--site-accent)] hover:text-[var(--site-bg)] ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Anterior"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className={`absolute right-8 md:right-14 lg:right-20 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 hidden sm:flex items-center justify-center rounded-full bg-[var(--site-bg)]/90 backdrop-blur-sm border border-[var(--site-border)] text-[var(--site-fg)] transition-all duration-300 hover:bg-[var(--site-accent)] hover:text-[var(--site-bg)] ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Siguiente"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Scrollable container - proper padding and touch handling to prevent layout shift */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          onMouseDown={canHover ? handleMouseDown : undefined}
          onMouseUp={canHover ? handleMouseUp : undefined}
          onMouseLeave={canHover ? handleMouseUp : undefined}
          onMouseMove={canHover ? handleMouseMove : undefined}
          className={`flex items-start gap-4 sm:gap-5 md:gap-6 overflow-x-auto scrollbar-hide pb-4 px-8 md:px-16 lg:px-24 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x pinch-zoom",
            overscrollBehaviorX: "contain",
            scrollPaddingLeft: "2rem",
            scrollPaddingRight: "2rem",
          }}
        >
          {team.map((member, i) => (
            <ScrollReveal
              key={member.id || member.name}
              delay={i * 0.1}
              className="flex-shrink-0"
            >
              <motion.div
                className="team-card group w-[82vw] min-w-[260px] max-w-[320px] sm:w-[280px] sm:min-w-[280px] sm:max-w-[280px] md:w-[340px] md:min-w-[340px] md:max-w-[340px] lg:w-[380px] lg:min-w-[380px] lg:max-w-[380px] xl:w-[420px] xl:min-w-[420px] xl:max-w-[420px]"
                style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
                whileHover={canHover ? "hover" : undefined}
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <motion.div
                    className="absolute inset-0"
                    variants={{
                      hover: { scale: 1.05 },
                    }}
                    transition={{
                      duration: 0.6,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Image
                      src={member.image_url || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, (max-width: 1024px) 380px, 420px"
                      draggable={false}
                    />
                  </motion.div>

                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6"
                    initial={{ opacity: 0 }}
                    variants={{
                      hover: { opacity: 1 },
                    }}
                    transition={{ duration: 0.4 }}
                    style={{
                      background:
                        "linear-gradient(to top, rgba(92,82,120,0.95) 0%, rgba(92,82,120,0.4) 40%, transparent 70%)",
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

                {/* Name and role below image */}
                <div className="mt-5">
                  <h3
                    className="text-2xl md:text-3xl font-heading font-medium transition-colors duration-300 group-hover:text-[var(--site-accent)]"
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
      </div>

      {/* Scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-8 px-6">
        {team.map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[var(--site-fg-muted)]/30"
          />
        ))}
      </div>
    </section>
  );
}
