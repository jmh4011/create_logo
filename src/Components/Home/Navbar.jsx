import React from 'react'
import logo from '../../assets/images/logo.png'
import { FaLinkedin, FaGithub, FaTwitterSquare, FaInstagram } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='mb-20 flex justify-between items-center py-6'>
        <div className='flex flex-shrink-0 items-center'>
            <img src={logo} alt="logo" className='w-32 sm:w-48 md:w-64 h-auto' />
        </div>
        <div className='m-8 flex items-center gap-4 justify-center'>
          <FaLinkedin className='text-lg sm:text-xl md:text-2xl cursor-pointer' />
          <FaGithub className='text-lg sm:text-xl md:text-2xl cursor-pointer' />
          <FaTwitterSquare className='text-lg sm:text-xl md:text-2xl cursor-pointer' />
          <FaInstagram className='text-lg sm:text-xl md:text-2xl cursor-pointer' />
        </div>
    </nav>
  )
}

export default Navbar