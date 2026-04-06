'use client'

import { Button } from '@/components/ui/button'
import { type ProductCart } from './AddToBag'

export default function CheckoutNow ({ price_id }: Pick<ProductCart, 'price_id'>) {
  async function buyNow (): Promise<void> {
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ price: price_id, quantity: 1 }] }),
      })
      const data = await res.json() as { url?: string; error?: string }

      if (data.url != null) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
      }
    } catch (e) {
      console.error('購入中にエラーが発生しました:', e)
    }
  }

  return (
        <Button
            variant="outline"
            onClick={() => { void buyNow() }}
        >
            Checkout Now
        </Button>
  )
}
