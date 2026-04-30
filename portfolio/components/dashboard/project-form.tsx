"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

type Project = {
  id: string
  title: string
  description: string
  techStack: string[]
  liveUrl: string | null
  githubUrl: string | null
  imageUrl: string | null
  featured: boolean
  year: number | null
  order: number
}

type Props = {
  project?: Project
}

export function ProjectForm({ project }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isEdit = !!project

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = e.currentTarget
    const data = {
      title: (form.elements.namedItem("title") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      techStack: (form.elements.namedItem("techStack") as HTMLInputElement).value
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      liveUrl: (form.elements.namedItem("liveUrl") as HTMLInputElement).value || null,
      githubUrl: (form.elements.namedItem("githubUrl") as HTMLInputElement).value || null,
      imageUrl: (form.elements.namedItem("imageUrl") as HTMLInputElement).value || null,
      year: (form.elements.namedItem("year") as HTMLInputElement).value
        ? parseInt((form.elements.namedItem("year") as HTMLInputElement).value)
        : null,
      order: parseInt((form.elements.namedItem("order") as HTMLInputElement).value ?? "0"),
      featured,
    }

    const res = await fetch(
      isEdit ? `/api/projects/${project.id}` : "/api/projects",
      {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    )

    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      setError((json as { error?: string }).error ?? "Something went wrong")
    } else {
      router.push("/dashboard/projects")
      router.refresh()
    }

    setLoading(false)
  }

  const [featured, setFeatured] = useState(project?.featured ?? false)

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" name="title" defaultValue={project?.title} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project?.description}
          rows={3}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="techStack">Tech Stack (comma-separated) *</Label>
        <Input
          id="techStack"
          name="techStack"
          defaultValue={project?.techStack.join(", ")}
          placeholder="Next.js, Prisma, PostgreSQL"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input
            id="liveUrl"
            name="liveUrl"
            type="url"
            defaultValue={project?.liveUrl ?? ""}
            placeholder="https://..."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input
            id="githubUrl"
            name="githubUrl"
            type="url"
            defaultValue={project?.githubUrl ?? ""}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            name="year"
            type="number"
            defaultValue={project?.year ?? new Date().getFullYear()}
            min={2000}
            max={2100}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="order">Display Order</Label>
          <Input
            id="order"
            name="order"
            type="number"
            defaultValue={project?.order ?? 0}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={project?.imageUrl ?? ""}
          placeholder="https://..."
        />
      </div>

      <div className="flex items-center gap-3">
        <Switch
          id="featured"
          checked={featured}
          onCheckedChange={setFeatured}
        />
        <Label htmlFor="featured">Featured project</Label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : isEdit ? "Update Project" : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
