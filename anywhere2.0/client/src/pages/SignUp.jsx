import React, { useState } from "react";
import axios from "../config/axios";
import Logo from "../assets/Anywhere-Transparent.png";
import { Link, useNavigate } from "react-router-dom";
import vid from "../assets/v3.mp4";
import { toast, Toaster } from "react-hot-toast"; // import react-hot-toast

const SignUp = () => {
  // Initialize state variables for form inputs and alert message
  const [username, setUsername] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const nav = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      username,
      dob,
      email,
      password,
    };

    console.log("Data From Signup", user);
    // Make POST request
    if (password.length < 8) {
      setAlertMessage("Password looks too short.");
      toast.error("Password looks too short", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else if (password === confirmPassword) {
      try {
        const response = await axios.post("/users/signup", user);

        setAlertMessage(response.data.message);
        nav("/login");
      } catch (error) {
        console.error(error);
        // Set alert message on error
        setAlertMessage(
          error.response?.data?.message ||
            "An error occurred while signing up. Please try again."
        );
      }
    } else {
      // Set alert message for password mismatch
      setAlertMessage("Passwords do not match. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div>
        <Toaster />
      </div>
      {/* Left: Image */}
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
      {/* Right: Signup Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-3/4">
        <h1 className="text-2xl font-semibold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          {/* DOB Input */}
          <div className="mb-4">
            <label htmlFor="dob" className="block text-gray-600">
              Date of Birth
            </label>
            <input
              required
              type="date"
              id="dob"
              name="dob"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              required
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Confirm Password Input */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-600">
              Confirm Password
            </label>
            <input
              required
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* Signup Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Sign Up
          </button>
        </form>
        {/* Display the alert message */}
        {alertMessage && (
          <div className="mt-4 p-2 bg-red-500 text-white text-center">
            {alertMessage}
          </div>
        )}
        {/* Login Link */}
        <div className="flex mt-6 text-gray-500 text-center">
          Already have an account?
          <div className="pl-2 text-blue-500 text-center">
            <Link to="/Login" className="hover:underline">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
