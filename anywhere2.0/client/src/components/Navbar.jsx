import React, { useEffect } from "react";
import Logo from "../assets/Anywhere-Transparent.png";
import { MdContactMail, MdBuild, MdInfo } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Navbar = () => {
  const SessionStorageData = JSON.parse(sessionStorage.getItem("user"));

  console.log("Data From Navbar in SessionStorage", SessionStorageData);
  useEffect(() => {}, [SessionStorageData]);
  const nav = useNavigate();
  const location = useLocation();

  function handleLogout() {
    sessionStorage.removeItem("user");
    nav("/Login");
  }
  function handleLogin() {
    nav("/Login");
  }
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-white font-bold text-xl flex items-center mb-4 md:mb-0">
          <Link to="/home">
            <img className="w-12 mr-2" src={Logo} alt="" />
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <input
            onClick={() => {
              if (location.pathname !== "/searchpage") {
                nav("/searchpage");
              }
            }}
            className="rounded p-2 border transition-all duration-200"
            type="text"
            placeholder="Search..."
          />
          <Link
            to="/About"
            className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
          >
            <MdInfo className="inline-block mr-1" /> About
          </Link>
          <Link
            to="/Services"
            className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
          >
            <MdBuild className="inline-block mr-1" /> Services
          </Link>
          <Link
            to="/ContactUs"
            className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
          >
            <MdContactMail className="inline-block mr-1" /> Contact Us
          </Link>
          <Link
            to="/UserProfile"
            className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
          >
            <MdContactMail className="inline-block mr-1" /> Profile
          </Link>
          {SessionStorageData.user !== null ? (
            <button
              onClick={handleLogout}
              className="bg-red-800 text-red-100 rounded px-4 py-2 transition-all duration-200 hover:bg-red-500 hover:text-white"
            >
              <FaUser className="inline-block mr-1" /> Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-red-800 text-red-100 rounded px-4 py-2 transition-all duration-200 hover:bg-red-500 hover:text-white"
            >
              <FaUser className="inline-block mr-1" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
