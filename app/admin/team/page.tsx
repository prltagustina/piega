import { createClient } from "@/lib/supabase/server"
import { TeamManager } from "./team-manager"

export default async function AdminTeamPage() {
  let members: { id: string; name: string; role: string; image_url: string; sort_order: number; is_active: boolean }[] = []
  let sectionTitle = { subtitle: "", title: "", description: "" }

  try {
    const supabase = await createClient()
    const [{ data: membersData }, { data: sectionData }] = await Promise.all([
      supabase.from("team_members").select("*").order("sort_order", { ascending: true }),
      supabase.from("section_titles").select("subtitle,title,description").eq("section_key", "team").single(),
    ])

    if (membersData) members = membersData as typeof members
    if (sectionData) sectionTitle = sectionData as typeof sectionTitle
  } catch {
    // Supabase not available
  }

  return <TeamManager members={members} sectionTitle={sectionTitle} />
}
