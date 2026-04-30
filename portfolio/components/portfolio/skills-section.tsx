"use client"

import { motion } from "motion/react"

const skillGroups = [
  {
    category: "Languages & Frameworks",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Ruby on Rails"],
  },
  {
    category: "Databases & ORM",
    skills: ["PostgreSQL", "Prisma ORM"],
  },
  {
    category: "Systems & DevOps",
    skills: ["Linux Server Administration", "Git", "Vercel"],
  },
  {
    category: "Design & UX",
    skills: ["UI/UX Design", "Tailwind CSS", "Figma"],
  },
  {
    category: "Other",
    skills: ["Systems Design & Analysis", "Project Management", "Audio Editing"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-border bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-indigo-600 tracking-widest uppercase mb-2">
            What I Work With
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl bg-card shadow-sm p-6"
            >
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-full bg-background shadow-xs font-medium hover:shadow-sm hover:text-indigo-700 transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
