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
    <div className="min-h-screen bg-[#07070e] flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[#d4a853]/5 blur-[100px] pointer-events-none" />
          <div className="container mx-auto px-4 text-center relative">
            <p className="text-[#d4a853] text-xs font-medium uppercase tracking-widest mb-4">
              Fondée à Paris en 2018
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Notre Histoire
            </h1>
            <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
              Depuis 2018, Tech Paris accompagne les parisiens dans leurs achats high-tech avec passion et expertise.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-white/[0.05] bg-[#0a0a16] py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: Users, value: "50 000+", label: "Clients satisfaits" },
                { icon: Award, value: "7 ans", label: "D'expertise" },
                { icon: MapPin, value: "Paris", label: "Basé en France" },
                { icon: Zap, value: "4.9/5", label: "Note moyenne" },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#d4a853]/10 border border-[#d4a853]/15 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#d4a853]" />
                  </div>
                  <span className="text-2xl font-bold text-white">{value}</span>
                  <span className="text-xs text-white/30 uppercase tracking-wider">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Histoire 1 */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
            <div className="relative h-[420px] rounded-2xl overflow-hidden border border-white/[0.05]">
              <Image src="/macbook.jpg" alt="Tech Paris" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07070e]/40 to-transparent" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#d4a853] uppercase tracking-widest mb-3">2018 — Les débuts</p>
              <h2 className="text-3xl font-bold text-white mb-5 leading-tight">Née de la passion pour la tech</h2>
              <p className="text-white/40 leading-relaxed mb-4">
                Tech Paris a été fondée en 2018 par une équipe passionnée de technologie, avec une idée simple : proposer les meilleurs produits électroniques aux meilleurs prix, avec un service irréprochable.
              </p>
              <p className="text-white/40 leading-relaxed">
                Basés au cœur de Paris, nous avons rapidement gagné la confiance de milliers de clients grâce à notre sélection rigoureuse et notre accompagnement personnalisé.
              </p>
            </div>
          </div>
        </section>

        {/* Histoire 2 */}
        <section className="py-24 bg-[#0a0a16]">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">
              <div className="md:order-2 relative h-[420px] rounded-2xl overflow-hidden border border-white/[0.05]">
                <Image src="/iphone.jpg" alt="Tech Paris sélection" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a16]/40 to-transparent" />
              </div>
              <div className="md:order-1">
                <p className="text-xs font-medium text-[#d4a853] uppercase tracking-widest mb-3">Notre engagement</p>
                <h2 className="text-3xl font-bold text-white mb-5 leading-tight">La qualité avant tout</h2>
                <p className="text-white/40 leading-relaxed mb-4">
                  Chaque produit que nous proposons est soigneusement sélectionné. Nous travaillons directement avec les grands fabricants — Apple, Samsung, Dyson, LG — pour vous garantir l'authenticité et les meilleures conditions tarifaires.
                </p>
                <p className="text-white/40 leading-relaxed">
                  Livraison rapide, retours gratuits sous 30 jours, SAV réactif : nous ne faisons aucun compromis sur l'expérience client.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valeurs */}
        <section className="py-24 container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[#d4a853] text-xs font-medium uppercase tracking-widest mb-3">Ce qui nous guide</p>
            <h2 className="text-3xl font-bold text-white mb-3">Nos valeurs</h2>
            <p className="text-white/30 max-w-md mx-auto">Ce qui nous guide chaque jour pour vous offrir la meilleure expérience.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { title: "Authenticité", desc: "100% de produits officiels, achetés auprès des distributeurs agréés. Zéro contrefaçon, garantie fabricant incluse." },
              { title: "Transparence", desc: "Prix clairs, sans frais cachés. Nous affichons toujours le prix TTC final, livraison comprise dès 50€." },
              { title: "Proximité", desc: "Une équipe française, disponible 7j/7, qui répond en moins de 2h à toutes vos questions avant et après achat." },
            ].map((val) => (
              <div key={val.title} className="bg-[#0d0d1a] border border-white/[0.05] hover:border-[#d4a853]/20 rounded-2xl p-6 transition-colors duration-300">
                <div className="w-2 h-8 bg-[#d4a853] rounded-full mb-4" />
                <h3 className="font-bold text-lg text-white mb-2">{val.title}</h3>
                <p className="text-sm text-white/35 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#0a0a16] border-t border-white/[0.05] py-20">
          <div className="container mx-auto px-4 text-center">
            <p className="text-[#d4a853] text-xs font-medium uppercase tracking-widest mb-4">Prêt à commencer ?</p>
            <h2 className="text-3xl font-bold text-white mb-4">Découvrez nos produits</h2>
            <p className="text-white/35 mb-10 max-w-md mx-auto">Les meilleures marques tech, au meilleur prix parisien.</p>
            <Button size="lg" className="bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] font-bold rounded-xl px-10" asChild>
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
