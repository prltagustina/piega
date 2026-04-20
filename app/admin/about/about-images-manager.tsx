"use client"

import { createAboutImage, updateAboutImage, deleteAboutImage } from "@/app/admin/actions"
import { SubmitButton } from "@/components/admin/submit-button"
import { ImageUploader } from "@/components/admin/image-uploader"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

type AboutImage = {
  id: string
  image_url: string
  alt_text: string
  sort_order: number
}

export function AboutImagesManager({ images }: { images: AboutImage[] }) {
  const [editingImage, setEditingImage] = useState<AboutImage | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <Card className="max-w-2xl border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">Imagenes del Carrusel</CardTitle>
            <CardDescription>
              Agrega multiples imagenes para mostrar en el carrusel de la seccion Sobre Nosotros.
            </CardDescription>
          </div>
          <Dialog open={showCreate} onOpenChange={setShowCreate}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-primary text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Agregar
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">Agregar Imagen</DialogTitle>
              </DialogHeader>
              <form
                action={async (formData) => {
                  await createAboutImage(formData)
                  setShowCreate(false)
                }}
                className="flex flex-col gap-4"
              >
                <div className="grid gap-2">
                  <Label>Imagen</Label>
                  <ImageUploader
                    name="image_url"
                    value=""
                    aspectRatio={4 / 5}
                    folder="about"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Texto alternativo</Label>
                  <Input name="alt_text" placeholder="Descripcion de la imagen" />
                </div>
                <input type="hidden" name="sort_order" value={images.length + 1} />
                <SubmitButton>Agregar Imagen</SubmitButton>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No hay imagenes. Agrega una para comenzar.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {images.map((img) => (
              <div key={img.id} className="relative group aspect-[4/5] overflow-hidden rounded-md">
                <Image
                  src={img.image_url || "/placeholder.svg"}
                  alt={img.alt_text || "Imagen del carrusel"}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Dialog
                    open={editingImage?.id === img.id}
                    onOpenChange={(open) => !open && setEditingImage(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setEditingImage(img)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle className="text-foreground">Editar Imagen</DialogTitle>
                      </DialogHeader>
                      {editingImage && (
                        <form
                          action={async (formData) => {
                            await updateAboutImage(formData)
                            setEditingImage(null)
                          }}
                          className="flex flex-col gap-4"
                        >
                          <input type="hidden" name="id" value={editingImage.id} />
                          <div className="grid gap-2">
                            <Label>Imagen</Label>
                            <ImageUploader
                              name="image_url"
                              value={editingImage.image_url}
                              aspectRatio={4 / 5}
                              folder="about"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Texto alternativo</Label>
                            <Input name="alt_text" defaultValue={editingImage.alt_text} />
                          </div>
                          <input type="hidden" name="sort_order" value={editingImage.sort_order} />
                          <SubmitButton>Guardar cambios</SubmitButton>
                        </form>
                      )}
                    </DialogContent>
                  </Dialog>
                  <form action={deleteAboutImage}>
                    <input type="hidden" name="id" value={img.id} />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      type="submit"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
