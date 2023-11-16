import React from 'react'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className='flex justify-between flex-initial text-slate-100 py-3 px-7'>
            <div className="">
                <Link href="#" className="flex gap-x-3 items-center">
                    <span><img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500" alt="img" /></span>
                    <span className='font-extrabold text-lg'>Authentication</span>
                </Link></div>
            <div className='flex gap-x-5'>
                <Link href="#" >Home</Link>
                <Link href="#" >Product</Link>
                <Link href="#" >Company</Link>

                {/* <div></div>
                <div></div> */}
            </div>
            <div >
                <Link href="/login" className='text-right'>
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link>
            </div>
        </div>

    )
}
export default Navbar


