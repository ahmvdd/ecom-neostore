"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

export default function NotreHistoirePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 pt-12 pb-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-xs uppercase tracking-widest mb-10 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-2 h-3 w-3" />
            Retour à l'accueil
          </Link>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <p className="text-xs uppercase tracking-[0.3em] accent-text mb-4">Depuis 2035</p>
              <h1 className="font-display text-4xl md:text-6xl mb-6">Notre Histoire</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                De la vision à la réalité : comment nous avons redéfini les frontières de la technologie.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-24">
              <TimelineEvent
                year="2035"
                title="La Genèse"
                description="Fondée par deux visionnaires, NeoStore émerge d'un laboratoire de recherche avec une mission audacieuse : fusionner l'humanité et la technologie pour créer un avenir sans limites."
                image="/merc.jpg"
                reverse={false}
              />

              <TimelineEvent
                year="2038"
                title="Première Percée"
                description="Après trois années de recherche intensive, notre équipe développe le premier prototype d'interface neurale non-invasive. Une technologie qui permet une communication directe entre le cerveau humain et les systèmes informatiques."
                image="/merc2.jpg"
                reverse={true}
              />

              <TimelineEvent
                year="2040"
                title="Expansion Globale"
                description="Nous ouvrons des centres de recherche à Tokyo, Silicon Valley et Berlin. Notre équipe s'agrandit pour inclure les meilleurs talents en intelligence artificielle, biotechnologie et réalité augmentée."
                image="/merc5.png"
                reverse={false}
              />

              <TimelineEvent
                year="2042"
                title="Révolution Quantique"
                description="Le lancement de notre processeur quantique révolutionne l'industrie. Cette avancée permet le développement d'intelligences artificielles avancées et marque le début d'une nouvelle ère."
                image="/merc.jpg"
                reverse={true}
              />

              <TimelineEvent
                year="2045"
                title="Aujourd'hui"
                description="Avec plus de 12 millions de clients à travers le monde, NeoStore continue de repousser les frontières du possible. Notre mission reste inchangée : créer des technologies qui augmentent le potentiel humain."
                image="/merc2.jpg"
                reverse={false}
              />
            </div>

            {/* Values Section */}
            <div className="mt-32 mb-20">
              <div className="text-center mb-16">
                <p className="text-xs uppercase tracking-[0.3em] accent-text mb-4">Nos Principes</p>
                <h2 className="font-display text-3xl md:text-4xl">Valeurs Fondamentales</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-12">
                <ValueCard
                  title="Innovation Éthique"
                  description="Nous repoussons les limites de la technologie tout en maintenant des standards éthiques rigoureux qui placent l'humain au centre."
                />
                <ValueCard
                  title="Symbiose Technologique"
                  description="Nous créons des technologies qui s'intègrent harmonieusement à la vie humaine, augmentant nos capacités sans jamais nous remplacer."
                />
                <ValueCard
                  title="Accessibilité Universelle"
                  description="Nous croyons que les avancées technologiques doivent bénéficier à tous, indépendamment de leur origine ou de leur statut."
                />
              </div>
            </div>

            {/* Team Section */}
            <div className="mt-32">
              <div className="relative h-[500px] w-full overflow-hidden mb-16">
                <Image
                  src="/merc5.png"
                  alt="Notre équipe"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-12">
                  <p className="font-display text-xl text-white/90 max-w-2xl italic leading-relaxed">
                    &ldquo;Nous ne créons pas simplement des produits, nous façonnons l'avenir. Chaque innovation est une
                    étape vers un monde où technologie et humanité évoluent en parfaite harmonie.&rdquo;
                  </p>
                  <div className="w-12 h-px bg-white/30 my-4" />
                  <p className="text-white/50 text-sm uppercase tracking-widest">L'équipe fondatrice</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-20">
              <Button size="lg" className="accent-bg text-white hover:opacity-90 uppercase tracking-widest text-xs px-10 py-6" asChild>
                <Link href="/products">Découvrir nos créations</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

interface TimelineEventProps {
  year: string
  title: string
  description: string
  image: string
  reverse: boolean
}

function TimelineEvent({ year, title, description, image, reverse }: TimelineEventProps) {
  return (
    <div className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center`}>
      <div className={`${reverse ? "md:order-2" : ""}`}>
        <div className="relative h-[350px] overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className="font-display text-4xl text-white">{year}</span>
          </div>
        </div>
      </div>

      <div className={`${reverse ? "md:order-1" : ""}`}>
        <div className="w-8 h-px accent-bg mb-6" />
        <h3 className="font-display text-2xl mb-4">{title}</h3>
        <p className="text-muted-foreground font-light leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

interface ValueCardProps {
  title: string
  description: string
}

function ValueCard({ title, description }: ValueCardProps) {
  return (
    <div className="text-center">
      <div className="w-8 h-px accent-bg mx-auto mb-6" />
      <h3 className="font-display text-xl mb-4">{title}</h3>
      <p className="text-muted-foreground text-sm font-light leading-relaxed">{description}</p>
    </div>
  )
}
