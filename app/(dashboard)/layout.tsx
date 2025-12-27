import type React from "react"
import { AppHeader } from "@/components/app-header"

// This mock user would be fetched from GET /api/me after login
const mockUser = {
  id: "user-uuid",
  name: "Rahul Sharma",
  email: "rahul@firm.com",
  role: "ADMIN",
  firm: {
    id: "firm-uuid",
    name: "Sharma & Co",
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader user={mockUser} />
      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  )
}
