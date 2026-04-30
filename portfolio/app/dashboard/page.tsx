import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderOpenIcon, PenLineIcon, EyeIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

export default async function DashboardPage() {
  const [session, projectCount, postCount, publishedCount] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
  ])

  const stats = [
    { label: "Total Projects", value: projectCount, icon: FolderOpenIcon },
    { label: "Blog Posts", value: postCount, icon: PenLineIcon },
    { label: "Published Posts", value: publishedCount, icon: EyeIcon },
  ]

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {session?.user.name.split(" ")[0]} 👋
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your portfolio content from here.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon size={16} className="text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {[
                { label: "Add Project", href: "/dashboard/projects/new" },
                { label: "Write a Post", href: "/dashboard/blog/new" },
                { label: "Manage Projects", href: "/dashboard/projects" },
                { label: "Manage Posts", href: "/dashboard/blog" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-indigo-600 hover:underline"
                >
                  {link.label} →
                </a>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
