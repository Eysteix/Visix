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
import { BlogDeleteButton } from "@/components/dashboard/blog-delete-button"
import Link from "next/link"
import { PlusIcon, PencilIcon } from "lucide-react"
import { format } from "date-fns"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Blog — Dashboard" }

export default async function BlogDashboardPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { createdAt: "desc" },
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
              <BreadcrumbPage>Blog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto">
          <Button asChild size="sm">
            <Link href="/dashboard/blog/new">
              <PlusIcon size={14} /> New Post
            </Link>
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {posts.length} post{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="py-24 text-center border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground text-sm mb-4">No posts yet.</p>
            <Button asChild size="sm">
              <Link href="/dashboard/blog/new">Write your first post</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium text-sm">{post.title}</span>
                    <Badge
                      variant={post.published ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  {post.excerpt && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(post.createdAt, "MMM d, yyyy")}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {post.published && (
                    <a
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      View ↗
                    </a>
                  )}
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                    <Link href={`/dashboard/blog/${post.id}/edit`}>
                      <PencilIcon size={14} />
                    </Link>
                  </Button>
                  <BlogDeleteButton id={post.id} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
