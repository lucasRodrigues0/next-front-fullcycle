"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Simulação de verificação de autenticação
  // Em um cenário real, você verificaria um token ou cookie
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("apiKey")

    if (!isAuthenticated && pathname !== "/auth") {
      router.push("/auth")
    }
  }, [router, pathname])

  return <>{children}</>
}
