import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { ContactForm } from "./contact-form"

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: contact } = await supabase
    .from("contact_section")
    .select("*")
    .single()

  // Default values if no data exists
  const contactData = contact || {
    id: "",
    subtitle: "Reserva tu experiencia",
    title: "Tu momento de belleza te espera",
    description: "Agenda tu turno de manera simple y rapida. Elegis el servicio, el profesional y el horario que mas te convenga.",
    image_url: "",
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-foreground">
          Contacto
        </h1>
        <p className="text-sm text-muted-foreground">
          Edita la seccion de contacto y reservas del sitio.
        </p>
      </div>
      <ContactForm contact={contactData} />
    </div>
  )
}
