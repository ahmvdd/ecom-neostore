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
    <div className="min-h-screen bg-white flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold mb-2">Contactez-nous</h1>
            <p className="text-muted-foreground">Une question ? Notre équipe parisienne répond en moins de 2h.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
            {/* Form */}
            <div className="bg-[#f5f5f7] rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm font-semibold">Nom complet</Label>
                  <Input id="name" name="name" placeholder="Votre nom" className="h-11 rounded-xl bg-white" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="votre@email.com" className="h-11 rounded-xl bg-white" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-sm font-semibold">Sujet</Label>
                  <Input id="subject" name="subject" placeholder="Ex: Question sur une commande" className="h-11 rounded-xl bg-white" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-sm font-semibold">Message</Label>
                  <Textarea id="message" name="message" placeholder="Décrivez votre demande..." rows={5} className="resize-none rounded-xl bg-white" required />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[hsl(211,100%,44%)] hover:bg-[hsl(211,100%,38%)] text-white font-semibold rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi en cours..." : <><ArrowRight className="mr-2 h-4 w-4" /> Envoyer le message</>}
                </Button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-bold text-lg mb-5">Informations de contact</h2>
                <div className="space-y-5">
                  {[
                    { icon: Mail, title: "Email", value: "contact@techparis.fr" },
                    { icon: Phone, title: "Téléphone", value: "+33 1 23 45 67 89" },
                    { icon: MapPin, title: "Adresse", value: "42 Rue de la Paix\n75001 Paris, France" },
                  ].map(({ icon: Icon, title, value }) => (
                    <div key={title} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[hsl(211,100%,44%)]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-4 w-4 text-[hsl(211,100%,44%)]" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{title}</p>
                        <p className="text-muted-foreground text-sm whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-border" />

              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-4 w-4 text-[hsl(211,100%,44%)]" />
                  <h3 className="font-bold">Horaires d'ouverture</h3>
                </div>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Lundi — Vendredi", hours: "9h00 — 18h00" },
                    { day: "Samedi", hours: "10h00 — 16h00" },
                    { day: "Dimanche", hours: "Fermé" },
                  ].map(({ day, hours }) => (
                    <div key={day} className="flex justify-between">
                      <span className="text-muted-foreground">{day}</span>
                      <span className={`font-medium ${hours === "Fermé" ? "text-muted-foreground" : "text-foreground"}`}>{hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[hsl(211,100%,44%)]/10 rounded-2xl p-5">
                <p className="text-sm font-semibold text-[hsl(211,100%,44%)] mb-1">Réponse garantie sous 2h</p>
                <p className="text-xs text-muted-foreground">Pendant les horaires d'ouverture, notre équipe s'engage à vous répondre rapidement pour toute question sur vos commandes ou nos produits.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
