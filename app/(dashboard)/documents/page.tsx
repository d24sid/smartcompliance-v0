import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/components/status-badge"
import { formatDateTime } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Download, Search, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"

// Mock data for GET /api/documents
const mockDocuments = [
  {
    document_name: "MGT-7 Filing",
    client_name: "XYZ LLP",
    entity_name: "XYZ LLP",
    compliance_name: "MGT-7",
    document_type: "ROC_FILING",
    period_value: "FY 2024-25",
    version: 1,
    status: "FILED",
    uploaded_by: "Amit Shah",
    uploaded_at: "2025-08-30T10:00:00Z",
  },
]

export default async function DocumentVaultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  await searchParams

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Vault</h1>
          <p className="text-muted-foreground">Centralized repository for all client and compliance documents.</p>
        </div>
      </div>

      <Card className="border-border shadow-none">
        <CardHeader className="pb-3 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search documents by name, client, or entity..." className="pl-9 bg-muted/30" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-6">Document Name</TableHead>
                <TableHead>Client & Entity</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead className="text-right pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockDocuments.map((doc, idx) => (
                <TableRow key={idx}>
                  <TableCell className="pl-6">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div className="font-medium">
                        {doc.document_name}
                        <span className="ml-2 text-xs text-muted-foreground font-normal">v{doc.version}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{doc.client_name}</div>
                    <div className="text-xs text-muted-foreground">{doc.entity_name}</div>
                  </TableCell>
                  <TableCell className="text-xs font-mono">{doc.document_type}</TableCell>
                  <TableCell>{doc.period_value}</TableCell>
                  <TableCell>
                    <StatusBadge status={doc.status} />
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{doc.uploaded_by}</div>
                    <div className="text-xs text-muted-foreground">{formatDateTime(doc.uploaded_at)}</div>
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
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
