import { TaskCard } from "./task-card"
import { Badge } from "@/components/ui/badge"

interface Task {
  task_name: string
  client_name: string
  entity_name: string
  compliance_name: string
  due_date: string
  status: string
  compliance_id: string
}

interface KanbanBoardProps {
  tasks: Task[]
}

const COLUMNS = [
  { label: "Todo", value: "TODO", color: "bg-slate-100 text-slate-700 border-slate-200" },
  { label: "In Progress", value: "IN_PROGRESS", color: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Waiting for Client", value: "WAITING_FOR_CLIENT", color: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Done", value: "DONE", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
]

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
      {COLUMNS.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.value)

        return (
          <div key={column.value} className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{column.label}</h3>
                <Badge variant="secondary" className="rounded-full h-5 px-1.5 text-[10px] font-bold">
                  {columnTasks.length}
                </Badge>
              </div>
              <div className={`h-1.5 w-1.5 rounded-full ${column.color.split(" ")[0]}`} />
            </div>

            <div className="bg-muted/50 rounded-xl p-3 border border-border/50 min-h-[500px] flex flex-col gap-3">
              {columnTasks.length > 0 ? (
                columnTasks.map((task, idx) => <TaskCard key={idx} task={task} />)
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-2 opacity-40">
                  <div className="h-8 w-8 rounded-full border-2 border-dashed border-current flex items-center justify-center">
                    <span className="text-lg font-bold">+</span>
                  </div>
                  <p className="text-xs font-medium">No tasks</p>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
