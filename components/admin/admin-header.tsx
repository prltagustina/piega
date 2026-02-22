"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ExternalLink } from "lucide-react"

const pageTitles: Record<string, string> = {
  "/admin": "Vista General",
  "/admin/hero": "Seccion Hero",
  "/admin/about": "Sobre Nosotros",
  "/admin/services": "Servicios",
  "/admin/team": "Equipo",
  "/admin/gallery": "Galeria",
  "/admin/settings": "Configuracion del Sitio",
}

export function AdminHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Panel de Administracion"

  return (
    <header className="flex h-14 items-center gap-4 border-b border-border/50 px-4 md:px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-lg font-medium text-foreground">{title}</h1>
      <div className="ml-auto">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          <span>Ver Sitio</span>
        </Link>
      </div>
    </header>
  )
}
