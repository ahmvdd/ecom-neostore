import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export async function POST(request: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    return NextResponse.json({ error: "Stripe non configuré" }, { status: 503 })
  }

  try {
    const { items } = (await request.json()) as { items: CartItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Le panier est vide" }, { status: 400 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3002"

    // Import dynamique — Stripe n'est jamais chargé au build
    const { default: Stripe } = await import("stripe")
    const stripe = new Stripe(key, { apiVersion: "2026-01-28.clover", typescript: true })

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["FR", "BE", "CH", "LU", "MC", "CA"],
      },
      line_items: items.map((item) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: item.image.startsWith("http") ? [item.image] : [`${baseUrl}${item.image}`],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${baseUrl}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/commande/annulee`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Erreur lors de la création de la session de paiement" },
      { status: 500 }
    )
  }
}
