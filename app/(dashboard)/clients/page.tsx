import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { formatDate } from "@/lib/format"

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

// Mock user role - would come from GET /api/me
const mockUserRole = "ADMIN" as const

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Clients</h1>
          <p className="text-muted-foreground">Directory of all client accounts and their compliance health.</p>
        </div>
        {mockUserRole === "ADMIN" && (
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Create Client
          </Button>
        )}
      </div>

      <Card className="border-border shadow-none">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client name</TableHead>
                <TableHead className="text-center">Entities count</TableHead>
                <TableHead className="text-center">Active compliances</TableHead>
                <TableHead className="text-center">Overdue compliances</TableHead>
                <TableHead>Last activity date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No clients found. Create your first client to get started.
                  </TableCell>
                </TableRow>
              ) : (
                mockClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <Link href={`/clients/${client.id}`} className="block">
                        {client.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/clients/${client.id}`} className="block">
                        {client.entities_count}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/clients/${client.id}`} className="block">
                        {client.active_compliances}
                      </Link>
                    </TableCell>
                    <TableCell className="text-center">
                      <Link href={`/clients/${client.id}`} className="block">
                        <span className={client.overdue_compliances > 0 ? "text-critical font-semibold" : ""}>
                          {client.overdue_compliances}
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/clients/${client.id}`} className="block">
                        {formatDate(client.last_activity_at)}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
