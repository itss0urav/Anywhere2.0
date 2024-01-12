import React, { useState } from "react";
import Logo from "../assets/Anywhere-Transparent.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import vid from "../assets/v3.mp4";
import useSessionStorage from "../hooks/useSessionStorage";
const Login = () => {
  const [user, setUser] = useSessionStorage('user');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      username,
      password,
    };

    try {
      const req = await axios.post("/users/login", userCredentials);
      console.log("from login", req.data);

      setUser( req.data.user)
        

      nav("/home");
    } catch (error) {
      console.error("Error during login:", error);
      setAlertMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-2/4 h-screen hidden lg:block relative">
        <video
          muted
          autoPlay
          loop
          src={vid}
          className="absolute w-full h-full object-cover"
        ></video>
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="relative w-3/4" />
        </div>
      </div>

      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
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
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

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

          <div className="mb-6 text-blue-500">
            <Link to="/" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>

        {alertMessage && (
          <div className="mt-4 p-2 bg-red-500 text-white text-center">
            {alertMessage}
          </div>
        )}

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
