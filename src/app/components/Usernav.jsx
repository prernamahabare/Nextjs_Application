import React from 'react'
import Link from 'next/link'
import FeatherIcon from "feather-icons-react"


const Usernav = () => {
    return (
        <div className='flex justify-between flex-initial text-slate-100 py-3 px-7'>
            <div className="">
                <Link href="#">
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </Link></div>
            <div className='flex gap-x-3'>
                <div>Home</div>
                <div>Product</div>
                <div>Company</div>
            </div>
            <div >
                {/* <Link href="/login" className='text-right'>
                    Log in <span aria-hidden="true">&rarr;</span>
                </Link> */}
                <Link href='/profile'><FeatherIcon icon="user" /></Link>
            </div>
        </div>

    )
}
export default Usernav


