"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ShoppingBag, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import FuturisticNavbar from "@/components/futuristic-navbar"

export default function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <FuturisticNavbar />

      {/* Hero Section */}
      <section ref={containerRef} className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div style={{ y, opacity }}>
          <div className="flex items-center justify-center h-screen bg-gray-900">
  <div className="relative h-screen w-screen overflow-hidden">
  <div className="relative h-screen w-screen overflow-hidden">
  <div className="relative h-screen w-screen overflow-hidden">
  <video
    src="/dream.mp4" // Chemin de la vidéo dans le dossier public
    autoPlay // La vidéo se lance automatiquement
    loop // La vidéo se répète en boucle
     className="absolute top-0 left-0 w-full h-full object-cover"
  />
</div>
</div>
</div>
</div>
          </motion.div>

          {/* Grid overlay */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background" />
        </div>

        <div className="container mx-auto relative z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 neon-text">
              <span className="gradient-text">Le Futur</span> Est Maintenant
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Découvrez notre collection de produits innovants qui redéfinissent l'expérience utilisateur.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary/80 hover:bg-primary backdrop-blur-sm border border-primary/50 neon-border"
                asChild
              >
                <Link href="/products">
                  Explorer <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary/50 text-white hover:bg-primary/20">
                En savoir plus
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce"
        >
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 gradient-text inline-block">Univers Technologiques</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Explorez nos catégories de produits futuristes conçus pour transformer votre quotidien.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Réalité Augmentée", delay: 0 },
              { name: "Intelligence Artificielle", delay: 0.2 },
              { name: "Biotechnologie", delay: 0.4 },
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: category.delay }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="group relative h-80 rounded-2xl overflow-hidden block glass-card"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                  <Image
                    src={`/merc.jpg?height=400&width=600&text=`}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 z-0"
                  />

                  {/* Glowing border on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl border border-primary/50 neon-border z-20" />

                  <div className="absolute inset-0 flex items-end p-8 z-30">
                    <div>
                      <h3 className="text-white text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-white flex items-center text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explorer <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden glass-card">
                <Image
                  src="/merc2.jpg?height=1000&width=800&text="
                  alt="Histoire de l'entreprise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 z-10 animate-float"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(192, 132, 252, 0.5)",
                    "0 0 20px rgba(192, 132, 252, 0.7)",
                    "0 0 10px rgba(192, 132, 252, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-blue-500/20 backdrop-blur-xl border border-blue-500/30 z-10"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 gradient-text inline-block">Notre Vision</h2>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  Fondée en 2035, NeoTech a émergé d'un laboratoire de recherche quantique avec une mission audacieuse :
                  fusionner l'humanité et la technologie pour créer un avenir où les limites n'existent plus.
                </p>
                <p className="text-lg">
                  Notre équipe d'ingénieurs, de designers et de visionnaires travaille à la frontière de l'innovation,
                  repoussant constamment les limites de ce qui est possible.
                </p>
                <p className="text-lg">
                  Aujourd'hui, nous sommes à l'avant-garde de la révolution technologique, créant des produits qui ne
                  sont pas seulement fonctionnels, mais qui transforment fondamentalement la façon dont nous
                  interagissons avec le monde.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-6">
                  <div className="text-center p-4 glass-card rounded-xl">
                    <div className="text-3xl font-bold text-primary neon-text">2035</div>
                    <p className="text-sm text-gray-400">Fondation</p>
                  </div>
                  <div className="text-center p-4 glass-card rounded-xl">
                    <div className="text-3xl font-bold text-primary neon-text">42</div>
                    <p className="text-sm text-gray-400">Brevets</p>
                  </div>
                  <div className="text-center p-4 glass-card rounded-xl">
                    <div className="text-3xl font-bold text-primary neon-text">12M+</div>
                    <p className="text-sm text-gray-400">Utilisateurs</p>
                  </div>
                </div>

                <Button variant="outline" className="mt-4 border-primary/50 hover:bg-primary/20" asChild>
                  <Link href="/notre-histoire">Découvrir notre histoire</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-16">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold gradient-text inline-block"
            >
              Innovations Phares
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="outline" className="border-primary/50 hover:bg-primary/20" asChild>
                <Link href="/products">Voir tout</Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((id, index) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link
                  href={`/products/${id}`}
                  className="group block rounded-2xl overflow-hidden glass-card hover:neon-border transition-all duration-300"
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={`/merc5.png?height=300&width=300&text=`}
                      alt={`Produit ${id}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Holographic effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      NeoTech X{id}0
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">Interface neurale de nouvelle génération</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold text-xl text-primary">€{id}99.99</p>
                      <span className="text-sm text-white/70 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Détails <ArrowRight className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-background" />
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl font-bold mb-6 gradient-text">Prêt à Entrer dans le Futur?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Rejoignez les pionniers qui redéfinissent l'expérience humaine grâce à nos technologies révolutionnaires.
            </p>
            <Button
              size="lg"
              className="bg-primary/80 hover:bg-primary backdrop-blur-sm border border-primary/50 neon-border text-lg px-8 py-6"
              asChild
            >
              <Link href="/products">Découvrir la Collection</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

