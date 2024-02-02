import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsMenuButtonWideFill } from "react-icons/bs";
import Logo from "../assets/Anywhere-Transparent.png";
import useSessionStorage from "../hooks/useSessionStorage";
import { FaUser } from "react-icons/fa";

const AdminNavbar = () => {
  const [menu, setMenu] = useState(false);
  const [admin] = useSessionStorage("admin");
  const nav = useNavigate();

  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [admin]);

  const handleMenu = () => setMenu(!menu);
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    nav("/Login");
  };

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
