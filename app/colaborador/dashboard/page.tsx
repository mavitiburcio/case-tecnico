"use client"

import { Bell, Package, MapPin, Clock, CheckCircle, AlertCircle, XCircle, User, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function ColaboradorDashboard() {
  const colaborador = {
    nome: "Pedro Silva",
    proximoBrinde: "Kit Verão 2024",
    ultimoRecebido: "Caneca Personalizada",
    endereco: "Rua das Flores, 123 - São Paulo/SP",
  }

  const historico = [
    { id: 1, campanha: "Kit Verão 2024", status: "Pendente", data: "15/01/2024", cor: "yellow" },
    { id: 2, campanha: "Caneca Personalizada", status: "Entregue", data: "10/01/2024", cor: "green" },
    { id: 3, campanha: "Agenda 2024", status: "Entregue", data: "05/01/2024", cor: "green" },
    { id: 4, campanha: "Kit Natal", status: "Falha na Entrega", data: "20/12/2023", cor: "red" },
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="corporate-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Olá, {colaborador.nome}!</h1>
            <p className="text-blue-100">Bem-vindo ao seu portal de engajamento</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/colaborador/notificacoes">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/colaborador/perfil">Meu Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/colaborador/historico">Histórico Completo</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Cards Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximo Brinde</CardTitle>
              <Package className="w-4 h-4 ml-auto text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold corporate-blue-text">{colaborador.proximoBrinde}</div>
              <p className="text-xs text-muted-foreground">Previsão: 20/01/2024</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Último Recebido</CardTitle>
              <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold corporate-blue-text">{colaborador.ultimoRecebido}</div>
              <p className="text-xs text-muted-foreground">Entregue em 10/01/2024</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Endereço Atual</CardTitle>
              <MapPin className="w-4 h-4 ml-auto text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium corporate-blue-text">{colaborador.endereco}</div>
              <Link href="/colaborador/perfil">
                <Button variant="link" className="text-xs p-0 h-auto corporate-blue-text">
                  Atualizar endereço
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Histórico de Envios Resumido */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="corporate-blue-text">Últimos Envios</CardTitle>
              <CardDescription>Acompanhe o status dos seus brindes recentes</CardDescription>
            </div>
            <Link href="/colaborador/historico">
              <Button variant="outline" className="rounded-lg bg-transparent">
                Ver Histórico Completo
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {historico.slice(0, 3).map((item, index) => (
                <div key={item.id}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div>
                        <p className="font-medium">{item.campanha}</p>
                        <p className="text-sm text-muted-foreground">{item.data}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(item.status)} rounded-full`}>{item.status}</Badge>
                  </div>
                  {index < 2 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Confirmação de Recebimento */}
        <Card className="rounded-lg shadow-sm border-green-200">
          <CardHeader>
            <CardTitle className="text-green-700">Confirmação de Recebimento</CardTitle>
            <CardDescription>Você recebeu seu último brinde (Caneca Personalizada)?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/colaborador/confirmacao">
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg">Sim, recebi!</Button>
            </Link>
            <div className="text-sm text-muted-foreground">
              <p>Feedback opcional:</p>
              <textarea
                className="w-full mt-2 p-2 border rounded-lg resize-none"
                rows={3}
                placeholder="Como foi sua experiência com este brinde?"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
