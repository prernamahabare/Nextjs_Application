import React from 'react'
import Link from 'next/link'

const Dashboard = () => {
    return (
        <div className='flex text-slate-100 h-screen p-10'>
            <div className='basis-1/2  m-auto justify-center'>
                <h1 className='text-6xl'>
                    Build like a team of hundreds
                    <span class="text-xs bg-[#fd386e] text-[#fd386e]">________</span>
                </h1>
            </div>
            <div className='basis-1/2 text-lg  m-auto justify-center'>
                <h2>Appwrites open-source platform lets you add Auth, DBs, Functions and Storage to your product and build any application at any scale, own your data, and use your preferred coding languages and tools.
                </h2>
                <Link href="/signup">
                    <button className='btn-lg px-3 py-3 leading-6 my-5 text-lg rounded-md  bg-[#fd386e]'>
                    Sign Up <span aria-hidden="true">&rarr;</span></button>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard