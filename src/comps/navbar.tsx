import { useContext, useState } from 'react'
import ThemeContext from '../contexts/themeContext'
import { MoonIcon, SunIcon, Bars2Icon } from '@heroicons/react/16/solid'
import UserContext from '../contexts/userContext'

const Navbar = () => {

  const themeContext = useContext(ThemeContext)

  const userContext = useContext(UserContext)

  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="flex justify-between bg-neutral-400 dark:bg-neutral-800 dark:text-white shadow-black ">
      <div className='text-xl p-2 mt-3 flex gap-5'>
        <div>Notemy</div>
        {
          userContext?.accessToken? ( <div>Profile</div>) : (<div>Khek</div>)
        }

      </div>

      <div className='p-2 mr-5 flex gap-5'>
        {
          darkMode ? (
            <MoonIcon className='p-2 mt-3 h-10 w-10 transition duration-500 hover:text-gray-500' onClick={() => { themeContext?.toggleTheme(); setDarkMode(!darkMode) }} />
          ) : (
            <SunIcon className=' p-2  mt-3 h-10 w-10 transition duration-500 hover:text-white' onClick={() => { themeContext?.toggleTheme(); setDarkMode(!darkMode) }} />
          )
        }

        <Bars2Icon className='h-10 w-10 mt-3 p-2' />
      </div>

    </div>
  )
}
export default Navbar;
