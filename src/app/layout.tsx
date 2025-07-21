import type React from "react"
import "./globals.css"
import { Playfair_Display } from "next/font/google"
import { SessionProvider } from '@/components/Providers/SessionProvider'

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata = {
  title: "Cooking with Class",
  description: "Master the art of cooking with our expert-led classes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="min-h-screen bg-white font-serif antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
