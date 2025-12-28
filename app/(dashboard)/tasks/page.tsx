import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/format"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KanbanBoard } from "@/components/kanban-board"
import { LayoutGrid, List } from "lucide-react"

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
  {
    task_name: "GST R1 Filing",
    client_name: "XYZ Corp",
    entity_name: "XYZ Corp",
    compliance_name: "GST Monthly",
    due_date: "2025-10-11",
    status: "TODO",
    compliance_id: "compliance-uuid-2",
  },
  {
    task_name: "Verify Audit Documents",
    client_name: "Global Industries",
    entity_name: "Global Industries",
    compliance_name: "Annual Audit",
    due_date: "2025-10-15",
    status: "WAITING_FOR_CLIENT",
    compliance_id: "compliance-uuid-3",
  },
]

export default function MyTasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Tasks</h1>
          <p className="text-muted-foreground">Track and manage your assigned compliance work.</p>
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-muted/50 border border-border p-1">
            <TabsTrigger value="list" className="gap-2 data-[state=active]:bg-background">
              <List className="h-4 w-4" />
              List View
            </TabsTrigger>
            <TabsTrigger value="kanban" className="gap-2 data-[state=active]:bg-background">
              <LayoutGrid className="h-4 w-4" />
              Kanban Board
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="list" className="mt-0">
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
        </TabsContent>

        <TabsContent value="kanban" className="mt-0">
          <KanbanBoard tasks={mockMyTasks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
