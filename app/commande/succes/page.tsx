"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

export default function SuccessPage() {
  const { clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    clearCart()
  }, [clearCart])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4 max-w-lg">
          <div className="flex justify-center mb-8">
            <CheckCircle className="h-16 w-16 accent-text" />
          </div>

          <p className="text-xs uppercase tracking-[0.3em] accent-text mb-4">Commande confirmée</p>
          <h1 className="font-display text-3xl md:text-4xl mb-6">Merci pour votre commande</h1>

          <div className="w-12 h-px accent-bg mx-auto mb-6" />

          <p className="text-muted-foreground font-light leading-relaxed mb-10">
            Votre commande a bien été enregistrée. Vous recevrez un email de confirmation avec les détails de votre commande et le suivi de livraison.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="accent-bg text-white hover:opacity-90 uppercase tracking-widest text-xs px-8 py-6" asChild>
              <Link href="/products">Continuer mes achats</Link>
            </Button>
            <Button size="lg" variant="outline" className="uppercase tracking-widest text-xs px-8 py-6" asChild>
              <Link href="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
