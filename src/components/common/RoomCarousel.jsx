import React, { useEffect, useState } from "react";
import { getAllRooms } from "../util/ApiFunctions";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Carousel,
  CarouselItem,
  Col,
  Container,
  Row,
} from "react-bootstrap";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([{id:"",roomType:"",roomPrice:"",photo:null}]);
  const [errorMsg, setErrorMsg] = useState("");
  const [Isloading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.message);
        setIsLoading(false);
      });
  }, []);

  if (Isloading) {
    return <div className="mt-5">Loading Rooms . . . .</div>;
  }

  if (errorMsg) {
    return <div className="text-danger mb-5 mt-5">Error: {errorMsg}</div>;
  }

  return (
    <>
      <section className="bg-light mb-5 mt-5 shadow">
        <Link to={"/all-rooms"} className="hotel-color text-center">
          Browse All Rooms
        </Link>
        <Container>
          <Carousel indicators={false}>
            {[...Array(Math.ceil(rooms.length / 3))].map((_, index) => (
              <CarouselItem key={index}>
                <Row>
                  {rooms.slice(index * 3, index * 3 + 3).map((room) => (
                    <Col key={room.id} className="mb-4" xs={12} md={6} lg={4}>
                      <Card>
                        <Link to={`/book-room/${room.id}`}>
                          <CardImg
                            variant="top"
                            src={`data:image/png;base64,${room.photo}`}
                            alt="Room Phtot"
                            className="w-100"
                            style={{ height: "200px" }}
                          />
                        </Link>
                        <CardBody>
                          <CardTitle className="hotel-color ">
                            {room.roomType}
                          </CardTitle>
                          <CardTitle className='hotel-color '>
                        {room.roomPrice}/Night
                    </CardTitle>
                    <div className="flex-shrink-0">
                        <Link className="btn btn-sm btn-hotel" to={`/book-room/${room.id}`}>
                            View/Book Now
                        </Link>
                    </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </CarouselItem>
            ))}
          </Carousel>
        </Container>
      </section>
    </>
  );
};

export default RoomCarousel;
