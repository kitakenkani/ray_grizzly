export interface SanityAssetReference {
  _ref: string
  _type: 'reference'
}

export interface SanityImage {
  _type: 'image'
  asset: SanityAssetReference
}

export interface SimplifiedProduct {
  _id: string
  name: string
  imageUrl: string
  price: number
  slug: string
  categoryName: string
  available: boolean
}

export interface FullProduct {
  _id: string
  name: string
  images: SanityImage[]
  price: number
  slug: string
  categoryName: string
  description: string
  price_id: string
  available: boolean
}
