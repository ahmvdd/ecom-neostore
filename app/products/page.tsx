"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import FuturisticNavbar from "@/components/futuristic-navbar"
import FuturisticProductStore from "@/components/futuristic-product-store"

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <FuturisticNavbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block">Catalogue Technologique</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explorez notre collection de produits innovants conçus pour transformer votre réalité.
            </p>
          </motion.div>

          <FuturisticProductStore />
        </div>
      </main>
    </div>
  )
}

