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
  )
}
