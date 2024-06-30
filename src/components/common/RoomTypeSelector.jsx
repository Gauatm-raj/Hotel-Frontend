import React, { useEffect, useState } from "react";
import { getRoomType } from "../util/ApiFunctions";

const RoomTypeSelector=({handlRoomInputChange,newRoom})=>{
    const[roomTypes,setRoomTypes]=useState([""]);
    const[showNewRoomTypeInput,setShowNewRoomTypeInput]=useState(false);
    const[newRoomType,setNewRoomType]=useState("");

    useEffect(() => {
        getRoomType().then((data)=>{
            setRoomTypes(data)
        })
    }, [])
    
    const handleNewRoomTypeInput=(e)=>{
        setNewRoomType(e.target.value);
    }

    const handleAddNewRoomType=()=>{
        if(newRoomType!==""){
            //console.log(newRoomType);
            setRoomTypes([...roomTypes,newRoomType]);
            //console.log(roomTypes)
            setNewRoomType("")
            setShowNewRoomTypeInput(false)
        }
    }

    return(
        <>
        {roomTypes.length>0 && (
            <div>
               
                <select id="roomType" name="roomType" value={newRoom.roomType} onChange={(e)=>{
                    if(e.target.value === "Add New"){
                        setShowNewRoomTypeInput(true)
                    }else{
                        handlRoomInputChange(e)
                    }
                }}>

                    <option value={""}>Select a room type</option>
                    <option value={"Add New"}>Add New</option>
                    {roomTypes.map((type,index)=>{
                       return <option key={index} value={type}> {type}</option>
                    })}
                </select>
                {showNewRoomTypeInput && (
                    <div className="input-group">
                        <input className="form-control" type="text" placeholder="Enter a new Room" onChange={handleNewRoomTypeInput} />
                        <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>Add</button>
                    </div>
                )}
            </div>
        )}
        </>
    )
        
    
}
 
export default RoomTypeSelector;