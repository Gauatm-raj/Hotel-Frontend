import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../layout/Footer'
import NavBar from '../layout/NavBar'

const Admin = () => {

  return (

    <>
    <NavBar/>
    <section className='container mt-5'>
        <h2>Welcome To Admin Panel</h2>
        <hr />
        <Link to={"/existing-rooms"}>
          Manage Room
        </Link>
        <br />
        <Link to={"/existing-bookings"}>
          Manage Bookings
        </Link>

    </section>
    <Footer/>
    </>
  )
}

export default Admin