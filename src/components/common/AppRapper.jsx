import React from 'react'
import NavBar from '../layout/NavBar'
import { Outlet } from 'react-router-dom'

const AppRapper = () => {
  return (
    <div> <NavBar/> <Outlet/> </div>
  )
}

export default AppRapper