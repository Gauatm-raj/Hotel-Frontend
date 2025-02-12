import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {

    const [showAccount,setAccount]=useState(false)

    const handleAccountClick=()=>{
        setAccount(!showAccount)
    }

  return (
    <>
     <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>
            <Link to={"/"}>
             <span className='hotel-color'> Gautam Hotel</span>
            </Link>

            <button className='navbar-toggler' type='button'  aria-controls='navbarScroll' aria-expanded="false"
            data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-label='Toggle navigation'>
               <span className='navbar-toggler-icon'></span>
            </button>

            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' aria-current="page" to={"/all-rooms"}>All Rooms</NavLink>
                        
                    </li>

                    <li className='nav-item'>
                        <NavLink className='nav-link' aria-current="page" to={"/admin"}>Admin</NavLink>
                    </li>
                </ul>

                <ul className='d-flex navbar-nav'>
                      <li className='nav-item'>
                        <NavLink className='nav-link' to={"/find-booking"}>
                           Find My Booking
                        </NavLink>
                      </li>
                      <li className='nav-item dropdown'>
                        <a href="#" className={`nav-link dropdown-toggle ${showAccount ? "show":""}`}
                        role='button' data-bs-toggle="dropdown" aria-expanded="false" onClick={handleAccountClick}>{" "}Account</a>
                        
                        <ul className={`dropdown-menu ${showAccount ? "show":""}`}
                            aria-labelledby="navbarDropdown">
                            <li>
                                <Link to={"/login"} className='dropdown-item'>Login</Link>
                            </li>
                            <li>
                                <Link to={"/profile"} className='dropdown-item'>Profile</Link>
                            </li>
                            <li>
                                <Link to={"/logout"} className='dropdown-item'>Logout</Link>
                            </li>
                        </ul>
                      </li>

                </ul>

            </div>

        </div>
     </nav>
    </>
  )
}
