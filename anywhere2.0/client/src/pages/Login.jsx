import React from "react";
import Logo from "../assets/Anywhere-Transparent.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* Left: Image */}
      <div className="w-2/4 h-screen hidden lg:block">
        <img
          src={Logo}
          alt="Logo"
          className="object-contain bg-black w-full h-full"
        />
      </div>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <div>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          {/* Remember Me Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-blue-500"
            />
            <label htmlFor="remember" className="text-gray-600 ml-2">
              Remember Me
            </label>
          </div>
          {/* Forgot Password Link */}
          <div className="mb-6 text-blue-500">
            <Link to="/" className="hover:underline">
              Forgot Password?
            </Link>
          </div>
          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </div>
        {/* Sign up Link */}
        <div className="flex mt-6 text-gray-500 text-center">
          New Here?
          <div className="pl-2 text-blue-500 text-center">
            <Link to="/SignUp" className="hover:underline">
              Sign up 
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
