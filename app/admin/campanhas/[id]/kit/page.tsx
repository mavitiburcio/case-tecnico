"use client"

import { ArrowLeft, Package, Plus, Trash2, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function EditarKit() {
  const params = useParams()
  const campanhaId = params.id

  const [produtos, setProdutos] = useState([
    { id: 1, nome: "Caneca Personalizada", quantidade: 50, valor: 25.0, fornecedor: "Gráfica ABC" },
    { id: 2, nome: "Camiseta Corporativa", quantidade: 50, valor: 15.0, fornecedor: "Confecções XYZ" },
    { id: 3, nome: "Agenda 2024", quantidade: 50, valor: 10.0, fornecedor: "Papelaria 123" },
  ])

  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    quantidade: 0,
    valor: 0,
    fornecedor: "",
  })

  const [mostrarModalNovoProduto, setMostrarModalNovoProduto] = useState(false)
  const [novoProdutoForm, setNovoProdutoForm] = useState({
    nome: "",
    valor: 0,
    fornecedor: "",
    categoria: "",
    descricao: "",
  })

  const produtosDisponiveis = [
    { nome: "Caneca", valor: 25.0, fornecedor: "Gráfica ABC" },
    { nome: "Camiseta", valor: 15.0, fornecedor: "Confecções XYZ" },
    { nome: "Agenda", valor: 10.0, fornecedor: "Papelaria 123" },
    { nome: "Mochila", valor: 80.0, fornecedor: "Bags & Co" },
    { nome: "Vale-presente", valor: 100.0, fornecedor: "Gift Cards Ltd" },
    { nome: "Squeeze", valor: 20.0, fornecedor: "Plásticos SA" },
    { nome: "Mouse Pad", valor: 12.0, fornecedor: "Tech Supplies" },
    { nome: "Pen Drive", valor: 35.0, fornecedor: "Digital Store" },
  ]

  const adicionarProduto = (produtoBase: any) => {
    const novoProd = {
      id: Date.now(),
      nome: produtoBase.nome,
      quantidade: 50, // quantidade padrão
      valor: produtoBase.valor,
      fornecedor: produtoBase.fornecedor,
    }
    setProdutos([...produtos, novoProd])
  }

  const removerProduto = (id: number) => {
    setProdutos(produtos.filter((p) => p.id !== id))
  }

  const atualizarProduto = (id: number, campo: string, valor: any) => {
    setProdutos(
      produtos.map((p) =>
        p.id === id ? { ...p, [campo]: campo === "valor" ? Number.parseFloat(valor) || 0 : valor } : p,
      ),
    )
  }

  const calcularTotal = () => {
    return produtos.reduce((total, produto) => total + produto.quantidade * produto.valor, 0)
  }

  const salvarKit = () => {
    alert("Kit atualizado com sucesso!")
  }

  const salvarNovoProduto = () => {
    if (!novoProdutoForm.nome || !novoProdutoForm.fornecedor || novoProdutoForm.valor <= 0) {
      alert("Por favor, preencha todos os campos obrigatórios!")
      return
    }

    const novoProdutoDisponivel = {
      nome: novoProdutoForm.nome,
      valor: novoProdutoForm.valor,
      fornecedor: novoProdutoForm.fornecedor,
      categoria: novoProdutoForm.categoria,
      descricao: novoProdutoForm.descricao,
    }

    // Adicionar à lista de produtos disponíveis (em um cenário real, seria salvo no backend)
    produtosDisponiveis.push(novoProdutoDisponivel)

    // Adicionar automaticamente ao kit
    const novoProd = {
      id: Date.now(),
      nome: novoProdutoForm.nome,
      quantidade: 50,
      valor: novoProdutoForm.valor,
      fornecedor: novoProdutoForm.fornecedor,
    }
    setProdutos([...produtos, novoProd])

    // Resetar formulário e fechar modal
    setNovoProdutoForm({
      nome: "",
      valor: 0,
      fornecedor: "",
      categoria: "",
      descricao: "",
    })
    setMostrarModalNovoProduto(false)

    alert("Novo produto criado e adicionado ao kit com sucesso!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="corporate-blue text-white p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={`/admin/campanhas/${campanhaId}`}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Editar Kit da Campanha</h1>
              <p className="text-blue-100">Gerencie os produtos do kit</p>
            </div>
          </div>
          <Button onClick={salvarKit} className="bg-white text-[#002147] hover:bg-gray-100 rounded-lg">
            <Save className="w-4 h-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Produtos do Kit Atual */}
          <div className="lg:col-span-2">
            <Card className="rounded-lg shadow-sm">
              <CardHeader>
                <CardTitle className="corporate-blue-text">Produtos no Kit</CardTitle>
                <CardDescription>Edite os produtos inclusos na campanha</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {produtos.map((produto) => (
                    <div key={produto.id} className="border rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2">
                          <Label htmlFor={`nome-${produto.id}`}>Nome do Produto</Label>
                          <Input
                            id={`nome-${produto.id}`}
                            value={produto.nome}
                            onChange={(e) => atualizarProduto(produto.id, "nome", e.target.value)}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`quantidade-${produto.id}`}>Quantidade</Label>
                          <Input
                            id={`quantidade-${produto.id}`}
                            type="number"
                            value={produto.quantidade}
                            onChange={(e) =>
                              atualizarProduto(produto.id, "quantidade", Number.parseInt(e.target.value) || 0)
                            }
                            className="rounded-lg"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`valor-${produto.id}`}>Valor Unitário</Label>
                          <Input
                            id={`valor-${produto.id}`}
                            type="number"
                            step="0.01"
                            value={produto.valor}
                            onChange={(e) => atualizarProduto(produto.id, "valor", e.target.value)}
                            className="rounded-lg"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-lg bg-transparent"
                            onClick={() => removerProduto(produto.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Fornecedor: {produto.fornecedor}</p>
                        <p className="font-medium">
                          Subtotal: R$ {(produto.quantidade * produto.valor).toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                    </div>
                  ))}

                  {produtos.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum produto no kit. Adicione produtos da lista ao lado.</p>
                    </div>
                  )}
                </div>

                {produtos.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total do Kit:</span>
                      <span className="corporate-blue-text">R$ {calcularTotal().toFixed(2).replace(".", ",")}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Produtos Disponíveis */}
          <Card className="rounded-lg shadow-sm">
            <CardHeader>
              <CardTitle className="corporate-blue-text">Produtos Disponíveis</CardTitle>
              <CardDescription>Clique para adicionar ao kit</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Botão para criar novo produto */}
                <div
                  className="border-2 border-dashed border-blue-300 rounded-lg p-4 hover:bg-blue-50 cursor-pointer transition-colors text-center"
                  onClick={() => setMostrarModalNovoProduto(true)}
                >
                  <Plus className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-medium text-blue-600">Criar Novo Produto</h3>
                  <p className="text-sm text-blue-500">Adicione um item personalizado</p>
                </div>

                {produtosDisponiveis.map((produto, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => adicionarProduto(produto)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{produto.nome}</h3>
                        <p className="text-sm text-gray-600">R$ {produto.valor.toFixed(2).replace(".", ",")}</p>
                        <p className="text-xs text-gray-500">{produto.fornecedor}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resumo */}
          <Card className="rounded-lg shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="corporate-blue-text">Resumo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Produtos no kit:</span>
                  <span className="font-medium">{produtos.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantidade total:</span>
                  <span className="font-medium">{produtos.reduce((acc, p) => acc + p.quantidade, 0)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Valor total:</span>
                  <span className="corporate-blue-text">R$ {calcularTotal().toFixed(2).replace(".", ",")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
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
                      <SelectItem value="escritorio">Material de Escritório</SelectItem>
                      <SelectItem value="vestuario">Vestuário</SelectItem>
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="casa">Casa e Decoração</SelectItem>
                      <SelectItem value="alimentacao">Alimentação</SelectItem>
                      <SelectItem value="lazer">Lazer e Entretenimento</SelectItem>
                      <SelectItem value="outros">Outros</SelectItem>
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
