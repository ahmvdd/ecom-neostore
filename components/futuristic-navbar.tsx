"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { useCart } from "@/lib/cart-context"

export default function FuturisticNavbar() {
  const { items } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      {/* Top banner promo */}
      <div className="bg-[hsl(211,100%,44%)] text-white text-center text-xs py-2 px-4 font-medium">
        🚚 Livraison gratuite dès €50 d'achat — Retours gratuits 30 jours
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-extrabold text-xl text-foreground tracking-tight">
            Neo<span className="text-[hsl(211,100%,44%)]">Store</span>
          </Link>

          {/* Nav links desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Accueil
            </Link>
            <Link href="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Produits
            </Link>
            <Link href="/notre-histoire" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Notre Histoire
            </Link>
            <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button className="hidden md:flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors">
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>

            <Link
              href="/panier"
              className="relative flex items-center gap-2 bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {[
              { href: "/", label: "Accueil" },
              { href: "/products", label: "Produits" },
              { href: "/notre-histoire", label: "Notre Histoire" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium text-foreground border-b border-border last:border-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
