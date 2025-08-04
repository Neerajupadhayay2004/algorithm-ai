"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { useToast } from "@/hooks/use-toast"
import { ToastContainer } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { toasts, dismissToast } = useToast()

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer toasts={toasts} onDismiss={dismissToast} />
      </body>
    </html>
  )
}
