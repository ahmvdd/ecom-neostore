"use client"

import { useState, useEffect } from "react"
import FuturisticNavbar from "@/components/futuristic-navbar"
import FuturisticProductStore from "@/components/futuristic-product-store"
import Footer from "@/components/footer"

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-foreground mb-2">Tous nos produits</h1>
            <p className="text-muted-foreground">
              Smartphones, ordinateurs, audio, tablettes et plus — les meilleures marques au meilleur prix.
            </p>
          </div>
          <FuturisticProductStore />
        </div>
      </main>

      <Footer />
    </div>
  )
}
