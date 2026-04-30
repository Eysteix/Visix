"use client"

import { motion } from "motion/react"
import { ArrowRight, Clock } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  publishedAt: Date | null
  createdAt: Date
}

export function BlogPreview({ posts }: { posts: BlogPost[] }) {
  return (
    <section id="blog" className="py-24 px-6 border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-xs font-medium text-indigo-600 tracking-widest uppercase mb-2">
              Thoughts &amp; Updates
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Writing</h2>
          </div>
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:gap-3 transition-all"
          >
            All posts <ArrowRight size={14} />
          </Link>
        </motion.div>

        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="py-16 text-center"
          >
            <p className="text-muted-foreground text-sm">No posts yet — check back soon.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex items-start justify-between gap-6 rounded-2xl bg-card shadow-sm p-6 hover:shadow-lg hover:shadow-indigo-100/40 transition-all duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base group-hover:text-indigo-600 transition-colors truncate">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                      <Clock size={11} />
                      {format(post.publishedAt ?? post.createdAt, "MMM d, yyyy")}
                    </div>
                  </div>
                  <ArrowRight
                    size={16}
                    className="mt-1 shrink-0 text-muted-foreground group-hover:text-indigo-600 group-hover:translate-x-1 transition-all duration-200"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:hidden"
        >
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm font-medium text-indigo-600"
          >
            All posts <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
