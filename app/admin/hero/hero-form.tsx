"use client"

import { updateHeroSection } from "@/app/admin/actions"
import { FormCard } from "@/components/admin/form-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type HeroData = {
  id: string
  subtitle: string
  title_line1: string
  title_line2: string
  description: string
  image_url: string
  cta_primary_text: string
  cta_secondary_text: string
}

async function handleUpdate(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  "use server"
  try {
    await updateHeroSection(formData)
    return { error: null, success: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido", success: false }
  }
}

export function HeroForm({ hero }: { hero: HeroData }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <FormCard
        title="Seccion Hero"
        description="Edita el contenido principal de la pagina de inicio."
        action={handleUpdate}
      >
        <input type="hidden" name="id" value={hero.id} />

        <div className="grid gap-2">
          <Label htmlFor="subtitle">Subtitulo</Label>
          <Input id="subtitle" name="subtitle" defaultValue={hero.subtitle} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="title_line1">Titulo Linea 1</Label>
            <Input id="title_line1" name="title_line1" defaultValue={hero.title_line1} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title_line2">Titulo Linea 2</Label>
            <Input id="title_line2" name="title_line2" defaultValue={hero.title_line2} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descripcion</Label>
          <Textarea id="description" name="description" defaultValue={hero.description} rows={3} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image_url">URL de Imagen</Label>
          <Input id="image_url" name="image_url" defaultValue={hero.image_url} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="cta_primary_text">Boton Primario</Label>
            <Input id="cta_primary_text" name="cta_primary_text" defaultValue={hero.cta_primary_text} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cta_secondary_text">Boton Secundario</Label>
            <Input id="cta_secondary_text" name="cta_secondary_text" defaultValue={hero.cta_secondary_text} />
          </div>
        </div>
      </FormCard>
    </div>
  )
}
