"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { TipTapEditor } from "@/components/editor/tiptap-editor"

type Post = {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
}

export function BlogForm({ post }: { post?: Post }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [content, setContent] = useState(post?.content ?? "")
  const [published, setPublished] = useState(post?.published ?? false)

  const isEdit = !!post

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const title = (form.elements.namedItem("title") as HTMLInputElement).value
    const slug =
      (form.elements.namedItem("slug") as HTMLInputElement).value ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    const excerpt = (form.elements.namedItem("excerpt") as HTMLTextAreaElement).value

    const data = { title, slug, excerpt: excerpt || null, content, published }

    const res = await fetch(isEdit ? `/api/blog/${post.id}` : "/api/blog", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setError((json as { error?: string }).error ?? "Something went wrong")
    } else {
      router.push("/dashboard/blog")
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" name="title" defaultValue={post?.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">
          Slug{" "}
          <span className="text-muted-foreground text-xs font-normal">
            (auto-generated from title if left blank)
          </span>
        </Label>
        <Input
          id="slug"
          name="slug"
          defaultValue={post?.slug}
          placeholder="my-post-title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt / Subtitle</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={post?.excerpt ?? ""}
          rows={2}
          placeholder="Short summary shown in listings and SEO…"
        />
      </div>

      <div className="space-y-2">
        <Label>Content *</Label>
        <TipTapEditor content={post?.content} onContentChange={setContent} />
      </div>

      <div className="flex items-center gap-3">
        <Switch id="published" checked={published} onCheckedChange={setPublished} />
        <Label htmlFor="published">Publish (visible on site)</Label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/blog")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
