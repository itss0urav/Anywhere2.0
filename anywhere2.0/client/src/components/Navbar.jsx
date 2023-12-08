import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="space-x-4">
          <input
            className="rounded p-2 border  transition-all duration-200"
            type="text"
            placeholder="Search..."
          />
          <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
            About
          </button>
          <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
            Services
          </button>
          <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
