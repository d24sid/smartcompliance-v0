import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDateTime } from "@/lib/format"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Mail, User } from "lucide-react"

// Mock data for GET /api/clients/{clientId}
const mockClient = {
  id: "client-uuid",
  name: "ABC Pvt Ltd",
  contact_email: "finance@abc.com",
  assigned_partner: "Rahul Sharma",
  status: "ACTIVE",
}

// Mock data for GET /api/clients/{clientId}/entities
const mockEntities = [
  {
    id: "entity-uuid",
    name: "ABC Pvt Ltd",
    entity_type: "COMPANY",
    financial_year: "2024-25",
    overdue_compliances: 1,
  },
]

// Mock data for GET /api/clients/{clientId}/documents
const mockDocuments = [
  {
    document_name: "AOC-4 Filing",
    document_type: "ROC_FILING",
    entity_name: "ABC Pvt Ltd",
    compliance_name: "AOC-4",
    period_type: "ANNUAL",
    period_value: "FY 2024-25",
    version: 2,
    status: "FILED",
    uploaded_by: "Neha Jain",
    uploaded_at: "2025-09-20T11:10:00Z",
  },
]

// Generate static params for static export
export async function generateStaticParams() {
  // Mock client IDs - in production, this would fetch from API
  return [
    { clientId: "client-uuid" },
    { clientId: "client-2" },
  ]
}

export default async function ClientDetailPage({ params }: { params: Promise<{ clientId: string }> }) {
  const resolvedParams = await params
  const clientId = resolvedParams.clientId

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{mockClient.name}</h1>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Mail className="h-3.5 w-3.5" /> {mockClient.contact_email}
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" /> Partner: {mockClient.assigned_partner}
            </span>
            <StatusBadge status={mockClient.status} />
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted/50 border border-border p-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="entities">Entities</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Entities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Compliances</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overdue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
              </CardContent>
            </Card>
            <Card className="border-border shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Current FY</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2024-25</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="entities">
          <Card className="border-border shadow-none">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>FY</TableHead>
                    <TableHead>Overdue</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEntities.map((entity) => (
                    <TableRow key={entity.id}>
                      <TableCell className="font-medium">{entity.name}</TableCell>
                      <TableCell>{entity.entity_type}</TableCell>
                      <TableCell>{entity.financial_year}</TableCell>
                      <TableCell>
                        <span className={entity.overdue_compliances > 0 ? "text-destructive font-semibold" : ""}>
                          {entity.overdue_compliances}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/entities/${entity.id}`}>
                            View Details <ExternalLink className="ml-2 h-3 w-3" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="border-border shadow-none">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Entity / Compliance</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Uploaded</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDocuments.map((doc, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <div className="font-medium">{doc.document_name}</div>
                        <div className="text-xs text-muted-foreground">{doc.document_type}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{doc.entity_name}</div>
                        <div className="text-xs text-muted-foreground">{doc.compliance_name}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-xs text-muted-foreground">{doc.period_type}</div>
                        <div className="text-sm">{doc.period_value}</div>
                      </TableCell>
                      <TableCell>v{doc.version}</TableCell>
                      <TableCell>
                        <StatusBadge status={doc.status} />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{doc.uploaded_by}</div>
                        <div className="text-xs text-muted-foreground">{formatDateTime(doc.uploaded_at)}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
