import React from "react";
import Logo from "../assets/Anywhere-Transparent.png";
import { MdContactMail, MdBuild, MdInfo } from "react-icons/md";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-bold text-xl flex items-center mb-4 md:mb-0">
          <img className="w-12 mr-2" src={Logo} alt="" />
        </div>
        <div className="flex items-center space-x-4">
          <input
            className="rounded p-2 border transition-all duration-200"
            type="text"
            placeholder="Search..."
          />
          <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
            <MdInfo className="inline-block mr-1"/> About
          </button>
          <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
            <MdBuild className="inline-block mr-1"/> Services
          </button>
          <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
            <MdContactMail className="inline-block mr-1"/> Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
