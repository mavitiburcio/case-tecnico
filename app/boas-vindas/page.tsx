"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowRight, UserCheck } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function BoasVindasContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const nome = searchParams.get("nome")

  const isConvite = token && email && nome

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center space-y-6">
          <div
            className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${isConvite ? "bg-green-600" : "corporate-blue"}`}
          >
            {isConvite ? <UserCheck className="w-10 h-10 text-white" /> : <Heart className="w-10 h-10 text-white" />}
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold corporate-blue-text">
              {isConvite ? `Bem-vindo, ${decodeURIComponent(nome)}!` : "Bem-vindo ao Portal de Engajamento"}
            </CardTitle>
            <CardDescription className="text-gray-600 text-lg">
              {isConvite
                ? "Você foi convidado para fazer parte do nosso portal! Complete seu cadastro para começar."
                : "Estamos felizes em tê-lo conosco! Este é seu espaço para acompanhar e receber seus brindes corporativos."}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {isConvite && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Seu convite foi aceito!</h3>
              <p className="text-sm text-green-700">
                E-mail: <strong>{decodeURIComponent(email)}</strong>
              </p>
              <p className="text-sm text-green-600 mt-2">Agora você precisa definir sua senha para acessar o portal.</p>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold corporate-blue-text mb-2">O que você pode fazer aqui:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Acompanhar o status dos seus brindes</li>
              <li>• Atualizar seu endereço de entrega</li>
              <li>• Confirmar o recebimento dos itens</li>
              <li>• Ver o histórico de todas as campanhas</li>
              {isConvite && <li>• Participar de campanhas exclusivas</li>}
            </ul>
          </div>

          <Link href={`/termo-uso${isConvite ? `?token=${token}&email=${email}&nome=${nome}` : ""}`}>
            <Button
              className={`w-full text-white rounded-lg text-lg py-6 ${isConvite ? "bg-green-600 hover:bg-green-700" : "corporate-blue hover:bg-[#003366]"}`}
            >
              {isConvite ? "Completar Cadastro" : "Continuar para Termo de Uso"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>

          <div className="text-center">
            <Link href="/">
              <Button variant="link" className="text-sm corporate-blue-text">
                Já tenho uma conta? Fazer login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BoasVindas() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <BoasVindasContent />
    </Suspense>
  )
}
