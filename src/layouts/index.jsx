import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from './Sidebar'
import Header from './Header'

const Layouts = () => {
  return (
    <div className='overflow-x-hidden flex  w-full'>
        <div className='w-[15%] fixed h-screen flex'>
            <Sidebar/>
        </div>
        <div className='flex flex-col bg-[#F5F5F5] gap-4 ml-[15%] w-[85%]    '>
            <div className='hidden lg:flex '>
                <Header />
            </div>
            <div className=''>
                <Outlet />
            </div>
        </div>

    </div>
  )
}

export default Layouts