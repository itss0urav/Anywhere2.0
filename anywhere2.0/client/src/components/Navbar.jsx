import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { MdContactMail, MdBuild, MdInfo } from "react-icons/md";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import useSessionStorage from "../hooks/useSessionStorage";
import Logo from "../assets/Anywhere-Transparent.png";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [user] = useSessionStorage("user");
  const nav = useNavigate();
  const location = useLocation();
  const forColor = useLocation().pathname.split("/")[1];
  console.log(forColor);
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);

  const handleMenu = () => setMenu(!menu);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    nav("/Login");
  };
  const handleLogin = () => nav("/Login");

  return (
    <nav
      className={`${
        forColor !== "report"
          ? "bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20"
          : "bg-gradient-to-r from-slate-800 to-gray-900 p-4 backdrop-blur-lg bg-opacity-40 border border-gray-900 border-opacity-20"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/home"
          className="text-white font-bold text-xl flex items-center mb-4 md:mb-0"
        >
          <img className="w-12 mr-2" src={Logo} alt="" />
        </Link>
        <div className="flex items-center space-x-4">
          {menu && (
            <div className="sm:flex sm:flex-col gap-3">
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
                className="bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
              >
                <MdInfo className="inline-block mr-1" /> About
              </Link>
              <Link
                to="/Services"
                className="bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
              >
                <MdBuild className="inline-block mr-1" /> Services
              </Link>
              <Link
                to="/ContactUs"
                className="bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
              >
                <MdContactMail className="inline-block mr-1" /> Contact Us
              </Link>
              <Link
                to="/UserProfile"
                className=" lg:flex bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white"
              >
                <img
                  alt="profile pic"
                  src={user.imageUrl}
                  onClick={() => nav("/UserProfile")}
                  className="w-6 rounded-full mr-4 text-white "
                />
                Profile
              </Link>
              {user.username ? (
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-rose-900 text-red-100 rounded px-4 py-2 transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  <FaUser className="inline-block mr-1" /> Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-green-500 to-green-900 text-red-100 rounded px-4 py-2 transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  <FaUser className="inline-block mr-1" /> Login
                </button>
              )}
            </div>
          )}
          <BsMenuButtonWideFill
            className="text-2xl text-white"
            onClick={handleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
