import React from 'react'

import Image from 'next/image'
// import Logo from '../../public/Logo.webp'
import Link from 'next/link'
import { Input } from './ui/input'
import { getMenu } from '@/lib/shopify'
import Search from './Navbar/search'
const Navbar = async () => {
  const menu = await getMenu('navbar-menu')
  console.log(menu)
  return (
    <header className=' flex my-8  mx-10 justify-between items-center'>
      <Link href='/'>
        LOGO
        {/* <Image src={Logo} alt={'Dine Market Logo'} /> */}
      </Link>
      <div className='hidden lg:flex gap-x-5  font-medium'>
        {menu.map((menu) => (
          <Link key={menu.title} href={`${menu.path}`}>
            {menu.title}
          </Link>
        ))}
      </div>
      <div className=' relative hidden xl:block  w-3/12'>
        <Search />
      </div>
      <div className='lg:flex hidden gap-3 items-center'>
        {/* <SignedIn> */}
        {/* <UserButton afterSignOutUrl='/' /> */}
        {/* </SignedIn> */}
        <Link
          href='/cart'
          className='bg-[#f1f1f1] rounded-full w-[46px] h-[46px] relative hover:scale-110 duration-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='absolute top-0 righ-0 left-0 bottom-0 m-auto w-full'
            viewBox='0 0 24 24'
          >
            <circle cx='8' cy='21' r='1'></circle>
            <circle cx='19' cy='21' r='1'></circle>
            <path d='M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12'></path>
          </svg>
          <span className=' w-[18px] h-[18px] rounded-full bg-red-500 text-[#eee]  text-xs font-semibold absolute text-center right-0'>
            {/* {totalItems} */}0
          </span>
        </Link>
      </div>
    </header>
  )
}

export default Navbar
