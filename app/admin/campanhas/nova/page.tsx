"use client"

import { useState } from "react"
import { ArrowLeft, Calendar, Users, Package, Save, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NovaCampanha() {
  const [nomeCampanha, setNomeCampanha] = useState("")
  const [dataEnvio, setDataEnvio] = useState("")
  const [descricao, setDescricao] = useState("")
  const [colaboradoresSelecionados, setColaboradoresSelecionados] = useState<string[]>([])
  const [produtosSelecionados, setProdutosSelecionados] = useState<string[]>([])

  const [mostrarModalNovoProduto, setMostrarModalNovoProduto] = useState(false)
  const [novoProdutoForm, setNovoProdutoForm] = useState({
    nome: "",
    valor: 0,
    fornecedor: "",
    categoria: "",
    descricao: "",
  })

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

  const produtos = [
    { id: "1", nome: "Caneca Personalizada", preco: "R$ 25,00", fornecedor: "Gráfica ABC" },
    { id: "2", nome: "Camiseta Corporativa", preco: "R$ 45,00", fornecedor: "Confecções XYZ" },
    { id: "3", nome: "Agenda 2024", preco: "R$ 35,00", fornecedor: "Papelaria 123" },
    { id: "4", nome: "Mochila Executiva", preco: "R$ 80,00", fornecedor: "Bags & Co" },
    { id: "5", nome: "Vale-presente", preco: "R$ 100,00", fornecedor: "Gift Cards Ltd" },
    { id: "6", nome: "Squeeze Personalizado", preco: "R$ 20,00", fornecedor: "Plásticos SA" },
  ]

  const handleColaboradorChange = (colaboradorId: string, checked: boolean) => {
    if (checked) {
      setColaboradoresSelecionados([...colaboradoresSelecionados, colaboradorId])
    } else {
      setColaboradoresSelecionados(colaboradoresSelecionados.filter((id) => id !== colaboradorId))
    }
  }

  const handleProdutoChange = (produtoId: string, checked: boolean) => {
    if (checked) {
      setProdutosSelecionados([...produtosSelecionados, produtoId])
    } else {
      setProdutosSelecionados(produtosSelecionados.filter((id) => id !== produtoId))
    }
  }

  const selecionarTodosColaboradores = () => {
    if (colaboradoresSelecionados.length === colaboradores.length) {
      setColaboradoresSelecionados([])
    } else {
      setColaboradoresSelecionados(colaboradores.map((c) => c.id))
    }
  }

  const calcularValorTotal = () => {
    const produtosSelecionadosData = produtos.filter((p) => produtosSelecionados.includes(p.id))
    const valorPorColaborador = produtosSelecionadosData.reduce((acc, produto) => {
      const valor = Number.parseFloat(produto.preco.replace("R$ ", "").replace(",", "."))
      return acc + valor
    }, 0)
    return valorPorColaborador * colaboradoresSelecionados.length
  }

  const salvarCampanha = () => {
    if (!nomeCampanha || !dataEnvio || colaboradoresSelecionados.length === 0 || produtosSelecionados.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios!")
      return
    }
    alert("Campanha criada com sucesso!")
    // Aqui seria redirecionado para a lista de campanhas
    window.location.href = "/admin/campanhas"
  }

  const salvarNovoProduto = () => {
    if (!novoProdutoForm.nome || !novoProdutoForm.fornecedor || novoProdutoForm.valor <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios!")
      return
    }

    const novoProdutoDisponivel = {
      id: `novo-${Date.now()}`,
      nome: novoProdutoForm.nome,
      preco: `R$ ${novoProdutoForm.valor.toFixed(2).replace(".", ",")}`,
      fornecedor: novoProdutoForm.fornecedor,
      categoria: novoProdutoForm.categoria,
      descricao: novoProdutoForm.descricao,
    }

    // Adicionar à lista de produtos (em um cenário real, seria salvo no backend)
    produtos.push(novoProdutoDisponivel)

    // Selecionar automaticamente o novo produto
    setProdutosSelecionados([...produtosSelecionados, novoProdutoDisponivel.id])

    // Resetar formulário e fechar modal
    setNovoProdutoForm({
      nome: "",
      valor: 0,
      fornecedor: "",
      categoria: "",
      descricao: "",
    })
    setMostrarModalNovoProduto(false)

    alert("Novo produto criado e adicionado à campanha com sucesso!")
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
              <h1 className="text-2xl font-bold">Criar Nova Campanha</h1>
              <p className="text-blue-100">Configure sua campanha de engajamento</p>
            </div>
          </div>
          <Button onClick={salvarCampanha} className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
            <Save className="w-4 h-4 mr-2" />
            Salvar Campanha
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Informações da Campanha */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <Calendar className="w-5 h-5" />
              <span>Informações da Campanha</span>
            </CardTitle>
            <CardDescription>Defina os detalhes básicos da sua campanha</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome da Campanha *</Label>
                <Input
                  id="nome"
                  placeholder="Ex: Kit Verão 2024"
                  value={nomeCampanha}
                  onChange={(e) => setNomeCampanha(e.target.value)}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data">Data Estimada de Envio *</Label>
                <Input
                  id="data"
                  type="date"
                  value={dataEnvio}
                  onChange={(e) => setDataEnvio(e.target.value)}
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição (Opcional)</Label>
              <Textarea
                id="descricao"
                placeholder="Descreva o objetivo desta campanha..."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="rounded-lg"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Seleção de Colaboradores */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <Users className="w-5 h-5" />
              <span>Seleção de Colaboradores</span>
            </CardTitle>
            <CardDescription>Escolha quais colaboradores receberão os brindes desta campanha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {colaboradoresSelecionados.length} de {colaboradores.length} selecionados
                </span>
                <Button
                  onClick={selecionarTodosColaboradores}
                  variant="outline"
                  size="sm"
                  className="rounded-lg bg-transparent"
                >
                  {colaboradoresSelecionados.length === colaboradores.length ? "Desmarcar Todos" : "Selecionar Todos"}
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colaboradores.map((colaborador) => (
                  <div key={colaborador.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={colaborador.id}
                      checked={colaboradoresSelecionados.includes(colaborador.id)}
                      onCheckedChange={(checked) => handleColaboradorChange(colaborador.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{colaborador.nome}</p>
                      <p className="text-sm text-muted-foreground">{colaborador.email}</p>
                      <p className="text-xs text-muted-foreground">{colaborador.setor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kit de Produtos */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <Package className="w-5 h-5" />
              <span>Composição do Kit</span>
            </CardTitle>
            <CardDescription>Selecione os produtos que farão parte do kit desta campanha</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Botão para criar novo produto */}
              <div
                className="border-2 border-dashed border-blue-300 rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-colors text-center"
                onClick={() => setMostrarModalNovoProduto(true)}
              >
                <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-blue-600">Criar Novo Produto</h3>
                <p className="text-sm text-blue-500">Adicione um item personalizado</p>
              </div>

              {produtos.map((produto) => (
                <div key={produto.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={produto.id}
                      checked={produtosSelecionados.includes(produto.id)}
                      onCheckedChange={(checked) => handleProdutoChange(produto.id, checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{produto.nome}</h3>
                      <p className="text-sm text-muted-foreground">{produto.preco}</p>
                      <p className="text-xs text-muted-foreground">{produto.fornecedor}</p>
                      {produto.categoria && (
                        <span className="inline-block mt-1 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {produto.categoria}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo da Campanha */}
        {(colaboradoresSelecionados.length > 0 || produtosSelecionados.length > 0) && (
          <Card className="rounded-lg shadow-sm border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="corporate-blue-text">Resumo da Campanha</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-medium">Colaboradores Selecionados:</p>
                  <p className="text-2xl font-bold corporate-blue-text">{colaboradoresSelecionados.length}</p>
                </div>
                <div>
                  <p className="font-medium">Produtos no Kit:</p>
                  <p className="text-2xl font-bold corporate-blue-text">{produtosSelecionados.length}</p>
                </div>
                <div>
                  <p className="font-medium">Valor Total Estimado:</p>
                  <p className="text-2xl font-bold corporate-blue-text">
                    R$ {calcularValorTotal().toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ações */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/campanhas">
            <Button variant="outline" className="rounded-lg bg-transparent">
              Cancelar
            </Button>
          </Link>
          <Button onClick={salvarCampanha} className="corporate-blue text-white hover:bg-[#003366] rounded-lg">
            <Save className="w-4 h-4 mr-2" />
            Criar Campanha
          </Button>
        </div>
      </div>

      {/* Modal para Novo Produto */}
      {mostrarModalNovoProduto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between corporate-blue-text">
                <span>Criar Novo Produto</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setMostrarModalNovoProduto(false)}
                  className="rounded-lg"
                >
                  ✕
                </Button>
              </CardTitle>
              <CardDescription>Adicione um novo produto ao catálogo</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="novo-nome">Nome do Produto *</Label>
                  <Input
                    id="novo-nome"
                    placeholder="Ex: Caneca Personalizada"
                    value={novoProdutoForm.nome}
                    onChange={(e) => setNovoProdutoForm({ ...novoProdutoForm, nome: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novo-categoria">Categoria</Label>
                  <Select
                    value={novoProdutoForm.categoria}
                    onValueChange={(value) => setNovoProdutoForm({ ...novoProdutoForm, categoria: value })}
                  >
                    <SelectTrigger className="rounded-lg">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Material de Escritório">Material de Escritório</SelectItem>
                      <SelectItem value="Vestuário">Vestuário</SelectItem>
                      <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="Casa e Decoração">Casa e Decoração</SelectItem>
                      <SelectItem value="Alimentação">Alimentação</SelectItem>
                      <SelectItem value="Lazer">Lazer e Entretenimento</SelectItem>
                      <SelectItem value="Outros">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="novo-valor">Valor Unitário (R$) *</Label>
                  <Input
                    id="novo-valor"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0,00"
                    value={novoProdutoForm.valor}
                    onChange={(e) =>
                      setNovoProdutoForm({ ...novoProdutoForm, valor: Number.parseFloat(e.target.value) || 0 })
                    }
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novo-fornecedor">Fornecedor *</Label>
                  <Input
                    id="novo-fornecedor"
                    placeholder="Ex: Gráfica ABC"
                    value={novoProdutoForm.fornecedor}
                    onChange={(e) => setNovoProdutoForm({ ...novoProdutoForm, fornecedor: e.target.value })}
                    className="rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="novo-descricao">Descrição (Opcional)</Label>
                <Textarea
                  id="novo-descricao"
                  placeholder="Descreva as características do produto..."
                  value={novoProdutoForm.descricao}
                  onChange={(e) => setNovoProdutoForm({ ...novoProdutoForm, descricao: e.target.value })}
                  className="rounded-lg"
                  rows={3}
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Preview do Produto:</h4>
                <div className="text-sm text-blue-700">
                  <p>
                    <strong>Nome:</strong> {novoProdutoForm.nome || "Nome do produto"}
                  </p>
                  <p>
                    <strong>Valor:</strong> R$ {novoProdutoForm.valor.toFixed(2).replace(".", ",")}
                  </p>
                  <p>
                    <strong>Fornecedor:</strong> {novoProdutoForm.fornecedor || "Nome do fornecedor"}
                  </p>
                  {novoProdutoForm.categoria && (
                    <p>
                      <strong>Categoria:</strong> {novoProdutoForm.categoria}
                    </p>
                  )}
                  {novoProdutoForm.descricao && (
                    <p>
                      <strong>Descrição:</strong> {novoProdutoForm.descricao}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setMostrarModalNovoProduto(false)}
                  className="rounded-lg bg-transparent"
                >
                  Cancelar
                </Button>
                <Button onClick={salvarNovoProduto} className="corporate-blue text-white hover:bg-[#003366] rounded-lg">
                  <Save className="w-4 h-4 mr-2" />
                  Criar e Adicionar ao Kit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
