import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'q9lmlrdg',
  dataset: 'production',
  apiVersion: '2023-01-06',
  useCdn: true
})

const builder = imageUrlBuilder(client)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function urlFor (source: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return builder.image(source)
}
