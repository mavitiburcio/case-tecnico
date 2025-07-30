"use client"

import { ArrowLeft, Send, Users, MessageSquare, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"
import { useSearchParams } from "next/navigation"

export default function EnviarMensagem() {
  const searchParams = useSearchParams()
  const colaboradorIdParam = searchParams.get("colaborador")

  const [destinatarios, setDestinatarios] = useState<string[]>(colaboradorIdParam ? [colaboradorIdParam] : [])
  const [assunto, setAssunto] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [tipoEnvio, setTipoEnvio] = useState("individual")
  const [busca, setBusca] = useState("")

  const colaboradores = [
    { id: "1", nome: "Pedro Silva", email: "pedro@empresa.com", setor: "TI" },
    { id: "2", nome: "Maria Santos", email: "maria@empresa.com", setor: "RH" },
    { id: "3", nome: "João Oliveira", email: "joao@empresa.com", setor: "Vendas" },
    { id: "4", nome: "Ana Costa", email: "ana@empresa.com", setor: "Marketing" },
    { id: "5", nome: "Carlos Lima", email: "carlos@empresa.com", setor: "Financeiro" },
    { id: "6", nome: "Lucia Ferreira", email: "lucia@empresa.com", setor: "TI" },
    { id: "7", nome: "Roberto Alves", email: "roberto@empresa.com", setor: "Vendas" },
    { id: "8", nome: "Fernanda Costa", email: "fernanda@empresa.com", setor: "Marketing" },
  ]

  const colaboradoresFiltrados = colaboradores.filter(
    (c) =>
      c.nome.toLowerCase().includes(busca.toLowerCase()) ||
      c.email.toLowerCase().includes(busca.toLowerCase()) ||
      c.setor.toLowerCase().includes(busca.toLowerCase()),
  )

  const handleDestinatarioChange = (colaboradorId: string, checked: boolean) => {
    if (checked) {
      setDestinatarios([...destinatarios, colaboradorId])
    } else {
      setDestinatarios(destinatarios.filter((id) => id !== colaboradorId))
    }
  }

  const selecionarTodos = () => {
    if (destinatarios.length === colaboradores.length) {
      setDestinatarios([])
    } else {
      setDestinatarios(colaboradores.map((c) => c.id))
    }
  }

  const selecionarPorSetor = (setor: string) => {
    const colaboradoresSetor = colaboradores.filter((c) => c.setor === setor).map((c) => c.id)
    setDestinatarios([...new Set([...destinatarios, ...colaboradoresSetor])])
  }

  const enviarMensagem = () => {
    if (!assunto || !mensagem || destinatarios.length === 0) {
      alert("Por favor, preencha todos os campos e selecione pelo menos um destinatário!")
      return
    }

    // Simular envio
    const destinatariosNomes = colaboradores
      .filter((c) => destinatarios.includes(c.id))
      .map((c) => c.nome)
      .join(", ")

    alert(`Mensagem enviada com sucesso para: ${destinatariosNomes}`)

    // Limpar formulário
    setAssunto("")
    setMensagem("")
    setDestinatarios([])
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
            <h1 className="text-2xl font-bold">Enviar Mensagem</h1>
            <p className="text-blue-100">Comunique-se com os colaboradores</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário de Mensagem */}
          <div className="lg:col-span-2">
            <Card className="rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 corporate-blue-text">
                  <MessageSquare className="w-5 h-5" />
                  <span>Nova Mensagem</span>
                </CardTitle>
                <CardDescription>Envie mensagens para colaboradores selecionados</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo de Envio</Label>
                  <Select value={tipoEnvio} onValueChange={setTipoEnvio}>
                    <SelectTrigger className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="grupo">Em Grupo</SelectItem>
                      <SelectItem value="todos">Todos os Colaboradores</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto *</Label>
                  <Input
                    id="assunto"
                    placeholder="Digite o assunto da mensagem"
                    value={assunto}
                    onChange={(e) => setAssunto(e.target.value)}
                    className="rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Digite sua mensagem aqui..."
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    className="rounded-lg"
                    rows={8}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Destinatários selecionados:</strong> {destinatarios.length} colaborador(es)
                  </p>
                  {destinatarios.length > 0 && (
                    <p className="text-sm text-blue-700 mt-1">
                      {colaboradores
                        .filter((c) => destinatarios.includes(c.id))
                        .map((c) => c.nome)
                        .join(", ")}
                    </p>
                  )}
                </div>

                <Button
                  onClick={enviarMensagem}
                  className="w-full corporate-blue text-white hover:bg-[#003366] rounded-lg"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Seleção de Destinatários */}
          <div>
            <Card className="rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 corporate-blue-text">
                  <Users className="w-5 h-5" />
                  <span>Destinatários</span>
                </CardTitle>
                <CardDescription>Selecione os colaboradores</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar colaboradores..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10 rounded-lg"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={selecionarTodos} variant="outline" size="sm" className="rounded-lg bg-transparent">
                    {destinatarios.length === colaboradores.length ? "Desmarcar Todos" : "Todos"}
                  </Button>
                  <Button
                    onClick={() => selecionarPorSetor("TI")}
                    variant="outline"
                    size="sm"
                    className="rounded-lg bg-transparent"
                  >
                    TI
                  </Button>
                  <Button
                    onClick={() => selecionarPorSetor("RH")}
                    variant="outline"
                    size="sm"
                    className="rounded-lg bg-transparent"
                  >
                    RH
                  </Button>
                  <Button
                    onClick={() => selecionarPorSetor("Vendas")}
                    variant="outline"
                    size="sm"
                    className="rounded-lg bg-transparent"
                  >
                    Vendas
                  </Button>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {colaboradoresFiltrados.map((colaborador) => (
                    <div key={colaborador.id} className="flex items-center space-x-3 p-2 border rounded-lg">
                      <Checkbox
                        id={colaborador.id}
                        checked={destinatarios.includes(colaborador.id)}
                        onCheckedChange={(checked) => handleDestinatarioChange(colaborador.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{colaborador.nome}</p>
                        <p className="text-xs text-gray-600">{colaborador.email}</p>
                        <p className="text-xs text-gray-500">{colaborador.setor}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
