"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function EsqueciSenha() {
  const [email, setEmail] = useState("")
  const [enviado, setEnviado] = useState(false)

  const handleEnviar = () => {
    if (email) {
      setEnviado(true)
    }
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">E-mail Enviado!</CardTitle>
            <CardDescription className="text-gray-600">
              Enviamos um link para redefinição de senha para o e-mail {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                Verifique sua caixa de entrada e spam. O link expira em 24 horas.
              </p>
            </div>
            <Link href="/">
              <Button className="w-full corporate-blue text-white hover:bg-[#003366] rounded-lg">
                Voltar ao Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 corporate-blue rounded-lg flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold corporate-blue-text">Esqueci Minha Senha</CardTitle>
          <CardDescription className="text-gray-600">
            Digite seu e-mail para receber um link de redefinição de senha
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="pl-10 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <Button
            onClick={handleEnviar}
            disabled={!email}
            className="w-full corporate-blue text-white hover:bg-[#003366] rounded-lg disabled:opacity-50"
          >
            Enviar Link de Redefinição
          </Button>

          <Link href="/">
            <Button variant="outline" className="w-full rounded-lg bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Login
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
