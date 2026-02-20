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
        <p className="text-sm text-muted-foreground">{filteredProducts.length} produit{filteredProducts.length === 1 ? "" : "s"}</p>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setIsFilterOpen(true)}>
          <SlidersHorizontal className="h-4 w-4" />
          Filtres
        </Button>
      </div>

      {/* Mobile filter drawer */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white overflow-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg">Filtres</h3>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 rounded-lg hover:bg-muted">
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
            <Button className="w-full mt-8 bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white" onClick={() => setIsFilterOpen(false)}>
              Voir {filteredProducts.length} produit{filteredProducts.length === 1 ? "" : "s"}
            </Button>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 flex-shrink-0">
        <div className="sticky top-24 bg-white border border-border rounded-2xl p-5">
          <h3 className="font-bold text-sm mb-5 uppercase tracking-wide">Filtres</h3>
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

      {/* Product grid */}
      <div className="flex-1">
        {/* Search + count */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              className="pl-10 h-11 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="hidden lg:flex items-center text-sm text-muted-foreground whitespace-nowrap">
            {filteredProducts.length} produit{filteredProducts.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-2xl">
            <p className="text-muted-foreground mb-4">Aucun produit trouvé.</p>
            <Button variant="outline" onClick={() => { setSelectedCategory("all"); setPriceRange([0, 2500]); setSearchQuery("") }}>
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
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Catégories</p>
        <div className="flex flex-col gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-[hsl(211,100%,44%)]/10 text-[hsl(211,100%,44%)] font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {categoryLabels[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Prix</p>
        <Slider defaultValue={[0, 2500]} max={2500} step={50} value={priceRange} onValueChange={setPriceRange} className="mb-3" />
        <div className="flex justify-between text-sm font-medium">
          <span>€{priceRange[0]}</span>
          <span>€{priceRange[1]}</span>
        </div>
      </div>

      <div className="h-px bg-border" />

      <button onClick={onReset} className="text-xs text-[hsl(211,100%,44%)] hover:underline font-medium">
        Réinitialiser les filtres
      </button>
    </div>
  )
}
