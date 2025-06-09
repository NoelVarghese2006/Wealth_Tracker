import { TbSunMoon } from 'react-icons/tb'
import { FaRegUser } from "react-icons/fa";
import React from 'react'

const Navbar = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full p-4'>
        <div>Wealth Tracker</div>
        <div className='flex flex-row items-center justify-between gap-4 p-4'>
            <FaRegUser className='text-2xl' />
            <TbSunMoon className='text-2xl'/>
        </div>
    </div>
  )
}

export default Navbar