import { Badge } from "@/components/ui/badge"

type Status = "approved" | "pending" | "rejected"

interface StatusBadgeProps {
  status: Status | string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    approved: {
      label: "Aprovado",
      className: "bg-green-500 hover:bg-green-600"
    },
    pending: {
      label: "Pendente",
      className: "bg-yellow-500 hover:bg-yellow-600"
    },
    rejected: {
      label: "Rejeitado",
      className: "bg-red-500 hover:bg-red-600"
    }
  }

  const config = statusConfig[status as Status] || {
    label: "Unknown",
    className: ""
  }

  return (
    <Badge className={config.className}>
      {config.label}
    </Badge>
  )
}