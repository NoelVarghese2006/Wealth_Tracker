import { TbSunMoon } from 'react-icons/tb'
import { FaRegUser } from "react-icons/fa";
import React from 'react'
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useTheme } from '@/components/ThemeProvider';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex flex-row items-center justify-between w-full p-4'>
        <div className='font-extrabold text-2xl uppercase dark:text-blue-300 text-blue-700'>
          <Link to={"/"}>Wealth Tracker</Link>
        </div>
        <div className='flex flex-row items-center justify-between gap-1 p-4'>
          <Link to={"/login"}>
            <Button><FaRegUser className='text-2xl' /></Button>
          </Link>
            <Button onClick={toggleTheme}><TbSunMoon className='text-2xl'/></Button>
        </div>
    </div>
  )
}

export default Navbar