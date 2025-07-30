"use client"

import { useState } from "react"
import { ArrowLeft, MapPin, Shield, Save, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function PerfilEntrega() {
  const [endereco, setEndereco] = useState({
    rua: "Rua das Flores",
    numero: "123",
    complemento: "Apto 45",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
  })

  const handleSave = () => {
    alert("Endereço atualizado com sucesso!")
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
            <h1 className="text-2xl font-bold">Perfil de Entrega</h1>
            <p className="text-blue-100">Mantenha seu endereço sempre atualizado</p>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Aviso LGPD */}
        <Alert className="border-blue-200 bg-blue-50">
          <Shield className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            <strong>Proteção de Dados:</strong> Seus dados pessoais são protegidos conforme a LGPD. Utilizamos essas
            informações apenas para entrega dos brindes corporativos.
          </AlertDescription>
        </Alert>

        {/* Informações Pessoais */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <User className="w-5 h-5" />
              <span>Informações Pessoais</span>
            </CardTitle>
            <CardDescription>Dados básicos do seu perfil</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome Completo</Label>
                <Input id="nome" value="Pedro Silva" disabled className="rounded-lg bg-gray-100" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" value="pedro@empresa.com" disabled className="rounded-lg bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulário de Endereço */}
        <Card className="rounded-lg shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 corporate-blue-text">
              <MapPin className="w-5 h-5" />
              <span>Endereço de Entrega</span>
            </CardTitle>
            <CardDescription>Mantenha seus dados atualizados para receber seus brindes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="rua">Rua/Avenida</Label>
                <Input
                  id="rua"
                  value={endereco.rua}
                  onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero">Número</Label>
                <Input
                  id="numero"
                  value={endereco.numero}
                  onChange={(e) => setEndereco({ ...endereco, numero: e.target.value })}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="complemento">Complemento (Opcional)</Label>
              <Input
                id="complemento"
                placeholder="Apartamento, bloco, etc."
                value={endereco.complemento}
                onChange={(e) => setEndereco({ ...endereco, complemento: e.target.value })}
                className="rounded-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bairro">Bairro</Label>
                <Input
                  id="bairro"
                  value={endereco.bairro}
                  onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={endereco.cep}
                  onChange={(e) => setEndereco({ ...endereco, cep: e.target.value })}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cidade">Cidade</Label>
                <Input
                  id="cidade"
                  value={endereco.cidade}
                  onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
                  className="rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  placeholder="SP"
                  value={endereco.estado}
                  onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleSave} className="w-full corporate-blue text-white hover:bg-[#003366] rounded-lg">
                <Save className="w-4 h-4 mr-2" />
                Salvar Endereço
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Informações Adicionais */}
        <Card className="rounded-lg shadow-sm border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Importante:</p>
                <ul className="mt-2 space-y-1 list-disc list-inside">
                  <li>Mantenha seu endereço sempre atualizado</li>
                  <li>Entregas são feitas em horário comercial</li>
                  <li>Em caso de ausência, nova tentativa será agendada</li>
                  <li>Você receberá notificações sobre o status da entrega</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
