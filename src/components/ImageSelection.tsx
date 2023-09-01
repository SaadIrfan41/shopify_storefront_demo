'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Image as shopifyImageType } from '@/lib/shopify/types'

const ImageSelection = ({
  productImages,
}: {
  productImages: shopifyImageType[]
}) => {
  const [selectImage, setselectImage] = useState(0)
  //   console.log(product.image)
  return (
    <div className='flex gap-8'>
      <div className='flex gap-y-8 flex-col'>
        {productImages.map((image: shopifyImageType, index: number) => (
          <Image
            onClick={() => setselectImage(index)}
            key={index}
            src={image.url}
            alt={image.altText}
            width={image.width}
            height={image.height}
            className='w-[100px] h-[100px] cursor-pointer'
          />
        ))}
      </div>
      <div className='relative w-full'>
        <Image
          src={productImages[selectImage].url}
          alt={productImages[selectImage].altText}
          width={productImages[selectImage].width}
          height={productImages[selectImage].height}
          className='w-full h-full  lg:w-[878px] '
        />
      </div>
    </div>
  )
}

export default ImageSelection
