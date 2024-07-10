import axios from "axios"

export const api= axios.create({
    baseURL: "http://localhost:8080"
})

// this function add a new  room to database
export async function addRoom(photo,roomType,roomPrice){
 const formData=new FormData();
 formData.append("photo",photo)
 formData.append("roomType",roomType)
 formData.append("roomPrice",roomPrice)

 try {
    const response = await api.post("/rooms/add/new-room",formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
     });
     
 } catch (error) {
    console.log(error)
 }
}

//   this function get all room type from database
export async function getRoomType(){
    try {
        const response= await api.get("/rooms/room-types")
        console.log("Fetched Room Types:", response.data); // Add logging here
        return response.data;
    } catch (error) {
        console.error("Error fetching room types:", error); // Add logging here
        throw new Error("Error fetching room type")
    }
}

// this function get all rooms from database
export async function getAllRooms(){
    try {
        const result=await api.get("/rooms/all-rooms")
        return result.data;
    } catch (error) {
        throw new Error("Error fetching All Rooms")
    }
}
//this function for delete room by id
export async function deleteRoom(roomId){
    try {
        const result=await api.delete(`/rooms/delete/room/${roomId}`)
        return result.data;
    } catch (error) {
        throw new Error("Error in Deleting room")
    }
}
 
//Update room in database
export async function updateRoom(roomId,roomData){
    const formData=new FormData();
    formData.append("roomType",roomData.roomType);
    formData.append("roomPrice",roomData.roomPrice);
    formData.append("photo",roomData.photo);

    const response = await api.put(`/rooms/update/${roomId}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }
     });
    return response
}

//Get a room by Id
export async function getRoomById(roomId){
    try {
       const result= await api.get(`/rooms/room/${roomId}`);
       return result.data 
    } catch (error) {
        throw new Eroor("Error fetching room")
    }
}

// saves a new booking to the database
export async function bookRoom(roomId,booking){
    try {
        const response=await api.post(`/bookings/room/${roomId}/booking`,booking)
        return response.data
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data)
        }else{
            throw new Error(`Error Booking Room :  ${error.message}`)
        }
    }
}

// get all bookings from db
export async function getAllBooking(){
   try {
    const result= await api.get("/bookings/all-bookings")
    //console.log(result.data);
    return result.data;
   } catch (error) {
     throw new Error(`Error fetching bookins : ${error.message}`)
   }
}

// get a booking from db with help of confirmation code
export async function getBookingByConfirmationCode(confirmationCode){
    try {
        const result=await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (e) {
        if(e.response && e.response.data){
            throw new Error(e.response.data)
        }else{
            throw new Error(`Error finding bookings : ${e.message}`)
        }
    }
}

// this method delete or cancel booking from db
export async function cancelBooking(bookingId){
    try {
        const result=await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data;
    } catch (error) {
        throw new Error("Error in Cancel booking")
    }
}

// this function serach room which is available by giving dates
export async function getAvailableRoomsByCheckInDateAndChcekOutDate(checkInDate,checkOutDate,roomType){
    try {
     const result= await api.get(
        `/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
     //console.log(result.data);
     return result;
    } catch (error) {
      throw new Error(`Error fetching Available rooms : ${error.message}`)
    }
 }