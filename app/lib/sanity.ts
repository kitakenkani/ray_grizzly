import { createImageUrlBuilder } from '@sanity/image-url'
import { createClient } from 'next-sanity'
import { type SanityImage } from '../interface'

const config = {
  projectId: 'q9lmlrdg',
  dataset: 'production',
  apiVersion: '2023-01-06',
}

export const client = createClient({
  ...config,
  useCdn: true,
})

export const writeClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = createImageUrlBuilder(client)

export function urlFor (source: SanityImage) {
  return builder.image(source)
}
