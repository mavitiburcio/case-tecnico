"use client"

import { ArrowLeft, Plus, Package, Search, Filter, Calendar, Users, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"

export default function Gestaocampanhas() {
  const [filtroStatus, setFiltroStatus] = useState("todas")
  const [busca, setBusca] = useState("")

  const campanhas = [
    {
      id: 1,
      nome: "Kit Verão 2024",
      data: "15/01/2024",
      status: "Ativa",
      confirmados: 65,
      total: 50,
      produtos: ["Caneca", "Camiseta", "Agenda"],
      valor: "R$ 2.500,00",
    },
    {
      id: 2,
      nome: "Caneca Personalizada",
      data: "10/01/2024",
      status: "Concluída",
      confirmados: 92,
      total: 75,
      produtos: ["Caneca"],
      valor: "R$ 1.875,00",
    },
    {
      id: 3,
      nome: "Agenda 2024",
      data: "05/01/2024",
      status: "Concluída",
      confirmados: 88,
      total: 60,
      produtos: ["Agenda"],
      valor: "R$ 2.100,00",
    },
    {
      id: 4,
      nome: "Kit Natal",
      data: "20/12/2023",
      status: "Concluída",
      confirmados: 45,
      total: 80,
      produtos: ["Caneca", "Mochila", "Vale-presente"],
      valor: "R$ 6.400,00",
    },
    {
      id: 5,
      nome: "Mochila Corporativa",
      data: "15/12/2023",
      status: "Pausada",
      confirmados: 0,
      total: 40,
      produtos: ["Mochila"],
      valor: "R$ 3.200,00",
    },
  ]

  const campanhasFiltradas = campanhas.filter((campanha) => {
    const matchStatus = filtroStatus === "todas" || campanha.status === filtroStatus
    const matchBusca = campanha.nome.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchBusca
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativa":
        return "bg-green-100 text-green-800"
      case "Concluída":
        return "bg-blue-100 text-blue-800"
      case "Pausada":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
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
              <h1 className="text-2xl font-bold">Gestão de Campanhas</h1>
              <p className="text-blue-100">Gerencie todas as suas campanhas de engajamento</p>
            </div>
          </div>
          <Link href="/admin/campanhas/nova">
            <Button className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
              <Plus className="w-4 h-4 mr-2" />
              Nova Campanha
            </Button>
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold corporate-blue-text">{campanhas.length}</div>
                  <div className="text-sm text-gray-600">Total de Campanhas</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {campanhas.filter((c) => c.status === "Ativa").length}
                  </div>
                  <div className="text-sm text-gray-600">Campanhas Ativas</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold corporate-blue-text">
                    {campanhas.reduce((acc, c) => acc + c.total, 0)}
                  </div>
                  <div className="text-sm text-gray-600">Colaboradores Impactados</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(campanhas.reduce((acc, c) => acc + c.confirmados, 0) / campanhas.length)}%
                  </div>
                  <div className="text-sm text-gray-600">Taxa Média de Confirmação</div>
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
                  placeholder="Buscar campanhas..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full md:w-48 rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as Campanhas</SelectItem>
                  <SelectItem value="Ativa">Ativas</SelectItem>
                  <SelectItem value="Concluída">Concluídas</SelectItem>
                  <SelectItem value="Pausada">Pausadas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Campanhas */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Suas Campanhas</CardTitle>
            <CardDescription>
              {campanhasFiltradas.length} de {campanhas.length} campanhas encontradas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campanhasFiltradas.map((campanha) => (
                <div key={campanha.id} className="border rounded-lg p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 corporate-blue rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{campanha.nome}</h3>
                          <Badge className={`${getStatusColor(campanha.status)} rounded-full`}>{campanha.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <span className="font-medium">Data:</span> {campanha.data}
                          </div>
                          <div>
                            <span className="font-medium">Colaboradores:</span> {campanha.total}
                          </div>
                          <div>
                            <span className="font-medium">Valor Total:</span> {campanha.valor}
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="text-sm font-medium text-gray-600">Produtos: </span>
                          <span className="text-sm text-gray-600">{campanha.produtos.join(", ")}</span>
                        </div>
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm">
                            <span>Taxa de Confirmação: {campanha.confirmados}%</span>
                            <span>
                              {Math.round((campanha.confirmados / 100) * campanha.total)} de {campanha.total}{" "}
                              confirmados
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${campanha.confirmados}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/admin/campanhas/${campanha.id}`}>
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Ver Detalhes
                        </Button>
                      </Link>
                      <Link href={`/admin/campanhas/${campanha.id}/kit`}>
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                          Editar Kit
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
