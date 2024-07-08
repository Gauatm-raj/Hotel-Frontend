import React, { useState } from "react";
import { bookRoom, getRoomById } from "../util/ApiFunctions";
import BookingSummary from "./BookingSummary";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment/moment";
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import NavBar from "../layout/NavBar";
import Footer from "../layout/Footer";

const BookingForm = () => {
  const [isSubmit, setSubmit] = useState(false);
  const [isvalidate, setIsValidate] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const navigate = useNavigate();
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    noOfAdults: "",
    noOfChildrens: "",
  });
  const { roomId } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMsg("");
  };

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(roomId);
  }, [roomId]);

  const calculatePayments = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    console.log(diffInDays, paymentPerDay, diffInDays * paymentPerDay);
    return diffInDays * paymentPerDay;
  };

  const isGuestValid = () => {
    const adultCount = parseInt(booking.noOfAdults);
    const childrenCount = parseInt(booking.noOfChildrens);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    console.log(booking.checkOutDate);
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMsg("Check-Out Date must come before Check-In Date");
      return false;
    } else {
      console.log(booking.checkOutDate);
      setErrorMsg("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropogation;
    } else {
      setSubmit(true);
    }
    setIsValidate(true);
    
  };
  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setSubmit(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMsg = error.message;
      navigate("/booking-success", { state: { error: errorMsg } });
    }
  };

  return (
    <>
      
      <div className="container mb-5">
        <Row>
          <Col md={6}>
            <div className="card card-body mt-5">
              <h4 className="card card-title"> Reserve Room</h4>
              <Form noValidate validated={isvalidate} onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel htmlFor="guestFullName">Full Name :</FormLabel>

                  <FormControl
                    required
                    type="text"
                    id="guestFullName"
                    name="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Enter Your Full Name"
                    onChange={handleInputChange}
                  />
                  <FormControl.Feedback type="invalid">
                    Please Enter Your full Name
                  </FormControl.Feedback>
                </FormGroup>

                <FormGroup>
                  <FormLabel htmlFor="guestEmail">Email :</FormLabel>

                  <FormControl
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter Your Email"
                    onChange={handleInputChange}
                  />
                  <FormControl.Feedback type="invalid">
                    Please Enter Your Email
                  </FormControl.Feedback>
                </FormGroup>

                <fieldset style={{ border: "2px" }}>
                  <legend>Loading Period</legend>
                  <Row>
                    <Col md={6} className="col-6">
                      <FormLabel htmlFor="checkInDate">
                        Check-In Date :
                      </FormLabel>

                      <FormControl
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        placeholder="Enter Your Check-In Date"
                        onChange={handleInputChange}
                      />
                      <FormControl.Feedback type="invalid">
                        Please select a Check-In Date
                      </FormControl.Feedback>
                    </Col>

                    <Col md={6} className="col-6">
                      <FormLabel htmlFor="checkOutDate">
                        Check-Out Date :
                      </FormLabel>

                      <FormControl
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="Enter Your Check-Out Date"
                        onChange={handleInputChange}
                      />
                      <FormControl.Feedback type="invalid">
                        Please select a Check-Out Date
                      </FormControl.Feedback>
                    </Col>
                    {errorMsg && (
                      <p className="error-message text-danger">{errorMsg}</p>
                    )}
                  </Row>
                </fieldset>

                <fieldset>
                  <legend>No. of Guest</legend>
                  <Row>
                    <Col md={6} className="col-6">
                      <FormLabel htmlFor="noOfAdults">Adults :</FormLabel>

                      <FormControl
                        required
                        type="number"
                        id="noOfAdults"
                        name="noOfAdults"
                        value={booking.noOfAdults}
                        placeholder="1"
                        min={1}
                        onChange={handleInputChange}
                      />
                      <FormControl.Feedback type="invalid">
                        Please select atleast 1 adults
                      </FormControl.Feedback>
                    </Col>

                    <Col md={6} className="col-6">
                      <FormLabel htmlFor="noOfChildrens">Children :</FormLabel>

                      <FormControl
                        
                        type="number"
                        id="noOfChildrens"
                        name="noOfChildrens"
                        value={booking.noOfChildrens}
                        placeholder="0"
                        onChange={handleInputChange}
                      />
                    </Col>
                  </Row>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <button type="submit" className="btn btn-hotel">
                    Continue
                  </button>
                </div>
              </Form>
            </div>
          </Col>

          <Col md={6}>
            {isSubmit && (
             

              <BookingSummary
                booking={booking}
                payments={calculatePayments}
                isFormValid={isvalidate}
                onConfirm={handleBooking}
              />
            )}
            
          </Col>
        </Row>
      </div>
      
    </>
  );
};

export default BookingForm;
