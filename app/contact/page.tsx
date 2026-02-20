"use client"

import { useState, useEffect } from "react"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
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

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    toast.success("Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.")
    e.currentTarget.reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <FuturisticNavbar />

      <main className="flex-1 pt-12 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <p className="text-xs uppercase tracking-[0.3em] accent-text mb-4">Parlons ensemble</p>
            <h1 className="font-display text-4xl md:text-6xl mb-6">Contactez-nous</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto font-light">
              Une question, une suggestion ? Notre équipe est à votre écoute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 max-w-5xl mx-auto">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Votre nom"
                    className="h-12 border-border/50 bg-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="h-12 border-border/50 bg-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-xs uppercase tracking-widest">Sujet</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Sujet de votre message"
                    className="h-12 border-border/50 bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-xs uppercase tracking-widest">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Votre message..."
                    rows={6}
                    className="resize-none border-border/50 bg-transparent"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full accent-bg text-white hover:opacity-90 uppercase tracking-widest text-xs py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            <div className="space-y-12">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] accent-text mb-6">Informations</p>
                <div className="space-y-8">
                  <div className="flex items-start gap-5">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 accent-text" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground text-sm font-light">contact@neostore.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <Phone className="h-4 w-4 accent-text" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Téléphone</h3>
                      <p className="text-muted-foreground text-sm font-light">+33 1 23 45 67 89</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-4 w-4 accent-text" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-1">Adresse</h3>
                      <p className="text-muted-foreground text-sm font-light">42 Avenue du Futur<br />75001 Paris, France</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-border" />

              <div>
                <p className="text-xs uppercase tracking-[0.3em] accent-text mb-6">Horaires</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Lundi — Vendredi</span>
                    <span>9h — 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Samedi</span>
                    <span>10h — 16h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-light">Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
