import Stripe from 'stripe'
import { client as sanityClient, writeClient } from '@/app/lib/sanity'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST (req: NextRequest): Promise<NextResponse> {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  const signature = req.headers.get('stripe-signature')

  if (stripeSecretKey == null || webhookSecret == null || signature == null) {
    return NextResponse.json({ error: 'Missing required environment variables or signature' }, { status: 400 })
  }

  const stripe = new Stripe(stripeSecretKey)
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      { expand: ['line_items'] }
    )

    const shipping = session.shipping_details
    const customer = session.customer_details

    const orderInfo = {
      buyerName: shipping?.name ?? customer?.name ?? '',
      email: customer?.email ?? '',
      addressLine1: shipping?.address?.line1 ?? '',
      addressLine2: shipping?.address?.line2 ?? '',
      city: shipping?.address?.city ?? '',
      state: shipping?.address?.state ?? '',
      postalCode: shipping?.address?.postal_code ?? '',
      country: shipping?.address?.country ?? '',
      purchasedAt: new Date().toISOString(),
    }

    const lineItems = session.line_items?.data ?? []

    for (const item of lineItems) {
      const priceId = item.price?.id
      if (priceId == null) continue

      const query = `*[_type == 'product' && price_id == $priceId][0]{ _id }`
      const product = await sanityClient.fetch<{ _id: string } | null>(query, { priceId })

      if (product == null) {
        console.warn(`Product with price_id ${priceId} not found in Sanity`)
        continue
      }

      await writeClient
        .patch(product._id)
        .set({ available: false, order: orderInfo })
        .commit()

      console.log(`Marked product ${product._id} as sold. Buyer: ${orderInfo.buyerName}, Country: ${orderInfo.country}`)
    }
  }

  return NextResponse.json({ received: true })
}
