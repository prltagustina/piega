"use client"

import { useActionState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SubmitButton } from "./submit-button"

type FormCardProps = {
  title: string
  description: string
  action: (prevState: { error: string | null; success: boolean }, formData: FormData) => Promise<{ error: string | null; success: boolean }>
  children: React.ReactNode
  submitLabel?: string
}

export function FormCard({
  title,
  description,
  action,
  children,
  submitLabel = "Guardar cambios",
}: FormCardProps) {
  const [state, formAction] = useActionState(action, { error: null, success: false })

  return (
    <Card className="border-border/50 bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="flex flex-col gap-4">
          {children}
          {state.error && (
            <p className="text-sm text-destructive bg-destructive/10 rounded-md p-2">
              {state.error}
            </p>
          )}
          {state.success && (
            <p className="text-sm text-accent bg-accent/10 rounded-md p-2">
              Cambios guardados correctamente
            </p>
          )}
          <div className="flex justify-end">
            <SubmitButton>{submitLabel}</SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
