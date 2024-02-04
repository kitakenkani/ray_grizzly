import Image from '@/node_modules/next/image'
import Link from '@/node_modules/next/link'
import { client, urlFor } from '../lib/sanity'

interface AssetReference {
  _ref: string
  _type: 'reference'
}

interface ImageInterface {
  _type: 'image'
  asset: AssetReference
}

interface DrawingImage {
  _updatedAt: string
  _createdAt: string
  _rev: string
  _type: 'drawingImages'
  _id: string
  image1: ImageInterface
  image2: ImageInterface
}
async function getData (): Promise<DrawingImage> {
  const query = "*[_type == 'drawingImages'][0]"
  const data = await client.fetch(query)
  return data
}

export default async function Hero (): Promise<JSX.Element> {
  const data = await getData()
  return (
        <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
            <div className="mb-8 flex flex-wrap justify-between md:mb-16">
                <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
                    <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
                    🧸Grizzly drawing ray
                    </h1>
                    <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
                        kumagai 24. japan🇯🇵
                        I paint. I like shiny things and nature.
                        Please feel free to DM me for comments and advice 😁.
                        I am studying painting.
                        Please send me your requests and requests on <a href='https://www.instagram.com/kuma_rrgg/'>instagram</a>!
                    </p>
                </div>
                <div className="mb-12 flex w-full md:mb-16 1g:w-2/3">
                    <div className=" relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
                        <Image
                            src={urlFor(data.image1).url()}
                            alt="Great Photo"
                            className='h-full w-full object-cover object-center'
                            width={500}
                            height={500}
                            priority
                        />
                    </div>
                    <div className=' overflow-hidden rounded-lg bg-gray-100 shadow-lg'>
                        <Image
                            src={urlFor(data.image2).url()}
                            alt="Great Photo"
                            className='h-full w-full object-cover object-center'
                            width={500}
                            height={500}
                            priority
                         />
                    </div>
                </div>
            </div>
            <div className='flex flex-col items-center justify-between gap-8 md:flex-row'>
                <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
                    <Link href="/Drawing" className='flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200'>
                        Drawing
                    </Link>
                    <Link href="/T-shirts" className='flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200'>
                        T-shirts
                    </Link>
                    <Link href="/Goods" className='flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200'>
                        Goods
                    </Link>
                </div>
            </div>
        </section>
  )
}
