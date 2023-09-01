import ImageSelection from '@/components/ImageSelection'
import { getProduct } from '@/lib/shopify'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export const runtime = 'edge'

const ProductDetailPage = async ({
  params,
}: {
  params: { handle: string }
}) => {
  const product = await getProduct(params.handle)
  if (!product) return notFound()
  // console.log('SINGLE PRODUCT', product)

  //   console.log(product)
  return (
    // <>Product Detai</>
    <div className='bg-[#fcfcfc] py-16 px-8 lg:pl-32 '>
      <div className='flex flex-col lg:flex-row gap-24'>
        <ImageSelection productImages={product.images} />

        <div className=' flex flex-col mt-16 flex-1 text-[#212121] gap-8 basis-[60%] xl:basis-[30%] '>
          <div>
            <h3 className=' text-2xl tracking-[0.1em] font-normal'>
              {product.title}
            </h3>
            <span className=' font-semibold opacity-30  text-xl'>
              {' '}
              {product.productType}
            </span>
          </div>
          {product.options.map((option) => (
            <div key={option.id}>
              <p className=' font-bold  text-[.9rem] tracking-[0.1em]'>
                {option.name}
              </p>
              <ul className='flex gap-4 text-base text-[#666] font-bold'>
                {option.values.map((value, index) => (
                  <button
                    key={index}
                    className=' hover:scale-125 duration-300 flex items-center justify-center'
                  >
                    {value}
                  </button>
                ))}
              </ul>
            </div>
          ))}

          {/* <Counter product={product[0]} productId={product[0]._id} /> */}
        </div>
      </div>
      <div className=' bg-white flex flex-col mt-16 p-8 gap-8'>
        <div className='relative border-b-2 border-[#c4c4c4]'>
          <div className=' font-extrabold lg:text-[7.5rem] text-[4.5rem] text-[#f2f3f7] opacity-70 z-[-1]'>
            Overview
          </div>
          <h2 className=' text-[1.4rem]  absolute font-bold top-[45%]'>
            Product Information
          </h2>
        </div>
        <div className=' flex '>
          <h4 className=' flex-1 font-bold text-base text-[#666] tracking-[0.1em]'>
            PRODUCT DETAILS
          </h4>
          <p className=' font-light tracking-[0.1em] text-base flex-[2]'>
            {product.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
