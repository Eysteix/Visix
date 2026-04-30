import { prisma } from "@/lib/db"
import { Nav } from "@/components/portfolio/nav"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts, project updates, and writing by Marvelous Ajao.",
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
      createdAt: true,
    },
  })

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="mb-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft size={12} /> Back home
            </Link>
          </div>

          <div className="mb-12">
            <p className="text-xs font-medium text-indigo-600 tracking-widest uppercase mb-2">
              Thoughts &amp; Updates
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Writing</h1>
          </div>

          {posts.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">No posts yet — check back soon.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-6 rounded-2xl border border-border bg-card p-6 hover:border-indigo-200 hover:shadow-md transition-all duration-200 block"
                >
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-base group-hover:text-indigo-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                      <Clock size={11} />
                      {format(post.publishedAt ?? post.createdAt, "MMMM d, yyyy")}
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0 text-muted-foreground group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200"
                  />
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
