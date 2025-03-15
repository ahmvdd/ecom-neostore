"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import FuturisticNavbar from "@/components/futuristic-navbar"

export default function NotreHistoirePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const timelineProgress = useTransform(scrollYProgress, [0, 1], [0, 100])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background">
      <FuturisticNavbar />

      <main className="pt-24 pb-16" ref={containerRef}>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Link href="/" className="inline-flex items-center text-sm mb-8 hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-bold mb-6 gradient-text inline-block">Notre Histoire</h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                De la vision à la réalité : comment nous avons redéfini les frontières de la technologie
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline progress bar */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800 z-0">
                <motion.div
                  className="w-full bg-gradient-to-b from-purple-500 to-blue-500"
                  style={{ height: timelineProgress, position: "absolute", top: 0 }}
                />
              </div>

              {/* Timeline events */}
              <div className="space-y-32 relative z-10">
                {/* Event 1 */}
                <TimelineEvent
                  year="2035"
                  title="La Genèse"
                  description="Fondée par deux visionnaires, Dr. Elena Chen et Dr. Marcus Webb, NeoTech émerge d'un laboratoire de recherche quantique à l'Université de Nouvelle Zurich. Leur vision : créer une symbiose parfaite entre l'humain et la technologie."
                  image="/placeholder.svg?height=800&width=600&text="
                  alignment="right"
                  delay={0.1}
                />

                {/* Event 2 */}
                <TimelineEvent
                  year="2038"
                  title="Première Percée"
                  description="Après trois années de recherche intensive, notre équipe développe le premier prototype d'interface neurale non-invasive, le NeoSync Alpha. Cette technologie révolutionnaire permet une communication directe entre le cerveau humain et les systèmes informatiques."
                  image="/placeholder.svg?height=800&width=600&text="
                  alignment="left"
                  delay={0.2}
                />

                {/* Event 3 */}
                <TimelineEvent
                  year="2040"
                  title="Expansion Globale"
                  description="Suite au succès phénoménal du NeoSync, nous ouvrons des centres de recherche à Neo-Tokyo, Silicon Valley et New Berlin. Notre équipe s'agrandit pour inclure les meilleurs talents en intelligence artificielle, biotechnologie et réalité augmentée."
                  image="/placeholder.svg?height=800&width=600&text="
                  alignment="right"
                  delay={0.3}
                />

                {/* Event 4 */}
                <TimelineEvent
                  year="2042"
                  title="Révolution Quantique"
                  description="Le lancement de notre processeur quantique QuantumCore révolutionne l'industrie. Cette avancée permet le développement d'intelligences artificielles véritablement conscientes et marque le début d'une nouvelle ère technologique."
                  image="/placeholder.svg?height=800&width=600&text="
                  alignment="left"
                  delay={0.4}
                />

                {/* Event 5 */}
                <TimelineEvent
                  year="2045"
                  title="Aujourd'hui et Demain"
                  description="Avec plus de 12 millions d'utilisateurs à travers le monde, NeoTech continue de repousser les frontières du possible. Notre mission reste inchangée : créer des technologies qui augmentent le potentiel humain tout en préservant notre humanité fondamentale."
                  image="/placeholder.svg?height=800&width=600&text="
                  alignment="right"
                  delay={0.5}
                />
              </div>
            </div>

            {/* Values Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32 mb-16"
            >
              <h2 className="text-3xl font-bold mb-12 gradient-text inline-block text-center w-full">
                Nos Valeurs Fondamentales
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                <ValueCard
                  title="Innovation Éthique"
                  description="Nous repoussons les limites de la technologie tout en maintenant des standards éthiques rigoureux qui placent l'humain au centre de nos préoccupations."
                  delay={0.1}
                />
                <ValueCard
                  title="Symbiose Technologique"
                  description="Nous créons des technologies qui s'intègrent harmonieusement à la vie humaine, augmentant nos capacités sans jamais nous remplacer."
                  delay={0.2}
                />
                <ValueCard
                  title="Accessibilité Universelle"
                  description="Nous croyons que les avancées technologiques doivent bénéficier à tous, indépendamment de leur origine ou de leur statut socio-économique."
                  delay={0.3}
                />
              </div>
            </motion.div>

            {/* Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-32"
            >
              <h2 className="text-3xl font-bold mb-12 gradient-text inline-block text-center w-full">
                Notre Équipe Visionnaire
              </h2>

              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden glass-card mb-16">
                <Image
                  src="/placeholder.svg?height=800&width=1200&text="
                  alt="Notre équipe"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-xl text-gray-200 max-w-2xl">
                    "Nous ne créons pas simplement des produits, nous façonnons l'avenir. Chaque innovation est une
                    étape vers un monde où technologie et humanité évoluent en parfaite harmonie."
                  </p>
                  <p className="text-primary mt-4">— Dr. Elena Chen, Co-fondatrice</p>
                </div>
              </div>
            </motion.div>

            <div className="flex justify-center mt-16">
              <Button
                size="lg"
                className="bg-primary/80 hover:bg-primary backdrop-blur-sm border border-primary/50 neon-border"
                asChild
              >
                <Link href="/products">Découvrir nos innovations</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface TimelineEventProps {
  year: string
  title: string
  description: string
  image: string
  alignment: "left" | "right"
  delay: number
}

function TimelineEvent({ year, title, description, image, alignment, delay }: TimelineEventProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <motion.div
        initial={{ opacity: 0, x: alignment === "left" ? -50 : 0, y: alignment === "right" ? 50 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        className={`${alignment === "right" ? "md:order-2" : ""}`}
      >
        <div className="relative h-[300px] rounded-2xl overflow-hidden glass-card">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-4xl font-bold text-primary neon-text">{year}</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: alignment === "right" ? -50 : 0, y: alignment === "left" ? 50 : 0 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.2 }}
        className={`${alignment === "right" ? "md:order-1 text-right" : ""}`}
      >
        <div className="relative">
          {/* Timeline node */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-primary animate-pulse-slow neon-border z-20"
            style={{
              [alignment === "right" ? "right" : "left"]: "-47px",
              [alignment === "right" ? "left" : "right"]: "auto",
            }}
          />

          {/* Timeline connector */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 w-12 h-1 bg-primary z-10"
            style={{
              [alignment === "right" ? "right" : "left"]: "-41px",
              [alignment === "right" ? "left" : "right"]: "auto",
            }}
          />

          <h3 className="text-2xl font-bold mb-4 gradient-text inline-block">{title}</h3>
          <p className="text-gray-300 text-lg">{description}</p>
        </div>
      </motion.div>
    </div>
  )
}

interface ValueCardProps {
  title: string
  description: string
  delay: number
}

function ValueCard({ title, description, delay }: ValueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="glass-card p-8 rounded-2xl border border-primary/20 hover:neon-border transition-all duration-300"
    >
      <h3 className="text-xl font-bold mb-4 text-primary">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  )
}

