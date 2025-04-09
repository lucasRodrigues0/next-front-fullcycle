"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, ArrowRight } from "lucide-react"

export default function AuthPage() {
  const [apiKey, setApiKey] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (apiKey.trim()) {
      // Simulando autenticação bem-sucedida
      localStorage.setItem("apiKey", apiKey)
      router.push("/dashboard/invoices")
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-128px)]">
      <Card className="w-full max-w-md bg-[#1e293b] border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Autenticação Gateway</CardTitle>
          <CardDescription className="text-gray-300">Insira sua API Key para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="apiKey" className="text-sm font-medium text-white">
                API Key
              </label>
              <div className="flex gap-2">
                <Input
                  id="apiKey"
                  placeholder="Digite sua API Key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="bg-[#2a3749] border-gray-700 text-white"
                />
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  <ArrowRight size={20} />
                </Button>
              </div>
            </div>

            <Alert className="bg-[#2a3749] border-gray-700">
              <InfoIcon className="h-4 w-4 text-blue-400" />
              <AlertTitle className="text-blue-400 flex items-center gap-2 text-sm font-medium">
                Como obter uma API Key?
              </AlertTitle>
              <AlertDescription className="text-gray-300 text-sm">
                Para obter sua API Key, você precisa criar uma conta de comerciante. Entre em contato com nosso suporte
                para mais informações.
              </AlertDescription>
            </Alert>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
