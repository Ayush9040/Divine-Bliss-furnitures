import React from 'react'
import ContactHero from '../Component/contact/ContactHero'
import ContactSection from '../Component/contact/ContactSection'
import ContactMapsection from '../Component/contact/ContactMapSection'
import Footer from '../Component/Footer'

const Contact = () => {
  return (
    <>
      <ContactHero/>
      <ContactSection/>
      <ContactMapsection/>
      <Footer/>
    </>
  )
}

export default Contact