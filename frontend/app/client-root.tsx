"use client"
import { ThemeProvider } from "@/components/theme-provider"
import type { ReactNode } from "react"

export default function ClientRoot({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
