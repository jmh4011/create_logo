import React from 'react'
import logo from '../../assets/images/logo.png'

const Navbar = () => {
  return (
    <nav className='mb-20 flex justify-between items-center py-6'>
        <div className='flex flex-shrink-0 items-center'>
            <img src={logo} alt="logo" />
        </div>
    </nav>
  )
}

export default Navbar