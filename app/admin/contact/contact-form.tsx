"use client"

import { handleContactUpdate } from "@/app/admin/action-wrappers"
import { FormCard } from "@/components/admin/form-card"
import { ImageUploader } from "@/components/admin/image-uploader"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type ContactData = {
  id: string
  subtitle: string
  title: string
  description: string
  image_url: string
}

export function ContactForm({ contact }: { contact: ContactData }) {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <FormCard
        title="Seccion de Contacto"
        description="Edita el contenido de la seccion de contacto y reservas."
        action={handleContactUpdate}
      >
        <input type="hidden" name="id" value={contact.id} />

        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="subtitle">Subtitulo</Label>
            <Input id="subtitle" name="subtitle" defaultValue={contact.subtitle} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Titulo</Label>
            <Input id="title" name="title" defaultValue={contact.title} />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descripcion</Label>
          <Textarea id="description" name="description" defaultValue={contact.description} rows={3} />
        </div>

        <div className="grid gap-2">
          <Label>Imagen de fondo</Label>
          <ImageUploader
            name="image_url"
            value={contact.image_url}
            aspectRatio={16 / 9}
            folder="contact"
          />
        </div>
      </FormCard>
    </div>
  )
}
