import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';

export default function Footer() {
    let today=new Date();
  return (
    <>
     <footer className='by-dark text-ligth py-3 footer mt-5'>
        <Container>
            <Row>
                <Col xs={12} md={12} className='text-center'>
                   <p>&copy; {today.getFullYear} Gautam Hotel</p>
                </Col>
            </Row>
        </Container>
     </footer>
    </>
  )
}
