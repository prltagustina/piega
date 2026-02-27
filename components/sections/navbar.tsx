"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "El Salón", href: "#salon" },
  { label: "Galería", href: "#galeria" },
  { label: "Equipo", href: "#equipo" },
];

type SettingsData = {
  site_name?: string
  tagline?: string
  booking_url?: string
} | null

export function Navbar({ settings }: { settings?: SettingsData }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      setMenuOpen(false);
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--site-bg)]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 lg:px-16 py-5">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2.5">
            <Image
              src="/images/logo-piega.png"
              alt="Piega"
              width={120}
              height={40}
              className="h-7 md:h-9 w-auto"
              priority
            />
            <span
              className="text-[8px] md:text-[9px] font-heading font-medium leading-[1.3] tracking-[0.04em]"
              style={{ color: "var(--site-fg)" }}
            >
              Hair &<br />Beauty<br />Club
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="site-link text-xs uppercase tracking-[0.2em] font-light"
                style={{ color: "var(--site-fg-muted)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Book button */}
          <div className="flex items-center gap-6">
            <a
              href={settings?.booking_url || "#reservar"}
              className="hidden md:inline-flex text-xs uppercase tracking-[0.2em] px-6 py-3 border font-light transition-colors duration-300 hover:text-[var(--site-bg)]"
              style={{
                borderColor: "var(--site-accent)",
                color: "var(--site-accent)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--site-pink)";
                e.currentTarget.style.color = "var(--site-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--site-pink)";
              }}
            >
              Reservar
            </a>

            {/* Hamburger */}
            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[1px]"
                style={{ backgroundColor: "var(--site-fg)" }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-[1px]"
                style={{ backgroundColor: "var(--site-fg)" }}
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }
                }
                className="block w-6 h-[1px]"
                style={{ backgroundColor: "var(--site-fg)" }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: "var(--site-bg)" }}
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="text-3xl font-heading font-medium tracking-wide"
                style={{ color: "var(--site-fg)" }}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#reservar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-4 text-sm uppercase tracking-[0.2em] px-8 py-3 border"
              style={{
                borderColor: "var(--site-accent)",
                color: "var(--site-accent)",
              }}
              onClick={() => setMenuOpen(false)}
            >
              Reservar turno
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
