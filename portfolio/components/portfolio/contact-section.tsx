"use client"

import { motion } from "motion/react"
import { Mail, ExternalLink } from "lucide-react"

const contacts = [
  {
    label: "Email",
    value: "marvelousajao06@gmail.com",
    href: "mailto:marvelousajao06@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "/in/marvelous-adeola-ajao",
    href: "https://www.linkedin.com/in/marvelous-adeola-ajao-3387ab284",
    icon: ExternalLink,
  },
  {
    label: "GitHub",
    value: "github.com/Eysteix",
    href: "https://github.com/Eysteix",
    icon: ExternalLink,
  },
]

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs font-medium text-indigo-600 tracking-widest uppercase mb-2">
            Let&apos;s Talk
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            I&apos;m always open to interesting projects, collaborations, or just a
            good conversation. Reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contacts.map((c, i) => {
            const Icon = c.icon
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group flex flex-col gap-3 rounded-2xl bg-card shadow-sm p-6 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <Icon size={18} className="text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                    {c.label}
                  </p>
                  <p className="text-sm font-medium truncate group-hover:text-indigo-600 transition-colors">
                    {c.value}
                  </p>
                </div>
              </motion.a>
            )
          })}
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground"
        >
          <p>© {new Date().getFullYear()} Marvelous Ajao. Built with Next.js.</p>
          <p>
            Ghana <span aria-label="Ghana flag">🇬🇭</span>
          </p>
        </motion.footer>
      </div>
    </section>
  )
}
