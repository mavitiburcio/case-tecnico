"use client"

import { ArrowLeft, Search, MapPin, Download, Mail, Phone, Filter, Users, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"

export default function ConsultarEnderecos() {
  const [busca, setBusca] = useState("")
  const [filtroSetor, setFiltroSetor] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")

  const colaboradores = [
    {
      id: 1,
      nome: "Pedro Silva",
      email: "pedro@empresa.com",
      telefone: "(11) 99999-1111",
      setor: "TI",
      endereco: {
        rua: "Rua das Flores, 123",
        complemento: "Apto 45",
        bairro: "Centro",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01234-567",
      },
      status: "Ativo",
      ultimaAtualizacao: "15/01/2024",
      campanhasParticipadas: 5,
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@empresa.com",
      telefone: "(11) 99999-2222",
      setor: "RH",
      endereco: {
        rua: "Av. Paulista, 1000",
        complemento: "Sala 501",
        bairro: "Bela Vista",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01310-100",
      },
      status: "Ativo",
      ultimaAtualizacao: "12/01/2024",
      campanhasParticipadas: 8,
    },
    {
      id: 3,
      nome: "João Oliveira",
      email: "joao@empresa.com",
      telefone: "(11) 99999-3333",
      setor: "Vendas",
      endereco: {
        rua: "Rua Augusta, 500",
        complemento: "",
        bairro: "Consolação",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01305-000",
      },
      status: "Ativo",
      ultimaAtualizacao: "10/01/2024",
      campanhasParticipadas: 3,
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana@empresa.com",
      telefone: "(11) 99999-4444",
      setor: "Marketing",
      endereco: {
        rua: "Rua Oscar Freire, 200",
        complemento: "Apto 102",
        bairro: "Jardins",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01426-000",
      },
      status: "Pendente",
      ultimaAtualizacao: "05/01/2024",
      campanhasParticipadas: 2,
    },
    {
      id: 5,
      nome: "Carlos Lima",
      email: "carlos@empresa.com",
      telefone: "(11) 99999-5555",
      setor: "Financeiro",
      endereco: {
        rua: "Rua da Consolação, 800",
        complemento: "Bloco B, Apto 301",
        bairro: "Consolação",
        cidade: "São Paulo",
        estado: "SP",
        cep: "01302-000",
      },
      status: "Inativo",
      ultimaAtualizacao: "20/12/2023",
      campanhasParticipadas: 1,
    },
  ]

  const colaboradoresFiltrados = colaboradores.filter((colaborador) => {
    const matchBusca =
      colaborador.nome.toLowerCase().includes(busca.toLowerCase()) ||
      colaborador.email.toLowerCase().includes(busca.toLowerCase()) ||
      colaborador.endereco.cidade.toLowerCase().includes(busca.toLowerCase())
    const matchSetor = filtroSetor === "todos" || colaborador.setor === filtroSetor
    const matchStatus = filtroStatus === "todos" || colaborador.status === filtroStatus
    return matchBusca && matchSetor && matchStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Inativo":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const exportarEnderecos = () => {
    const csvContent = [
      ["Nome", "Email", "Telefone", "Setor", "Endereço Completo", "CEP", "Status"].join(","),
      ...colaboradoresFiltrados.map((c) =>
        [
          c.nome,
          c.email,
          c.telefone,
          c.setor,
          `${c.endereco.rua} ${c.endereco.complemento} - ${c.endereco.bairro} - ${c.endereco.cidade}/${c.endereco.estado}`,
          c.endereco.cep,
          c.status,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "enderecos_colaboradores.csv"
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="corporate-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Consultar Endereços</h1>
              <p className="text-blue-100">Gerencie os endereços dos colaboradores</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin/colaboradores/convidar">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Convidar Colaborador
              </Button>
            </Link>
            <Button onClick={exportarEnderecos} className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
              <Download className="w-4 h-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold corporate-blue-text">{colaboradores.length}</div>
                  <div className="text-sm text-gray-600">Total de Colaboradores</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {colaboradores.filter((c) => c.status === "Ativo").length}
                  </div>
                  <div className="text-sm text-gray-600">Endereços Ativos</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {colaboradores.filter((c) => c.status === "Pendente").length}
                  </div>
                  <div className="text-sm text-gray-600">Pendentes</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {colaboradores.filter((c) => c.status === "Inativo").length}
                  </div>
                  <div className="text-sm text-gray-600">Inativos</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <Filter className="w-5 h-5" />
              <span>Filtros</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por nome, email ou cidade..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
              <Select value={filtroSetor} onValueChange={setFiltroSetor}>
                <SelectTrigger className="w-full md:w-48 rounded-lg">
                  <SelectValue placeholder="Setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Setores</SelectItem>
                  <SelectItem value="TI">TI</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Vendas">Vendas</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full md:w-48 rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Ativo">Ativo</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Colaboradores */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Endereços dos Colaboradores</CardTitle>
            <CardDescription>
              {colaboradoresFiltrados.length} de {colaboradores.length} colaboradores encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {colaboradoresFiltrados.map((colaborador) => (
                <div key={colaborador.id} className="border rounded-lg p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 corporate-blue rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{colaborador.nome}</h3>
                          <Badge className={`${getStatusColor(colaborador.status)} rounded-full`}>
                            {colaborador.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Mail className="w-4 h-4" />
                              <span>{colaborador.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Phone className="w-4 h-4" />
                              <span>{colaborador.telefone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4" />
                              <span>Setor: {colaborador.setor}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-start space-x-2">
                              <MapPin className="w-4 h-4 mt-0.5" />
                              <div>
                                <p>{colaborador.endereco.rua}</p>
                                {colaborador.endereco.complemento && <p>{colaborador.endereco.complemento}</p>}
                                <p>
                                  {colaborador.endereco.bairro} - {colaborador.endereco.cidade}/
                                  {colaborador.endereco.estado}
                                </p>
                                <p>CEP: {colaborador.endereco.cep}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                          <span>Última atualização: {colaborador.ultimaAtualizacao}</span>
                          <span>Campanhas participadas: {colaborador.campanhasParticipadas}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/admin/colaboradores/${colaborador.id}/historico`}>
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent w-full">
                          Ver Histórico
                        </Button>
                      </Link>
                      <Link href={`/admin/mensagens?colaborador=${colaborador.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent w-full">
                          Enviar Mensagem
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
