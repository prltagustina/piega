"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  className?: string
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion()

  const directionMap = {
    up: { y: 18, x: 0 },
    down: { y: -18, x: 0 },
    left: { y: 0, x: 18 },
    right: { y: 0, x: -18 },
  }

  const offset = directionMap[direction]
  const safeDelay = Math.min(delay, 0.26)

  return (
    <motion.div
      initial={
        prefersReducedMotion
          ? { opacity: 1, y: 0, x: 0 }
          : { opacity: 0, y: offset.y, x: offset.x }
      }
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.58,
        delay: prefersReducedMotion ? 0 : safeDelay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
      style={{ 
        willChange: "opacity, transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  )
}
