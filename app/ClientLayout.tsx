"use client"

import type React from "react"

import { useEffect } from "react"
import { Space_Grotesk, Work_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Configurar las fuentes con next/font/google
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
})

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-work-sans",
})

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register ScrollTrigger with GSAP
    gsap.registerPlugin(ScrollTrigger)
  }, [])

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Café Aroma | Experiencia de café premium</title>
        <meta name="description" content="Disfruta de nuestro café de especialidad y ambiente acogedor" />
      </head>
      <body className={`${spaceGrotesk.variable} ${workSans.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
