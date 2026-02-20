"use client"

import { useState, useEffect } from "react"
import { Mail, MapPin, Phone, ArrowRight, Clock } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import FuturisticNavbar from "@/components/futuristic-navbar"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [mounted, setMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const message = formData.get("message") as string
    if (!name || !email || !message) {
      toast.error("Veuillez remplir tous les champs.")
      setIsSubmitting(false)
      return
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    toast.success("Message envoyé ! Nous vous répondons sous 2h.")
    e.currentTarget.reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-[#07070e] flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-[#d4a853] text-xs font-medium uppercase tracking-widest mb-3">Contactez-nous</p>
            <h1 className="text-3xl font-bold text-white mb-2">Une question ?</h1>
            <p className="text-white/35">Notre équipe parisienne répond en moins de 2h.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            {/* Formulaire */}
            <div className="bg-[#0d0d1a] border border-white/[0.06] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-medium text-white/50">Nom complet</Label>
                  <Input
                    id="name" name="name" placeholder="Votre nom"
                    className="h-11 rounded-xl bg-[#07070e] border-white/[0.08] text-white placeholder:text-white/20 focus-visible:ring-[#d4a853]/40"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-medium text-white/50">Email</Label>
                  <Input
                    id="email" name="email" type="email" placeholder="votre@email.com"
                    className="h-11 rounded-xl bg-[#07070e] border-white/[0.08] text-white placeholder:text-white/20 focus-visible:ring-[#d4a853]/40"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-sm font-medium text-white/50">Sujet</Label>
                  <Input
                    id="subject" name="subject" placeholder="Ex: Question sur une commande"
                    className="h-11 rounded-xl bg-[#07070e] border-white/[0.08] text-white placeholder:text-white/20 focus-visible:ring-[#d4a853]/40"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-medium text-white/50">Message</Label>
                  <Textarea
                    id="message" name="message" placeholder="Décrivez votre demande..."
                    rows={5}
                    className="resize-none rounded-xl bg-[#07070e] border-white/[0.08] text-white placeholder:text-white/20 focus-visible:ring-[#d4a853]/40"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#d4a853] hover:bg-[#c9a047] text-[#07070e] font-semibold rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Envoi en cours..."
                    : <><ArrowRight className="mr-2 h-4 w-4" /> Envoyer le message</>}
                </Button>
              </form>
            </div>

            {/* Infos */}
            <div className="space-y-8">
              <div>
                <h2 className="font-bold text-lg text-white mb-5">Informations de contact</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, title: "Email", value: "contact@techparis.fr" },
                    { icon: Phone, title: "Téléphone", value: "+33 1 23 45 67 89" },
                    { icon: MapPin, title: "Adresse", value: "42 Rue de la Paix\n75001 Paris, France" },
                  ].map(({ icon: Icon, title, value }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#d4a853]/10 border border-[#d4a853]/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-[#d4a853]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-white">{title}</p>
                        <p className="text-white/35 text-sm whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/[0.06]" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-[#d4a853]" />
                  <h3 className="font-bold text-white">Horaires d'ouverture</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Lundi — Vendredi", hours: "9h00 — 18h00" },
                    { day: "Samedi", hours: "10h00 — 16h00" },
                    { day: "Dimanche", hours: "Fermé" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-white/30">{day}</span>
                      <span className={`font-medium ${hours === "Fermé" ? "text-white/25" : "text-white/60"}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#d4a853]/8 border border-[#d4a853]/15 rounded-2xl p-5">
                <p className="text-sm font-semibold text-[#d4a853] mb-1">Réponse garantie sous 2h</p>
                <p className="text-xs text-white/30">Pendant les horaires d'ouverture, notre équipe s'engage à vous répondre rapidement pour toute question sur vos commandes ou nos produits.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
