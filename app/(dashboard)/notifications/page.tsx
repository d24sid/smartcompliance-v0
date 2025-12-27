import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDateTime } from "@/lib/format"
import { Bell } from "lucide-react"

// Mock data for GET /api/notifications
const mockNotifications = [
  {
    type: "COMPLIANCE_REMINDER",
    trigger: "DUE_IN_3_DAYS",
    recipient_email: "finance@abc.com",
    channel: "EMAIL",
    delivery_status: "SENT",
    sent_at: "2025-10-27T09:00:00Z",
  },
]

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Bell className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Communication Log</h1>
          <p className="text-muted-foreground">History of all automated alerts and client notifications.</p>
        </div>
      </div>

      <Card className="border-border shadow-none">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Type & Trigger</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="pr-6 text-right">Sent At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockNotifications.map((notif, idx) => (
                <TableRow key={idx}>
                  <TableCell className="pl-6">
                    <div className="font-medium text-sm">{notif.type.replace(/_/g, " ")}</div>
                    <div className="text-xs text-muted-foreground">{notif.trigger.replace(/_/g, " ")}</div>
                  </TableCell>
                  <TableCell className="text-sm">{notif.recipient_email}</TableCell>
                  <TableCell>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-muted">{notif.channel}</span>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={notif.delivery_status} />
                  </TableCell>
                  <TableCell className="pr-6 text-right text-sm text-muted-foreground">
                    {formatDateTime(notif.sent_at)}
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
