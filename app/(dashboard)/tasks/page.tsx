import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/format"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Mock data for GET /api/tasks/my
const mockMyTasks = [
  {
    task_name: "Prepare AOC-4 Draft",
    client_name: "ABC Pvt Ltd",
    entity_name: "ABC Pvt Ltd",
    compliance_name: "AOC-4",
    due_date: "2025-10-10",
    status: "IN_PROGRESS",
    compliance_id: "compliance-uuid",
  },
]

export default function MyTasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Tasks</h1>
        <p className="text-muted-foreground">Track and manage your assigned compliance work.</p>
      </div>

      <Card className="border-border shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Task Name</TableHead>
                <TableHead>Client & Entity</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockMyTasks.map((task, idx) => (
                <TableRow key={idx}>
                  <TableCell className="pl-6 font-medium">{task.task_name}</TableCell>
                  <TableCell>
                    <div className="text-sm">{task.client_name}</div>
                    <div className="text-xs text-muted-foreground">{task.entity_name}</div>
                  </TableCell>
                  <TableCell>{task.compliance_name}</TableCell>
                  <TableCell>{formatDate(task.due_date)}</TableCell>
                  <TableCell>
                    <StatusBadge status={task.status} />
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/compliances/${task.compliance_id}`}>Open Compliance</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
