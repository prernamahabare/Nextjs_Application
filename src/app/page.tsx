/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Navbar from '../app/components/Navbar'
import Dashboard from '../app/components/Dashboard'
import Footer from '../app/components/Footer'



export default function Home() {
  return (
    <div className="flex flex-col bg-[rgb(26,25,28)] ">
      <div>
        <Navbar />
      </div>
      <div>
        <Dashboard />
      </div>
      <div>
        <Footer />
      </div>
    </div>
    // bg-[rgb(26,25,28)]
    // linear-gradient(6deg,rgb(248,161,186) 0%,rgb(255,255,255) 35%)
    // linear-gradient(94deg,rgba(253,54,110,0) 0%,rgba(253,54,110,.5) 50.82%,rgba(253,54,110,0) 100%)
    //bg-gradient-to-r from-[rgba(253,54,110,0)]from-0% via-[rgba(253,54,110,.5)] via-50.82% to-[rgba(253,54,110,0) 100%] to-100% 
  )
}
