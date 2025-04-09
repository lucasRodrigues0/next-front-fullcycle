"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function Header() {
  const pathname = usePathname()
  const isAuthenticated = pathname !== "/auth"

  return (
    <header className="bg-[#1a2332] border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={isAuthenticated ? "/dashboard/invoices" : "/"} className="text-xl font-bold">
          Full Cycle Gateway
        </Link>

        {isAuthenticated && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Olá, usuário</span>
            <Button variant="destructive" size="sm" className="flex items-center gap-1">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
