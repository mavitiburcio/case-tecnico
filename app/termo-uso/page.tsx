"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, ArrowLeft, UserCheck } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function TermoUsoContent() {
  const [aceito, setAceito] = useState(false)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const email = searchParams.get("email")
  const nome = searchParams.get("nome")

  const isConvite = token && email && nome

  const handleContinuar = () => {
    if (aceito) {
      if (isConvite) {
        window.location.href = `/redefinir-senha?token=${token}&email=${email}&nome=${nome}&convite=true`
      } else {
        window.location.href = "/redefinir-senha"
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div
            className={`mx-auto w-16 h-16 rounded-lg flex items-center justify-center ${isConvite ? "bg-green-600" : "corporate-blue"}`}
          >
            {isConvite ? <UserCheck className="w-8 h-8 text-white" /> : <Shield className="w-8 h-8 text-white" />}
          </div>
          <CardTitle className="text-2xl font-bold corporate-blue-text">Termo de Uso e Privacidade</CardTitle>
          <CardDescription className="text-gray-600">
            {isConvite
              ? `${decodeURIComponent(nome)}, por favor leia nossos termos de uso e política de privacidade (LGPD)`
              : "Por favor, leia atentamente nossos termos de uso e política de privacidade (LGPD)"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isConvite && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Convite aceito para:</strong> {decodeURIComponent(email)}
              </p>
              <p className="text-sm text-green-700 mt-1">
                Após aceitar os termos, você poderá definir sua senha de acesso.
              </p>
            </div>
          )}

          <ScrollArea className="h-64 w-full border rounded-lg p-4">
            <div className="space-y-4 text-sm text-gray-700">
              <h3 className="font-semibold corporate-blue-text">1. COLETA E USO DE DADOS PESSOAIS</h3>
              <p>
                Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), coletamos e utilizamos
                seus dados pessoais exclusivamente para:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Entrega de brindes corporativos</li>
                <li>Comunicação sobre campanhas de engajamento</li>
                <li>Melhoria da experiência do colaborador</li>
                <li>Cumprimento de obrigações legais</li>
              </ul>

              <h3 className="font-semibold corporate-blue-text">2. DADOS COLETADOS</h3>
              <p>Os seguintes dados pessoais podem ser coletados:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Nome completo e e-mail corporativo</li>
                <li>Endereço de entrega (rua, número, CEP, cidade)</li>
                <li>Histórico de recebimento de brindes</li>
                <li>Feedback sobre produtos recebidos</li>
              </ul>

              <h3 className="font-semibold corporate-blue-text">3. COMPARTILHAMENTO DE DADOS</h3>
              <p>
                Seus dados podem ser compartilhados apenas com empresas de logística parceiras para viabilizar a entrega
                dos brindes, sempre sob rigorosos contratos de confidencialidade.
              </p>

              <h3 className="font-semibold corporate-blue-text">4. SEUS DIREITOS</h3>
              <p>Você tem direito a:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou incorretos</li>
                <li>Solicitar a exclusão de dados desnecessários</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>

              <h3 className="font-semibold corporate-blue-text">5. SEGURANÇA</h3>
              <p>
                Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não
                autorizado, alteração, divulgação ou destruição.
              </p>

              <h3 className="font-semibold corporate-blue-text">6. CONTATO</h3>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados, entre em contato conosco
                através do e-mail: privacidade@empresa.com
              </p>
            </div>
          </ScrollArea>

          <div className="flex items-center space-x-2">
            <Checkbox id="aceito" checked={aceito} onCheckedChange={(checked) => setAceito(checked as boolean)} />
            <label
              htmlFor="aceito"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Li e aceito os termos de uso e política de privacidade
            </label>
          </div>

          <div className="flex space-x-4">
            <Link
              href={isConvite ? `/boas-vindas?token=${token}&email=${email}&nome=${nome}` : "/boas-vindas"}
              className="flex-1"
            >
              <Button variant="outline" className="w-full rounded-lg bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <Button
              onClick={handleContinuar}
              disabled={!aceito}
              className={`flex-1 text-white rounded-lg disabled:opacity-50 ${isConvite ? "bg-green-600 hover:bg-green-700" : "corporate-blue hover:bg-[#003366]"}`}
            >
              Aceitar e Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function TermoUso() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <TermoUsoContent />
    </Suspense>
  )
}
