
import './App.css'
import Home from './components/home/Home'
import Addroom from './components/room/Addroom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter,RouterProvider,Route,Link } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import ExistingRoom from './components/room/ExistingRoom'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from './components/room/RoomListing'
import Admin from './components/admin/Admin'
import BookingForm from './components/booking/BookingForm'
import BookingSuccess from './components/booking/BookingSuccess'

function App() {

  
  const router= createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/edit-room/:roomId",
      element:<EditRoom/>
    },
    {
      path:"/existing-rooms",
      element:<ExistingRoom/>
    },
    {
      path:"/add-room",
      element:<Addroom/>
    },
    {
      path:"/all-rooms",
      element:<RoomListing/>
    },
    {
      path:"/admin",
      element:<Admin/>
    },{
      path:"/book-room/:roomId",
      element:<BookingForm/>
    },
    {
      path:"/booking-success",
      element:<BookingSuccess/>
    }
    
    ])
  

  return (
    <>
    
     <RouterProvider router={router}/>
     
    </>
  )
}

export default App
