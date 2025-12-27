import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatDateTime } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Download, ShieldCheck } from "lucide-react"

// Mock data for GET /api/audit-logs
const mockAuditLogs = [
  {
    timestamp: "2025-09-25T10:15:00Z",
    user: "Rahul Sharma",
    action: "MARKED_FILED",
    entity_type: "COMPLIANCE",
    entity_id: "compliance-uuid",
    before: { status: "UNDER_REVIEW" },
    after: { status: "FILED" },
  },
]

export default function AuditLogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Audit Logs</h1>
            <p className="text-muted-foreground">Immutable trail of all system actions (Admin Only).</p>
          </div>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export Logs
        </Button>
      </div>

      <Card className="border-border shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead className="pr-6">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell className="pl-6 font-mono text-xs">{formatDateTime(log.timestamp)}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-[10px] font-bold tracking-wider">
                      {log.action}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs uppercase font-semibold text-muted-foreground">{log.entity_type}</div>
                    <div className="text-[10px] font-mono">{log.entity_id}</div>
                  </TableCell>
                  <TableCell className="pr-6">
                    <div className="text-[10px] space-y-1">
                      <div className="text-muted-foreground">
                        Before: <code className="bg-muted px-1 rounded">{JSON.stringify(log.before)}</code>
                      </div>
                      <div className="text-primary font-medium">
                        After: <code className="bg-primary/10 px-1 rounded">{JSON.stringify(log.after)}</code>
                      </div>
                    </div>
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
