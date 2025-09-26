import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import ClientRoot from "./client-root"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sarthi - AI Internship Recommendation Platform",
  description:
    "Your AI Guide to the Right Internship. Powered by Artificial Intelligence, Sarthi connects students with the most relevant internships under the PM Internship Scheme.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.className} ${GeistMono.className}`} suppressHydrationWarning>
      <head />
      <body>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}
