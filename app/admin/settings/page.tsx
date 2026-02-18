import { createClient } from "@/lib/db/server"
import { SettingsForm } from "./settings-form"

export default async function AdminSettingsPage() {
  let settings = null
  try {
    const supabase = await createClient()
    const { data } = await supabase.from("site_settings").select("*").single()
    settings = data
  } catch {
    // Supabase not available
  }

  if (!settings) {
    return (
      <div className="text-muted-foreground">
        No se encontro la configuracion del sitio en la base de datos.
      </div>
    )
  }

  return <SettingsForm settings={settings} />
}
