import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Marvelous Ajao — Full-Stack Developer",
    template: "%s | Marvelous Ajao",
  },
  description:
    "Full-stack developer and founder of Apdroid, building scalable technology solutions from Ghana. Specialising in Next.js, PostgreSQL, and systems design.",
  authors: [{ name: "Marvelous Ajao" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Marvelous Ajao — Full-Stack Developer",
    description:
      "Full-stack developer and founder of Apdroid, building scalable tech solutions from Ghana.",
    siteName: "Marvelous Ajao",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvelous Ajao — Full-Stack Developer",
    description:
      "Full-stack developer and founder of Apdroid, building scalable tech solutions from Ghana.",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
