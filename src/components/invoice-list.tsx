"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react"

// Dados de exemplo
const invoices = [
  {
    id: "#INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "aprovado",
  },
  {
    id: "#INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "pendente",
  },
  {
    id: "#INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "rejeitado",
  },
]

export function InvoiceList() {
  const [status, setStatus] = useState("todos")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [search, setSearch] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "aprovado":
        return <Badge className="bg-green-500 hover:bg-green-600">Aprovado</Badge>
      case "pendente":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendente</Badge>
      case "rejeitado":
        return <Badge className="bg-red-500 hover:bg-red-600">Rejeitado</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#232d3f] rounded-lg">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Status</label>
          <Select defaultValue="todos" onValueChange={setStatus}>
            <SelectTrigger className="bg-[#2a3749] border-gray-700">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="aprovado">Aprovado</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="rejeitado">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Data Inicial</label>
          <Input
            type="text"
            placeholder="dd/mm/aaaa"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-[#2a3749] border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Data Final</label>
          <Input
            type="text"
            placeholder="dd/mm/aaaa"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-[#2a3749] border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Buscar</label>
          <Input
            type="text"
            placeholder="ID ou descrição"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#2a3749] border-gray-700"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#232d3f]">
            <TableRow>
              <TableHead className="text-gray-300">ID</TableHead>
              <TableHead className="text-gray-300">DATA</TableHead>
              <TableHead className="text-gray-300">DESCRIÇÃO</TableHead>
              <TableHead className="text-gray-300">VALOR</TableHead>
              <TableHead className="text-gray-300">STATUS</TableHead>
              <TableHead className="text-gray-300">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id} className="border-gray-700">
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{invoice.value}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/invoices/${invoice.id.replace("#", "")}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400">
                        <Eye size={16} />
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                      <Download size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">Mostrando 1 - 3 de 50 resultados</div>
        <div className="flex gap-1">
          <Button variant="outline" size="icon" className="h-8 w-8 bg-[#232d3f] border-gray-700">
            <ChevronLeft size={16} />
          </Button>
          <Button size="sm" className="h-8 w-8 bg-indigo-600 text-white">
            1
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8">
            2
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 bg-[#232d3f] border-gray-700">
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}
