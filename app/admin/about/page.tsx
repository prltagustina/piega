import { createClient } from "@/lib/supabase/server"
import { AboutForm } from "./about-form"

export default async function AdminAboutPage() {
  const supabase = await createClient()
  const { data: about } = await supabase.from("about_section").select("*").single()

  if (!about) {
    return (
      <div className="text-muted-foreground">
        No se encontro la seccion Sobre Nosotros en la base de datos.
      </div>
    )
  }

  return <AboutForm about={about} />
}
