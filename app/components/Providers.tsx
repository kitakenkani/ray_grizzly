'use client'

import { CartProvider as USCProvider } from '@/node_modules/use-shopping-cart'
import { type ReactNode } from 'react'

export default function CartProvider ({ children }: { children: ReactNode }) {
  return (
        <USCProvider
            mode="payment"
            cartMode="client-only"
            stripe={process.env.NEXT_PUBLIC_STRIPE_KEY!}
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
