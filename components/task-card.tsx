import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Calendar, Building2, FileText, ChevronRight } from "lucide-react"
import { formatDate } from "@/lib/format"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TaskCardProps {
  task: {
    task_name: string
    client_name: string
    entity_name: string
    compliance_name: string
    due_date: string
    status: string
    compliance_id: string
  }
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="shadow-none border-border hover:border-primary/30 transition-colors group">
      <CardHeader className="p-4 pb-2 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">
            {task.task_name}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Building2 className="h-3 w-3" />
          <span className="truncate">{task.client_name}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <FileText className="h-3 w-3" />
          <span>{task.compliance_name}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-destructive">
          <Calendar className="h-3 w-3" />
          <span>Due: {formatDate(task.due_date)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-3 bg-muted/30 border-t flex justify-end">
        <Button variant="ghost" size="sm" className="h-8 text-xs gap-1 px-2" asChild>
          <Link href={`/compliances/${task.compliance_id}`}>
            View Details
            <ChevronRight className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
