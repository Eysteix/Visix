import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { title, description, techStack, liveUrl, githubUrl, imageUrl, featured, year, order } = body

  if (!title || !description || !Array.isArray(techStack)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const project = await prisma.project.create({
    data: { title, description, techStack, liveUrl, githubUrl, imageUrl, featured: !!featured, year, order: order ?? 0 },
  })

  return NextResponse.json(project, { status: 201 })
}
