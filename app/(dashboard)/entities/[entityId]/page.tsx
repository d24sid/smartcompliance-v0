import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/format"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"

// Mock data for GET /api/entities/{entityId}
const mockEntity = {
  id: "entity-uuid",
  name: "ABC Pvt Ltd",
  entity_type: "COMPANY",
  cin_or_llpin: "U12345KA2020PTC",
  incorporation_date: "2020-06-15",
  financial_year: "2024-25",
}

// Mock data for GET /api/entities/{entityId}/compliances
const mockCompliances = [
  {
    id: "compliance-uuid",
    name: "AOC-4",
    period_label: "FY 2024-25",
    due_date: "2025-10-30",
    status: "IN_PROGRESS",
    owner: "Neha Jain",
    last_updated_at: "2025-09-25T09:45:00Z",
  },
]

export default async function EntityDetailPage({ params }: { params: Promise<{ entityId: string }> }) {
  const resolvedParams = await params
  const entityId = resolvedParams.entityId

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/clients/client-uuid">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{mockEntity.name}</h1>
          <p className="text-sm text-muted-foreground">Entity Profile & Compliances</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground">Entity Type</div>
              <div className="font-medium">{mockEntity.entity_type}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">CIN / LLPIN</div>
              <div className="font-medium font-mono">{mockEntity.cin_or_llpin}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Incorporation Date</div>
              <div className="font-medium">{formatDate(mockEntity.incorporation_date)}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Current Financial Year</div>
              <div className="font-medium">{mockEntity.financial_year}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-border shadow-none">
          <CardHeader>
            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Compliances
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Period</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockCompliances.map((comp) => (
                  <TableRow key={comp.id}>
                    <TableCell className="font-medium">{comp.name}</TableCell>
                    <TableCell>{comp.period_label}</TableCell>
                    <TableCell>{formatDate(comp.due_date)}</TableCell>
                    <TableCell>
                      <StatusBadge status={comp.status} />
                    </TableCell>
                    <TableCell>{comp.owner}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/compliances/${comp.id}`}>
                          View <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
