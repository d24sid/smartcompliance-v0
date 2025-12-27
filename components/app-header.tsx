"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search, User, LogOut, Settings, LayoutDashboard, Users, FileText, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
  user: {
    name: string
    email: string
    role: string
    firm: {
      name: string
    }
  }
}

export function AppHeader({ user }: AppHeaderProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/home", icon: LayoutDashboard },
    { name: "Clients", href: "/clients", icon: Users },
    { name: "My Tasks", href: "/tasks", icon: FileText },
    { name: "Documents", href: "/documents", icon: FileText },
    { name: "Audit Logs", href: "/audit-logs", icon: Activity },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-8">
        <div className="mr-8 flex items-center space-x-2">
          <div className="h-8 w-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold italic">C</span>
          </div>
          <span className="hidden font-bold sm:inline-block">ComplianceSaaS</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium flex-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80 flex items-center gap-2",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search clients, entities..."
              className="w-[200px] lg:w-[300px] pl-9 bg-muted"
            />
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 border-2 border-background" />
            <span className="sr-only">Notifications</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                  <User className="h-5 w-5" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <p className="text-[10px] mt-1 font-semibold uppercase tracking-wider text-primary">
                    {user.firm.name} • {user.role}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600 cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
