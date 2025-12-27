import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { UserPlus, Building, Users } from "lucide-react"

// Mock data for Firm Settings (Users List)
const mockFirmUsers = [
  { id: "u1", name: "Rahul Sharma", email: "rahul@firm.com", role: "ADMIN", status: "ACTIVE" },
  { id: "u2", name: "Neha Jain", email: "neha@firm.com", role: "STAFF", status: "ACTIVE" },
  { id: "u3", name: "Amit Shah", email: "amit@firm.com", role: "STAFF", status: "ACTIVE" },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Firm Settings</h1>
        <p className="text-muted-foreground">Manage firm profile, users, and organizational permissions.</p>
      </div>

      <div className="grid gap-8">
        {/* Firm Profile Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Building className="h-5 w-5" />
            <h2>Firm Profile</h2>
          </div>
          <Card className="border-border shadow-none">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Firm Name</div>
                  <div className="font-medium">Sharma & Co</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground">Subscription Plan</div>
                  <div className="font-medium">Professional (Yearly)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* User Management Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Users className="h-5 w-5" />
              <h2>User Management</h2>
            </div>
            <Button size="sm">
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
          <Card className="border-border shadow-none">
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-6">Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right pr-6">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFirmUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="pl-6 font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className="text-xs font-bold text-muted-foreground tracking-wider">{user.role}</span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-success/10 text-success">
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
