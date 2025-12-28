"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderOpen,
  Activity,
  Bell,
  Settings,
  Shield,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AppSidebarProps {
  userRole: "ADMIN" | "STAFF"
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/home", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "My Tasks", href: "/tasks", icon: FileText },
    { name: "Document Vault", href: "/documents", icon: FolderOpen },
    { name: "Client Activity", href: "/client-activity", icon: Activity },
    { name: "Notifications", href: "/notifications", icon: Bell },
    ...(userRole === "ADMIN" ? [{ name: "Audit Logs", href: "/audit-logs", icon: Shield }] : []),
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-sidebar">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b px-6">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold italic">C</span>
            </div>
            <span className="font-bold text-sidebar-foreground">SmartCompliance</span>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/")
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

