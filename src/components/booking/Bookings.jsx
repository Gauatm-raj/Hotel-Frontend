import React, { useEffect, useState } from 'react'
import { cancelBooking, getAllBooking } from '../util/ApiFunctions';
import Header from "../common/Header";
import BookingTable from './BookingTable';
import Footer from '../layout/Footer';
import NavBar from '../layout/NavBar';

const Bookings = () => {
    const[bookingInfo,setBookingInfo]=useState([])
    const[isLoading,setIsLoading]=useState(true);
    const[errorMsg,setErrorMsg]=useState("");
    
    useEffect(()=>{
        setTimeout(()=>{
            getAllBooking().then((data)=>{
                setBookingInfo(data)
                console.log(data);
                setIsLoading(false)
            }).catch((error)=>{
                setErrorMsg(error.message)
                setIsLoading(false)
            })
        },1000)
    },[])

    const handleBookingCancelation = async(bookingId)=>{
        try {
            await cancelBooking(bookingId);
            const data=await getAllBooking();
            setBookingInfo(data);
        } catch (error) {
           setErrorMsg(error.message) 
        }
    }
      return (
    <>
    <NavBar/>
     <section  style={{backgroundColor:"whitesmoke"}}>
        <Header title={"Existing Bookings"}/>
        {errorMsg && (<div className='text-danger'>{errorMsg}</div>)}
        {isLoading ? (<div>
            Loading Existing Bookings
        </div>) : (
            <BookingTable bookingInfo={bookingInfo} handleBookingCancelation={handleBookingCancelation}/>
        )}
     </section>
     <Footer/>
    </>
  )
}

export default Bookings