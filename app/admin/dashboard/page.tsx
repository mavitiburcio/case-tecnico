"use client"

import {
  Package,
  AlertTriangle,
  Plus,
  Calendar,
  CheckCircle,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = {
    campanhasAtivas: 3,
    percentualEntregues: 78,
    percentualPendentes: 15,
    falhas: 7,
    totalColaboradores: 150,
    colaboradoresAtivos: 142,
  }

  const campanhas = [
    { id: 1, nome: "Kit Verão 2024", data: "15/01/2024", status: "Ativa", confirmados: 65, total: 50 },
    { id: 2, nome: "Caneca Personalizada", data: "10/01/2024", status: "Concluída", confirmados: 92, total: 75 },
    { id: 3, nome: "Agenda 2024", data: "05/01/2024", status: "Concluída", confirmados: 88, total: 60 },
    { id: 4, nome: "Kit Natal", data: "20/12/2023", status: "Concluída", confirmados: 45, total: 80 },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="corporate-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Administrativo</h1>
            <p className="text-blue-100">Gestão de Campanhas e Engajamento</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/admin/campanhas/nova">
              <Button className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
                <Plus className="w-4 h-4 mr-2" />
                Criar Nova Campanha
              </Button>
            </Link>
            <Link href="/admin/notificacoes">
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <Bell className="w-5 h-5" />
              </Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/admin/enderecos">Consultar Endereços</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/relatorios">Relatórios</Link>
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
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campanhas Ativas</CardTitle>
              <Calendar className="w-4 h-4 ml-auto text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold corporate-blue-text">{stats.campanhasAtivas}</div>
              <p className="text-xs text-muted-foreground">Em andamento</p>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">% Entregues</CardTitle>
              <CheckCircle className="w-4 h-4 ml-auto text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.percentualEntregues}%</div>
              <Progress value={stats.percentualEntregues} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">% Pendentes</CardTitle>
              <Package className="w-4 h-4 ml-auto text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.percentualPendentes}%</div>
              <Progress value={stats.percentualPendentes} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Falhas</CardTitle>
              <AlertTriangle className="w-4 h-4 ml-auto text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.falhas}%</div>
              <p className="text-xs text-muted-foreground">Requer atenção</p>
            </CardContent>
          </Card>
        </div>

        {/* Navegação Rápida */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/campanhas">
            <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Package className="w-8 h-8 corporate-blue-text mx-auto mb-2" />
                <h3 className="font-semibold corporate-blue-text">Campanhas</h3>
                <p className="text-sm text-gray-600">Gerenciar campanhas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/enderecos">
            <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 corporate-blue-text mx-auto mb-2" />
                <h3 className="font-semibold corporate-blue-text">Colaboradores</h3>
                <p className="text-sm text-gray-600">Consultar endereços</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/relatorios">
            <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 corporate-blue-text mx-auto mb-2" />
                <h3 className="font-semibold corporate-blue-text">Relatórios</h3>
                <p className="text-sm text-gray-600">Análises e métricas</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/campanhas/nova">
            <Card className="rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 border-dashed border-blue-300">
              <CardContent className="p-6 text-center">
                <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-600">Nova Campanha</h3>
                <p className="text-sm text-gray-600">Criar campanha</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Gráfico de Status Geral */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Status Geral das Entregas</CardTitle>
            <CardDescription>Distribuição dos status de todas as campanhas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 opacity-20"></div>
                <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold corporate-blue-text">100%</div>
                    <div className="text-sm text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Entregues ({stats.percentualEntregues}%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Pendentes ({stats.percentualPendentes}%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Falhas ({stats.falhas}%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Campanhas Recentes */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="corporate-blue-text">Campanhas Recentes</CardTitle>
              <CardDescription>Últimas campanhas criadas e seus status</CardDescription>
            </div>
            <Link href="/admin/campanhas">
              <Button variant="outline" className="rounded-lg bg-transparent">
                Ver Todas
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campanhas.slice(0, 3).map((campanha) => (
                <div key={campanha.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 corporate-blue rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium">{campanha.nome}</h3>
                      <p className="text-sm text-muted-foreground">{campanha.data}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{campanha.confirmados}% Confirmados</p>
                      <p className="text-xs text-muted-foreground">{campanha.total} colaboradores</p>
                    </div>
                    <Badge
                      className={`rounded-full ${
                        campanha.status === "Ativa" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {campanha.status}
                    </Badge>
                    <Link href={`/admin/campanhas/${campanha.id}`}>
                      <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                        Ver Detalhes
                      </Button>
                    </Link>
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
