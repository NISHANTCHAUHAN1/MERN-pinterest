import React, { useState } from "react";
import { Link } from "react-router-dom";
// import { BiSearch } from "react-icons/bi";

const Navbar = ({ user }) => {
 
  return (
    <div>
      <div className='bg-white shadow-sm'>
        <div className='mx-auto px-4 py-2 flex justify-between items-center'>
            <Link to={"/"} className='flex items-center mr-5'>
             <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
               alt="Pinterest"
               className='h-10 md:mr-2'
            />
            <span className='text-red-600 text-xl font-bold'>Pinterest</span>
            </Link>

            <div className='flex items-center space-x-4 w-[200px]'>
                <Link to="/" className='text-gray-700 hover:text-gray-500'>Home</Link>
                <Link to="/create" className='text-gray-700 hover:text-gray-500'>Create</Link>
                <Link to="/account" className='w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-700'>
                  {user.name.slice(0, 1)}
                </Link>

            </div>
        </div>
      </div>
    </div>

    // <div>
    //   <div className="bg-white shadow-sm">
    //     <div className="mx-auto px-4 py-2 flex justify-between items-center">
    //       {/* Logo and Brand */}
    //       <Link to="/" className="flex items-center mr-5">
    //         <img
    //           src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
    //           alt="Pinterest"
    //           className="h-10 md:mr-2"
    //         />
    //         <span className="text-red-600 text-xl font-bold">Pinterest</span>
    //       </Link>

    //       {/* Search Bar */}
    //       <div className="hidden sm:flex items-center bg-gray-100 rounded-full px-3 py-1 w-full max-w-xs md:max-w-sm lg:max-w-md">
    //         {/* <BiSearch className="text-gray-500 text-lg mr-2" /> */}
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
    //         />
    //         <BiSearch className="text-gray-500 text-lg mr-2 hover:cursor-pointer" />

    //       </div>

    //       {/* Links and Profile */}
    //       <div className="flex items-center space-x-4">
    //         <Link to="/" className="text-gray-700 hover:text-gray-500">
    //           Home
    //         </Link>
    //         <Link to="/create" className="text-gray-700 hover:text-gray-500">
    //           Create
    //         </Link>
    //         <Link
    //           to="/account"
    //           className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xl text-gray-700"
    //         >
    //           {user.name.slice(0, 1)}
    //         </Link>
    //       </div>
    //     </div>

    //     {/* Mobile Search Bar */}
    //     <div className="sm:hidden px-4 py-2">
    //       <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
    //         <BiSearch className="text-gray-500 text-lg mr-2" />
    //         <input
    //           type="text"
    //           placeholder="Search"
    //           className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;


