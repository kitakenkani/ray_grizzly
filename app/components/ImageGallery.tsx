'use client'

import Image from 'next/image'
import { useState } from 'react'
import { urlFor } from '../lib/sanity'
import { type SanityImage } from '../interface'

interface ImageGalleryProps {
  images: SanityImage[]
}

export default function ImageGallery ({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(images[0])

  const handleSmallImageClick = (image: SanityImage): void => {
    setBigImage(image)
  }

  return (
        <div className="grid gap-4 lg:grid-cols-5">
            <div className="order-last flex gap-4 lg:order-none lg:flex-col">
                {images.map((image, idx) => (
                    <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={urlFor(image).url()}
                          width={200}
                          height={200}
                          alt="photo"
                          className="h-full w-full object-cover object-center cursor-pointer"
                          onClick={() => { handleSmallImageClick(image) }}
                        />
                    </div>
                ))}
            </div>
            <div className='relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4'>
                <Image src={urlFor(bigImage).url()} alt="Photo" width={500} height={500} className="h-full w-full object-cover object-center" />
                <span className='absolute left-0 top-0 rounded-br-lg bg-primary-foreground px-3 py-1.5 text-sm uppercase tracking-wider text-white bg-white bg-opacity-70'>
                    🧸
                </span>
            </div>
        </div>
  )
}
