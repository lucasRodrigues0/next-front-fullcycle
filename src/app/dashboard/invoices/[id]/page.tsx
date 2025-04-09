import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"

interface InvoiceDetailsPageProps {
  params: {
    id: string
  }
}

export default function InvoiceDetailsPage({ params }: InvoiceDetailsPageProps) {
  const invoiceId = `#${params.id}`

  // Dados de exemplo
  const invoice = {
    id: "#INV-001",
    status: "aprovado",
    createdAt: "30/03/2025 às 14:30",
    value: "R$ 1.500,00",
    description: "Compra Online #123",
    creationDate: "30/03/2025 14:30",
    lastUpdate: "30/03/2025 14:35",
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 1234",
      holder: "João da Silva",
    },
    transactionStatus: [
      { status: "Fatura Criada", date: "30/03/2025 14:30" },
      { status: "Pagamento Processado", date: "30/03/2025 14:32" },
      { status: "Transação Aprovada", date: "30/03/2025 14:35" },
    ],
    additionalData: {
      accountId: "ACC-12345",
      clientIp: "192.168.1.1",
      device: "Desktop - Chrome",
    },
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/invoices">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Fatura {invoiceId}</h1>
                <Badge className="bg-green-500 hover:bg-green-600">Aprovado</Badge>
              </div>
              <p className="text-gray-400">Criada em {invoice.createdAt}</p>
            </div>
          </div>

          <Button className="bg-[#232d3f] hover:bg-[#2a3749] text-white flex items-center gap-2">
            <Download size={16} />
            Download PDF
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Informações da Fatura</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">ID da Fatura</span>
                <span>{invoice.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Valor</span>
                <span>{invoice.value}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Data de Criação</span>
                <span>{invoice.creationDate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Última Atualização</span>
                <span>{invoice.lastUpdate}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Descrição</span>
                <span>{invoice.description}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Status da Transação</h2>

            <div className="space-y-6">
              {invoice.transactionStatus.map((status, index) => (
                <div key={index} className="flex gap-3">
                  <div className="mt-0.5">
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium">{status.status}</div>
                    <div className="text-sm text-gray-400">{status.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Método de Pagamento</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo</span>
                <span>{invoice.paymentMethod.type}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Últimos Dígitos</span>
                <span>{invoice.paymentMethod.lastDigits}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Titular</span>
                <span>{invoice.paymentMethod.holder}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Dados Adicionais</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">ID da Conta</span>
                <span>{invoice.additionalData.accountId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">IP do Cliente</span>
                <span>{invoice.additionalData.clientIp}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Dispositivo</span>
                <span>{invoice.additionalData.device}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
