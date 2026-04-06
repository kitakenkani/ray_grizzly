import AddToBag from '@/app/components/AddToBag'
import CheckoutNow from '@/app/components/CheckoutNow'
import ImageGallery from '@/app/components/ImageGallery'
import { type FullProduct } from '@/app/interface'
import { client } from '@/app/lib/sanity'
import { Truck } from 'lucide-react'
import { notFound } from 'next/navigation'

async function getData (slug: string): Promise<FullProduct | null> {
  const query = `*[_type == 'product' && slug.current == $slug][0]{
    _id,
      images,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      description,
      price_id,
      available,
    }`
  const data = await client.fetch(query, { slug })
  return data ?? null
}

export const revalidate = 60

export default async function ProductPage ({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const decodedString = decodeURIComponent(slug)
  const data = await getData(decodedString)

  if (data == null) {
    notFound()
  }

  // available が未設定の既存商品は販売中として扱う
  const isAvailable = data.available ?? true

  return (
    <div className=''>
        <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
            <div className='grid gap-8 md:grid-cols-2'>
                <ImageGallery images={data.images}/>
                <div className='md:py-8'>
                    <div className='mb-2 md:mb-3'>
                        <span className='mb-0.5 inline-block text-gray-500 dark:text-slate-300'>{data.categoryName}</span>
                        <h2 className='text-2xl font-bold text-gray-800 lg:text-3xl dark:text-slate-50'>{data.name}</h2>
                    </div>
                    <div className='mb-4'>
                        <div className='flex items-end gap-2'>
                            <span className='text-xl font-bold text-gray-800 md:text-2xl dark:text-slate-50'>¥{data.price}</span>
                        </div>
                        <span className='text-sm text-gray-500 dark:text-slate-300'>Incl. Vat plus shipping</span>
                    </div>
                    <div className='mb-6 flex items-center gap-2 text-gray-500'>
                      <Truck />
                      <span className='text-sm'>2-4 Day Shipping</span>
                    </div>
                    {isAvailable
                      ? (
                        <div className='flex gap-2.5'>
                            <AddToBag
                              currency='JPY'
                              description={data.description}
                              image={data.images[0]}
                              name={data.name}
                              price={data.price}
                              price_id={data.price_id}
                            />
                            <CheckoutNow
                              price_id={data.price_id}
                            />
                        </div>
                        )
                      : (
                        <div className='inline-flex items-center rounded-md bg-red-50 dark:bg-red-900/20 px-4 py-2 text-sm font-medium text-red-700 dark:text-red-400 ring-1 ring-red-600/20'>
                            Sold Out
                        </div>
                        )}
                    <p className='mt-12 text-base text-gray-500 tracking-wide dark:text-slate-300'>{data.description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
