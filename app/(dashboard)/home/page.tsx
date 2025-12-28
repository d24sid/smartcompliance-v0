import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/format"

// Mock data based on GET /api/home/today
const mockHomeData = {
  due_today: [
    {
      compliance_id: "comp-1",
      client_name: "ABC Pvt Ltd",
      entity_name: "ABC Pvt Ltd",
      compliance_name: "AOC-4",
      due_date: "2025-10-30",
      status: "IN_PROGRESS",
      owner: "Neha Jain",
    },
  ],
  overdue: [
    {
      compliance_id: "comp-2",
      client_name: "XYZ Corp",
      entity_name: "XYZ Corp",
      compliance_name: "MGT-7",
      due_date: "2025-09-30",
      status: "OVERDUE",
      owner: "Rahul Sharma",
    },
  ],
  waiting_for_client: [],
  recent_updates: [
    {
      compliance_id: "comp-3",
      client_name: "Global Tech",
      entity_name: "Global Tech LLP",
      compliance_name: "Form 11",
      due_date: "2025-11-15",
      status: "UNDER_REVIEW",
      owner: "Amit Shah",
    },
  ],
}

function ComplianceTable({ title, data }: { title: string; data: any[] }) {
  const getEmptyStateMessage = (sectionTitle: string) => {
    switch (sectionTitle) {
      case "Due Today":
        return "No compliances are due today. All scheduled items have been completed or rescheduled."
      case "Overdue":
        return "No overdue compliances for the selected period."
      case "Waiting for Client":
        return "No compliances are currently waiting for client response or action."
      case "Recently Updated":
        return "No recent updates to display. Activity will appear here as compliances are modified."
      default:
        return `No items in ${sectionTitle.toLowerCase()}.`
    }
  }

  return (
    <Card className="border-border shadow-none">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            {getEmptyStateMessage(title)}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client & Entity</TableHead>
                <TableHead>Compliance</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow key={idx} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <TableCell>
                    <Link href={`/compliances/${row.compliance_id}`} className="block">
                      <div className="font-medium text-foreground">{row.client_name}</div>
                      <div className="text-xs text-muted-foreground">{row.entity_name}</div>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/compliances/${row.compliance_id}`} className="block">
                      {row.compliance_name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/compliances/${row.compliance_id}`} className="block">
                      {formatDate(row.due_date)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/compliances/${row.compliance_id}`} className="block">
                      <StatusBadge status={row.status} />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={`/compliances/${row.compliance_id}`} className="block">
                      {row.owner}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Today's Overview</h1>
        <p className="text-muted-foreground">Manage your firm's compliance priorities for today.</p>
      </div>

      <div className="grid gap-6">
        <ComplianceTable title="Due Today" data={mockHomeData.due_today} />
        <ComplianceTable title="Overdue" data={mockHomeData.overdue} />
        <ComplianceTable title="Waiting for Client" data={mockHomeData.waiting_for_client} />
        <ComplianceTable title="Recently Updated" data={mockHomeData.recent_updates} />
      </div>
    </div>
  )
}
