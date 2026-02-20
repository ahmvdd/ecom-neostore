"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
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
    <div className="bg-[#0d0d1a] border border-white/[0.05] hover:border-[#d4a853]/20 rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#111122]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 5 && (
          <div className="absolute top-3 left-3 bg-red-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Plus que {product.stock}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] font-medium text-[#d4a853]/60 uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-white text-sm leading-snug mb-3 flex-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Prix + CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="text-xl font-bold text-[#d4a853]">€{product.price.toLocaleString("fr-FR")}</span>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>
      </div>
    </div>
  )
}
