import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({booking,payments,isFormValid,onConfirm}) => {

    const checkInDate = moment(booking.checkInDate);
    let payment=payments();
    
    const checkOutDate=moment(booking.checkOutDate);
    const noOfDays=checkOutDate.diff(checkInDate,"days");
    const[isBookingConfirmed,setIsBookingConfimed]=useState(false);
    const [isProcessingPayment,setIsprocessingPayment]=useState(false);
    const navigate =useNavigate()
    const handleConfirmBooking =()=>{
        setIsprocessingPayment(true);
        setTimeout(()=>{
            setIsprocessingPayment(false)
            setIsBookingConfimed(true)
            onConfirm()
        },3000)
    }

    useEffect(() => {
      if(isBookingConfirmed){
        navigate("/booking-success")
      }
    }, [isBookingConfirmed,navigate])
    
    console.log(payment);
    
  return (
    <>
    <div className='card card-body mt-5'>
        <h4>Resevation Summary</h4>
        <p>Full Name : <strong>{booking.guestFullName}</strong></p>
        <p>Guest Email : <strong>{booking.guestEmail}</strong></p>
        <p>Check-In Date : <strong>{moment(booking.checkInDate).format("Do MMMM YYYY")}</strong></p>
        <p>Check-Out Date : <strong>{moment(booking.checkOutDate).format("Do MMMM YYYY")}</strong></p>
        <p>No. Of Days : <strong>{noOfDays}</strong></p>
         <div>
            <h5>No. Of Guests</h5>
            <strong>Adults{booking.noOfAdults >= 1 ? "s":""} : {booking.noOfAdults}</strong>
            <br />
            <strong>Children{booking.noOfChildrens >= 1 ? "s":""} : {booking.noOfChildrens}</strong>
            
         </div>
         {payment >0 ? (
            <>
             <p>Total Payment <strong>{payment}</strong></p>
             {isFormValid && !isBookingConfirmed ? (
                <button variant='success' className='btn btn-success' onClick={handleConfirmBooking}>
                    {isProcessingPayment ? (
                        <>
                         <span className='spinner-border spinner-border-sm mr-2'
                         role='status' aria-hidden="true"></span>
                         Booking Confirmed, Redirected to Payment ....
                        </>
                    ) :("Confirm Booking and proceed to payment")}
                </button>
             ): isBookingConfirmed ? (
                  <div className='d-flex justify-content-center align-items-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='sr-only'>Loading....</span>
                    </div>
                  </div>
             ) : null}
            </>
         ):(
            <p className='text-danger'>Check Again dates</p>
         )}
    </div>
    </>
  )
}

export default BookingSummary