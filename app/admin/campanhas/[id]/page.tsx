"use client"

import { ArrowLeft, Package, Users, Calendar, CheckCircle, Clock, XCircle, Edit, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function DetalhesCampanha() {
  const params = useParams()
  const campanhaId = params.id

  // Simulando dados da campanha baseado no ID
  const campanha = {
    id: campanhaId,
    nome: "Kit Verão 2024",
    descricao: "Campanha especial de verão com produtos personalizados para engajamento dos colaboradores",
    status: "Ativa",
    dataInicio: "15/01/2024",
    dataFim: "30/01/2024",
    valorTotal: "R$ 2.500,00",
    colaboradoresTotal: 50,
    colaboradoresConfirmados: 32,
    taxaConfirmacao: 65,
    produtos: [
      { nome: "Caneca Personalizada", quantidade: 50, valor: "R$ 25,00", total: "R$ 1.250,00" },
      { nome: "Camiseta Corporativa", quantidade: 50, valor: "R$ 15,00", total: "R$ 750,00" },
      { nome: "Agenda 2024", quantidade: 50, valor: "R$ 10,00", total: "R$ 500,00" },
    ],
  }

  const colaboradores = [
    {
      id: 1,
      nome: "Pedro Silva",
      email: "pedro@empresa.com",
      setor: "TI",
      status: "Entregue",
      dataEntrega: "18/01/2024",
      confirmado: true,
      avaliacao: 5,
      feedback: "Produtos de excelente qualidade!",
    },
    {
      id: 2,
      nome: "Maria Santos",
      email: "maria@empresa.com",
      setor: "RH",
      status: "Entregue",
      dataEntrega: "17/01/2024",
      confirmado: true,
      avaliacao: 4,
      feedback: "Gostei muito da caneca!",
    },
    {
      id: 3,
      nome: "João Oliveira",
      email: "joao@empresa.com",
      setor: "Vendas",
      status: "Pendente",
      dataEntrega: null,
      confirmado: false,
      avaliacao: null,
      feedback: null,
    },
    {
      id: 4,
      nome: "Ana Costa",
      email: "ana@empresa.com",
      setor: "Marketing",
      status: "Falha na Entrega",
      dataEntrega: null,
      confirmado: false,
      avaliacao: null,
      feedback: null,
    },
    {
      id: 5,
      nome: "Carlos Lima",
      email: "carlos@empresa.com",
      setor: "Financeiro",
      status: "Entregue",
      dataEntrega: "19/01/2024",
      confirmado: false,
      avaliacao: null,
      feedback: null,
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
        return null
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

  const getCampanhaStatusColor = (status: string) => {
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
            <Link href="/admin/campanhas">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">{campanha.nome}</h1>
              <p className="text-blue-100">Detalhes da campanha</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Link href={`/admin/campanhas/${campanhaId}/kit`}>
              <Button variant="ghost" className="text-white hover:bg-blue-800 rounded-lg">
                <Edit className="w-4 h-4 mr-2" />
                Editar Kit
              </Button>
            </Link>
            <Button variant="ghost" className="text-white hover:bg-red-800 rounded-lg">
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Informações da Campanha */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="rounded-lg shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="corporate-blue-text">Informações da Campanha</CardTitle>
                  <Badge className={`${getCampanhaStatusColor(campanha.status)} rounded-full`}>{campanha.status}</Badge>
                </div>
                <CardDescription>{campanha.descricao}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Data de Início</p>
                      <p className="text-sm text-gray-600">{campanha.dataInicio}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Data de Fim</p>
                      <p className="text-sm text-gray-600">{campanha.dataFim}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Colaboradores</p>
                      <p className="text-sm text-gray-600">{campanha.colaboradoresTotal}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">Valor Total</p>
                      <p className="text-sm text-gray-600">{campanha.valorTotal}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas */}
          <div className="space-y-4">
            <Card className="rounded-lg shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold corporate-blue-text">{campanha.taxaConfirmacao}%</div>
                  <div className="text-sm text-gray-600">Taxa de Confirmação</div>
                  <Progress value={campanha.taxaConfirmacao} className="mt-2" />
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-lg shadow-sm">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{campanha.colaboradoresConfirmados}</div>
                  <div className="text-sm text-gray-600">Confirmações</div>
                  <div className="text-xs text-gray-500 mt-1">de {campanha.colaboradoresTotal} colaboradores</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Produtos da Campanha */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Produtos do Kit</CardTitle>
            <CardDescription>Itens inclusos nesta campanha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campanha.produtos.map((produto, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 corporate-blue rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{produto.nome}</h3>
                      <p className="text-sm text-gray-600">{produto.quantidade} unidades</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{produto.total}</p>
                    <p className="text-sm text-gray-600">{produto.valor} por unidade</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lista de Colaboradores */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Status dos Colaboradores</CardTitle>
            <CardDescription>Acompanhe o status de entrega para cada colaborador</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {colaboradores.map((colaborador) => (
                <div key={colaborador.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 corporate-blue rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {getStatusIcon(colaborador.status)}
                          <h3 className="font-medium">{colaborador.nome}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{colaborador.email}</p>
                        <p className="text-sm text-gray-600">Setor: {colaborador.setor}</p>
                        {colaborador.dataEntrega && (
                          <p className="text-sm text-gray-600">Entregue em: {colaborador.dataEntrega}</p>
                        )}
                        {colaborador.feedback && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <p className="font-medium">Feedback:</p>
                            <p>"{colaborador.feedback}"</p>
                            {colaborador.avaliacao && <p className="mt-1">Avaliação: {colaborador.avaliacao}/5 ⭐</p>}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={`${getStatusColor(colaborador.status)} rounded-full`}>
                        {colaborador.status}
                      </Badge>
                      {colaborador.confirmado && (
                        <Badge className="bg-blue-100 text-blue-800 rounded-full">Confirmado</Badge>
                      )}
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
