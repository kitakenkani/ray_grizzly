'use client'

import { Button } from '@/components/ui/button'
import { useShoppingCart } from '@/node_modules/use-shopping-cart'
import { urlFor } from '../lib/sanity'
import { type ProductCart } from './AddToBag'

export default function CheckoutNow ({ currency, description, image, name, price, price_id }: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart()
  function buyNow(priceId: string) {
    checkoutSingleItem(priceId)
  }
  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id
  }
  console.log(product)

  return (
        <Button
            variant="outline"
            onClick={() => {
              buyNow(product.price_id)
            }}
        >
            CheckoutNow
        </Button>
  )
}