import React, { useState } from "react";
import { addRoom } from "../util/ApiFunctions";
import RoomTypeSelector from "../common/RoomTypeSelector";
import ExistingRoom from "./ExistingRoom";
import { Link } from 'react-router-dom';

const Addroom=()=>{
    //console.log("Enter")
    const[newRoom,setRoom]=useState({
        photo:null,
        roomType:"",
        roomPrice:""
    })

    const[imagePre, setImage]=useState("");
    const[successMsg,setmsg]=useState("");
    const[errorMsg,setError]=useState("");

    const handleRoomInputChange=(e)=>{
         const name=e.target.name;
         let value=e.target.value;
         if(name==="roomPrice"){
            if(!isNaN(value)){
                value=parseInt(value);
            }else{
                value="";
            }
         }

         setRoom({...newRoom,[name]:value})
    }

    const handleImageChange=(e)=>{
        //console.log(e.target.files[0])
        const selectedImg=e.target.files[0];
        setRoom({...newRoom,photo: selectedImg})
        setImage(URL.createObjectURL(selectedImg))
    }

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
          const success= await addRoom(newRoom.photo,newRoom.roomType,newRoom.roomPrice);
           if(success !== undefined){
            setmsg("A new room added")
            setRoom({photo:null,roomType:"",roomPrice:""});
            setImage("");
            setError("");
           }else{
            setError("Error adding room")
           }
        } catch (error) {
           setError(error.message)  
        }
    }

return(
   <>
     <section className="container mt-5 mb-5">
        <div className="room justify-content-center">
            <div className="col-md-8 col-lf-6">
                <h2 className="mt-5 mb-2">Add New Room</h2>

                <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        
                        <label className="form-label" htmlFor="roomType">Room Type</label>
                        <div>
                           <RoomTypeSelector handlRoomInputChange={handleRoomInputChange} newRoom={newRoom}/>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="roomPrice">Room Price</label>
                        <input onChange={handleRoomInputChange} className="form-control" value={newRoom.roomPrice} required id="roomPrice" name="roomPrice" type="number" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="photo">Room Photo</label>
                        <input onChange={handleImageChange} className="form-control"  required id="photo" name="photo" type="file" />
                        {imagePre && (
                            <img src={imagePre} className="mb-3" alt="Room Photo" style={{maxWidth:"400px", maxHeigth:"400px"}}/>
                        )}
                    </div>
                   
                    <button className="btn btn-outline-primary ml-5">Save Room</button>
            
                    <div className="d-grid d-md-flex mt-2">
                    <Link to={"/existing-rooms"} className="btn btn-outline-info" >All Rooms</Link>
                    </div>

                </form>
            </div>
        </div>
     </section>
    
   </>
)
}

export default Addroom