import React from 'react'
import AboutHeroSection from '../Component/AboutUs/AboutHeroSection'
import Aboutus from '../Component/AboutUs/AboutContent'
import ServicesTicker from '../Component/AboutUs/ServicesTicker'
import ServicesBanner from '../Component/AboutUs/ServicesBanner'
import ServiceCards from '../Component/AboutUs/ServiceCards'
import AwardsSection from '../Component/AboutUs/AwardsSection'

const AboutUs = () => {
  return (
    <>
    <AboutHeroSection />
      <Aboutus />
      <ServicesTicker />
      <ServicesBanner />
      <ServiceCards />
      <AwardsSection />
    </>
  )
}

export default AboutUs