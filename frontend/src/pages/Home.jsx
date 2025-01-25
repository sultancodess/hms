import React from 'react'
import Hero from '../components/Home/Hero'
import HealthcareActions from '../components/Healthcare services/HealthcareServices'

const Home = () => {
  return (
      <div className=' text-black px-2 py-4 md:px-10 md:py-8 '>
      <Hero />
      <HealthcareActions/>
    </div>
  )
}

export default Home