"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Truck, RotateCcw, Shield, Headphones, ChevronRight } from "lucide-react"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"
import { products } from "@/lib/products"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const featuredProducts = products.slice(0, 4)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FuturisticNavbar />

      {/* Hero */}
      <section className="relative bg-[#1d1d1f] text-white overflow-hidden">
        <div className="absolute inset-0">
          <video src="/tech_paris.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="relative container mx-auto px-4 py-28 md:py-36">
          <div className="max-w-2xl">
            <p className="text-[hsl(211,100%,70%)] text-sm font-semibold uppercase tracking-widest mb-4">
              Tech Paris — Spécialiste Électronique
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              La tech premium<br />au cœur de Paris
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
              iPhone, MacBook, Samsung et plus. Les meilleures marques au meilleur prix, livrées partout en France.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
              >
                Voir tous les produits <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/notre-histoire"
                className="inline-flex items-center justify-center gap-2 border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-sm"
              >
                Notre histoire
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-[#f5f5f7] border-b border-border">
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-border">
            {[
              { icon: Truck, title: "Livraison gratuite", sub: "Dès €50 d'achat" },
              { icon: RotateCcw, title: "Retours gratuits", sub: "Sous 30 jours" },
              { icon: Shield, title: "Paiement sécurisé", sub: "100% protégé" },
              { icon: Headphones, title: "SAV 7j/7", sub: "Toujours disponible" },
            ].map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 md:justify-center md:px-6">
                <div className="w-10 h-10 rounded-full bg-[hsl(211,100%,44%)]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-[hsl(211,100%,44%)]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Nos catégories</h2>
          <Link href="/products" className="text-sm text-[hsl(211,100%,44%)] font-medium flex items-center gap-1 hover:underline">
            Tout voir <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Smartphones", emoji: "📱", slug: "smartphones" },
            { label: "Ordinateurs", emoji: "💻", slug: "ordinateurs" },
            { label: "Audio", emoji: "🎧", slug: "audio" },
            { label: "Tablettes", emoji: "📲", slug: "tablettes" },
            { label: "Montres", emoji: "⌚", slug: "montres" },
            { label: "Électroménager", emoji: "🏠", slug: "électroménager" },
          ].map((cat) => (
            <Link
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#f5f5f7] hover:bg-[hsl(211,100%,44%)]/10 hover:ring-2 hover:ring-[hsl(211,100%,44%)] transition-all group"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <span className="text-xs font-semibold text-foreground group-hover:text-[hsl(211,100%,44%)] text-center">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-6 pb-20 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Meilleures ventes</h2>
            <p className="text-sm text-muted-foreground mt-1">Les produits les plus appréciés de nos clients parisiens</p>
          </div>
          <Link href="/products" className="text-sm text-[hsl(211,100%,44%)] font-medium flex items-center gap-1 hover:underline">
            Voir tout <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group">
              <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative aspect-square bg-[#f5f5f7] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs font-semibold text-[hsl(211,100%,44%)] uppercase tracking-wide mb-1">{product.category}</p>
                  <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={`h-3.5 w-3.5 ${star <= product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">€{product.price.toLocaleString("fr-FR")}</span>
                    <span className="text-xs bg-green-100 text-green-700 font-medium px-2 py-0.5 rounded-full">En stock</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-[#1d1d1f] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[hsl(211,100%,70%)] text-sm font-semibold uppercase tracking-widest mb-4">Offre Paris Exclusive</p>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Jusqu'à <span className="text-[hsl(211,100%,70%)]">-30%</span> sur<br className="hidden md:block" /> une sélection de produits
          </h2>
          <p className="text-white/60 mb-10 max-w-md mx-auto">
            Tech Paris vous propose les meilleures offres sur iPhone, MacBook, Samsung et bien plus encore.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold px-10 py-4 rounded-xl transition-colors"
          >
            Voir les offres <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Big Category Cards */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-foreground mb-8">Explorer par univers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { name: "Smartphones", image: "/iphone.jpg", desc: "iPhone, Samsung et plus" },
            { name: "Ordinateurs", image: "/macbook.jpg", desc: "MacBook Pro, ultrabooks" },
            { name: "Audio", image: "/airpods.jpg", desc: "AirPods, casques premium" },
          ].map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${cat.name.toLowerCase()}`}
              className="group relative rounded-2xl overflow-hidden h-56 block"
            >
              <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-white font-bold text-xl mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm">{cat.desc}</p>
              </div>
              <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
