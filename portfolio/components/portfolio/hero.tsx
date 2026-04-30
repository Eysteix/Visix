"use client"

import { motion } from "motion/react"
import Image from "next/image"
import { useState } from "react"

function FadeUp({
  delay = 0,
  children,
  className,
}: {
  delay?: number
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ProfileImage() {
  const [missing, setMissing] = useState(false)

  return (
    <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
      {missing ? (
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-indigo-100 to-slate-100 flex flex-col items-center justify-center border-2 border-dashed border-indigo-200">
          <span className="text-5xl mb-3">🧑🏾‍💻</span>
          <p className="text-xs text-indigo-400 font-medium text-center px-4">
            Add your photo at<br />
            <code className="font-mono">/public/profile.jpg</code>
          </p>
        </div>
      ) : (
        <Image
          src="/profile.jpg"
          alt="Marvelous Ajao"
          fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover rounded-3xl"
          priority
          onError={() => setMissing(true)}
        />
      )}
      {/* Decorative ring */}
      <div className="absolute -inset-2 rounded-[28px] border border-indigo-100 -z-10" />
      <div className="absolute -inset-4 rounded-[32px] border border-indigo-50 -z-10" />
    </div>
  )
}

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 px-6">
      <div className="max-w-5xl mx-auto w-full py-24">
        <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-12">

          {/* Text content */}
          <div className="flex-1">
            <FadeUp delay={0}>
              <p className="text-sm font-medium text-indigo-600 mb-4 tracking-widest uppercase">
                Hello, I&apos;m
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-none mb-6">
                Marvelous Adeola
                <br />
                <span className="text-muted-foreground">Ajao</span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-xl sm:text-2xl font-medium text-muted-foreground mb-4">
                Full-Stack Developer &amp; Founder
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <p className="text-base text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Building scalable technology solutions from Ghana. Second-year IT student
                at KNUST and founder of Apdroid. I turn complex problems into clean,
                working software.
              </p>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap gap-4 mb-16">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:bg-accent transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={0.55}>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <div>
                  <span className="text-2xl font-bold text-foreground block">5+</span>
                  Projects Shipped
                </div>
                <div className="w-px bg-border" />
                <div>
                  <span className="text-2xl font-bold text-foreground block">2</span>
                  National Awards
                </div>
                <div className="w-px bg-border" />
                <div>
                  <span className="text-2xl font-bold text-foreground block">2026</span>
                  Active Builder
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="shrink-0 flex justify-center lg:justify-end"
          >
            <ProfileImage />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
