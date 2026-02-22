import { createClient } from "@/lib/supabase/server"
import { TeamManager } from "./team-manager"

export default async function AdminTeamPage() {
  let members: { id: string; name: string; role: string; image_url: string; sort_order: number; is_active: boolean }[] = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
    if (data) members = data as typeof members
  } catch {
    // Supabase not available
  }

  return <TeamManager members={members} />
}
