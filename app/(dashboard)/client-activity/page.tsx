import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDate } from "@/lib/format"

// Mock data - would come from GET /api/client-activity (not in DATA_CONTRACT, but needed for UI)
const mockClientActivity = [
  {
    client_name: "ABC Pvt Ltd",
    last_login: "2025-09-25T10:15:00Z",
    recent_uploads: 3,
    pending_approvals: 1,
  },
  {
    client_name: "XYZ Corp",
    last_login: "2025-09-24T14:30:00Z",
    recent_uploads: 0,
    pending_approvals: 0,
  },
]

export default function ClientActivityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Client Activity</h1>
        <p className="text-muted-foreground">Passive monitoring of client behavior and engagement.</p>
      </div>

      <Card className="border-border shadow-none">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Client Activity Overview</CardTitle>
        </CardHeader>
        <CardContent>
          {mockClientActivity.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No client activity to display. Activity will appear here as clients interact with the system.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client name</TableHead>
                  <TableHead>Last login</TableHead>
                  <TableHead className="text-center">Recent uploads</TableHead>
                  <TableHead className="text-center">Pending approvals</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClientActivity.map((client, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-medium">{client.client_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDate(client.last_login)}
                    </TableCell>
                    <TableCell className="text-center">{client.recent_uploads}</TableCell>
                    <TableCell className="text-center">
                      {client.pending_approvals > 0 ? (
                        <span className="text-warning-foreground font-semibold">
                          {client.pending_approvals}
                        </span>
                      ) : (
                        client.pending_approvals
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

