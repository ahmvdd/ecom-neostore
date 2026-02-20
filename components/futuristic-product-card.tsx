"use client"

import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

interface FuturisticProductCardProps {
  readonly product: Product
}

export default function FuturisticProductCard({ product }: FuturisticProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image })
  }

  return (
    <div className="bg-white border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-square bg-[#f5f5f7] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 5 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Plus que {product.stock}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold text-[hsl(211,100%,44%)] uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-2 flex-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3.5 w-3.5 ${star <= product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-xl font-bold text-foreground">€{product.price.toLocaleString("fr-FR")}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
