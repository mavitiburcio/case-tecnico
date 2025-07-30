"use client"

import { ArrowLeft, Package, CheckCircle, Clock, XCircle, AlertCircle, Filter, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useState } from "react"

export default function HistoricoEnvios() {
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [busca, setBusca] = useState("")

  const historico = [
    {
      id: 1,
      campanha: "Kit Verão 2024",
      status: "Pendente",
      data: "15/01/2024",
      descricao: "Caneca + Camiseta + Agenda",
      rastreamento: "BR123456789",
    },
    {
      id: 2,
      campanha: "Caneca Personalizada",
      status: "Entregue",
      data: "10/01/2024",
      descricao: "Caneca com logo da empresa",
      rastreamento: "BR987654321",
    },
    {
      id: 3,
      campanha: "Agenda 2024",
      status: "Entregue",
      data: "05/01/2024",
      descricao: "Agenda executiva personalizada",
      rastreamento: "BR456789123",
    },
    {
      id: 4,
      campanha: "Kit Natal",
      status: "Falha na Entrega",
      data: "20/12/2023",
      descricao: "Kit natalino especial",
      rastreamento: "BR789123456",
    },
    {
      id: 5,
      campanha: "Mochila Corporativa",
      status: "Entregue",
      data: "15/12/2023",
      descricao: "Mochila executiva com compartimentos",
      rastreamento: "BR321654987",
    },
    {
      id: 6,
      campanha: "Kit Boas-Vindas",
      status: "Entregue",
      data: "01/12/2023",
      descricao: "Kit de integração para novos colaboradores",
      rastreamento: "BR654987321",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregue":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Pendente":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Falha na Entrega":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Entregue":
        return "bg-green-100 text-green-800"
      case "Pendente":
        return "bg-yellow-100 text-yellow-800"
      case "Falha na Entrega":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const historicoFiltrado = historico.filter((item) => {
    const matchStatus = filtroStatus === "todos" || item.status === filtroStatus
    const matchBusca =
      item.campanha.toLowerCase().includes(busca.toLowerCase()) ||
      item.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchBusca
  })

  const exportarHistorico = () => {
    const csvContent = [
      ["Campanha", "Status", "Data", "Descrição", "Rastreamento"].join(","),
      ...historicoFiltrado.map((item) =>
        [item.campanha, item.status, item.data, item.descricao, item.rastreamento].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `meu-historico-envios-${new Date().toISOString().split("T")[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    alert("Histórico exportado com sucesso!")
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
            <h1 className="text-2xl font-bold">Histórico de Envios</h1>
            <p className="text-blue-100">Acompanhe todos os seus brindes e campanhas</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
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
              <div className="flex-1">
                <Input
                  placeholder="Buscar por campanha ou produto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-full md:w-48 rounded-lg">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os Status</SelectItem>
                  <SelectItem value="Entregue">Entregue</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Falha na Entrega">Falha na Entrega</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={exportarHistorico} variant="outline" className="rounded-lg bg-transparent">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Histórico */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Seus Envios</CardTitle>
            <CardDescription>
              {historicoFiltrado.length} de {historico.length} envios encontrados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historicoFiltrado.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 corporate-blue rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(item.status)}
                          <h3 className="font-semibold">{item.campanha}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{item.descricao}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Data: {item.data}</span>
                          <span>Rastreamento: {item.rastreamento}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={`${getStatusColor(item.status)} rounded-full`}>{item.status}</Badge>
                      {item.status === "Entregue" && (
                        <Link href={`/colaborador/confirmacao?id=${item.id}`}>
                          <Button variant="outline" size="sm" className="rounded-lg bg-transparent text-xs">
                            Confirmar Recebimento
                          </Button>
                        </Link>
                      )}
                      {item.status === "Pendente" && (
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent text-xs">
                          Rastrear Pedido
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold corporate-blue-text">{historico.length}</div>
                <div className="text-sm text-gray-600">Total de Envios</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {historico.filter((h) => h.status === "Entregue").length}
                </div>
                <div className="text-sm text-gray-600">Entregues</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {historico.filter((h) => h.status === "Pendente").length}
                </div>
                <div className="text-sm text-gray-600">Pendentes</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {historico.filter((h) => h.status === "Falha na Entrega").length}
                </div>
                <div className="text-sm text-gray-600">Falhas</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
