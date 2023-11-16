import React from 'react'
import Link from 'next/link'
import FeatherIcon from "feather-icons-react"

const Footer = () => {
    return (
        <div className='text-slate-100 p-7'>
            <div className='flex justify-between mb-20'>
                <div className='grow'>Company Name</div>
                <div className='flex basis-2/3'>
                    <div className='flex flex-col basis-1/4'>
                        <h1 className='mb-5'>Quick Start</h1>
                        <h2>Flutter</h2>
                        <h2>Next.js</h2>
                        <h2>Vue.js</h2>
                        <h2>SvelteKit</h2>
                        <h2>Apple</h2>
                        <h2>Android</h2>
                        <h2>Nuxt</h2>
                        <h2>Angular</h2>
                        <h2>Qwik</h2>
                        <h2>Astro</h2>
                    </div>
                    <div className='flex flex-col basis-1/4'>
                        <h1 className='mb-5'>Products</h1>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                    </div>
                    <div className='flex flex-col basis-1/4'>
                        <h1 className='mb-5'>About Us</h1>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                    </div>
                    <div className='flex flex-col basis-1/4'>
                        <h1 className='mb-5'>Learn</h1>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                    </div>
                    <div className='flex flex-col basis-1/4'>
                        <h1 className='mb-5'>Learn More</h1>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                        <h2>React</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-x-3'>
                    <Link href='#'><FeatherIcon icon="alert-circle" /></Link>
                    <Link href='#'><FeatherIcon icon="linkedin" /></Link>
                    <Link href='#'><FeatherIcon icon="youtube" /></Link>
                    <Link href='#'><FeatherIcon icon="twitter" /></Link>
                </div>
                <div>
                    <h5>Copyright © 2023 Appwrite</h5>
                </div>
            </div>
        </div>

    )
}

export default Footer