import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { AuthProtectRoutes, ProtectRoutes } from './protectRoutes'
import Login from '../pages/auth/login'

import Users from '../pages/users'
import Consultations from '../pages/consultation'
import Transactions from '../pages/transactions'



const Routers = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 1200; // Adjust the threshold as needed
      setIsMobile(isMobileDevice);
    };

    // Initial check
    checkMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);


  return (
    <Routes>
      {isMobile ? (
          <Route exact path="/" element={<div className='flex flex-col items-center justify-center h-screen'><p className='text-[#000] text-3xl'>Best Experience in Desktop</p></div>} />
        ) : (
          <>
            <Route element={<ProtectRoutes />}>
                <Route path='/users' element={<Users />} />
                <Route path='/transactions' element={<Transactions />} />
                <Route path='/consultation' element={<Consultations />} />
            </Route>

            <Route element={<AuthProtectRoutes />}>
                <Route path='/' element={<Login />} />
            </Route>
          </>
        )
      }

    </Routes>
  )
}

export default Routers