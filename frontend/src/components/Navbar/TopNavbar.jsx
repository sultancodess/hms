import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";

const TopNavbar = () => {
    const Links = [
        {
            title: 'Help',
            url: '/'
        },
      
        {
            title: 'Support',
            url: '/services'
        },
        {
            title: 'Health Care',
            url: '/appointments'
        },
      
    ]
       
   


  return (
    <div className="bg-blue-200 sticky top-0 z-50 text-black px-10 py-2  flex justify-center md:justify-end z-100">
      <div className="nav-links-hospital flex gap-6 items-center">
        <div className="hidden md:flex gap-6">
          {" "}
          {Links.map((item, index) => (
            <div
              key={index}
              href={item.url}
              className="text-gray-600 text-sm hover:text-blue-500 transition-all duration-300 "
            >
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex gap-4">
         
          <button className="px-3 py-2 flex items-center gap-2 text-sm font-semibold   rounded-md bg-blue-500 text-white transition-all duration-300">
            <FaPhoneAlt />
            1066
          </button>
          <button className="px-2 py-1 flex items-center gap-2 text-sm font-semibold bg-transparent border-2 text-blue-600 border-blue-600  rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300">
            <FaPhoneAlt />
            1860-500-1066
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar