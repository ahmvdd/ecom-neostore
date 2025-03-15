"use client"
//Il est conçu pour afficher les informations d'un produit (nom, prix, catégorie, description, image)
import type React from "react"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
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

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent navigation when clicking the button
    // Add to cart logic here
    console.log("Added to cart:", product.name)
  }

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover transition-transform duration-300 hover:scale-105" />
        </div>
        <Badge className="absolute top-2 right-2 capitalize">{product.category}</Badge>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <p className="font-bold text-lg">€{product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Ajouter au Panier
        </Button>
      </CardFooter>
    </Card>
  )
}

