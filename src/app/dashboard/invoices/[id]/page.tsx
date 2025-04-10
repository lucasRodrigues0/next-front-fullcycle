import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download } from "lucide-react"
import { cookies } from "next/headers";
import { StatusBadge } from "@/components/status-badge";

export async function getInvoice(id: string) {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;
  const response = await fetch(`http://localhost:8080/invoice/${id}`, {
    headers: {
      "X-API-KEY": apiKey as string,
    },
    cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices/${id}`]
    },
  });

  return response.json();
}

export default async function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  const invoiceData = await getInvoice(id);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link href="/dashboard/invoices">
                <ArrowLeft size={20} />
              </Link>
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Fatura {id}</h1>
                <StatusBadge status={invoiceData.status} />
              </div>
              <p className="text-gray-400">Criada em {new Date(invoiceData.created_at).toLocaleDateString()}</p>
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
                <span>{invoiceData.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Valor</span>
                <span>{invoiceData.amount}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Data de Criação</span>
                <span>{new Date(invoiceData.created_at).toLocaleDateString()}</span>
              </div>

              {/* <div className="flex justify-between">
                <span className="text-gray-400">Última Atualização</span>
                <span>{new Date(invoiceData.updatedAt).toLocaleDateString()}</span>
              </div> */}

              <div className="flex justify-between">
                <span className="text-gray-400">Descrição</span>
                <span>{invoiceData.description}</span>
              </div>
            </div>
          </div>

          {/* <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Status da Transação</h2>

            <div className="space-y-6">
              {invoiceData.transactionStatus.map((status, index) => (
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
          </div> */}

          <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Método de Pagamento</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Tipo</span>
                <span>{invoiceData.payment_type === 'credit_card' ? 'Cartão de Crédito' : 'Outro'}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Últimos Dígitos</span>
                <span>{invoiceData.card_last_digits}</span>
              </div>

              {/* <div className="flex justify-between">
                <span className="text-gray-400">Titular</span>
                <span>{invoiceData.payment_type.holder}</span>
              </div> */}
            </div>
          </div>

          {/* <div className="bg-[#232d3f] rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Dados Adicionais</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">ID da Conta</span>
                <span>{invoiceData.additionalData.accountId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">IP do Cliente</span>
                <span>{invoiceData.additionalData.clientIp}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Dispositivo</span>
                <span>{invoiceData.additionalData.device}</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}
