import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatDateTime } from "@/lib/format"

// Mock data based on GET /api/clients
const mockClients = [
  {
    id: "client-uuid",
    name: "ABC Pvt Ltd",
    entities_count: 2,
    active_compliances: 12,
    overdue_compliances: 1,
    last_activity_at: "2025-09-12T14:32:00Z",
  },
  {
    id: "client-2",
    name: "XYZ Corp",
    entities_count: 1,
    active_compliances: 5,
    overdue_compliances: 0,
    last_activity_at: "2025-09-15T10:15:00Z",
  },
]

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Clients</h1>
          <p className="text-muted-foreground">Directory of all client accounts and their compliance health.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Client
        </Button>
      </div>

      <Card className="border-border shadow-none">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search clients..." className="pl-9 bg-muted/50 border-none shadow-none" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead className="text-center">Entities</TableHead>
                <TableHead className="text-center">Active Compliances</TableHead>
                <TableHead className="text-center">Overdue</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <Link href={`/clients/${client.id}`} className="hover:underline">
                      {client.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{client.entities_count}</TableCell>
                  <TableCell className="text-center">{client.active_compliances}</TableCell>
                  <TableCell className="text-center">
                    <span className={client.overdue_compliances > 0 ? "text-destructive font-semibold" : ""}>
                      {client.overdue_compliances}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDateTime(client.last_activity_at)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/clients/${client.id}`}>View Profile</Link>
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
