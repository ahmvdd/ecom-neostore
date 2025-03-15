"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/products"
import FuturisticNavbar from "@/components/futuristic-navbar"

export default function ProductPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId)

  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (!product) {
    router.push("/products")
    return null
  }

  // Generate multiple product images for the gallery
  const productImages = [
    product.image,
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
    "/placeholder.svg?height=600&width=600",
  ]

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="min-h-screen bg-background">
      <FuturisticNavbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/products"
              className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux produits
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Images */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden glass-card border border-primary/20">
                <Image
                  src={productImages[activeImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Holographic effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10" />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, i) => (
                  <div
                    key={i}
                    className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeImage === i
                        ? "border-2 border-primary neon-border"
                        : "border border-primary/20 opacity-70 hover:opacity-100"
                    }`}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <Badge className="mb-3 capitalize bg-primary/20 text-primary border-primary/50">
                  {product.category}
                </Badge>
                <h1 className="text-3xl font-bold mb-3 gradient-text inline-block">{product.name}</h1>

                <div className="flex items-center mt-2 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-primary text-primary" : "text-gray-600"}`} />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">(24 avis)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-primary neon-text">€{product.price.toFixed(2)}</div>

              <p className="text-gray-300">{product.description}</p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3 text-gray-200">Couleur</h3>
                  <div className="flex space-x-3">
                    {["bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-rose-500"].map((color, i) => (
                      <div
                        key={i}
                        className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                          i === 0
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-gray-200">Configuration</h3>
                  <div className="flex flex-wrap gap-3">
                    {["Standard", "Pro", "Ultimate"].map((config, i) => (
                      <div
                        key={i}
                        className={`h-10 min-w-[80px] flex items-center justify-center px-4 rounded-lg cursor-pointer transition-all duration-300 ${
                          i === 1
                            ? "bg-primary text-white"
                            : "bg-secondary hover:bg-primary/20 border border-primary/30"
                        }`}
                      >
                        {config}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3 text-gray-200">Quantité</h3>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center glass-card rounded-lg border border-primary/30">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-l-lg hover:bg-primary/20"
                        onClick={decrementQuantity}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-r-lg hover:bg-primary/20"
                        onClick={incrementQuantity}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-gray-400">12 en stock</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="flex-1 bg-primary/80 hover:bg-primary neon-border">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Ajouter au panier
                </Button>
                <Button size="lg" variant="outline" className="flex-1 border-primary/50 hover:bg-primary/20">
                  <Heart className="mr-2 h-5 w-5" />
                  Ajouter aux favoris
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-gray-400">ID: {product.id.toString().padStart(6, "0")}</div>
                <Button variant="ghost" size="sm" className="hover:bg-primary/20">
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager
                </Button>
              </div>
            </motion.div>
          </div>

          <Separator className="my-16 opacity-30" />

          {/* Product Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="description" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 glass-card">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Spécifications</TabsTrigger>
                <TabsTrigger value="reviews">Avis</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-8">
                <h3 className="text-xl font-bold mb-4 gradient-text inline-block">Description du produit</h3>
                <div className="space-y-4 text-gray-300">
                  <p>
                    {product.description} Ce produit révolutionnaire est conçu pour offrir une expérience utilisateur
                    sans précédent, fusionnant technologie de pointe et design futuriste.
                  </p>
                  <p>
                    Équipé des dernières avancées en intelligence artificielle et en interface neurale, ce dispositif
                    s'adapte parfaitement à vos besoins et préférences, créant une symbiose parfaite entre l'humain et
                    la machine.
                  </p>
                  <p>
                    Sa conception modulaire permet une personnalisation complète, tandis que son système
                    d'auto-apprentissage évolue constamment pour améliorer ses performances et anticiper vos besoins.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="py-8">
                <h3 className="text-xl font-bold mb-4 gradient-text inline-block">Spécifications techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Processeur</span>
                      <span className="text-gray-400">Quantum Core X9</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Mémoire</span>
                      <span className="text-gray-400">32 TB Holographique</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Connectivité</span>
                      <span className="text-gray-400">NeuroSync 3.0</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Autonomie</span>
                      <span className="text-gray-400">72 heures</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Dimensions</span>
                      <span className="text-gray-400">120 x 65 x 8 mm</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Poids</span>
                      <span className="text-gray-400">95g</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Certification</span>
                      <span className="text-gray-400">ISO Quantum 9001</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-800">
                      <span className="font-medium text-gray-300">Garantie</span>
                      <span className="text-gray-400">5 ans</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-8">
                <h3 className="text-xl font-bold mb-4 gradient-text inline-block">Avis clients</h3>
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="glass-card p-6 rounded-xl">
                      <div className="flex justify-between mb-3">
                        <div className="font-medium text-gray-200">Utilisateur Néo-{i + 1}</div>
                        <div className="text-sm text-gray-400">
                          Il y a {i + 1} jour{i > 0 ? "s" : ""}
                        </div>
                      </div>
                      <div className="flex items-center mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            className={`h-4 w-4 ${j < 5 - i ? "fill-primary text-primary" : "text-gray-600"}`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-300">
                        Produit révolutionnaire qui a transformé ma façon d'interagir avec la technologie. L'interface
                        neurale est incroyablement intuitive et la qualité de fabrication est exceptionnelle.
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Related Products */}
          <section className="mt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-8 gradient-text inline-block"
            >
              Produits similaires
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {products
                .filter((p) => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct, index) => (
                  <motion.div key={relatedProduct.id} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                    <Link
                      href={`/products/${relatedProduct.id}`}
                      className="block rounded-2xl overflow-hidden glass-card hover:neon-border transition-all duration-300"
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={relatedProduct.image || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />

                        {/* Holographic effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {relatedProduct.description.substring(0, 60)}...
                        </p>
                        <p className="font-bold text-xl text-primary">€{relatedProduct.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </motion.div>
          </section>
        </div>
      </main>
    </div>
  )
}

