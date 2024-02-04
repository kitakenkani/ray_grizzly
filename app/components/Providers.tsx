'use client'

import { CartProvider as USCProvider } from '@/node_modules/use-shopping-cart'
import { type ReactNode } from 'react'

export default function CartProvider ({ children }: { children: ReactNode }): JSX.Element | null {
  const stripeKey = process.env.NEXT_PUBLIC_STRIPE_KEY
  if (stripeKey == null) {
    console.error('Stripe key is not defined. Please set NEXT_PUBLIC_STRIPE_KEY in your environment.')
    return null
  }
  return (
        <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={stripeKey}
            successUrl="http://localhost:3000/stripe/success"
            cancelUrl="http://localhost:3000/stripe/error"
            currency="JPY"
            billingAddressCollection={false}
            shouldPersist={true}
            language="ja"
        >
            {children}
        </USCProvider>
  )
}
