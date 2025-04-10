import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { StatusBadge } from "@/components/status-badge"
import { cookies } from "next/headers"

export async function getInvoices() {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;
  const response = await fetch("http://localhost:8080/invoice", {
    headers: {
      "X-API-KEY": apiKey as string,
    }, 
    cache: 'force-cache',
    next: {
      tags: [`accounts/${apiKey}/invoices`]
    }
  });

  return response.json();
}

export async function InvoiceList() {

  const invoices = await getInvoices();

  return (
    <div className="space-y-6">
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-[#232d3f] rounded-lg">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Status</label>
          <Select defaultValue="todos" onValueChange={setStatus}>
            <SelectTrigger className="bg-[#2a3749] border-gray-700">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="approved">Aprovado</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
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
      </div> */}

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
            {invoices.map((invoice: any) => (
              <TableRow key={invoice.id} className="border-gray-700">
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>{invoice.amount.toFixed(2).replace('.', ',')}</TableCell>
                <TableCell>
                  <StatusBadge status={invoice.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400" asChild>
                      <Link href={`/dashboard/invoices/${invoice.id.replace("#", "")}`}>
                        <Eye size={16} />
                      </Link>
                    </Button>
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
