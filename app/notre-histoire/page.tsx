"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, Users, MapPin, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

export default function NotreHistoirePage() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-[#1d1d1f] text-white py-24">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[hsl(211,100%,70%)] text-sm font-semibold uppercase tracking-widest mb-4">
              Fondée à Paris en 2018
            </p>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Notre Histoire
            </h1>
            <p className="text-white/60 max-w-xl mx-auto text-lg leading-relaxed">
              Depuis 2018, Tech Paris accompagne les parisiens dans leurs achats high-tech avec passion et expertise.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-[#f5f5f7] py-14">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Users, value: "50 000+", label: "Clients satisfaits" },
                { icon: Award, value: "7 ans", label: "D'expertise" },
                { icon: MapPin, value: "Paris", label: "Basé en France" },
                { icon: Zap, value: "4.9/5", label: "Note moyenne" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[hsl(211,100%,44%)]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[hsl(211,100%,44%)]" />
                  </div>
                  <span className="text-2xl font-extrabold">{value}</span>
                  <span className="text-sm text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="relative h-[420px] rounded-2xl overflow-hidden">
              <Image src="/macbook.jpg" alt="Tech Paris" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[hsl(211,100%,44%)] uppercase tracking-widest mb-3">2018 — Les débuts</p>
              <h2 className="text-3xl font-extrabold mb-5 leading-tight">Née de la passion pour la tech</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tech Paris a été fondée en 2018 par une équipe passionnée de technologie, avec une idée simple : proposer les meilleurs produits électroniques aux meilleurs prix, avec un service irréprochable.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Basés au cœur de Paris, nous avons rapidement gagné la confiance de milliers de clients grâce à notre sélection rigoureuse et notre accompagnement personnalisé.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#f5f5f7]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <div className="md:order-2 relative h-[420px] rounded-2xl overflow-hidden">
                <Image src="/iphone.jpg" alt="Tech Paris sélection" fill className="object-cover" />
              </div>
              <div className="md:order-1">
                <p className="text-xs font-semibold text-[hsl(211,100%,44%)] uppercase tracking-widest mb-3">Notre engagement</p>
                <h2 className="text-3xl font-extrabold mb-5 leading-tight">La qualité avant tout</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Chaque produit que nous proposons est soigneusement sélectionné. Nous travaillons directement avec les grands fabricants — Apple, Samsung, Dyson, LG — pour vous garantir l'authenticité et les meilleures conditions tarifaires.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Livraison rapide, retours gratuits sous 30 jours, SAV réactif : nous ne faisons aucun compromis sur l'expérience client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold mb-3">Nos valeurs</h2>
            <p className="text-muted-foreground max-w-md mx-auto">Ce qui nous guide chaque jour pour vous offrir la meilleure expérience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: "Authenticité", desc: "100% de produits officiels, achetés auprès des distributeurs agréés. Zéro contrefaçon, garantie fabricant incluse." },
              { title: "Transparence", desc: "Prix clairs, sans frais cachés. Nous affichons toujours le prix TTC final, livraison comprise dès 50€." },
              { title: "Proximité", desc: "Une équipe française, disponible 7j/7, qui répond en moins de 2h à toutes vos questions avant et après achat." },
            ].map((val) => (
              <div key={val.title} className="bg-[#f5f5f7] rounded-2xl p-6">
                <div className="w-2 h-8 bg-[hsl(211,100%,44%)] rounded-full mb-4" />
                <h3 className="font-bold text-lg mb-2">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[hsl(211,100%,44%)] py-16">
          <div className="container mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-extrabold mb-4">Prêt à découvrir nos produits ?</h2>
            <p className="text-white/80 mb-8">Les meilleures marques tech, au meilleur prix parisien.</p>
            <Button size="lg" className="bg-white text-[hsl(211,100%,44%)] hover:bg-white/90 font-bold rounded-xl px-10" asChild>
              <Link href="/products">
                Voir la boutique <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
