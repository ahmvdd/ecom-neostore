import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!key || !webhookSecret) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 })
  }

  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  try {
    // Import dynamique — Stripe n'est jamais chargé au build
    const { default: Stripe } = await import("stripe")
    const stripe = new Stripe(key, { apiVersion: "2026-01-28.clover", typescript: true })

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ["line_items"],
      })

      console.log("=== NOUVELLE COMMANDE ===")
      console.log("Session ID:", fullSession.id)
      console.log("Client:", fullSession.customer_details?.name)
      console.log("Email:", fullSession.customer_details?.email)
      console.log("Total:", (fullSession.amount_total ?? 0) / 100, "EUR")
      console.log("Produits:", fullSession.line_items?.data.map(
        (item) => `${item.description} x${item.quantity}`
      ).join(", "))
      console.log("========================")
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}
