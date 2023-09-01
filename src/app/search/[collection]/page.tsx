import { getCollection, getCollectionProducts } from '@/lib/shopify'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// import Grid from 'components/grid'
// import ProductGridItems from 'components/layout/product-grid-items'
import { defaultSort, sorting } from '@/lib/constants'
import Link from 'next/link'
import Image from 'next/image'

export const runtime = 'edge'

export async function generateMetadata({
  params,
}: {
  params: { collection: string }
}): Promise<Metadata> {
  const collection = await getCollection(params.collection)

  if (!collection) return notFound()

  return {
    title: collection.seo?.title || collection.title,
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  console.log(params, searchParams)
  //   const { sort } = searchParams as { [key: string]: string }
  //   const { sortKey, reverse } =
  //     sorting.find((item) => item.slug === sort) || defaultSort
  const products = await getCollectionProducts({
    collection: params.collection,
    // sortKey,
    // reverse,
  })
  // console.log(products.length)
  // console.log(products)

  return (
    <section>
      {products.length === 0 ? (
        <p className='py-3 text-lg'>{`No products found in this collection`}</p>
      ) : (
        <div className=' grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-10  lg:my-16 lg:mx-32'>
          {products.map((product) => (
            <Link
              href={`/product/${product.handle}`}
              key={product.id}
              className='text-[#212121]  text-lg font-semibold  mx-auto   '
            >
              <Image
                src={product.featuredImage.url}
                alt={product.featuredImage.altText}
                width={product.featuredImage.width}
                height={product.featuredImage.height}
                quality={100}
                className=' md:w-[250px] md:h-[266px] w-[200px] h-[200px]   '
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
      )}
    </section>
  )
}
