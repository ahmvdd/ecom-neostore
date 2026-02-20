import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-[hsl(211,100%,44%)] mb-4">404</div>
        <h1 className="text-2xl font-bold text-foreground mb-3">Page introuvable</h1>
        <p className="text-muted-foreground mb-8 max-w-sm mx-auto leading-relaxed">
          Cette page n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer.
        </p>
        <Button size="lg" className="bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold rounded-xl px-10" asChild>
          <Link href="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  )
}
