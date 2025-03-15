"use client"
//l permet à l'utilisateur de sélectionner une catégorie pour filtrer les produits affichés
import { Button } from "@/components/ui/button"

interface ProductFiltersProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export default function ProductFilters({ categories, selectedCategory, onCategoryChange }: ProductFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          className="capitalize"
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}

