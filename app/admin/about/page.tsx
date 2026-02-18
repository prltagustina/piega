import { createClient } from "@/lib/db/server"
import { AboutForm } from "./about-form"

export default async function AdminAboutPage() {
  let about = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.from("about_section").select("*").single()
    about = data
  } catch {
    // Supabase not available
  }

  if (!about) {
    return (
      <div className="text-muted-foreground">
        No se encontro la seccion Sobre Nosotros en la base de datos.
      </div>
    )
  }

  return <AboutForm about={about} />
}
