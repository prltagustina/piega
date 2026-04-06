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
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [menuOpen]);

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
              href={settings?.booking_url || "https://piega.site.agendapro.com/ar/sucursal/486410"}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex text-xs uppercase tracking-[0.2em] px-6 py-3 border font-light transition-all duration-300"
              style={{
                borderColor: "var(--site-accent)",
                color: scrolled ? "var(--site-bg)" : "var(--site-accent)",
                backgroundColor: scrolled ? "var(--site-accent)" : "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--site-pink)";
                e.currentTarget.style.color = "var(--site-bg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = scrolled ? "var(--site-accent)" : "transparent";
                e.currentTarget.style.color = scrolled ? "var(--site-bg)" : "var(--site-pink)";
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
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href={settings?.booking_url || "https://piega.site.agendapro.com/ar/sucursal/486410"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-4 text-sm uppercase tracking-[0.2em] px-8 py-3 border"
              style={{
                borderColor: "var(--site-accent)",
                color: "var(--site-bg)",
                backgroundColor: "var(--site-accent)",
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
