"use client"

import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/app/admin/actions"
import { SubmitButton } from "@/components/admin/submit-button"
import { ImageUpload } from "@/components/admin/image-upload"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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

type Member = {
  id: string
  name: string
  role: string
  image_url: string
  sort_order: number
  is_active: boolean
}

export function TeamManager({ members }: { members: Member[] }) {
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {members.length} miembros del equipo
        </p>
        <Dialog open={showCreate} onOpenChange={setShowCreate}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Miembro
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-foreground">Agregar Miembro</DialogTitle>
            </DialogHeader>
            <form
              action={async (formData) => {
                await createTeamMember(formData)
                setShowCreate(false)
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
              <ImageUpload
                name="image_url"
                label="Foto del Miembro"
                folder="team"
              />
              <div className="grid gap-2">
                <Label>Orden</Label>
                <Input name="sort_order" type="number" defaultValue={members.length + 1} />
              </div>
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
        {members.map((member) => (
          <Card key={member.id} className="border-border/50 bg-card overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 py-3 px-4">
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
                  onOpenChange={(open) => !open && setEditingMember(null)}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setEditingMember(member)}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Editar Miembro</DialogTitle>
                    </DialogHeader>
                    {editingMember && (
                      <form
                        action={async (formData) => {
                          await updateTeamMember(formData)
                          setEditingMember(null)
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
                        <ImageUpload
                          name="image_url"
                          label="Foto del Miembro"
                          currentUrl={editingMember.image_url}
                          folder="team"
                        />
                        <div className="grid gap-2">
                          <Label>Orden</Label>
                          <Input name="sort_order" type="number" defaultValue={editingMember.sort_order} />
                        </div>
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
