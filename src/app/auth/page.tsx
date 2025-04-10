import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AuthForm } from "./authForm"

export default function AuthPage() {

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-128px)]">
      <Card className="w-full max-w-md bg-[#1e293b] border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Autenticação Gateway</CardTitle>
          <CardDescription className="text-gray-300">Insira sua API Key para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm />
        </CardContent>
      </Card>
    </div>
  )
}
