"use client"

import { ArrowLeft, Send, Mail, User, FileText } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"
import { useState } from "react"

export default function ConvidarColaborador() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [mensagem, setMensagem] = useState(`Olá [NOME],

Você foi convidado(a) para participar do nosso Portal de Engajamento de Colaboradores!

Este é um espaço exclusivo onde você poderá:
• Receber brindes corporativos personalizados
• Acompanhar o status das suas entregas
• Confirmar o recebimento dos itens
• Dar feedback sobre os produtos recebidos
• Manter seu endereço sempre atualizado

Para começar, clique no link abaixo e complete seu cadastro:
[LINK_CONVITE]

Caso tenha dúvidas, entre em contato conosco.

Bem-vindo(a) à nossa equipe!

Atenciosamente,
Equipe de Recursos Humanos`)
  const [enviado, setEnviado] = useState(false)

  const gerarLinkConvite = () => {
    // Simular geração de token único
    const token = btoa(`${email}-${Date.now()}`)
      .replace(/[^a-zA-Z0-9]/g, "")
      .substring(0, 32)
    return `${window.location.origin}/boas-vindas?token=${token}&email=${encodeURIComponent(email)}&nome=${encodeURIComponent(nome)}`
  }

  const enviarConvite = () => {
    if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos obrigatórios!")
      return
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert("Por favor, insira um email válido!")
      return
    }

    // Gerar link de convite
    const linkConvite = gerarLinkConvite()

    // Substituir placeholders na mensagem
    const mensagemFinal = mensagem.replace(/\[NOME\]/g, nome).replace(/\[LINK_CONVITE\]/g, linkConvite)

    // Simular envio do email
    console.log("Enviando convite para:", email)
    console.log("Mensagem:", mensagemFinal)
    console.log("Link de convite:", linkConvite)

    // Simular delay de envio
    setTimeout(() => {
      setEnviado(true)
    }, 1000)
  }

  const resetarFormulario = () => {
    setNome("")
    setEmail("")
    setMensagem(`Olá [NOME],

Você foi convidado(a) para participar do nosso Portal de Engajamento de Colaboradores!

Este é um espaço exclusivo onde você poderá:
• Receber brindes corporativos personalizados
• Acompanhar o status das suas entregas
• Confirmar o recebimento dos itens
• Dar feedback sobre os produtos recebidos
• Manter seu endereço sempre atualizado

Para começar, clique no link abaixo e complete seu cadastro:
[LINK_CONVITE]

Caso tenha dúvidas, entre em contato conosco.

Bem-vindo(a) à nossa equipe!

Atenciosamente,
Equipe de Recursos Humanos`)
    setEnviado(false)
  }

  if (enviado) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="corporate-blue text-white p-4">
          <div className="max-w-7xl mx-auto flex items-center space-x-4">
            <Link href="/admin/enderecos">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Convite Enviado!</h1>
              <p className="text-blue-100">O colaborador receberá o convite em breve</p>
            </div>
          </div>
        </header>

        <div className="max-w-2xl mx-auto p-6">
          <Card className="rounded-lg shadow-sm border-green-200 bg-green-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Convite Enviado com Sucesso!</h2>
              <p className="text-green-700 mb-4">
                O convite foi enviado para <strong>{email}</strong>
              </p>
              <p className="text-green-600 text-sm mb-6">
                {nome} receberá um email com as instruções para acessar o portal e completar o cadastro.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={resetarFormulario} className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
                  Enviar Outro Convite
                </Button>
                <Link href="/admin/enderecos">
                  <Button variant="outline" className="rounded-lg bg-transparent">
                    Voltar aos Colaboradores
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="text-green-700">Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-xs">1</span>
                  </div>
                  <p>O colaborador receberá o email de convite na caixa de entrada</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-xs">2</span>
                  </div>
                  <p>Ao clicar no link, será direcionado para a página de boas-vindas</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-xs">3</span>
                  </div>
                  <p>Completará o processo de cadastro e definirá sua senha</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 font-bold text-xs">4</span>
                  </div>
                  <p>Terá acesso completo ao portal de engajamento</p>
                </div>
              </div>
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
          <Link href="/admin/enderecos">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Convidar Novo Colaborador</h1>
            <p className="text-blue-100">Envie um convite para acessar o portal</p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Informações do Convite */}
        <Alert className="border-blue-200 bg-blue-50">
          <Mail className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Como funciona:</strong> O colaborador receberá um email com um link único para acessar o portal. Ao
            clicar no link, será direcionado para completar o cadastro e definir sua senha.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dados do Colaborador */}
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 corporate-blue-text">
                <User className="w-5 h-5" />
                <span>Dados do Colaborador</span>
              </CardTitle>
              <CardDescription>Informações básicas do novo colaborador</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo *</Label>
                <Input
                  id="nome"
                  placeholder="Digite o nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail Corporativo *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="colaborador@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Informações do Convite:</h4>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• O link de convite será válido por 7 dias</li>
                  <li>• O colaborador poderá usar o link apenas uma vez</li>
                  <li>• Após o cadastro, terá acesso imediato ao portal</li>
                  <li>• Receberá notificações sobre campanhas futuras</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Preview do Email */}
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 corporate-blue-text">
                <FileText className="w-5 h-5" />
                <span>Preview do Email</span>
              </CardTitle>
              <CardDescription>Como o colaborador verá o convite</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg p-4 bg-white">
                <div className="border-b pb-2 mb-3">
                  <p className="text-sm text-gray-600">Para: {email || "colaborador@empresa.com"}</p>
                  <p className="text-sm text-gray-600">Assunto: Convite - Portal de Engajamento</p>
                </div>
                <div className="text-sm text-gray-800 whitespace-pre-line">
                  {mensagem
                    .replace(/\[NOME\]/g, nome || "[NOME]")
                    .replace(/\[LINK_CONVITE\]/g, "https://portal.empresa.com/convite/...")}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mensagem do Email */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <Mail className="w-5 h-5" />
              <span>Mensagem do Convite</span>
            </CardTitle>
            <CardDescription>
              Personalize a mensagem que será enviada. Use [NOME] e [LINK_CONVITE] como placeholders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mensagem">Corpo do Email *</Label>
              <Textarea
                id="mensagem"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="rounded-lg min-h-[300px]"
                placeholder="Digite a mensagem do convite..."
              />
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Placeholders disponíveis:</strong>
              </p>
              <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                <li>
                  <code>[NOME]</code> - Será substituído pelo nome do colaborador
                </li>
                <li>
                  <code>[LINK_CONVITE]</code> - Será substituído pelo link único de acesso
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/enderecos">
            <Button variant="outline" className="rounded-lg bg-transparent">
              Cancelar
            </Button>
          </Link>
          <Button
            onClick={enviarConvite}
            disabled={!nome || !email || !mensagem}
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg disabled:opacity-50"
          >
            <Send className="w-4 h-4 mr-2" />
            Enviar Convite
          </Button>
        </div>
      </div>
    </div>
  )
}
