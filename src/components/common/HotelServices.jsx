import React from 'react'
import { Card, CardBody, CardText, CardTitle, Col, Container, Row } from 'react-bootstrap'
import Header from './Header'
import {FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi} from "react-icons/fa"

const HotelServices = () => {

  return (
    <>
     <Container className='mb-2'>
       <Header title={"Our Services"}/>
       <Row>
          <h4 className='text-center '>Services at <span className='hotel-color'>Gautam Hotel</span>
          <span className='gap-2'> <FaClock/> - 24-Hour Front Desk </span></h4>
          <hr />
          <Row xs={1} md={2} lg={3} className='g-4 mt-2'>
               <Col>
                 <Card>
                    <CardBody>
                        <CardTitle className='hotel-color'>
                             <FaWifi/> Wifi
                        </CardTitle>
                        <CardText>
                            Stay Connected with HighSpeed Internet Access
                        </CardText>
                    </CardBody>
                 </Card>
               </Col>

               <Col>
                 <Card>
                    <CardBody>
                        <CardTitle className='hotel-color'>
                             <FaUtensils/> BreakFast
                        </CardTitle>
                        <CardText>
                            Start Your Day With Delicious Food
                        </CardText>
                    </CardBody>
                 </Card>
               </Col>

               <Col>
                 <Card>
                    <CardBody>
                        <CardTitle className='hotel-color'>
                             <FaTshirt/> Laundary
                        </CardTitle>
                        <CardText>
                            Keep Your Clothes clean and fresh with our laundary service.
                        </CardText>
                    </CardBody>
                 </Card>
               </Col>

               <Col>
                 <Card>
                    <CardBody>
                        <CardTitle className='hotel-color'>
                             <FaCocktail/> Mini-Bar
                        </CardTitle>
                        <CardText>
                            Enjoy Mini Bar with drinks and snacks
                        </CardText>
                    </CardBody>
                 </Card>
               </Col>

               <Col>
                 <Card>
                    <CardBody>
                        <CardTitle className='hotel-color'>
                             <FaParking/> Parking Space
                        </CardTitle>
                        <CardText>
                            Parking facility available for car and bikes
                        </CardText>
                    </CardBody>
                 </Card>
               </Col>

               <Col>
                 <Card>
                    <CardBody>
                        <CardTitle className='hotel-color'>
                             <FaSnowflake/> Air Conditioing
                        </CardTitle>
                        <CardText>
                            All rooms are availablewith AC
                        </CardText>
                    </CardBody>
                 </Card>
               </Col>
          </Row>
       </Row>
     </Container>
    </>
  )
}

export default HotelServices