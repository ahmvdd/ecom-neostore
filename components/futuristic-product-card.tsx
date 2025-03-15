"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  name: string
  price: number
  category: string
  image: string
  description: string
}

interface ProductCardProps {
  product: Product
}

export default function FuturisticProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    // Add to cart logic here
    console.log("Added to cart:", product.name)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    // Add to wishlist logic here
    console.log("Added to wishlist:", product.name)
  }

  return (
    <motion.div
      className="rounded-2xl overflow-hidden glass-card h-full transition-all duration-300"
      whileHover={{ y: -10 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="relative h-56 w-full overflow-hidden">
          <Image src={product.image || "/public/images/image2.jpg"} alt={product.name} fill className="object-cover transition-transform duration-700" 
          style={{ transform: isHovered ? "scale(1.1)" : "scale(1)" }}
          />

          {/* Holographic effect overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 transition-opacity duration-300"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        </div>

        <Badge className="absolute top-3 right-3 capitalize bg-background/60 backdrop-blur-md border-primary/50 text-primary">
          {product.category}
        </Badge>

        {/* Quick actions */}
        <motion.div
          className="absolute bottom-3 right-3 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full bg-background/60 backdrop-blur-md hover:bg-primary/80"
            onClick={handleAddToWishlist}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>

      <div className="p-5">
        <h3
          className="font-semibold text-lg mb-1 transition-colors duration-300"
          style={{ color: isHovered ? "#c084fc" : "white" }}
        >
          {product.name}
        </h3>
        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center">
          <p className="font-bold text-xl text-primary">€{product.price.toFixed(2)}</p>

          <Button size="sm" className="bg-primary/80 hover:bg-primary" onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Glowing border on hover */}
      <div
        className="absolute inset-0 rounded-2xl border border-primary/50 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          boxShadow: isHovered ? "0 0 15px rgba(192, 132, 252, 0.5)" : "none",
        }}
      />
    </motion.div>
  )
}

