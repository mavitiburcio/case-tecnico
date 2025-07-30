"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle, Star, Send } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ConfirmacaoRecebimento() {
  const [avaliacao, setAvaliacao] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [confirmado, setConfirmado] = useState(false)

  const brinde = {
    nome: "Caneca Personalizada",
    campanha: "Kit Verão 2024",
    dataEntrega: "10/01/2024",
    rastreamento: "BR987654321",
  }

  const handleConfirmar = () => {
    setConfirmado(true)
    // Aqui seria enviado para o backend
  }

  if (confirmado) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="corporate-blue text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center space-x-4">
            <Link href="/colaborador/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Confirmação Enviada!</h1>
              <p className="text-blue-100">Obrigado pelo seu feedback</p>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto p-6">
          <Card className="rounded-lg shadow-sm border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Recebimento Confirmado!</h2>
              <p className="text-green-700 mb-6">Sua confirmação foi registrada com sucesso. Obrigado pelo feedback!</p>
              <Link href="/colaborador/dashboard">
                <Button className="corporate-blue text-white hover:bg-[#003366] rounded-lg">Voltar ao Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="corporate-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-4">
          <Link href="/colaborador/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Confirmação de Recebimento</h1>
            <p className="text-blue-100">Confirme o recebimento do seu brinde</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Informações do Brinde */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Detalhes do Brinde</CardTitle>
            <CardDescription>Informações sobre o item recebido</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Produto</Label>
                <p className="font-semibold">{brinde.nome}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Campanha</Label>
                <p className="font-semibold">{brinde.campanha}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Data de Entrega</Label>
                <p className="font-semibold">{brinde.dataEntrega}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Rastreamento</Label>
                <p className="font-semibold">{brinde.rastreamento}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Confirmação */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="text-green-700">Confirmar Recebimento</CardTitle>
            <CardDescription>Você recebeu este brinde em perfeitas condições?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avaliação por Estrelas */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Como você avalia este brinde?</Label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setAvaliacao(star)} className="focus:outline-none">
                    <Star
                      className={`w-8 h-8 ${star <= avaliacao ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
              {avaliacao > 0 && (
                <p className="text-sm text-gray-600">
                  {avaliacao === 1 && "Muito insatisfeito"}
                  {avaliacao === 2 && "Insatisfeito"}
                  {avaliacao === 3 && "Neutro"}
                  {avaliacao === 4 && "Satisfeito"}
                  {avaliacao === 5 && "Muito satisfeito"}
                </p>
              )}
            </div>

            {/* Feedback */}
            <div className="space-y-2">
              <Label htmlFor="feedback">Feedback (Opcional)</Label>
              <Textarea
                id="feedback"
                placeholder="Conte-nos sobre sua experiência com este brinde..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="rounded-lg"
                rows={4}
              />
            </div>

            {/* Botão de Confirmação */}
            <Button
              onClick={handleConfirmar}
              className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg text-lg py-6"
            >
              <Send className="w-5 h-5 mr-2" />
              Confirmar Recebimento
            </Button>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card className="rounded-lg shadow-sm border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">Importante:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>A confirmação ajuda a melhorar nosso serviço de entrega</li>
                <li>Seu feedback é valioso para futuras campanhas</li>
                <li>Em caso de problemas, entre em contato conosco</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
