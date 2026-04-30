"use client"

import { motion } from "motion/react"
import { Trophy, GraduationCap } from "lucide-react"

const education = [
  {
    degree: "BSc Information Technology",
    school: "Kwame Nkrumah University of Science and Technology (KNUST)",
    period: "Jan 2024 – Dec 2028 (Expected)",
  },
  {
    degree: "WASSCE",
    school: "Mawuli Senior High School, Ho – Volta Region, Ghana",
    period: "2021 – 2024",
  },
]

const achievements = [
  "2nd Place (Volta Region) — National Cybersecurity Challenge (CSA Ghana), 2024",
  "2nd Place Nationwide — Practical CTF Competition (Cyber Ghana)",
  "2nd Place — Prof. Acquah Quiz, KNUST",
  "Participant — CoderZ Robotics Competition (2020–2021)",
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-indigo-600 tracking-widest uppercase mb-2">
            Who I Am
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">About</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              I&apos;m a second-year BSc Information Technology student at KNUST with
              hands-on experience in full-stack software development, systems design,
              and real-world project deployment.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              As founder of{" "}
              <span className="font-semibold text-foreground">Apdroid</span>, I&apos;m
              focused on building scalable and sustainable technology solutions for
              African businesses — leading product design, development, and deployment
              from ideation to execution.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Outside of building, I compete in cybersecurity challenges — earning
              national recognition through CTF competitions across Ghana.
            </p>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/marvelous-adeola-ajao-3387ab284"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                LinkedIn ↗
              </a>
              <a
                href="mailto:marvelousajao06@gmail.com"
                className="text-sm font-medium text-indigo-600 hover:underline"
              >
                Email ↗
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
                <GraduationCap size={16} className="text-indigo-600" />
                Education
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.degree} className="pl-4 border-l-2 border-indigo-100">
                    <p className="font-medium text-sm">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{edu.school}</p>
                    <p className="text-xs text-muted-foreground">{edu.period}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-4 text-sm font-semibold">
                <Trophy size={16} className="text-indigo-600" />
                Achievements
              </div>
              <ul className="space-y-2">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-indigo-600 mt-0.5 shrink-0">✦</span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
