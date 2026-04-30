import { prisma } from "@/lib/db"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProjectDeleteButton } from "@/components/dashboard/project-delete-button"
import Link from "next/link"
import { PlusIcon, PencilIcon, ExternalLinkIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Projects — Dashboard" }

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  })

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Projects</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button asChild size="sm">
            <Link href="/dashboard/projects/new">
              <PlusIcon size={14} /> New Project
            </Link>
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground text-sm mb-4">No projects yet.</p>
            <Button asChild size="sm">
              <Link href="/dashboard/projects/new">Add your first project</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{project.title}</span>
                    {project.featured && (
                      <Badge variant="secondary" className="text-xs">Featured</Badge>
                    )}
                    {project.year && (
                      <span className="text-xs text-muted-foreground">{project.year}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-mono">
                        {t}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-[10px] text-muted-foreground">+{project.techStack.length - 4}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded hover:bg-accent transition-colors text-muted-foreground"
                    >
                      <ExternalLinkIcon size={14} />
                    </a>
                  )}
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link href={`/dashboard/projects/${project.id}/edit`}>
                      <PencilIcon size={14} />
                    </Link>
                  </Button>
                  <ProjectDeleteButton id={project.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
