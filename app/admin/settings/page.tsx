import { createClient } from "@/lib/supabase/server"
import { SettingsForm } from "./settings-form"

export default async function AdminSettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from("site_settings").select("*").single()

  if (!settings) {
    return (
      <div className="text-muted-foreground">
        No se encontro la configuracion del sitio en la base de datos.
      </div>
    )
  }

  return <SettingsForm settings={settings} />
}
