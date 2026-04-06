'use client'

import { CartProvider as USCProvider } from 'use-shopping-cart'
import { type ReactNode } from 'react'

export default function CartProvider ({ children }: { children: ReactNode }) {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
  if (stripeKey == null) {
    console.error('Stripe key is not defined. Please set NEXT_PUBLIC_STRIPE_KEY in your environment.')
    return null
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://ray-grizzly.vercel.app'

  return (
        <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={stripeKey}
            successUrl={`${baseUrl}/stripe/success`}
            cancelUrl={`${baseUrl}/stripe/error`}
            currency="JPY"
            billingAddressCollection={false}
            shouldPersist={true}
            language="ja"
        >
            {children}
        </USCProvider>
  )
}
