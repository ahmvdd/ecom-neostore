import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#050509] border-t border-white/[0.05]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="font-bold text-xl text-white">
              Tech<span className="text-[#d4a853]">Paris</span>
            </span>
            <p className="text-sm text-white/25 mt-4 leading-relaxed">
              Smartphones, ordinateurs, audio et électroménager premium. Livraison gratuite et retours 30 jours.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-5">Navigation</p>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Accueil" },
                { href: "/products", label: "Produits" },
                { href: "/notre-histoire", label: "Notre Histoire" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/35 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Catégories */}
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-5">Catégories</p>
            <ul className="space-y-3">
              {["Smartphones", "Ordinateurs", "Audio", "Tablettes", "Montres", "Électroménager"].map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${cat.toLowerCase()}`}
                    className="text-sm text-white/35 hover:text-white transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-5">Contact</p>
            <ul className="space-y-3 text-sm text-white/35">
              <li>contact@techparis.fr</li>
              <li>+33 1 23 45 67 89</li>
              <li className="leading-relaxed">42 Rue de la Paix<br />75001 Paris, France</li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-white/[0.05] mt-12 mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/20">
          <p>&copy; {new Date().getFullYear()} Tech Paris. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/50 transition-colors">Mentions légales</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">Confidentialité</Link>
            <Link href="#" className="hover:text-white/50 transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
