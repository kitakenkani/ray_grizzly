import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'q9lmlrdg',
  dataset: 'production',
  apiVersion: '2023-01-06',
  useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor (source: any) {
  return builder.image(source)
}
