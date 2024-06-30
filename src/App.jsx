
import './App.css'
import Home from './components/home/Home'
import Addroom from './components/room/Addroom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createBrowserRouter,RouterProvider,Route,Link } from 'react-router-dom'
import EditRoom from './components/room/EditRoom'
import ExistingRoom from './components/room/ExistingRoom'

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
    }
    
    ])
  

  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
