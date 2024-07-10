import moment from "moment";
import React, { useState } from "react";
import { getAvailableRoomsByCheckInDateAndChcekOutDate } from "../util/ApiFunctions";
import {
    Button,
  Col,
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import RoomTypeSelector from "./RoomTypeSelector";
import RoomSearchResult from "./RoomSearchResult";

const RoomSearch = () => {
  const [searchQuery, setSearchQuery] = useState({
    checkInDate: "",
    checkOutDate: "",
    roomType: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (!checkIn.isValid() || !checkOut.isValid()) {
      setErrorMsg("please enter valid dates");
      return;
    }
    if (!checkOut.isSameOrAfter(checkIn)) {
      setErrorMsg("Check-In dates must come before Check-Out date");
      return;
    }
    setIsLoading(true);
    getAvailableRoomsByCheckInDateAndChcekOutDate(
      searchQuery.checkInDate,
      searchQuery.checkOutDate,
      searchQuery.roomType
    )
      .then((response) => {
        setAvailableRooms(response.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        //setErrorMsg("error")
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery({...searchQuery,[name]: value });
    const checkIn = moment(searchQuery.checkInDate);
    const checkOut = moment(searchQuery.checkOutDate);
    if (checkIn.isValid() && checkOut.isValid()) {
      setErrorMsg("");
    }
  };

  const clearSerach = () => {
    setSearchQuery({
      checkInDate: "",
      checkOutDate: "",
      roomType: "",
    });
    setAvailableRooms([])
    setIsLoading(false);
    setErrorMsg("");
  };
  return (
    <>
      <Container className="mt-5 mb-5 py-5 shadow">
        <Form onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col xs={12} md={3}>
              <FormGroup controlId="checkInDate">
                <FormLabel>Check-In Date</FormLabel>
                <FormControl
                  type="date"
                  onChange={handleInputChange}
                  name="checkInDate"
                  value={searchQuery.checkInDate}
                  min={moment().format("YYYY MM DD")}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={3}>
              <FormGroup controlId="checkOutDate">
                <FormLabel>Check-Out Date</FormLabel>
                <FormControl
                  type="date"
                  onChange={handleInputChange}
                  name="checkOutDate"
                  value={searchQuery.checkOutDate}
                  min={moment().format("YYYY MM DD")}
                />
              </FormGroup>
            </Col>

            <Col xs={12} md={3}>
              <FormGroup className="">
                <FormLabel>Room Type</FormLabel>
                <div className="d-flex">
                  <RoomTypeSelector
                    handlRoomInputChange={handleInputChange}
                    newRoom={searchQuery}
                  />
                  <Button  variant="secondary" type="submit">Search</Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </Form>
        {isLoading ? (
            <p>Finding Availables Rooms......</p>
        ): availableRooms ? (
            <RoomSearchResult result={availableRooms} onClearSearch={clearSerach}/>
        ) :(
            <p>No rooms available for the selected dates and room type</p>
        )}
        {errorMsg && <p className="text-danger">{errorMsg}</p>}
      </Container>
    </>
  );
};

export default RoomSearch;
