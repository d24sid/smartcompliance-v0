import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { formatDate } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Download, Upload, History, ArrowRight } from "lucide-react"

// Mock data for GET /api/compliances/{complianceId}
const mockCompliance = {
  id: "compliance-uuid",
  name: "AOC-4",
  statutory_due_date: "2025-10-30",
  overridden_due_date: null,
  override_reason: null,
  status: "IN_PROGRESS",
  owner: "Neha Jain",
}

// Mock data for GET /api/compliances/{complianceId}/tasks
const mockTasks = [
  {
    id: "task-1",
    name: "Prepare draft",
    stage: "IN_PROGRESS",
    assignee: "Neha Jain",
    due_date: "2025-10-10",
  },
  {
    id: "task-2",
    name: "Board Approval",
    stage: "NOT_STARTED",
    assignee: "Rahul Sharma",
    due_date: "2025-10-20",
  },
]

// Mock data for GET /api/compliances/{complianceId}/documents
const mockDocs = [
  {
    document_name: "Draft AOC-4",
    document_type: "ROC_FILING",
    period_type: "ANNUAL",
    period_value: "FY 2024-25",
    version: 1,
    status: "DRAFT",
    uploaded_by: "Neha Jain",
    uploaded_at: "2025-09-18T16:20:00Z",
  },
]

const STAGES = ["NOT_STARTED", "IN_PROGRESS", "WAITING_FOR_CLIENT", "UNDER_REVIEW", "FILED"]

// Generate static params for static export
export async function generateStaticParams() {
  // Mock compliance IDs - in production, this would fetch from API
  return [
    { complianceId: "compliance-uuid" },
    { complianceId: "comp-1" },
    { complianceId: "comp-2" },
    { complianceId: "comp-3" },
  ]
}

export default async function ComplianceDetailPage({ params }: { params: Promise<{ complianceId: string }> }) {
  const resolvedParams = await params
  const complianceId = resolvedParams.complianceId

  return (
    <div className="space-y-8">
      {/* SECTION A: OVERVIEW */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Compliance Detail: {mockCompliance.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-1 text-sm text-muted-foreground">
            <span>Statutory Due: {formatDate(mockCompliance.statutory_due_date)}</span>
            <span>Owner: {mockCompliance.owner}</span>
            <StatusBadge status={mockCompliance.status} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <History className="mr-2 h-4 w-4" /> Audit Log
          </Button>
          <Button size="sm">
            Mark as Filed <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* SECTION B: TASK WORKFLOW */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-semibold text-foreground">Task Workflow</h2>
          <div className="space-y-6">
            {STAGES.map((stage) => {
              const stageTasks = mockTasks.filter((t) => t.stage === stage)
              return (
                <div key={stage} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      {stage.replace(/_/g, " ")} ({stageTasks.length})
                    </h3>
                  </div>
                  <div className="grid gap-3">
                    {stageTasks.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground italic">
                        No tasks in this stage
                      </div>
                    ) : (
                      stageTasks.map((task) => (
                        <Card key={task.id} className="border-border shadow-none">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <div className="font-medium">{task.name}</div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>Assignee: {task.assignee}</span>
                                  <span>Due: {formatDate(task.due_date)}</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Move to Next <ArrowRight className="ml-2 h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* SECTION C: DOCUMENTS */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">Documents</h2>
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </div>
          <div className="space-y-4">
            {mockDocs.map((doc, idx) => (
              <Card key={idx} className="border-border shadow-none">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-sm">{doc.document_name}</div>
                      <div className="text-xs text-muted-foreground">{doc.document_type}</div>
                    </div>
                    <StatusBadge status={doc.status} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Version {doc.version}</span>
                    <span>{formatDate(doc.uploaded_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                      View
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs">
                      <Download className="mr-1 h-3 w-3" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
