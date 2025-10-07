import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Geraldine C Makaza | Full-Stack Developer",
  description: "Portfolio of Geraldine C Makaza - Computer Science student, Le Wagon graduate, and hackathon winner",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          {children}
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
