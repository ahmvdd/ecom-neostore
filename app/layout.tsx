import type React from "react"
import type { Metadata } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { Toaster } from "sonner"

const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500", "600", "700", "800"] })

export const metadata: Metadata = {
  title: {
    default: "Tech Paris — Électronique Premium",
    template: "%s | Tech Paris",
  },
  description: "Smartphones, ordinateurs, audio et électroménager au meilleur prix. Livraison gratuite et retours 30 jours.",
  openGraph: {
    title: "Tech Paris — Électronique Premium",
    description: "Smartphones, ordinateurs, audio et électroménager au meilleur prix.",
    type: "website",
    locale: "fr_FR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${syne.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CartProvider>
            {children}
            <Toaster theme="light" richColors position="bottom-right" />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
