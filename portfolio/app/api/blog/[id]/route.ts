import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

type RouteParams = { params: Promise<{ id: string }> }

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const { title, slug, content, excerpt, published } = body

  const current = await prisma.blogPost.findUnique({ where: { id }, select: { published: true, publishedAt: true } })
  if (!current) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const slugConflict = await prisma.blogPost.findFirst({ where: { slug, NOT: { id } } })
  if (slugConflict) return NextResponse.json({ error: "Slug already exists" }, { status: 409 })

  const publishedAt =
    published && !current.published ? new Date() : published ? current.publishedAt : null

  const post = await prisma.blogPost.update({
    where: { id },
    data: { title, slug, content, excerpt: excerpt ?? null, published: !!published, publishedAt },
  })

  return NextResponse.json(post)
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  await prisma.blogPost.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
