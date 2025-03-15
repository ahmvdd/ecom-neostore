"use client"
//fonctionnalités de recherche, de filtrage et d'affichage des produits    "Catalogue Technologique"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Search, Filter, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { products } from "@/lib/products"
import FuturisticProductCard from "@/components/futuristic-product-card"

export default function FuturisticProductStore() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Get unique categories for filter
  const categories = ["all", ...new Set(products.map((product) => product.category))]

  // Filter products based on search, category and price
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    return matchesSearch && matchesCategory && matchesPrice
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Mobile filter toggle */}
        <div className="lg:hidden flex justify-between items-center">
          <Button
            variant="outline"
            className="border-primary/50 hover:bg-primary/20"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>

          <div className="text-sm text-gray-400">{filteredProducts.length} produits</div>
        </div>

        {/* Filters - Mobile */}
        <motion.div
          className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
          initial={{ x: "100%" }}
          animate={{ x: isFilterOpen ? 0 : "100%" }}
          transition={{ duration: 0.3 }}
          style={{ display: isFilterOpen ? "block" : "none" }}
        >
          <div className="p-6 h-full overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Filtres</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-medium mb-3">Catégories</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`capitalize cursor-pointer ${
                        selectedCategory === category
                          ? "bg-primary hover:bg-primary/80"
                          : "hover:bg-primary/20 border-primary/50"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "all" ? "Toutes" : category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Prix</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 200])
                  setSearchQuery("")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Filters - Desktop */}
        <div className="hidden lg:block w-64 space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4 gradient-text">Filtres</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Catégories</h4>
                <div className="flex flex-col gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className={`capitalize cursor-pointer w-fit ${
                        selectedCategory === category
                          ? "bg-primary hover:bg-primary/80"
                          : "hover:bg-primary/20 border-primary/50"
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category === "all" ? "Toutes" : category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Prix</h4>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 200]}
                    max={200}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>€{priceRange[0]}</span>
                    <span>€{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full border-primary/50 hover:bg-primary/20"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 200])
                  setSearchQuery("")
                }}
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher des produits..."
              className="pl-10 bg-background/50 border-primary/30 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Results count - Desktop */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <div className="text-sm text-gray-400">{filteredProducts.length} produits trouvés</div>
          </div>

          {/* Products grid */}
          {filteredProducts.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-gray-400 mb-4">Aucun produit ne correspond à votre recherche.</p>
              <Button
                variant="outline"
                className="border-primary/50 hover:bg-primary/20"
                onClick={() => {
                  setSelectedCategory("all")
                  setPriceRange([0, 200])
                  setSearchQuery("")
                }}
              >
                Réinitialiser les filtres
              </Button>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <Link href={`/products/${product.id}`}>
                    <FuturisticProductCard product={product} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

