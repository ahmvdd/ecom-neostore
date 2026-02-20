"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Plus, Minus, Truck, RotateCcw, Shield, Check } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

const reviews = [
  {
    name: "Alexandre M.",
    date: "Il y a 2 jours",
    rating: 5,
    text: "Produit exceptionnel, livraison rapide et emballage soigné. Je recommande vivement NeoStore pour la qualité du service et des produits.",
  },
  {
    name: "Sophie L.",
    date: "Il y a 1 semaine",
    rating: 4,
    text: "Très satisfaite de mon achat. Le produit est conforme à la description, performant et bien fini. Petit bémol sur l'autonomie mais rien de rédhibitoire.",
  },
  {
    name: "Thomas D.",
    date: "Il y a 2 semaines",
    rating: 5,
    text: "Un investissement qui en vaut largement la peine. Design premium, performances au top, SAV réactif. Je suis client fidèle NeoStore depuis 2 ans.",
  },
]

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = Number.parseInt(params.id as string, 10)
  const product = products.find((p) => p.id === productId)
  const { addItem } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [added, setAdded] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null
  if (!product) { router.push("/products"); return null }

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, quantity)
    toast.success(`${product.name} ajouté au panier`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? "Retiré des favoris" : "Ajouté aux favoris")
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success("Lien copié !")
    } catch {
      toast.error("Impossible de copier le lien")
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground transition-colors">Produits</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-[#f5f5f7] rounded-2xl overflow-hidden">
                <Image src={product.images[activeImage]} alt={product.name} fill className="object-cover" priority />
                {product.stock <= 5 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Dernières pièces
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, i) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                      activeImage === i ? "border-[hsl(211,100%,44%)]" : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image src={image} alt={`Vue ${i + 1}`} fill className="object-cover bg-[#f5f5f7]" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold text-[hsl(211,100%,44%)] uppercase tracking-widest mb-2">{product.category}</p>
                <h1 className="text-3xl font-extrabold text-foreground leading-tight mb-3">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-4 w-4 ${star <= product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{product.reviewCount} avis vérifiés</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-[#f5f5f7] rounded-2xl p-5">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-extrabold text-foreground">€{product.price.toLocaleString("fr-FR")}</span>
                  <span className="text-sm text-green-600 font-semibold">En stock ({product.stock} dispo.)</span>
                </div>
                <p className="text-xs text-muted-foreground">Prix TTC • Livraison gratuite dès €50</p>
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              {/* Quantity */}
              <div>
                <p className="text-sm font-semibold mb-3">Quantité</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-xl overflow-hidden">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-12 text-center font-semibold text-sm">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-none" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">Max. {product.stock} par commande</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold text-sm py-6 rounded-xl"
                  onClick={handleAddToCart}
                >
                  {added ? <Check className="mr-2 h-4 w-4" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                  {added ? "Ajouté !" : "Ajouter au panier"}
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl py-6 px-4" onClick={handleWishlist}>
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl py-6 px-4" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Trust */}
              <div className="border border-border rounded-2xl p-4 space-y-3">
                {[
                  { icon: Truck, text: "Livraison gratuite dès €50 d'achat" },
                  { icon: RotateCcw, text: "Retours gratuits sous 30 jours" },
                  { icon: Shield, text: "Paiement 100% sécurisé" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 text-[hsl(211,100%,44%)] flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="specs">
              <TabsList className="grid w-full grid-cols-3 bg-transparent border-b border-border rounded-none h-auto p-0 mb-8">
                {[
                  { value: "specs", label: "Spécifications" },
                  { value: "description", label: "Description" },
                  { value: "reviews", label: `Avis (${product.reviewCount})` },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[hsl(211,100%,44%)] data-[state=active]:text-[hsl(211,100%,44%)] data-[state=active]:shadow-none font-medium text-sm py-4"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="specs">
                <div className="grid md:grid-cols-2 gap-x-16 max-w-3xl">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between py-3.5 border-b border-border">
                      <span className="text-sm font-medium text-foreground">{spec.label}</span>
                      <span className="text-sm text-muted-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="description">
                <div className="max-w-2xl space-y-4 text-muted-foreground leading-relaxed">
                  <p>{product.description}</p>
                  <p>Ce produit est couvert par une garantie fabricant de 2 ans. Le SAV NeoStore est disponible 7j/7 pour toute assistance.</p>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6 max-w-2xl">
                  {reviews.map((review) => (
                    <div key={review.name} className="bg-[#f5f5f7] rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[hsl(211,100%,44%)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {review.name[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{review.name}</p>
                            <p className="text-xs text-muted-foreground">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related products */}
          <section className="mt-16 pt-10 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Produits similaires</h2>
              <Link href="/products" className="text-sm text-[hsl(211,100%,44%)] font-medium hover:underline flex items-center gap-1">
                Voir tout <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
                <Link key={p.id} href={`/products/${p.id}`} className="group">
                  <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative aspect-square bg-[#f5f5f7] overflow-hidden">
                      <Image src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground mb-1 capitalize">{p.category}</p>
                      <p className="font-semibold text-sm line-clamp-1 mb-1">{p.name}</p>
                      <p className="font-bold text-sm">€{p.price.toLocaleString("fr-FR")}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
