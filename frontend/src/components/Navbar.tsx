import { TbSunMoon } from 'react-icons/tb'
import { FaRegUser } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { useUserStore } from '@/store/user';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  const { loggedIn } = useUserStore();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className='flex flex-row items-center justify-between w-full p-4 h-[10dvh]'>
        <div className='font-extrabold text-2xl uppercase dark:text-blue-300 text-blue-700'>
          <Link to={"/"}>Wealth Tracker</Link>
        </div>
        <div className='flex flex-row items-center justify-between gap-1 p-4'>
          <Link to={loggedIn ? "/main" : "/login"}>
            <Button><FaDollarSign className='text-2xl' /></Button>
          </Link>
          <Link to={"/login"}>
            <Button><FaRegUser className='text-2xl' /></Button>
          </Link>
            <Button onClick={toggleTheme}><TbSunMoon className='text-2xl'/></Button>
        </div>
    </div>
  )
}

export default Navbar