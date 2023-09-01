import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Products = async ({ query }: { query: string }) => {
  const products = await getProducts({ query: query })
  // console.log('SEARCH PRODUCTS', products)
  const resultsText = products.length > 1 ? 'results' : 'result'
  return (
    <>
      {query ? (
        <p className='mb-4 mx-32'>
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className='font-bold'>&quot;{query}&quot;</span>
        </p>
      ) : null}

      <div className=' grid grid-cols-4 gap-16 my-16 mx-32'>
        {products.map((product) => (
          <Link
            href={`/product/${product.handle}`}
            key={product.id}
            className='text-[#212121]  text-lg font-semibold  mx-auto'
          >
            <Image
              src={product.featuredImage.url}
              alt={product.featuredImage.altText}
              width={product.featuredImage.width}
              height={product.featuredImage.height}
              className=' w-[250px] h-[266px]  '
            />
            <p className=' mt-1 text-base'>{product.title}</p>
            <p className=' mt-1 text-[15px] text-[#888]'>
              {product.productType}
            </p>
            <p className=' mt-1 text-xl'>
              ${product.priceRange.minVariantPrice.amount}
            </p>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Products
