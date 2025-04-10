import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { cookies } from "next/headers";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";
import { redirect } from "next/navigation";

export async function logoutAction() {
  "use server";
  const cookiesStore = await cookies();
  cookiesStore.delete("apiKey");
  redirect('/auth');
}

export default async function Header() {

  const cookiesStore = await cookies();

  const isAuthPage = cookiesStore.get("apiKey")?.value !== undefined;

  return (
    <header className="bg-[#1a2332] border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={isAuthPage ? "/dashboard/invoices" : "/"} className="text-xl font-bold">
          Full Cycle Gateway
        </Link>

        {isAuthPage && (
          <div className="flex items-center gap-4">
            <span className="text-gray-300">Olá, usuário</span>
            <form action={logoutAction}>
              <Button variant="destructive" size="sm" className="flex items-center gap-1">
                <LogOut size={16} />
                Logout
              </Button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}
