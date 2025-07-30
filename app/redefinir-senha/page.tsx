"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Lock, CheckCircle, UserCheck } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function RedefinirSenhaContent() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [novaSenha, setNovaSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")

  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const nome = searchParams.get("nome")
  const isConvite = searchParams.get("convite") === "true"

  const handleSalvar = () => {
    if (novaSenha === confirmarSenha && novaSenha.length >= 6) {
      if (isConvite) {
        alert(`Bem-vindo, ${decodeURIComponent(nome || "")}! Sua conta foi criada com sucesso!`)
      } else {
        alert("Senha redefinida com sucesso!")
      }
      window.location.href = "/colaborador/dashboard"
    } else {
      alert("As senhas não coincidem ou são muito curtas!")
    }
  }

  const senhasCoinciden = novaSenha === confirmarSenha && novaSenha.length >= 6

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div
            className={`mx-auto w-16 h-16 rounded-lg flex items-center justify-center ${isConvite ? "bg-green-600" : "corporate-blue"}`}
          >
            {isConvite ? <UserCheck className="w-8 h-8 text-white" /> : <Lock className="w-8 h-8 text-white" />}
          </div>
          <CardTitle className="text-2xl font-bold corporate-blue-text">
            {isConvite ? "Definir Senha" : "Redefinir Senha"}
          </CardTitle>
          <CardDescription className="text-gray-600">
            {isConvite
              ? `${decodeURIComponent(nome || "")}, crie uma senha segura para acessar o portal`
              : "Crie uma nova senha segura para acessar o portal"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isConvite && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Finalizando seu cadastro</strong>
              </p>
              <p className="text-sm text-green-700 mt-1">E-mail: {decodeURIComponent(email || "")}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="nova-senha" className="text-sm font-medium">
              {isConvite ? "Sua Senha" : "Nova Senha"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="nova-senha"
                type={showPassword ? "text" : "password"}
                placeholder={isConvite ? "Crie sua senha" : "Digite sua nova senha"}
                className="pl-10 pr-10 rounded-lg"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmar-senha" className="text-sm font-medium">
              {isConvite ? "Confirmar Senha" : "Confirmar Nova Senha"}
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmar-senha"
                type={showConfirmPassword ? "text" : "password"}
                placeholder={isConvite ? "Confirme sua senha" : "Confirme sua nova senha"}
                className="pl-10 pr-10 rounded-lg"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Requisitos da senha:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className={`flex items-center space-x-2 ${novaSenha.length >= 6 ? "text-green-600" : ""}`}>
                <CheckCircle className={`w-3 h-3 ${novaSenha.length >= 6 ? "text-green-600" : "text-gray-400"}`} />
                <span>Mínimo 6 caracteres</span>
              </li>
              <li className={`flex items-center space-x-2 ${senhasCoinciden ? "text-green-600" : ""}`}>
                <CheckCircle className={`w-3 h-3 ${senhasCoinciden ? "text-green-600" : "text-gray-400"}`} />
                <span>Senhas coincidem</span>
              </li>
            </ul>
          </div>

          <Button
            onClick={handleSalvar}
            disabled={!senhasCoinciden}
            className={`w-full text-white rounded-lg disabled:opacity-50 ${isConvite ? "bg-green-600 hover:bg-green-700" : "corporate-blue hover:bg-[#003366]"}`}
          >
            {isConvite ? "Criar Conta e Acessar Portal" : "Salvar e Acessar Portal"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function RedefinirSenha() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <RedefinirSenhaContent />
    </Suspense>
  )
}
