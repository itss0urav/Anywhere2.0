import React from "react";
import logo from "../assets/Anywhere-Transparent.png";
import videoBg from "../assets/bg-video.mp4";
import { Link } from "react-router-dom";

function Introduction() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 to-black relative animate-fade-in-down">
      <div className="absolute top-0 right-0 p-6 space-x-4">
        <Link
          to="/Signup"
          className="text-white hover:text-purple-300 transition duration-300 py-1 px-2 rounded md:text-lg animate-pulse"
        >
          Signup
        </Link>
        <Link
          to="/Login"
          className="text-white hover:text-purple-300 transition duration-300 py-1 px-2 rounded md:text-lg animate-pulse"
        >
          Login
        </Link>
        <Link
          to="/Help"
          className="text-white hover:text-purple-300 transition duration-300 py-1 px-2 rounded md:text-lg animate-pulse"
        >
          Help
        </Link>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
        <div className="text-center w-full md:w-2/4 relative animate-bounce">
          <img
            src={logo}
            alt="Anywhere Logo"
            className="mx-auto h-24 w-24 md:h-48 md:w-48 mb-4 absolute z-10 inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="absolute inset-0 bg-gradient-to-center from-transparent via-black to-transparent opacity-50 z-20"></div>
          <video
            autoPlay
            muted
            loop
            src={videoBg}
            className="object-cover absolute z-0 "
          ></video>
        </div>

        <div className="text-center w-full md:w-1/2 animate-fade-in-left">
          <div className="">
            <h1 className="text-4xl md:text-6xl lg:text-8xl text-white mb-4 font-bold tracking-wide">
              ANYWHERE
            </h1>
            <p className="hidden md:flex text-white text-sm md:text-lg lg:text-xl font-light">
              Anywhere is a web application designed to foster a sense of
              community and encourage meaningful discussions among its users.
              With its user-friendly interface, Anywhere provides a platform for
              individuals to come together and engage in a range of
              conversations.
            </p>
          </div>
        </div>
      </div>
      <p className="z-50 p-2 md:hidden flex text-white text-sm md:text-lg lg:text-xl font-light animate-fade-in-right">
        Anywhere is a web application designed to foster a sense of community
        and encourage meaningful discussions among its users. With its
        user-friendly interface, Anywhere provides a platform for individuals to
        come together and engage in a range of conversations.
      </p>
      <div className="absolute bottom-0 right-0 p-6 text-white text-sm md:text-lg animate-bounce">
        Made with <span className="text-red-500">❤️</span> by @itss0urav
      </div>
    </div>
  );
}

export default Introduction;
