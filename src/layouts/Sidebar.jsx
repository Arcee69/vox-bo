import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from "../assets/svg/logo.svg"

import { RxDashboard } from "react-icons/rx";
import { FaMoneyBill, FaRegUser } from 'react-icons/fa';


const Sidebar = () => {

    const navigate = useNavigate()

    const location = useLocation()

  return (
    <div className='w-[270px] bg-[#242424] flex flex-col gap-[38px] pt-[11px]'>
        <img src={Logo} alt='logo' className='w-[54px] h-[61px] mx-[27px]'/>

        <div className='flex flex-col items-center gap-3'>
            <div onClick={() => {navigate("/users"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/users"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <FaRegUser  className={`${location.pathname === "/users" ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/users" ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Users</p>
            </div>
            <div onClick={() => {navigate("/transactions"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/transactions" || location?.pathname === "/transactions/details"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <FaMoneyBill  className={`${location.pathname === "/transactions" || location?.pathname === "/transactions/details"  ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/transactions" || location?.pathname === "/transactions/details"   ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Transactions</p>
            </div>
            <div onClick={() => {navigate("/consultation"), window.scrollTo(0, 0)}} className={`${location?.pathname === "/consultation"  ? "bg-[#fff]" : ""} w-[184px] h-[48px]  gap-2 flex items-center group cursor-pointer transition-all duration-300 p-[16px] hover:bg-[#fff]`}>
                <RxDashboard  className={`${location.pathname === "/consultation" ? "text-[#50724D]" : "text-[#fff]"} w-5 h-5  group-hover:text-[#50724D] `}/>
                <p className={`${location.pathname === "/consultation" ? "text-[#50724D]" : "text-[#fff]"}  group-hover:text-[#50724D] font-mont text-semibold `}>Consultation</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar