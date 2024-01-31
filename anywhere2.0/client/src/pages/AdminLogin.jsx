import React, { useState } from "react";
import vid from "../assets/v3.mp4";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; 
import Logo from "../assets/Anywhere-Transparent.png";
import useSessionStorage from "../hooks/useSessionStorage";
const AdminLogin = () => {
  // eslint-disable-next-line
  const [user, setUser] = useSessionStorage("user");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const adminCredentials = {
      username,
      password,
    };

    try {
      const req = await axios.post("/admin/login", adminCredentials);
      console.log("from login", req.data.token);

      setUser(req.data.admin);
      sessionStorage.setItem("token", req.data.token);

      nav("/adminhome");
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Invalid credentials. Please try again.", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setAlertMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="bg-white flex justify-center items-center h-screen">
      <div>
        <Toaster />
      </div>
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
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
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

          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>

        {alertMessage && (
          <div className="mt-4 p-2 bg-red-500 text-white text-center">
            {alertMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
