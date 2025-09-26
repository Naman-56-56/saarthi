
"use client"

import ClientRoot from "@/app/client-root"

import type React from "react"
import { Analytics } from "@vercel/analytics/next"
import { Suspense, useEffect, useState } from "react"
import "../globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <style>{`
html {
  font-family: '__GeistSans_fb8f2c', '__GeistSans_Fallback_fb8f2c';
  --font-sans: __variable_fb8f2c;
  --font-mono: __variable_f910ec;
}
      `}</style>
      <div className="font-sans">
        <ClientRoot>
          <Suspense fallback={null}>{children}</Suspense>
        </ClientRoot>
        <Analytics />
      </div>
    </>
  )
}
    