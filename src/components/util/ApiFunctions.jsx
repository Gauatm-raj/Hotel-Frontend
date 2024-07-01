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
        return response.data;
    } catch (error) {
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
