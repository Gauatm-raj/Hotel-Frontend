import React from 'react'
import Room from './Room'
import NavBar from '../layout/NavBar'
import Footer from '../layout/Footer'

const RoomListing = () => {
  return (
    <>
     <NavBar/>
    <section className='bg-light p-2 mb-5 mt-5 shadow'>
        <Room/>
         
    </section>
     <Footer/>
    </>
  )
}

export default RoomListing