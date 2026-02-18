import { createClient } from "@/lib/supabase/server"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sparkles, Users, ImageIcon, Settings } from "lucide-react"
import Link from "next/link"

export default async function AdminPage() {
  const supabase = await createClient()

  const [servicesRes, teamRes, galleryRes, settingsRes] = await Promise.all([
    supabase.from("services").select("id", { count: "exact" }),
    supabase.from("team_members").select("id", { count: "exact" }),
    supabase.from("gallery_images").select("id", { count: "exact" }),
    supabase.from("site_settings").select("*").single(),
  ])

  const stats = [
    {
      title: "Servicios",
      count: servicesRes.count ?? 0,
      icon: Sparkles,
      href: "/admin/services",
      description: "Servicios activos en el sitio",
    },
    {
      title: "Miembros del Equipo",
      count: teamRes.count ?? 0,
      icon: Users,
      href: "/admin/team",
      description: "Profesionales del equipo",
    },
    {
      title: "Imagenes en Galeria",
      count: galleryRes.count ?? 0,
      icon: ImageIcon,
      href: "/admin/gallery",
      description: "Fotos en la galeria",
    },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-serif text-foreground">
          Bienvenido al Panel
        </h2>
        <p className="text-muted-foreground mt-1">
          Gestiona el contenido de tu sitio web desde aqui.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.href} href={stat.href}>
            <Card className="border-border/50 bg-card hover:bg-secondary/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {stat.count}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {settingsRes.data && (
        <Card className="border-border/50 bg-card">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Informacion del Sitio
            </CardTitle>
            <CardDescription>
              Datos de contacto y redes sociales actuales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Nombre del Salon
                </span>
                <span className="text-sm text-foreground">
                  {settingsRes.data.site_name}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Telefono</span>
                <span className="text-sm text-foreground">
                  {settingsRes.data.phone}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Email</span>
                <span className="text-sm text-foreground">
                  {settingsRes.data.email}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">
                  Direccion
                </span>
                <span className="text-sm text-foreground">
                  {settingsRes.data.address}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Link href="/admin/hero">
          <Card className="border-border/50 bg-card hover:bg-secondary/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="text-foreground text-sm">
                Seccion Hero
              </CardTitle>
              <CardDescription>
                Modifica el titulo principal, subtitulo e imagen del banner
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/about">
          <Card className="border-border/50 bg-card hover:bg-secondary/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle className="text-foreground text-sm">
                Sobre Nosotros
              </CardTitle>
              <CardDescription>
                Actualiza la historia y descripcion del salon
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}
