import React, { useEffect, useState } from "react";
import Logo from "../assets/Anywhere-Transparent.png";
import useSessionStorage from "../hooks/useSessionStorage";
import { Link, useNavigate, useLocation } from "react-router-dom";
// react-icons
import { FaUser } from "react-icons/fa";
import { BsMenuButtonWideFill } from "react-icons/bs";
import { MdContactMail, MdBuild, MdInfo } from "react-icons/md";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [user] = useSessionStorage("user");
  const [showImage, setShowImage] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const forColor = useLocation().pathname.split("/")[1];
  console.log(forColor);
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
    if (user) {
      const currentDate = new Date();
      const dob = new Date(user.dob);
      // Compare only the date parts of the Date objects
      if (
        currentDate.getDate() === dob.getDate() &&
        currentDate.getMonth() === dob.getMonth()
      ) {
        setShowImage(true);
      }
    }
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
        forColor === "modhome"
          ? "bg-gradient-to-r from-blue-900 to-blue-600 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20"
          : forColor !== "report"
            ? "bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20"
            : "bg-gradient-to-r from-slate-800 to-gray-900 p-4 backdrop-blur-lg bg-opacity-40 border border-gray-900 border-opacity-20"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link
          to="/home"
          className="text-white font-bold text-xl flex items-center mb-4 md:mb-0"
        >
          <img className="w-24 md:w-12 mr-2" src={Logo} alt="" />
        </Link>
        <div className="flex items-center space-x-4">
          {menu && (
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                onClick={() => {
                  if (location.pathname !== "/searchpage") {
                    nav("/searchpage");
                  }
                }}
                className="rounded p-2 border transition-all duration-200 w-full sm:w-auto"
                type="text"
                placeholder="Search..."
              />
              <Link to="/About" className="blue-gradient-btn sm:w-auto ">
                <MdInfo className="inline-block mr-1" /> About
              </Link>
              <Link to="/Services" className="blue-gradient-btn sm:w-auto ">
                <MdBuild className="inline-block mr-1" /> Services
              </Link>
              <Link to="/ContactUs" className="blue-gradient-btn sm:w-auto">
                <MdContactMail className="inline-block mr-1" /> Contact Us
              </Link>
              <Link
                to="/UserProfile"
                className="md:flex justify-center items-center blue-gradient-btn sm:w-auto"
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
                  className="red-gradient-btn sm:w-auto"
                >
                  <FaUser className="inline-block mr-1" /> Logout
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="green-gradient-btn sm:w-auto"
                >
                  <FaUser className="inline-block mr-1" /> Login
                </button>
              )}
            </div>
          )}
          <div>
            {showImage && user && (
              <img
                className="w-24 animate-pulse"
                src="https://static.vecteezy.com/system/resources/previews/001/201/729/large_2x/birthday-text-png.png"
                alt="bday wish"
              />
            )}
          </div>
          <BsMenuButtonWideFill
            className="text-2xl text-white cursor-pointer"
            onClick={handleMenu}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
