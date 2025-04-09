import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Full Cycle Gateway",
  description: "Sistema de pagamentos e faturas",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-[#1a2332] text-white min-h-screen`}>
        <Header />
        <main className="min-h-[calc(100vh-64px)]">{children}</main>
        <footer className="text-center py-4 text-sm text-gray-400">
          © 2025 Full Cycle Gateway. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  )
}
