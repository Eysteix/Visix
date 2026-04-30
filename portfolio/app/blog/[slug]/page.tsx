import { prisma } from "@/lib/db"
import { Nav } from "@/components/portfolio/nav"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import type { Metadata } from "next"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true },
  })
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const post = await prisma.blogPost.findUnique({
    where: { slug, published: true },
  })

  if (!post) notFound()

  let content: { type: string; content?: unknown[] } | null = null
  try {
    content = JSON.parse(post.content)
  } catch {
    content = null
  }

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={12} /> All posts
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {post.excerpt}
              </p>
            )}
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-4">
              <Clock size={11} />
              {format(post.publishedAt ?? post.createdAt, "MMMM d, yyyy")}
            </div>
          </header>

          <article className="prose prose-neutral max-w-none">
            {content ? (
              <TipTapRenderer content={content} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </article>
        </div>
      </main>
    </>
  )
}

function TipTapRenderer({
  content,
}: {
  content: { type: string; content?: unknown[] }
}) {
  if (!content?.content) return null

  return (
    <div className="space-y-4">
      {(content.content as TipTapNode[]).map((node, i) => (
        <NodeRenderer key={i} node={node} />
      ))}
    </div>
  )
}

type TipTapNode = {
  type: string
  text?: string
  content?: TipTapNode[]
  attrs?: Record<string, unknown>
  marks?: Array<{ type: string; attrs?: Record<string, unknown> }>
}

function NodeRenderer({ node }: { node: TipTapNode }) {
  switch (node.type) {
    case "heading": {
      const level = (node.attrs?.level as number) ?? 2
      const text = node.content?.map((n) => n.text).join("") ?? ""
      if (level === 1) return <h1 className="text-3xl font-bold mt-8 mb-4">{text}</h1>
      if (level === 2) return <h2 className="text-2xl font-bold mt-8 mb-3">{text}</h2>
      if (level === 3) return <h3 className="text-xl font-semibold mt-6 mb-2">{text}</h3>
      return <h4 className="text-lg font-semibold mt-4 mb-2">{text}</h4>
    }
    case "paragraph":
      return (
        <p className="text-base leading-relaxed text-foreground/90">
          {node.content?.map((n, i) => <InlineNode key={i} node={n} />) ?? null}
        </p>
      )
    case "bulletList":
      return (
        <ul className="list-disc pl-6 space-y-1">
          {node.content?.map((n, i) => <NodeRenderer key={i} node={n} />) ?? null}
        </ul>
      )
    case "orderedList":
      return (
        <ol className="list-decimal pl-6 space-y-1">
          {node.content?.map((n, i) => <NodeRenderer key={i} node={n} />) ?? null}
        </ol>
      )
    case "listItem":
      return (
        <li className="text-base text-foreground/90">
          {node.content?.map((n, i) => <NodeRenderer key={i} node={n} />) ?? null}
        </li>
      )
    case "codeBlock":
      return (
        <pre className="bg-muted rounded-xl p-4 overflow-x-auto font-mono text-sm">
          <code>{node.content?.map((n) => n.text).join("") ?? ""}</code>
        </pre>
      )
    case "blockquote":
      return (
        <blockquote className="border-l-4 border-indigo-300 pl-4 italic text-muted-foreground">
          {node.content?.map((n, i) => <NodeRenderer key={i} node={n} />) ?? null}
        </blockquote>
      )
    case "horizontalRule":
      return <hr className="border-border my-8" />
    default:
      return null
  }
}

function InlineNode({ node }: { node: TipTapNode }) {
  if (node.type !== "text") return null
  let text: React.ReactNode = node.text ?? ""

  if (node.marks) {
    for (const mark of node.marks) {
      if (mark.type === "bold") text = <strong>{text}</strong>
      if (mark.type === "italic") text = <em>{text}</em>
      if (mark.type === "underline") text = <u>{text}</u>
      if (mark.type === "code")
        text = (
          <code className="bg-muted px-1.5 py-0.5 rounded font-mono text-sm">{text}</code>
        )
      if (mark.type === "link")
        text = (
          <a
            href={mark.attrs?.href as string}
            className="text-indigo-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {text}
          </a>
        )
    }
  }

  return <>{text}</>
}
