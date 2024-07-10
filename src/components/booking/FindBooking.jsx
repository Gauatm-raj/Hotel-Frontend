import React, { useState } from "react";
import {
  cancelBooking,
  getBookingByConfirmationCode,
} from "../util/ApiFunctions";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";

const FindBooking = () => {
  const [ConfirmationCode, setConfirmationCode] = useState("");
  const[successMsg,setSuccessMsg]=useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleted, setIsdeleted] = useState(false);
  const [bookingInfo, setBookingInfo] = useState({
    id: "",
    room: { id: "",roomType:"" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    noOfAdults: "",
    noOfChildrens: "",
    totalGuests: "",
  });

  const clearBookingInfo = {
    id: "",
    room: { id: "",roomType:"" },
    bookingConfirmationCode: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    guestFullName: "",
    guestEmail: "",
    noOfAdults: "",
    noOfChildrens: "",
    totalGuests: "",
  };

  const handleInputChange = (e) => {
    setConfirmationCode(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await getBookingByConfirmationCode(ConfirmationCode);
      setBookingInfo(data);
    } catch (error) {
      setBookingInfo(clearBookingInfo);
      console.log(error)
    setErrorMsg(error.message)
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleBookingCancelation = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      setIsdeleted(true);
      setSuccessMsg("Booking has been canceled successfully")
      setBookingInfo(clearBookingInfo);
      setConfirmationCode("");
      setErrorMsg("");
    } catch (error) {
      setErrorMsg(error.message);
    }
    setTimeout(()=>{
        setSuccessMsg("");
        setIsdeleted(false)
    },2000)
  };

  return (
    <>
    <NavBar/>
      <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
        <h2>Find My Bookings</h2>
        <form action="" onSubmit={handleFormSubmit} className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              id="bookingConfirmationCode"
              name="bookingConfirmationCode"
              value={ConfirmationCode}
              onChange={handleInputChange}
              placeholder="Enter the booking confirmation code"
            />
            <button className="btn btn-hotel input-group-text">
              Find Booking
            </button>
          </div>
        </form>
        {isLoading ? (
          <div>Finding Booking</div>
        ) : errorMsg ? (
          <div className="text-danger">{errorMsg}</div>
        ) : bookingInfo.bookingConfirmationCode ? (
          <div className="col-md-6 mt-4 mb-5">
            <h3>Booking Information</h3>
            <p>
              Booking Confirmation Code :{bookingInfo.bookingConfirmationCode}
            </p>
            <p>Booking id : {bookingInfo.id}</p>
            <p>Room No : {bookingInfo.room.id}</p>
            <p>Room Type : {bookingInfo.room.roomType}</p>
            <p>Check-In Date :{bookingInfo.checkInDate}</p>
            <p>Check-Out Date : {bookingInfo.checkOutDate}</p>
            <p>Guest Name : {bookingInfo.guestFullName}</p>
            <p>Guest Email : {bookingInfo.guestEmail}</p>
            <p>Adults : {bookingInfo.noOfAdults}</p>
            <p>Children : {bookingInfo.noOfChildrens}</p>
            <p>Total Guest : {bookingInfo.totalGuests}</p>
            {!isDeleted && (
                <button className="btn btn-danger" 
                onClick={()=>handleBookingCancelation(bookingInfo.id)}>Cancel Booking</button>
            )}
          </div>
        ) : (
          <div>Finding Booking.......</div>
        )}
        {isDeleted && (
            <div className="alert alert-success mt-3" 
            role="alert">{successMsg}</div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default FindBooking;
