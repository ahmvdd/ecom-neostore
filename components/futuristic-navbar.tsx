"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/products", label: "Produits" },
  { href: "/notre-histoire", label: "Notre Histoire" },
  { href: "/contact", label: "Contact" },
]

export default function FuturisticNavbar() {
  const { items } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 bg-[#07070e]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-white tracking-tight">
            Tech<span className="text-[#d4a853]">Paris</span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/40 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Droite */}
          <div className="flex items-center gap-3">
            <Link
              href="/panier"
              className="relative flex items-center gap-2 bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Panier</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-[#07070e] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen
                ? <X className="h-5 w-5 text-white" />
                : <Menu className="h-5 w-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#07070e]">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm font-medium text-white/50 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors"
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
