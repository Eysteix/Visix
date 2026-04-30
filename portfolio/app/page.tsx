import { Nav } from "@/components/portfolio/nav"
import { Hero } from "@/components/portfolio/hero"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { SkillsSection } from "@/components/portfolio/skills-section"
import { AboutSection } from "@/components/portfolio/about-section"
import { BlogPreview } from "@/components/portfolio/blog-preview"
import { ContactSection } from "@/components/portfolio/contact-section"
import { prisma } from "@/lib/db"

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    prisma.project.findMany({
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    }),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        publishedAt: true,
        createdAt: true,
      },
    }),
  ])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProjectsSection projects={projects} />
        <SkillsSection />
        <AboutSection />
        <BlogPreview posts={posts} />
        <ContactSection />
      </main>
    </>
  )
}
