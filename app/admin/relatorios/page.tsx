"use client"

import { ArrowLeft, BarChart3, Download, TrendingUp, Package, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useState } from "react"

export default function Relatorios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("ultimo-mes")

  const metricas = {
    totalCampanhas: 12,
    campanhasAtivas: 3,
    taxaEntrega: 85,
    taxaConfirmacao: 78,
    colaboradoresAtivos: 142,
    valorTotalInvestido: "R$ 45.600,00",
    economiaLogistica: "R$ 2.300,00",
    satisfacaoMedia: 4.2,
  }

  const campanhasPorMes = [
    { mes: "Jan", campanhas: 2, entregas: 95, confirmacoes: 88 },
    { mes: "Fev", campanhas: 1, entregas: 92, confirmacoes: 85 },
    { mes: "Mar", campanhas: 3, entregas: 88, confirmacoes: 82 },
    { mes: "Abr", campanhas: 2, entregas: 90, confirmacoes: 87 },
    { mes: "Mai", campanhas: 1, entregas: 94, confirmacoes: 91 },
    { mes: "Jun", campanhas: 3, entregas: 85, confirmacoes: 78 },
  ]

  const topProdutos = [
    { produto: "Caneca Personalizada", quantidade: 150, satisfacao: 4.5, custo: "R$ 3.750,00" },
    { produto: "Camiseta Corporativa", quantidade: 120, satisfacao: 4.2, custo: "R$ 5.400,00" },
    { produto: "Agenda 2024", quantidade: 100, satisfacao: 4.0, custo: "R$ 3.500,00" },
    { produto: "Mochila Executiva", quantidade: 80, satisfacao: 4.8, custo: "R$ 6.400,00" },
    { produto: "Vale-presente", quantidade: 60, satisfacao: 4.6, custo: "R$ 6.000,00" },
  ]

  const setores = [
    { setor: "TI", colaboradores: 45, participacao: 95, satisfacao: 4.3 },
    { setor: "Vendas", colaboradores: 38, participacao: 92, satisfacao: 4.1 },
    { setor: "Marketing", colaboradores: 25, participacao: 88, satisfacao: 4.4 },
    { setor: "RH", colaboradores: 20, participacao: 100, satisfacao: 4.5 },
    { setor: "Financeiro", colaboradores: 14, participacao: 85, satisfacao: 4.0 },
  ]

  // Atualizar a função exportarRelatorio para funcionar corretamente
  const exportarRelatorio = () => {
    // Criar conteúdo do relatório em HTML para PDF
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Relatório de Engajamento</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .metric { display: inline-block; margin: 10px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
        .section { margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 10px 0; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Relatório de Engajamento</h1>
        <p>Período: ${periodoSelecionado}</p>
        <p>Data de geração: ${new Date().toLocaleDateString("pt-BR")}</p>
      </div>
      
      <div class="section">
        <h2>Métricas Principais</h2>
        <div class="metric">
          <h3>Total de Campanhas</h3>
          <p>${metricas.totalCampanhas}</p>
        </div>
        <div class="metric">
          <h3>Taxa de Entrega</h3>
          <p>${metricas.taxaEntrega}%</p>
        </div>
        <div class="metric">
          <h3>Taxa de Confirmação</h3>
          <p>${metricas.taxaConfirmacao}%</p>
        </div>
        <div class="metric">
          <h3>Satisfação Média</h3>
          <p>${metricas.satisfacaoMedia}/5</p>
        </div>
      </div>

      <div class="section">
        <h2>Top Produtos</h2>
        <table>
          <tr><th>Produto</th><th>Quantidade</th><th>Satisfação</th><th>Custo</th></tr>
          ${topProdutos.map((p) => `<tr><td>${p.produto}</td><td>${p.quantidade}</td><td>${p.satisfacao}/5</td><td>${p.custo}</td></tr>`).join("")}
        </table>
      </div>

      <div class="section">
        <h2>Análise por Setor</h2>
        <table>
          <tr><th>Setor</th><th>Colaboradores</th><th>Participação</th><th>Satisfação</th></tr>
          ${setores.map((s) => `<tr><td>${s.setor}</td><td>${s.colaboradores}</td><td>${s.participacao}%</td><td>${s.satisfacao}/5</td></tr>`).join("")}
        </table>
      </div>
    </body>
    </html>
  `

    // Criar blob e fazer download
    const blob = new Blob([htmlContent], { type: "text/html" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `relatorio-engajamento-${new Date().toISOString().split("T")[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    // Mostrar feedback
    alert("Relatório exportado com sucesso! O arquivo foi baixado.")
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
              <h1 className="text-2xl font-bold">Relatórios de Engajamento</h1>
              <p className="text-blue-100">Análises e métricas das campanhas</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
              <SelectTrigger className="w-48 bg-white text-[#002147] rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ultima-semana">Última Semana</SelectItem>
                <SelectItem value="ultimo-mes">Último Mês</SelectItem>
                <SelectItem value="ultimo-trimestre">Último Trimestre</SelectItem>
                <SelectItem value="ultimo-ano">Último Ano</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportarRelatorio} className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Campanhas</CardTitle>
              <Calendar className="w-4 h-4 ml-auto text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold corporate-blue-text">{metricas.totalCampanhas}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+2</span> vs mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
              <Package className="w-4 h-4 ml-auto text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{metricas.taxaEntrega}%</div>
              <Progress value={metricas.taxaEntrega} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Confirmação</CardTitle>
              <TrendingUp className="w-4 h-4 ml-auto text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold corporate-blue-text">{metricas.taxaConfirmacao}%</div>
              <Progress value={metricas.taxaConfirmacao} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="rounded-lg shadow-sm">
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Satisfação Média</CardTitle>
              <BarChart3 className="w-4 h-4 ml-auto text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{metricas.satisfacaoMedia}/5</div>
              <p className="text-xs text-muted-foreground">Baseado em {metricas.colaboradoresAtivos} avaliações</p>
            </CardContent>
          </Card>
        </div>

        {/* Gráfico de Evolução */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Evolução das Campanhas</CardTitle>
            <CardDescription>Campanhas, entregas e confirmações por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campanhasPorMes.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium">{item.mes}</div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Campanhas: {item.campanhas}</span>
                      <span>Entregas: {item.entregas}%</span>
                      <span>Confirmações: {item.confirmacoes}%</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(item.campanhas / 3) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: `${item.entregas}%` }}></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: `${item.confirmacoes}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Produtos */}
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="corporate-blue-text">Produtos Mais Populares</CardTitle>
              <CardDescription>Ranking por quantidade e satisfação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProdutos.map((produto, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 corporate-blue rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{produto.produto}</p>
                        <p className="text-sm text-gray-600">{produto.quantidade} unidades</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{produto.satisfacao}/5 ⭐</p>
                      <p className="text-sm text-gray-600">{produto.custo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Análise por Setor */}
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="corporate-blue-text">Análise por Setor</CardTitle>
              <CardDescription>Participação e satisfação por departamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {setores.map((setor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{setor.setor}</span>
                      <span className="text-sm text-gray-600">{setor.colaboradores} colaboradores</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>Participação: {setor.participacao}%</span>
                        <span>Satisfação: {setor.satisfacao}/5</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${setor.participacao}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-600 h-2 rounded-full"
                            style={{ width: `${(setor.satisfacao / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Financeiro */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="corporate-blue-text">Resumo Financeiro</CardTitle>
            <CardDescription>Investimento e economia nas campanhas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold corporate-blue-text">{metricas.valorTotalInvestido}</div>
                <div className="text-sm text-gray-600">Valor Total Investido</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{metricas.economiaLogistica}</div>
                <div className="text-sm text-gray-600">Economia em Logística</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">R$ 321,13</div>
                <div className="text-sm text-gray-600">Custo Médio por Colaborador</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
