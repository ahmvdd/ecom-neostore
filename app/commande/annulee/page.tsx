"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

export default function CancelledPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 max-w-lg">
          <div className="flex justify-center mb-8">
            <XCircle className="h-16 w-16 text-muted-foreground" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Paiement annulé</p>
          <h1 className="font-display text-3xl md:text-4xl mb-6">Commande non finalisée</h1>

          <div className="w-12 h-px bg-border mx-auto mb-6" />

          <p className="text-muted-foreground font-light leading-relaxed mb-10">
            Votre paiement a été annulé. Aucun montant n'a été débité. Vos articles sont toujours dans votre panier.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="accent-bg text-white hover:opacity-90 uppercase tracking-widest text-xs px-8 py-6" asChild>
              <Link href="/panier">Retour au panier</Link>
            </Button>
            <Button size="lg" variant="outline" className="uppercase tracking-widest text-xs px-8 py-6" asChild>
              <Link href="/products">Continuer mes achats</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
