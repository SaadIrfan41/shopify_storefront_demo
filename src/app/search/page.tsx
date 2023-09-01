// import Grid from 'components/grid'
// import ProductGridItems from 'components/layout/product-grid-items'
import Products from '@/components/Products'
import { defaultSort, sorting } from '@/lib/constants'
import { getProducts } from '@/lib/shopify'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export const runtime = 'edge'

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  console.log(searchParams)
  //   const { sortKey, reverse } =
  //     sorting.find((item) => item.slug === sort) || defaultSort

  // const products = await getProducts({ sortKey, reverse, query: searchValue })

  return (
    <div key={Math.random()}>
      <Suspense fallback='LOADING...'>
        <Products query={searchValue} />
      </Suspense>
    </div>
  )
}
