import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#f5f5f7] border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="font-extrabold text-xl">
              Tech<span className="text-[hsl(211,100%,44%)]">Paris</span>
            </span>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              Smartphones, ordinateurs, audio et électroménager premium. Livraison gratuite et retours 30 jours.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Navigation</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { href: "/", label: "Accueil" },
                { href: "/products", label: "Tous les produits" },
                { href: "/notre-histoire", label: "Notre Histoire" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Catégories</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {[
                { href: "/products?category=smartphones", label: "Smartphones" },
                { href: "/products?category=ordinateurs", label: "Ordinateurs" },
                { href: "/products?category=audio", label: "Audio" },
                { href: "/products?category=tablettes", label: "Tablettes" },
                { href: "/products?category=montres", label: "Montres" },
                { href: "/products?category=électroménager", label: "Électroménager" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-foreground transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-[hsl(211,100%,44%)] flex-shrink-0" />
                <span>contact@neostore.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-[hsl(211,100%,44%)] flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-[hsl(211,100%,44%)] flex-shrink-0 mt-0.5" />
                <span>42 Avenue du Futur, 75001 Paris</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-border mt-10 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Tech Paris. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-foreground transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
