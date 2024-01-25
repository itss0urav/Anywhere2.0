import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  //  useLocation
} from "react-router-dom";
// import { MdContactMail, MdBuild, MdInfo } from "react-icons/md";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import useSessionStorage from "../hooks/useSessionStorage";
import Logo from "../assets/Anywhere-Transparent.png";

const AdminNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [admin] = useSessionStorage("admin");
  const nav = useNavigate();
  // const location = useLocation();

  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [admin]);

  const handleMenu = () => setMenu(!menu);
  const handleLogout = () => {
    sessionStorage.removeItem("admin");
    sessionStorage.removeItem("admintoken");
    nav("/Login");
  };
  // const handleLogin = () => nav("/adminLogin");

  return (
    <nav className="bg-gradient-to-r from-red-500 to-rose-900 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/adminhome"
          className="text-white font-bold text-xl flex items-center mb-4 md:mb-0"
        >
          <img className="w-12 mr-2" src={Logo} alt="" />
        </Link>
        <div className="text-white text-xl">/AdminConsole...</div>
        <div className="flex items-center space-x-4">
          {menu && (
            <div className="flex flex-col md:flex-row gap-3">
              {/* <input
                onClick={() => {
                  if (location.pathname !== "/searchpage") {
                    nav("/searchpage");
                  }
                }}
                className="rounded p-2 border transition-all duration-200"
                type="text"
                placeholder="Search..."
              /> */}
              {/* <Link
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
              </Link> */}
              <button
                onClick={() => {
                  nav("/");
                }}
                className="red-btn"
              >
                <FaUser className="inline-block mr-1" /> UserLogin
              </button>
              <button onClick={handleLogout} className="red-btn">
                <FaUser className="inline-block mr-1" /> Logout
              </button>
            </div>
          )}
          <BsMenuButtonWideFill
            className="text-2xl text-white cursor-pointer"
            onClick={handleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
