"use client"

import {
  ArrowLeft,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Trash2,
  BookMarkedIcon as MarkAsUnread,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useState } from "react"

export default function Notificacoes() {
  const [notificacoes, setNotificacoes] = useState([
    {
      id: 1,
      tipo: "entrega",
      titulo: "Nova confirmação de recebimento",
      mensagem: "Pedro Silva confirmou o recebimento da Caneca Personalizada",
      data: "2024-01-15T10:30:00",
      lida: false,
      prioridade: "normal",
      colaborador: "Pedro Silva",
      campanha: "Kit Verão 2024",
    },
    {
      id: 2,
      tipo: "falha",
      titulo: "Falha na entrega",
      mensagem: "Tentativa de entrega para Ana Costa falhou - endereço não encontrado",
      data: "2024-01-15T09:15:00",
      lida: false,
      prioridade: "alta",
      colaborador: "Ana Costa",
      campanha: "Caneca Personalizada",
    },
    {
      id: 3,
      tipo: "campanha",
      titulo: "Nova campanha criada",
      mensagem: "Campanha 'Kit Verão 2024' foi criada com sucesso",
      data: "2024-01-14T16:45:00",
      lida: true,
      prioridade: "normal",
      colaborador: null,
      campanha: "Kit Verão 2024",
    },
    {
      id: 4,
      tipo: "endereco",
      titulo: "Endereço atualizado",
      mensagem: "Maria Santos atualizou seu endereço de entrega",
      data: "2024-01-14T14:20:00",
      lida: true,
      prioridade: "baixa",
      colaborador: "Maria Santos",
      campanha: null,
    },
    {
      id: 5,
      tipo: "feedback",
      titulo: "Novo feedback recebido",
      mensagem: "João Oliveira avaliou a Agenda 2024 com 5 estrelas",
      data: "2024-01-14T11:10:00",
      lida: false,
      prioridade: "normal",
      colaborador: "João Oliveira",
      campanha: "Agenda 2024",
    },
    {
      id: 6,
      tipo: "sistema",
      titulo: "Relatório mensal disponível",
      mensagem: "O relatório de engajamento de dezembro está pronto para download",
      data: "2024-01-13T08:00:00",
      lida: true,
      prioridade: "normal",
      colaborador: null,
      campanha: null,
    },
  ])

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case "entrega":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "falha":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "campanha":
        return <Bell className="w-4 h-4 text-blue-600" />
      case "endereco":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "feedback":
        return <CheckCircle className="w-4 h-4 text-purple-600" />
      case "sistema":
        return <Bell className="w-4 h-4 text-gray-600" />
      default:
        return <Bell className="w-4 h-4 text-gray-600" />
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "bg-red-100 text-red-800"
      case "normal":
        return "bg-blue-100 text-blue-800"
      case "baixa":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    const agora = new Date()
    const diffMs = agora.getTime() - data.getTime()
    const diffHoras = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDias = Math.floor(diffHoras / 24)

    if (diffHoras < 1) {
      return "Agora há pouco"
    } else if (diffHoras < 24) {
      return `${diffHoras}h atrás`
    } else if (diffDias < 7) {
      return `${diffDias}d atrás`
    } else {
      return data.toLocaleDateString("pt-BR")
    }
  }

  const marcarComoLida = (id: number) => {
    setNotificacoes(notificacoes.map((n) => (n.id === id ? { ...n, lida: true } : n)))
  }

  const marcarComoNaoLida = (id: number) => {
    setNotificacoes(notificacoes.map((n) => (n.id === id ? { ...n, lida: false } : n)))
  }

  const excluirNotificacao = (id: number) => {
    setNotificacoes(notificacoes.filter((n) => n.id !== id))
  }

  const marcarTodasComoLidas = () => {
    setNotificacoes(notificacoes.map((n) => ({ ...n, lida: true })))
  }

  const notificacaosPendentes = notificacoes.filter((n) => !n.lida).length

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
              <h1 className="text-2xl font-bold">Notificações</h1>
              <p className="text-blue-100">{notificacaosPendentes} notificação(ões) não lida(s)</p>
            </div>
          </div>
          <Button onClick={marcarTodasComoLidas} className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
            Marcar Todas como Lidas
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold corporate-blue-text">{notificacoes.length}</div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{notificacaosPendentes}</div>
                <div className="text-sm text-gray-600">Não Lidas</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {notificacoes.filter((n) => n.prioridade === "alta").length}
                </div>
                <div className="text-sm text-gray-600">Alta Prioridade</div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-lg shadow-sm">
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{notificacoes.filter((n) => n.lida).length}</div>
                <div className="text-sm text-gray-600">Lidas</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Notificações */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Todas as Notificações</CardTitle>
            <CardDescription>Acompanhe todas as atividades do sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notificacoes.map((notificacao, index) => (
                <div key={notificacao.id}>
                  <div
                    className={`p-4 rounded-lg border ${!notificacao.lida ? "bg-blue-50 border-blue-200" : "bg-white"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getTipoIcon(notificacao.tipo)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-medium ${!notificacao.lida ? "font-semibold" : ""}`}>
                              {notificacao.titulo}
                            </h3>
                            <Badge className={`${getPrioridadeColor(notificacao.prioridade)} rounded-full text-xs`}>
                              {notificacao.prioridade}
                            </Badge>
                            {!notificacao.lida && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{notificacao.mensagem}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{formatarData(notificacao.data)}</span>
                            {notificacao.colaborador && <span>Colaborador: {notificacao.colaborador}</span>}
                            {notificacao.campanha && <span>Campanha: {notificacao.campanha}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!notificacao.lida ? (
                          <Button
                            onClick={() => marcarComoLida(notificacao.id)}
                            variant="outline"
                            size="sm"
                            className="rounded-lg bg-transparent"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            onClick={() => marcarComoNaoLida(notificacao.id)}
                            variant="outline"
                            size="sm"
                            className="rounded-lg bg-transparent"
                          >
                            <MarkAsUnread className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          onClick={() => excluirNotificacao(notificacao.id)}
                          variant="outline"
                          size="sm"
                          className="rounded-lg bg-transparent text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {index < notificacoes.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
