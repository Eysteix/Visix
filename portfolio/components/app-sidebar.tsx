"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  FolderOpenIcon,
  PenLineIcon,
  PlusCircleIcon,
  LogOutIcon,
  ExternalLinkIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  image?: string | null
}

const nav = [
  {
    label: "Dashboard",
    items: [
      { title: "Overview", href: "/dashboard", icon: LayoutDashboardIcon },
    ],
  },
  {
    label: "Content",
    items: [
      { title: "Projects", href: "/dashboard/projects", icon: FolderOpenIcon },
      { title: "New Project", href: "/dashboard/projects/new", icon: PlusCircleIcon },
      { title: "Blog Posts", href: "/dashboard/blog", icon: PenLineIcon },
      { title: "New Post", href: "/dashboard/blog/new", icon: PlusCircleIcon },
    ],
  },
]

export function AppSidebar({ user }: { user: User }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    await authClient.signOut()
    router.push("/login")
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="px-2 py-3">
          <Link href="/" className="text-base font-semibold tracking-tight">
            marvel<span className="text-indigo-600">.</span>
          </Link>
          <p className="text-xs text-muted-foreground mt-0.5">Dashboard</p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {nav.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon size={16} />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="View site">
              <Link href="/" target="_blank">
                <ExternalLinkIcon size={16} />
                <span>View Site</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} tooltip="Sign out">
              <LogOutIcon size={16} />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 py-2 border-t border-border mt-1">
          <p className="text-xs font-medium truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
