import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Status types from DATA_CONTRACT.md
type ComplianceStatus = "NOT_STARTED" | "IN_PROGRESS" | "WAITING_FOR_CLIENT" | "UNDER_REVIEW" | "FILED" | "OVERDUE"
type TaskStage = "NOT_STARTED" | "IN_PROGRESS" | "WAITING_FOR_CLIENT" | "UNDER_REVIEW" | "FILED"
type DocumentStatus = "DRAFT" | "FILED"

type StatusType = ComplianceStatus | TaskStage | DocumentStatus | string

interface StatusBadgeProps {
  status: StatusType
  className?: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  NOT_STARTED: {
    label: "Not Started",
    className: "bg-muted text-muted-foreground hover:bg-muted border-border",
  },
  IN_PROGRESS: {
    label: "In Progress",
    className: "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
  },
  WAITING_FOR_CLIENT: {
    label: "Waiting for Client",
    className: "bg-warning/20 text-warning-foreground hover:bg-warning/30 border-warning/30",
  },
  UNDER_REVIEW: {
    label: "Under Review",
    className: "bg-accent/20 text-accent-foreground hover:bg-accent/30 border-accent/30",
  },
  FILED: {
    label: "Filed",
    className: "bg-success/20 text-success-foreground hover:bg-success/30 border-success/30",
  },
  OVERDUE: {
    label: "Overdue",
    className: "bg-critical/20 text-critical-foreground hover:bg-critical/30 border-critical/30",
  },
  DRAFT: {
    label: "Draft",
    className: "bg-muted text-muted-foreground hover:bg-muted border-border",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: status.replace(/_/g, " "),
    className: "bg-muted text-muted-foreground hover:bg-muted border-border",
  }

  return (
    <Badge
      variant="outline"
      className={cn("font-medium px-2 py-0.5 whitespace-nowrap", config.className, className)}
    >
      {config.label}
    </Badge>
  )
}
