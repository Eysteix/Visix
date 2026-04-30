import "dotenv/config"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../lib/generated/prisma/client"

const adapter = new PrismaPg(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Seeding portfolio data…")

  await prisma.project.deleteMany()

  await prisma.project.createMany({
    data: [
      {
        title: "CWA/GPA Calculator",
        description:
          "A GPA calculation system for students with real-time computation for accurate academic tracking.",
        techStack: ["Next.js", "Prisma ORM", "PostgreSQL", "Tailwind CSS", "Better Auth"],
        liveUrl: "https://cwa-seven.vercel.app",
        githubUrl: null,
        featured: true,
        year: 2026,
        order: 0,
      },
      {
        title: "InfoPurse – Banking Web Application",
        description:
          "A banking simulation platform demonstrating financial workflows with a focus on secure data handling and user-centered interface design.",
        techStack: ["Next.js", "Ruby on Rails"],
        liveUrl: "https://info-purse.vercel.app",
        githubUrl: null,
        featured: true,
        year: 2025,
        order: 1,
      },
      {
        title: "Deg Engineering Platform",
        description:
          "A website for a local engineering company that improved digital presence and accessibility of services.",
        techStack: ["Next.js", "NextAuth", "PostgreSQL", "Tailwind CSS"],
        liveUrl: "https://deg-engineering-hcas.vercel.app",
        githubUrl: null,
        featured: false,
        year: 2024,
        order: 2,
      },
      {
        title: "RefineSmart – Oil Movement Tracking",
        description:
          "A system to track and manage oil logistics operations, applying backend structuring and systems analysis principles.",
        techStack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma ORM"],
        liveUrl: "https://refinesmart.vercel.app",
        githubUrl: null,
        featured: false,
        year: 2025,
        order: 3,
      },
      {
        title: "Visix – Personal Portfolio",
        description:
          "This portfolio site, designed and built to showcase projects, skills, and writing.",
        techStack: ["Next.js", "Tailwind CSS", "Prisma ORM", "Better Auth", "Motion"],
        liveUrl: "https://eysteix.github.io/Visix",
        githubUrl: "https://github.com/Eysteix/Visix",
        featured: false,
        year: 2026,
        order: 4,
      },
    ],
  })

  console.log("✓ Seeded", await prisma.project.count(), "projects")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
