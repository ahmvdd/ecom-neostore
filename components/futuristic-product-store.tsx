"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { products } from "@/lib/products"
import FuturisticProductCard from "@/components/futuristic-product-card"

export default function FuturisticProductStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2500])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = ["all", ...new Set(products.map((p) => p.category))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  const categoryLabels: Record<string, string> = {
    all: "Tout afficher",
    smartphones: "Smartphones",
    ordinateurs: "Ordinateurs",
    audio: "Audio",
    tablettes: "Tablettes",
    montres: "Montres",
    "électroménager": "Électroménager",
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile filter toggle */}
      <div className="lg:hidden flex items-center justify-between">
        <p className="text-sm text-white/40">{filteredProducts.length} produit{filteredProducts.length === 1 ? "" : "s"}</p>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-white/10 text-white/60 hover:text-white hover:bg-white/5"
          onClick={() => setIsFilterOpen(true)}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filtres
        </Button>
      </div>

      {/* Mobile filter drawer */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#07070e] overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg text-white">Filtres</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent
              categories={categories}
              categoryLabels={categoryLabels}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onReset={() => { setSelectedCategory("all"); setPriceRange([0, 2500]); setSearchQuery("") }}
            />
            <Button
              className="w-full mt-8 bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] font-semibold"
              onClick={() => setIsFilterOpen(false)}
            >
              Voir {filteredProducts.length} produit{filteredProducts.length === 1 ? "" : "s"}
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <div className="sticky top-24 bg-[#0d0d1a] border border-white/[0.06] rounded-2xl p-5">
          <h3 className="font-bold text-sm text-white/60 mb-5 uppercase tracking-widest">Filtres</h3>
          <FilterContent
            categories={categories}
            categoryLabels={categoryLabels}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            onReset={() => { setSelectedCategory("all"); setPriceRange([0, 2500]); setSearchQuery("") }}
          />
        </div>
      </aside>

      {/* Grille produits */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <Input
              placeholder="Rechercher un produit..."
              className="pl-10 h-11 rounded-xl bg-[#0d0d1a] border-white/[0.07] text-white placeholder:text-white/25 focus-visible:ring-[#d4a853]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="hidden lg:flex items-center text-sm text-white/30 whitespace-nowrap">
            {filteredProducts.length} produit{filteredProducts.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-white/[0.08] rounded-2xl">
            <p className="text-white/30 mb-4">Aucun produit trouvé.</p>
            <Button
              variant="outline"
              className="border-white/10 text-white/50 hover:text-white hover:bg-white/5"
              onClick={() => { setSelectedCategory("all"); setPriceRange([0, 2500]); setSearchQuery("") }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <FuturisticProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface FilterContentProps {
  readonly categories: string[]
  readonly categoryLabels: Record<string, string>
  readonly selectedCategory: string
  readonly setSelectedCategory: (c: string) => void
  readonly priceRange: number[]
  readonly setPriceRange: (r: number[]) => void
  readonly onReset: () => void
}

function FilterContent({ categories, categoryLabels, selectedCategory, setSelectedCategory, priceRange, setPriceRange, onReset }: FilterContentProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3">Catégories</p>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-[#d4a853]/10 text-[#d4a853] font-semibold"
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-white/[0.06]" />

      <div>
        <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4">Prix</p>
        <Slider defaultValue={[0, 2500]} max={2500} step={50} value={priceRange} onValueChange={setPriceRange} className="mb-3" />
        <div className="flex justify-between text-sm font-medium text-white/60">
          <span>€{priceRange[0]}</span>
          <span>€{priceRange[1]}</span>
        </div>
      </div>

      <div className="h-px bg-white/[0.06]" />

      <button onClick={onReset} className="text-xs text-[#d4a853]/70 hover:text-[#d4a853] transition-colors font-medium">
        Réinitialiser les filtres
      </button>
    </div>
  )
}
