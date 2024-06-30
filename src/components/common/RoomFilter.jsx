import React, { useState } from 'react'

export default function RoomFilter({data,setFilteredData}) {
    const [filter,setFilter]=useState("");

    const handleSelectChange=(e)=>{
        const slectedRoomType=e.target.value;
        setFilter(slectedRoomType);
        const filteredRooms= data.filter((room)=>room.roomType.toLowerCase()
        .includes(slectedRoomType.toLowerCase()));

        setFilteredData(filteredRooms);
    }

    const clearFilter=()=>{
        setFilter("");
        setFilteredData(data);
    }

    const roomTypes=["",...new Set(data.map((room)=> room.roomType))]

  return (
    <>
    <div className='input-group mb-3'>
        <span className='input-group-text' id='room-type-filter'>Filter rooms by type</span>
        <select className='form-select' value={filter} onChange={handleSelectChange}>
            <option value={""}>
                  Select a room type to filter ...
            </option>
            {roomTypes.map((type,index)=>{
                return (
                <option key={index} value={type}>{type}</option>  // need to change {String{type}} type as string
                
            )})}
        </select>
        <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
    </div>
    </>
  )
}
