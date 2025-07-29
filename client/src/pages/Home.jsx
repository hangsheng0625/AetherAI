import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import AiTOols from '../components/AiTools.jsx'
import Testimonial from '../components/Testimonial.jsx'
import Plan from '../components/Plan.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  return (
    <>
    <Navbar></Navbar>
    <Hero />
    <AiTOols></AiTOols>
    <Testimonial></Testimonial>
    <Plan></Plan>
    <Footer></Footer>
    </>
  )
}

export default Home