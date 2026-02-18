import { createClient } from "@/lib/db/server"
import { TeamManager } from "./team-manager"

export default async function AdminTeamPage() {
  let members: Array<Record<string, unknown>> = []
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from("team_members")
      .select("*")
      .order("sort_order", { ascending: true })
    members = data ?? []
  } catch {
    // Supabase not available
  }

  return <TeamManager members={members} />
}
