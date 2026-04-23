"use client"

import { handleTeamUpdate } from "@/app/admin/action-wrappers"
import { FormCard } from "@/components/admin/form-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type TeamSectionData = {
  id: string
  subtitle: string
  title: string
  description: string
}

export function TeamForm({ team }: { team: TeamSectionData }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <FormCard
        title="Sección de Equipo"
        description="Edita el título, subtítulo y descripción de la sección de equipo."
        action={handleTeamUpdate}
      >
        <input type="hidden" name="id" value={team.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="subtitle">Etiqueta</Label>
            <Input id="subtitle" name="subtitle" defaultValue={team.subtitle} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" defaultValue={team.title} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descripción</Label>
          <Textarea id="description" name="description" defaultValue={team.description} rows={3} />
        </div>
      </FormCard>
    </div>
  )
}
