import React, { useState } from 'react'
import { deleteRoom, getAllRooms } from '../util/ApiFunctions';
import { useEffect } from 'react';
import { Col } from 'react-bootstrap';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import {FaEdit, FaEye, FaTrashAlt} from "react-icons/fa"
import { Link } from 'react-router-dom';

export default function () {
    const[rooms,setRooms]=useState([]);
    const[currentPage,setCurrentPage]=useState(1);
    const[roomsPerpage,setRoomsPerPage]=useState(8);
    const[isLoading,setIsLoading]=useState(false);
    const[filteredRooms,setFilterdRooms]=useState([]);
    const[selectedRoomType,setSelectedRoomType]=useState("");
    const[successMsg,setSuccessMsg]=useState("");
    const[errorMsg,setErrorMsg]=useState("");

    useEffect(()=>{
        fetchRooms()
    },[])

    const fetchRooms=async()=>{
       setIsLoading(true);
       try {
        const result= await getAllRooms();
        setRooms(result)
        setIsLoading(false)
        
       } catch (error) {
         setErrorMsg(error.message)
       }
    }

    useEffect(() => {
      if(selectedRoomType===""){
        setFilterdRooms(rooms)
      }else{
        const filtered =rooms.filter((room)=> room.roomType===selectedRoomType)
        setFilterdRooms(filtered)
      }
      setCurrentPage(1)
    }, [rooms,selectedRoomType])

    const handlePaginationClick=(pageNumber)=>{
        setCurrentPage(pageNumber)
    }

    const handleDelete=async(roomId)=>{
        try {
            const result=await deleteRoom(roomId)
            if(result===""){
                setSuccessMsg(`Room No. ${roomId} deleted`)
                fetchRooms();
            }else{
                console.error(`Error deleting room : ${result.message}`)
            }
        } catch (error) {
            setErrorMsg(error.message)
        }
        setTimeout(() => {
            setSuccessMsg("")
            setErrorMsg("")
        }, 3000);
    }

    const calculateTotalPages=(filteredRooms,roomsPerpage,rooms)=>{
        const totalRooms=filteredRooms.length>0? filteredRooms.length:rooms.length
        return Math.ceil(totalRooms/roomsPerpage)
    }

    const indexOfLastRoom=currentPage* roomsPerpage;
    const indexOfFirstRoom= indexOfLastRoom - roomsPerpage;
    const currentRooms=filteredRooms.slice(indexOfFirstRoom,indexOfLastRoom)
    

  return (
    <>
         {isLoading ? (
            <p>Loading.....</p>
         ) : (
            <>
            <section className='container mt-5 mb-5'>
                <div className='d-flex justify-content-center mt-5'>
                    <h2>Existing Rooms</h2>
                </div>
                <Col md={6} className='mb-3 mb-md-0'>
                   <RoomFilter data={rooms} setFilteredData={setFilterdRooms}/>
                </Col>
                <table className='table table-bordered table-hover'>
                    <thead>
                        <tr className='text-center'>
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room)=>(
                            <tr key={room.id} className='text-center'>
                                 <td>{room.id}</td>
                                 <td>{room.roomType}</td>
                                 <td>{room.roomPrice}</td>
                                 <td className='gap-2'>
                                    <Link to={`/edit-room/${room.id}`}>
                                       <span className='btn btn-info btn-sm'> <FaEye/> </span>
                                       <span className='btn btn-warning'></span>
                                       
                                        </Link>
                                    <button > <FaEdit/> </button>
                                    <button className='btn btn-danger btn-sm' onClick={()=>handleDelete(room.id)}> <FaTrashAlt/> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <RoomPaginator currentPage={currentPage} onPageChange={handlePaginationClick} 
                totalPages={calculateTotalPages(filteredRooms,roomsPerpage,rooms)}/>
            </section>
            </>
         )}
    </>
  )
}
