import React, { useEffect, useState } from 'react'
import BookingForm from './BookingForm'
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import { getRoomById } from '../util/ApiFunctions';
import { useParams } from 'react-router-dom';
import {FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi} from "react-icons/fa"
import RoomCarousel from '../common/RoomCarousel';

const Checkout = () => {
    const[error,setError]=useState("");
    const[isLoading,setIsLoading]=useState(true);
    const[roomInfo,setRoomInfo]=useState({
        photo: "",
        roomType: "",
        roomPrice: "",
    });
    const{roomId}=useParams()

    useEffect(()=>{
        setTimeout(()=>{
            getRoomById(roomId).then((response)=>{
                setRoomInfo(response)
                setIsLoading(false);
            }).catch((error)=>{
                setError(error)
                setIsLoading(true)
            })
        },2000)
    },[roomId])

  return (
    <>
    <NavBar/>
     <section className='container'>
       <div className='row flex-column flex-md-row align-items-center'>
        <div className='col-md-4 mt-5 mb-5'>
            <h1>Welcome</h1>
            {isLoading ? (
                <p>Loading Room Information</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div className='room-info'> 
                  <img src={`data:image/png;base64,${roomInfo.photo}`} alt="Room photo"
                  style={{width : "100%",height:"200px"}}/>
                  <table>
                    <tbody>
                        <tr>
                            <th>Room Type :</th>
                            <th>{roomInfo.roomType}</th>
                        </tr>
                        <tr>
                            <th>Room Price :</th>
                            <th>{roomInfo.roomPrice}</th>
                            
                        </tr>
                        <tr>
                           <th>Room Service</th>
                            <td>
                                <ul>
                                    <li><FaWifi/> Wifi</li>
                                    <li><FaUtensils/> BreakFast</li>
                                    <li><FaTshirt/> Laundary</li>
                                    <li><FaCocktail/> Mini-Bar</li>
                                    <li><FaParking/> Parking Space</li>
                                    <li><FaSnowflake/> Air Conditioing</li>
                                </ul>
                            </td>
                        </tr>
                    
                    </tbody>
                  </table>
                </div>
            )}
        </div>

        <div className='col-md-6'> <BookingForm/></div>
       </div>
     </section>
     <div className='container'>
        <RoomCarousel/>
     </div>
   
    <Footer/>
    </>
  )
}

export default Checkout