"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard } from "lucide-react"

export default function CreateInvoicePage() {
  const router = useRouter()
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulando criação de fatura
    router.push("/dashboard")
  }

  // Calcula valores para exibição
  const amountValue = Number.parseFloat(amount) || 0
  const processingFee = amountValue * 0.02
  const total = amountValue + processingFee

  const formatCurrency = (value: number) => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Criar Nova Fatura</h1>
          <p className="text-gray-400">Preencha os dados abaixo para processar um novo pagamento</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="amount" className="text-sm font-medium">
                  Valor
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
                  <Input
                    id="amount"
                    type="text"
                    placeholder="0,00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 bg-[#2a3749] border-gray-700"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </label>
                <Textarea
                  id="description"
                  placeholder="Descreva o motivo do pagamento"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[120px] bg-[#2a3749] border-gray-700"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4">Dados do Cartão</h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="cardNumber" className="text-sm font-medium">
                      Número do Cartão
                    </label>
                    <div className="relative">
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="bg-[#2a3749] border-gray-700"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="expiryDate" className="text-sm font-medium">
                        Data de Expiração
                      </label>
                      <Input
                        id="expiryDate"
                        type="text"
                        placeholder="MM/AA"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="bg-[#2a3749] border-gray-700"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="cvv" className="text-sm font-medium">
                        CVV
                      </label>
                      <Input
                        id="cvv"
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="bg-[#2a3749] border-gray-700"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cardName" className="text-sm font-medium">
                      Nome no Cartão
                    </label>
                    <Input
                      id="cardName"
                      type="text"
                      placeholder="Como aparece no cartão"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="bg-[#2a3749] border-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-6">
            <div className="space-y-2 max-w-md ml-auto">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span>{formatCurrency(amountValue)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Taxa de Processamento (2%)</span>
                <span>{formatCurrency(processingFee)}</span>
              </div>

              <div className="flex justify-between border-t border-gray-700 pt-2 font-bold">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/dashboard/invoices")}
                className="bg-[#232d3f] hover:bg-[#2a3749] border-gray-700"
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                Processar Pagamento
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
