import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <div className="space-x-4">
          <input className="rounded p-2" type="text" placeholder="Search..." />
          <button className="bg-white text-blue-500 rounded px-4 py-2">
            About
          </button>
          <button className="bg-white text-blue-500 rounded px-4 py-2">
            Services
          </button>
          <button className="bg-white text-blue-500 rounded px-4 py-2">
            Contact Us
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
