import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InvoiceList } from "./invoice-list"
import { Plus } from "lucide-react"

export default function InvoicesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Faturas</h1>
            <p className="text-gray-400">Gerencie suas faturas e acompanhe os pagamentos</p>
          </div>
          <Link href="/dashboard/invoices/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center gap-1 text-white">
              <Plus size={16} />
              Nova Fatura
            </Button>
          </Link>
        </div>

        <InvoiceList />
      </div>
    </div>
  )
}
