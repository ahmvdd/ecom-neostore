"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Loader2, Shield, Truck, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"
import { useCart } from "@/lib/cart-context"

export default function PanierPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleCheckout = async () => {
    setIsCheckingOut(true)
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error(data.error || "Erreur lors du paiement")
        setIsCheckingOut(false)
      }
    } catch {
      toast.error("Erreur de connexion. Veuillez réessayer.")
      setIsCheckingOut(false)
    }
  }

  const shipping = totalPrice >= 50 ? 0 : 5.99

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-extrabold mb-2">Mon Panier</h1>
          <p className="text-muted-foreground text-sm mb-8">
            {items.length === 0 ? "Votre panier est vide" : `${items.length} article${items.length > 1 ? "s" : ""}`}
          </p>

          {items.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-border rounded-2xl">
              <ShoppingBag className="h-16 w-16 text-muted-foreground/20 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-3">Votre panier est vide</h2>
              <p className="text-muted-foreground mb-8">Explorez notre catalogue et trouvez des produits qui vous correspondent.</p>
              <Button size="lg" className="bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold rounded-xl px-10" asChild>
                <Link href="/products">Voir les produits</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-10">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="border border-border rounded-2xl overflow-hidden divide-y divide-border">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 sm:p-5">
                      <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden bg-[#f5f5f7] flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.id}`} className="font-semibold text-sm sm:text-base hover:text-[hsl(211,100%,44%)] transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                        <p className="text-xl font-bold mt-1">€{item.price.toLocaleString("fr-FR")}</p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border rounded-lg overflow-hidden">
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-none" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold">€{(item.price * item.quantity).toLocaleString("fr-FR")}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href="/products" className="inline-flex items-center gap-2 text-sm text-[hsl(211,100%,44%)] font-medium mt-4 hover:underline">
                  ← Continuer mes achats
                </Link>
              </div>

              {/* Summary */}
              <div>
                <div className="bg-[#f5f5f7] rounded-2xl p-6 sticky top-24 space-y-5">
                  <h2 className="font-bold text-lg">Récapitulatif</h2>

                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground line-clamp-1 flex-1 mr-2">{item.name} ×{item.quantity}</span>
                        <span className="font-medium flex-shrink-0">€{(item.price * item.quantity).toLocaleString("fr-FR")}</span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className={shipping === 0 ? "text-green-600 font-semibold" : "font-medium"}>
                      {shipping === 0 ? "Gratuite" : `€${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-xs text-[hsl(211,100%,44%)]">
                      Encore €{(50 - totalPrice).toFixed(2)} pour la livraison gratuite !
                    </p>
                  )}

                  <div className="h-px bg-border" />

                  <div className="flex justify-between items-baseline">
                    <span className="font-bold">Total TTC</span>
                    <span className="text-2xl font-extrabold">€{(totalPrice + shipping).toLocaleString("fr-FR")}</span>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold rounded-xl py-6"
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirection...</>
                    ) : (
                      <>Payer maintenant <ArrowRight className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>

                  <div className="space-y-2 pt-1">
                    {[
                      { icon: Shield, text: "Paiement 100% sécurisé" },
                      { icon: Truck, text: "Livraison gratuite dès €50" },
                      { icon: RotateCcw, text: "Retours gratuits 30 jours" },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Icon className="h-3.5 w-3.5 text-[hsl(211,100%,44%)]" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
