import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type StatusType = "PENDING" | "IN_PROGRESS" | "WAITING_FOR_CLIENT" | "REVIEW_REQUIRED" | "COMPLETED" | "OVERDUE"

interface StatusBadgeProps {
  status: StatusType | string
  className?: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  PENDING: {
    label: "Pending",
    className: "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200",
  },
  WAITING_FOR_CLIENT: {
    label: "Waiting for Client",
    className: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200",
  },
  REVIEW_REQUIRED: {
    label: "Review Required",
    className: "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200",
  },
  COMPLETED: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
  },
  OVERDUE: {
    label: "Overdue",
    className: "bg-red-100 text-red-700 hover:bg-red-100 border-red-200",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status.replace(/_/g, " "),
    className: "bg-slate-100 text-slate-700 hover:bg-slate-100 border-slate-200",
  }

  return (
    <Badge
      variant="outline"
      className={cn("font-medium capitalize px-2 py-0.5 whitespace-nowrap", config.className, className)}
    >
      {config.label}
    </Badge>
  )
}
