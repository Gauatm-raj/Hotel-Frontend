import React from 'react'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'
import HeaderMain from '../layout/HeaderMain'
import HotelServices from '../common/HotelServices'
import Prallax from '../common/Prallax'
import RoomCarousel from '../common/RoomCarousel'

export default function Home() {
  return (
    <>
       <NavBar/>
       <section>

        <HeaderMain/>
        
         <section className='container'>
          <RoomCarousel/>
          <Prallax/>
          <HotelServices/>
          <Prallax/>
         </section>

       </section>
        <Footer/>
    </>
  )
}
