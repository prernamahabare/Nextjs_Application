import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import FeatherIcon from "feather-icons-react"

const Usernav = ({user}) => {

    return (
        <>
            <div className='flex justify-between text-slate-100 py-4 px-7'>
                <div className="flex gap-x-3">
                    <Link href="#" className="flex gap-x-3 items-center">
                        <span><img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500" alt="img" /></span>
                        <span className='font-extrabold text-lg'>Authentication</span>
                    </Link>
                </div>
                <div className='flex gap-x-12 font-semibold items-center'>
                    <div>Feedback</div>
                    <div>Support</div>
                    <div><FeatherIcon icon="search" /></div>
                    <div className='flex gap-2'>
                    <div className='gap-0'><Link href={`/profile/${user}`}><FeatherIcon icon="user" /></Link></div>
                    <div>{user}</div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Usernav


