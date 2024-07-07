import React from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../common/Header';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';

const BookingSuccess = () => {
    const location=useLocation();
    const message=location.state?.message
    const error = location.state?.error
  return (
    <>
    <NavBar/>
    <div className='container'>
      <Header title="Booking Success"/>
       <div className='mt-5'>
        {message?(
            <div>
                <h3 className='text-success'> Booking Success</h3>
                <p className='text-success'>{message}</p>
            </div>
        ) : (
            <div>
            <h3 className='text-danger'> Booking Failed</h3>
            <p className='text-danger'>{error}</p>
        </div>
        )}
       </div>
    </div>
    <Footer/>
    </>
  )
}

export default BookingSuccess