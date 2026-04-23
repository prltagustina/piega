import { createClient } from "@/lib/supabase/server"
import { TeamManager } from "./team-manager"
import { TeamForm } from "./team-form"

export default async function AdminTeamPage() {
  let members: { id: string; name: string; role: string; image_url: string; sort_order: number; is_active: boolean }[] = []
  let teamSection: { id: string; subtitle: string; title: string; description: string } | null = null
  
  try {
    const supabase = await createClient()
    const [membersRes, sectionRes] = await Promise.all([
      supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("team_section")
        .select("*")
        .single(),
    ])
    
    if (membersRes.data) members = membersRes.data as typeof members
    if (sectionRes.data) teamSection = sectionRes.data as typeof teamSection
  } catch {
    // Supabase not available
  }

  if (!teamSection) {
    return (
      <div className="text-muted-foreground">
        No se encontro la seccion de equipo en la base de datos.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <TeamForm team={teamSection} />
      <TeamManager members={members} />
    </div>
  )
}
