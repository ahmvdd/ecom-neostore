"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"
import HeroCanvas from "@/components/hero-canvas"
import { products } from "@/lib/products"

export default function Home() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#07070e] flex flex-col">
      <FuturisticNavbar />

      {/* Hero — plein écran sombre */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Canvas animé — particules dorées + grille */}
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070e]/60 via-transparent to-[#07070e]" />

        {/* Halo doré */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-[#d4a853]/6 blur-[140px] pointer-events-none" />

        <div className="relative container mx-auto px-4 py-32 md:py-40">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 border border-[#d4a853]/25 text-[#d4a853] text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full mb-10">
              <span className="w-1.5 h-1.5 bg-[#d4a853] rounded-full animate-pulse" />
              <span>Tech Paris — Spécialiste Électronique</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-6">
              La tech premium<br />
              <span className="text-[#d4a853]">au cœur de Paris</span>
            </h1>
            <p className="text-lg text-white/45 mb-12 max-w-xl leading-relaxed">
              iPhone, MacBook, Samsung et plus — les meilleures marques livrées partout en France.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2.5 bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
              >
                Explorer la boutique <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/notre-histoire"
                className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/25 hover:bg-white/5 text-white/60 hover:text-white font-medium px-8 py-4 rounded-xl transition-all text-sm"
              >
                Notre histoire
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#d4a853]/30" />
          <span className="text-white/20 text-[10px] uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* ── Produits — juste après le hero ── */}
      <section className="py-24 bg-[#07070e]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="text-[#d4a853] text-xs font-medium uppercase tracking-widest mb-3">Notre Collection</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Les produits<br className="hidden sm:block" /> les plus demandés
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden md:flex items-center gap-1.5 text-white/35 hover:text-white text-sm transition-colors group"
            >
              Voir tout
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Grille produits avec tooltip au survol */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group relative block overflow-hidden rounded-2xl bg-[#0d0d1a] border border-white/[0.05] hover:border-[#d4a853]/25 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/20 to-transparent" />
                </div>

                {/* Info par défaut */}
                <div className="p-4 transition-opacity duration-200 group-hover:opacity-0">
                  <p className="text-[#d4a853]/60 text-[10px] uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mb-2">{product.name}</h3>
                  <p className="text-[#d4a853] font-bold text-sm">€{product.price.toLocaleString("fr-FR")}</p>
                </div>

                {/* Tooltip au survol — glisse depuis le bas */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-[#0a0a18]/96 backdrop-blur-xl border-t border-[#d4a853]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <p className="text-[#d4a853] text-[10px] font-medium uppercase tracking-widest mb-2">{product.category}</p>
                  <h3 className="text-white font-bold text-sm mb-2 line-clamp-1">{product.name}</h3>
                  <p className="text-white/40 text-xs leading-relaxed mb-4 line-clamp-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#d4a853] font-bold text-base">€{product.price.toLocaleString("fr-FR")}</span>
                    <span className="flex items-center gap-1 text-white/40 text-xs">
                      Découvrir <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-[#d4a853]/30 text-white/50 hover:text-white text-sm px-6 py-3 rounded-xl transition-all"
            >
              Voir tous les produits <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-y border-white/[0.05] bg-[#0a0a16] py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "50 000+", label: "Clients satisfaits" },
              { value: "7 ans", label: "D'expertise" },
              { value: "4.9 / 5", label: "Note moyenne" },
              { value: "Paris", label: "Basé en France" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-bold text-[#d4a853] mb-1">{stat.value}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Univers par catégorie ── */}
      <section className="py-24 bg-[#07070e]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#d4a853] text-xs font-medium uppercase tracking-widest mb-3">Explorer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Par univers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Smartphones", image: "/iphone.jpg", desc: "iPhone, Samsung et plus", slug: "smartphones" },
              { name: "Ordinateurs", image: "/macbook.jpg", desc: "MacBook Pro, ultrabooks", slug: "ordinateurs" },
              { name: "Audio & Son", image: "/airpods.jpg", desc: "AirPods, casques premium", slug: "audio" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${cat.slug}`}
                className="group relative block rounded-2xl overflow-hidden h-72 border border-white/[0.05] hover:border-[#d4a853]/20 transition-all duration-300"
              >
                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070e]/90 via-[#07070e]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-white font-bold text-xl mb-1">{cat.name}</h3>
                  <p className="text-white/45 text-sm">{cat.desc}</p>
                </div>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#d4a853]/10 border border-[#d4a853]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="h-4 w-4 text-[#d4a853]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
