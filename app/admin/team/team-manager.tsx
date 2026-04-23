"use client"

import { createTeamMember, updateTeamMember, deleteTeamMember, reorderItem, updateTeamSectionTitle } from "@/app/admin/actions"
import { ImageUploader } from "@/components/admin/image-uploader"
import { SubmitButton } from "@/components/admin/submit-button"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

type Member = {
  id: string
  name: string
  role: string
  image_url: string
  sort_order: number
  is_active: boolean
}

export function TeamManager({ members, sectionTitle }: { members: Member[]; sectionTitle?: { subtitle: string; title: string; description: string } }) {
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [showCreate, setShowCreate] = useState(false)
  const [createImageUrl, setCreateImageUrl] = useState("")
  const [editImageUrl, setEditImageUrl] = useState("")

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <Card className="border-border/50 bg-card">
        <CardHeader>
          <CardTitle>Encabezado de la sección Equipo</CardTitle>
          <p className="text-sm text-muted-foreground">
            Edita el subtítulo, título y descripción que se muestran en la página principal.
          </p>
        </CardHeader>
        <CardContent>
          <form
            action={async (formData) => {
              await updateTeamSectionTitle(formData)
            }}
            className="grid gap-4"
          >
            <input type="hidden" name="section_key" value="team" />
            <div className="grid gap-2">
              <Label htmlFor="section-subtitle">Subtítulo</Label>
              <Input
                id="section-subtitle"
                name="subtitle"
                defaultValue={sectionTitle?.subtitle ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="section-title">Título</Label>
              <Input
                id="section-title"
                name="title"
                defaultValue={sectionTitle?.title ?? ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="section-description">Descripción</Label>
              <Textarea
                id="section-description"
                name="description"
                defaultValue={sectionTitle?.description ?? ""}
                rows={3}
              />
            </div>
            <SubmitButton>Guardar texto de sección</SubmitButton>
          </form>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {members.length} miembros del equipo
        </p>
        <Dialog open={showCreate} onOpenChange={(open) => {
          setShowCreate(open)
          if (!open) setCreateImageUrl("")
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Miembro
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-foreground">Agregar Miembro</DialogTitle>
            </DialogHeader>
            <form
              action={async (formData) => {
                await createTeamMember(formData)
                setShowCreate(false)
                setCreateImageUrl("")
              }}
              className="flex flex-col gap-4"
            >
              <div className="grid gap-2">
                <Label>Nombre</Label>
                <Input name="name" required />
              </div>
              <div className="grid gap-2">
                <Label>Rol</Label>
                <Input name="role" placeholder="Ej: Estilista Senior" />
              </div>
              <div className="grid gap-2">
                <Label>Foto</Label>
                <ImageUploader
                  name="image_url"
                  value={createImageUrl}
                  aspectRatio={3 / 4}
                  folder="team"
                  onUploaded={setCreateImageUrl}
                />
              </div>
              <input type="hidden" name="sort_order" value={members.length + 1} />
              <div className="flex items-center gap-2">
                <Switch name="is_active" defaultChecked />
                <Label>Activo</Label>
              </div>
              <SubmitButton>Agregar Miembro</SubmitButton>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {members.map((member, idx) => (
          <Card key={member.id} className="border-border/50 bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 py-3 px-4">
              <div className="flex flex-col gap-0.5 flex-shrink-0">
                <form action={reorderItem}>
                  <input type="hidden" name="table" value="team_members" />
                  <input type="hidden" name="id" value={member.id} />
                  <input type="hidden" name="direction" value="up" />
                  <input type="hidden" name="revalidate" value="/admin/team" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    type="submit"
                    disabled={idx === 0}
                  >
                    <ChevronUp className="h-3 w-3" />
                    <span className="sr-only">Subir</span>
                  </Button>
                </form>
                <form action={reorderItem}>
                  <input type="hidden" name="table" value="team_members" />
                  <input type="hidden" name="id" value={member.id} />
                  <input type="hidden" name="direction" value="down" />
                  <input type="hidden" name="revalidate" value="/admin/team" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    type="submit"
                    disabled={idx === members.length - 1}
                  >
                    <ChevronDown className="h-3 w-3" />
                    <span className="sr-only">Bajar</span>
                  </Button>
                </form>
              </div>
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                {member.image_url && (
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm text-foreground truncate">
                  {member.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-1 ${
                    member.is_active ? "bg-accent" : "bg-muted-foreground"
                  }`}
                />
                <Dialog
                  open={editingMember?.id === member.id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingMember(null)
                      setEditImageUrl("")
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        setEditingMember(member)
                        setEditImageUrl(member.image_url)
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Editar Miembro</DialogTitle>
                    </DialogHeader>
                    {editingMember && (
                      <form
                        action={async (formData) => {
                          await updateTeamMember(formData)
                          setEditingMember(null)
                          setEditImageUrl("")
                        }}
                        className="flex flex-col gap-4"
                      >
                        <input type="hidden" name="id" value={editingMember.id} />
                        <div className="grid gap-2">
                          <Label>Nombre</Label>
                          <Input name="name" defaultValue={editingMember.name} required />
                        </div>
                        <div className="grid gap-2">
                          <Label>Rol</Label>
                          <Input name="role" defaultValue={editingMember.role} />
                        </div>
                        <div className="grid gap-2">
                          <Label>Foto</Label>
                          <ImageUploader
                            key={editingMember.id}
                            name="image_url"
                            value={editImageUrl}
                            aspectRatio={3 / 4}
                            folder="team"
                            onUploaded={setEditImageUrl}
                          />
                        </div>
                        <input type="hidden" name="sort_order" value={editingMember.sort_order} />
                        <div className="flex items-center gap-2">
                          <Switch name="is_active" defaultChecked={editingMember.is_active} />
                          <Label>Activo</Label>
                        </div>
                        <SubmitButton>Guardar cambios</SubmitButton>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>
                <form action={deleteTeamMember}>
                  <input type="hidden" name="id" value={member.id} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    type="submit"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="sr-only">Eliminar</span>
                  </Button>
                </form>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
