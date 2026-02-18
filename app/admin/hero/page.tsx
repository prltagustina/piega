import { createClient } from "@/lib/supabase/server"
import { HeroForm } from "./hero-form"

export default async function AdminHeroPage() {
  const supabase = await createClient()
  const { data: hero } = await supabase.from("hero_section").select("*").single()

  if (!hero) {
    return (
      <div className="text-muted-foreground">
        No se encontro la seccion Hero en la base de datos.
      </div>
    )
  }

  return <HeroForm hero={hero} />
}
