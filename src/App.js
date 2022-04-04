import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { AiFillPhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import Footer from "./components/Footer";
import Login from "./components/Login";

export default function App() {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div>
      <div className="px-5 py-2 flex justify-between items-center bg-[#EBF2FA]">
        <div className="flex items-center space-x-4">
          <img className=" w-9" src={require("./img/MR.Logo2.png")} alt="Site-Logo" />
          <span className="hidden sm:flex items-center"> <AiFillPhone className="mr-1" /> 09907553840 </span>
          <span className="hidden md:flex items-center"> <HiOutlineMail className="mr-1" /> MB.Tiger82@gmail.com </span>
        </div>
        <div className=" space-x-4">
          <Link to="/login" className="hover:border-b-2 border-red-600 pb-1"> Login </Link>
          <Link to="/login" className="hover:border-b-2 border-red-600 pb-1"> Sign up </Link>
        </div>
      </div>
      <nav className="bg-nav-custom-color w-full">
        <ul className="bg-nav-custom-color flex justify-center items-center sticky top-0 p-3 space-x-6 text-white z-1000">
          <li className="px-2 py-2 rounded-full hover:bg-amber-600 hidden md:block transition-all duration-[250ms]">
            <Link to="/"> Home </Link>
          </li>
          <li className="px-2 py-2 rounded-full hover:bg-amber-600 hidden md:block transition-all duration-[250ms]">
            <Link to="/doctors"> Doctors </Link>
          </li>
          <li
            className="cursor-pointer md:hidden"
            onClick={() => (showMenu === false) ? setShowMenu(true) : setShowMenu(false)}
          >
            <FiMenu />
          </li>
          <label className="pl-24">
            <span className="mr-2 hidden md:inline">Find your doctor</span>
            <input
              type="search"
              className="p-3 py-4 h-7 w-full md:w-3/5 rounded-2xl"
              placeholder="Search"
            />
          </label>
        </ul>
        {showMenu === true ? (
          <ul className="pl-5 pb-1 space-y-1 text-white sticky top-12 bg-nav-custom-color md:hidden z-1000">
            <li>
              <Link to="/"> Home </Link>
            </li>
            <li>
              <Link to="/doctors"> Doctors </Link>
            </li>
          </ul>
        ) : null}
        <Outlet />
      </nav>
      <Footer />
    </div>
  );
}
