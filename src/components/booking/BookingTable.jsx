import { parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react'
import DateSlider from '../common/DateSlider';
import { tr } from 'date-fns/locale';

const BookingTable = ({bookingInfo, handleBookingCancelation}) => {

    const[filterBookings,setFilterBookings]=useState(bookingInfo);

    const filterBooking =(startDate,enddate)=>{
        let filtered=bookingInfo
        if(startDate && enddate){
            filtered=bookingInfo.filter((booking)=>{
                const bookingStartDate= parseISO(booking.checkInDate);
                const bookingEndDate= parseISO(booking.checkOutDate);
                return bookingStartDate>=startDate && bookingEndDate<=enddate && bookingEndDate>startDate;
            })
        }
        setFilterBookings(filtered);
    }

    useEffect(()=>{
        setFilterBookings(bookingInfo)
    },[bookingInfo])

  return (
    <>
     <section className='p-4'>
        <DateSlider onDateChange={filterBooking} onFilterChange={filterBooking}/>
        <table className='table table-bordered table-hover shadow'>
            <thead>
                <tr>
                    <th>Serial No.</th>
                    <th>Booking Id</th>
                    <th>Room Id</th>
                    <th>Check-In Date</th>
                    <th>Chcek-Out Date</th>
                    <th>Guest FullName</th>
                    <th>Guest Email</th>
                    <th>Adults</th>
                    <th>Children</th>
                    <th>Total Guest</th>
                    <th>Confirmation Code</th>
                    <th colSpan={2}>Actions</th>
                </tr>
            </thead>
            <tbody className='text-center'>
              {filterBookings.map((booking,index)=>(
                <tr key={booking.id}>
                    <td>{index+1}</td>
                    <td>{booking.id}</td>
                    <td>{booking.room.id}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.checkOutDate}</td>
                    <td>{booking.guestFullName}</td>
                    <td>{booking.guestEmail}</td>
                    <td>{booking.noOfAdults}</td>
                    <td>{booking.noOfChildrens}</td>
                    <td>{booking.totalGuests}</td>
                    <td>{booking.bookingConfirmationCode}</td>
                    <td>
                        <button className='btn btn-danger btn-sm'
                        onClick={()=>handleBookingCancelation(booking.id)}>Cancel</button>
                    </td>
                </tr>
              ))}
            </tbody>
        </table>
        {filterBooking.length === 0 && <p>No Booking Found For Selected Date</p>}
     </section>
    </>
  )
}

export default BookingTable