"use client"

import { ArrowLeft, Package, CheckCircle, Clock, XCircle, AlertCircle, User, Mail, MapPin } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"

export default function HistoricoColaborador() {
  const params = useParams()
  const colaboradorId = params.id

  // Simulando dados do colaborador baseado no ID
  const colaborador = {
    id: colaboradorId,
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
    dataAdmissao: "15/03/2022",
    status: "Ativo",
  }

  const historico = [
    {
      id: 1,
      campanha: "Kit Verão 2024",
      status: "Pendente",
      data: "15/01/2024",
      descricao: "Caneca + Camiseta + Agenda",
      rastreamento: "BR123456789",
      valor: "R$ 85,00",
      confirmado: false,
      avaliacao: null,
      feedback: null,
    },
    {
      id: 2,
      campanha: "Caneca Personalizada",
      status: "Entregue",
      data: "10/01/2024",
      descricao: "Caneca com logo da empresa",
      rastreamento: "BR987654321",
      valor: "R$ 25,00",
      confirmado: true,
      avaliacao: 5,
      feedback: "Produtos de excelente qualidade!",
    },
    {
      id: 3,
      campanha: "Agenda 2024",
      status: "Entregue",
      data: "05/01/2024",
      descricao: "Agenda executiva personalizada",
      rastreamento: "BR456789123",
      valor: "R$ 35,00",
      confirmado: true,
      avaliacao: 4,
      feedback: "Muito útil para o trabalho!",
    },
    {
      id: 4,
      campanha: "Kit Natal",
      status: "Falha na Entrega",
      data: "20/12/2023",
      descricao: "Kit natalino especial",
      rastreamento: "BR789123456",
      valor: "R$ 120,00",
      confirmado: false,
      avaliacao: null,
      feedback: null,
    },
    {
      id: 5,
      campanha: "Mochila Corporativa",
      status: "Entregue",
      data: "15/12/2023",
      descricao: "Mochila executiva com compartimentos",
      rastreamento: "BR321654987",
      valor: "R$ 80,00",
      confirmado: true,
      avaliacao: 5,
      feedback: "Excelente qualidade e muito prática!",
    },
    {
      id: 6,
      campanha: "Kit Boas-Vindas",
      status: "Entregue",
      data: "01/12/2023",
      descricao: "Kit de integração para novos colaboradores",
      rastreamento: "BR654987321",
      valor: "R$ 65,00",
      confirmado: true,
      avaliacao: 4,
      feedback: "Ótima iniciativa da empresa!",
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

  const calcularEstatisticas = () => {
    const total = historico.length
    const entregues = historico.filter((h) => h.status === "Entregue").length
    const confirmados = historico.filter((h) => h.confirmado).length
    const valorTotal = historico
      .filter((h) => h.status === "Entregue")
      .reduce((acc, h) => acc + Number.parseFloat(h.valor.replace("R$ ", "").replace(",", ".")), 0)
    const avaliacaoMedia = historico
      .filter((h) => h.avaliacao)
      .reduce((acc, h, _, arr) => acc + (h.avaliacao || 0) / arr.length, 0)

    return { total, entregues, confirmados, valorTotal, avaliacaoMedia }
  }

  const stats = calcularEstatisticas()

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
            <h1 className="text-2xl font-bold">Histórico de {colaborador.nome}</h1>
            <p className="text-blue-100">Acompanhe todas as campanhas e entregas</p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Informações do Colaborador */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <User className="w-5 h-5" />
              <span>Informações do Colaborador</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Nome Completo</p>
                    <p className="text-sm text-gray-600">{colaborador.nome}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">E-mail</p>
                    <p className="text-sm text-gray-600">{colaborador.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Setor</p>
                    <p className="text-sm text-gray-600">{colaborador.setor}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Endereço de Entrega</p>
                    <div className="text-sm text-gray-600">
                      <p>{colaborador.endereco.rua}</p>
                      {colaborador.endereco.complemento && <p>{colaborador.endereco.complemento}</p>}
                      <p>
                        {colaborador.endereco.bairro} - {colaborador.endereco.cidade}/{colaborador.endereco.estado}
                      </p>
                      <p>CEP: {colaborador.endereco.cep}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold corporate-blue-text">{stats.total}</div>
                <div className="text-sm text-gray-600">Total de Campanhas</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats.entregues}</div>
                <div className="text-sm text-gray-600">Entregas Realizadas</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.confirmados}</div>
                <div className="text-sm text-gray-600">Confirmações</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {stats.avaliacaoMedia > 0 ? stats.avaliacaoMedia.toFixed(1) : "N/A"}
                </div>
                <div className="text-sm text-gray-600">Avaliação Média</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold corporate-blue-text">
                  R$ {stats.valorTotal.toFixed(2).replace(".", ",")}
                </div>
                <div className="text-sm text-gray-600">Valor Total Recebido</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Histórico Detalhado */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Histórico Completo</CardTitle>
            <CardDescription>Todas as campanhas e entregas do colaborador</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historico.map((item) => (
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                          <div>
                            <p>Data: {item.data}</p>
                            <p>Rastreamento: {item.rastreamento}</p>
                          </div>
                          <div>
                            <p>Valor: {item.valor}</p>
                            {item.confirmado && <p>✅ Recebimento confirmado</p>}
                          </div>
                        </div>
                        {item.feedback && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm font-medium text-blue-800">Feedback do colaborador:</p>
                            <p className="text-sm text-blue-700">"{item.feedback}"</p>
                            {item.avaliacao && (
                              <p className="text-sm text-blue-700 mt-1">Avaliação: {item.avaliacao}/5 ⭐</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={`${getStatusColor(item.status)} rounded-full`}>{item.status}</Badge>
                      {item.status === "Falha na Entrega" && (
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent text-xs">
                          Reagendar Entrega
                        </Button>
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
