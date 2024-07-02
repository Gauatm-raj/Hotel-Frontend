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
        <Link to={"/add-room"}>
          Manage Room
        </Link>
    </section>
    <Footer/>
    </>
  )
}

export default Admin