"use client"

import { Suspense, useState } from "react"
import { createClient } from "@/lib/supabase/client"
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
import { useRouter, useSearchParams } from "next/navigation"
import { Lock, Mail, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

function LoginPageContent() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const hasSupabaseConfig = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
  const loginReason = searchParams.get("reason")

  const helperMessage = hasSupabaseConfig
    ? loginReason === "auth-required"
      ? "Inicia sesion para acceder al panel de administracion."
      : null
    : "Falta configurar Supabase en este entorno. Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY para habilitar el ingreso al panel."

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      router.replace("/admin")
      router.refresh()
    } catch (error: unknown) {
      setError(
        error instanceof Error
          ? error.message === "Invalid login credentials"
            ? "Credenciales incorrectas. Verifica tu email y contrasena."
            : error.message === "Supabase env vars missing"
              ? "No se puede iniciar sesion porque faltan las variables de entorno de Supabase."
            : error.message
          : "Ocurrio un error inesperado"
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo-piega.png"
                alt="Piega"
                width={140}
                height={46}
                className="h-10 w-auto"
                priority
              />
              <span className="text-[9px] font-heading font-medium leading-[1.3] tracking-[0.04em] text-primary">
                Hair &<br />Beauty<br />Club
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Panel de Administracion
            </p>
          </div>

          <Card className="border-border/50 bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-xl text-foreground">
                Iniciar Sesion
              </CardTitle>
              <CardDescription>
                Ingresa tus credenciales para acceder al panel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="admin@piega.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-input border-border"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-foreground">
                      Contrasena
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-input border-border"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        tabIndex={-1}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  {helperMessage && (
                    <p className="text-sm rounded-md bg-secondary p-2 text-secondary-foreground">
                      {helperMessage}
                    </p>
                  )}
                  {error && (
                    <p className="text-sm text-destructive rounded-md bg-destructive/10 p-2">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    disabled={isLoading || !hasSupabaseConfig}
                  >
                    {isLoading ? "Ingresando..." : "Ingresar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <p className="text-center text-xs text-muted-foreground">
            Acceso exclusivo para administradores autorizados
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginPageContent />
    </Suspense>
  )
}
