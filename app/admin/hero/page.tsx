import { createClient } from "@/lib/supabase/server"
import { HeroForm } from "./hero-form"

export default async function AdminHeroPage() {
  let hero = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.from("hero_section").select("*").single()
    hero = data
  } catch {
    // Supabase not available
  }

  if (!hero) {
    return (
      <div className="text-muted-foreground">
        No se encontro la seccion Hero en la base de datos.
      </div>
    )
  }

  return <HeroForm hero={hero} />
}
