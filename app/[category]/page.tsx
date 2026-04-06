import { type SimplifiedProduct } from '../interface'
import { client } from '../lib/sanity'
import Image from 'next/image'
import Link from 'next/link'

async function getData (category: string): Promise<SimplifiedProduct[]> {
  const query = `*[_type == 'product' && category->name == $category] {
    _id,
      "imageUrl": images[0].asset->url,
      price,
      name,
      "slug": slug.current,
      "categoryName": category->name,
      available,
}`
  const data = await client.fetch(query, { category })
  return data
}

export const revalidate = 60

export default async function CategoryPage ({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const data: SimplifiedProduct[] = await getData(category)
  return (
        <div className=''>
        <div className='mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-slate-50'>
                    Our Products for {category}
                </h2>
            </div>
            <div className='mt-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                {data.map((product) => (
                    <div key={product._id} className="group relative">
                        <div className='relative aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80'>
                            <Image
                                src={product.imageUrl}
                                alt="Product image"
                                className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                                width={300}
                                height={300}
                            />
                            {!product.available && (
                                <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
                                    <span className='rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-900'>Sold Out</span>
                                </div>
                            )}
                        </div>
                        <div className='mt-4 flex justify-between'>
                            <div>
                                <h3 className='text-sm text-gray-700 dark:text-slate-300'>
                                    <Link href={`/product/${product.slug}`}>
                                        {product.name}
                                    </Link>
                                </h3>
                                <p className='mt-1 text-sm text-gray-500 dark:text-slate-400'>
                                  {product.categoryName}
                                </p>
                            </div>
                            <p className='text-sm font-medium text-gray-900 dark:text-slate-50'>¥{product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}
