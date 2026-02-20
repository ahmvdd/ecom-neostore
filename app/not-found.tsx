import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07070e] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-[#d4a853] mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-3">Page introuvable</h1>
        <p className="text-white/35 mb-8 max-w-sm mx-auto leading-relaxed">
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer.
        </p>
        <Button size="lg" className="bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] font-semibold rounded-xl px-10" asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  )
}
