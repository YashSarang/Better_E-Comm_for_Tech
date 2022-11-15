import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div className='border-b-4 border-green-700 text-center fixed top-0 bg-green-300 font-extrabold text-lg text-white'>
          <ul>
              <li className='inline-block py-4'>
                <Link to="/" className="px-6"> Home </Link>                  
              </li>
              <li className='inline-block py-4'>
                <Link to="/market" className="px-6"> Market </Link>                  
              </li>
              <li className='inline-block py-4'>
                <Link to="/about" className="px-6"> About Us </Link>                  
              </li>
              <li className='inline-block py-4'>
                <Link to="/cart" className="px-6"> Cart </Link>                  
              </li>
          </ul>
      </div>
  )
}

export default Navbar