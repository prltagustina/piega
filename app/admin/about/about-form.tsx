"use client"

import { updateAboutSection } from "@/app/admin/actions"
import { FormCard } from "@/components/admin/form-card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type AboutData = {
  id: string
  subtitle: string
  title: string
  paragraph1: string
  paragraph2: string
  image_url: string
  stat1_number: string
  stat1_label: string
  stat2_number: string
  stat2_label: string
  stat3_number: string
  stat3_label: string
}

async function handleUpdate(
  _prevState: { error: string | null; success: boolean },
  formData: FormData
) {
  "use server"
  try {
    await updateAboutSection(formData)
    return { error: null, success: true }
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Error desconocido", success: false }
  }
}

export function AboutForm({ about }: { about: AboutData }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <FormCard
        title="Sobre Nosotros"
        description="Edita la seccion de presentacion del salon."
        action={handleUpdate}
      >
        <input type="hidden" name="id" value={about.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="subtitle">Subtitulo</Label>
            <Input id="subtitle" name="subtitle" defaultValue={about.subtitle} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Titulo</Label>
            <Input id="title" name="title" defaultValue={about.title} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="paragraph1">Parrafo 1</Label>
          <Textarea id="paragraph1" name="paragraph1" defaultValue={about.paragraph1} rows={3} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="paragraph2">Parrafo 2</Label>
          <Textarea id="paragraph2" name="paragraph2" defaultValue={about.paragraph2} rows={3} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="image_url">URL de Imagen</Label>
          <Input id="image_url" name="image_url" defaultValue={about.image_url} />
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-medium text-foreground">Estadisticas</p>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Input name="stat1_number" defaultValue={about.stat1_number} placeholder="Numero" />
              <Input name="stat1_label" defaultValue={about.stat1_label} placeholder="Etiqueta" />
            </div>
            <div className="flex flex-col gap-2">
              <Input name="stat2_number" defaultValue={about.stat2_number} placeholder="Numero" />
              <Input name="stat2_label" defaultValue={about.stat2_label} placeholder="Etiqueta" />
            </div>
            <div className="flex flex-col gap-2">
              <Input name="stat3_number" defaultValue={about.stat3_number} placeholder="Numero" />
              <Input name="stat3_label" defaultValue={about.stat3_label} placeholder="Etiqueta" />
            </div>
          </div>
        </div>
      </FormCard>
    </div>
  )
}
