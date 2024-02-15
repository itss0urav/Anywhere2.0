import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import TawkTo from "../config/TawkTo";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Logo from "../assets/Anywhere-Transparent.png";
TawkTo();

const Help = () => {
  useEffect(() => {
    toast.success("Use the chat bot to talk to admins live!", { id: 103 });
  }, []);
  const [form, setForm] = useState({
    username: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    console.log(form);
    e.preventDefault();
    try {
      const response = await axios.post("/users/support", form);
      console.log(response.data);
      toast.success("Request Created!", {
        id: 100, // Use the custom ID
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error creating Request. Please try again.",
        {
          id: 101,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
      console.error(error);
    }
  };

  return (
    <div className="">
      <div className="flex justify-between items-center text-white text-center bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 ">
        <Link
          to="/"
          className="text-white font-bold text-xl flex items-center mb-4 md:mb-0"
        >
          <img className="w-24 md:w-12 mr-2" src={Logo} alt="" />
        </Link>
        <div className="">Give feedback or raise an issue here</div>
      </div>
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        <div className="mt-8 w-full min-h-screen max-w-md">
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md mt-[10%] backdrop-blur-lg bg-opacity-80 relative"
          >
            <img
              src={Logo}
              alt=""
              className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="name"
              >
                Username
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Your name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Your email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="message"
              >
                Message
              </label>
              <textarea
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="message"
                placeholder="Your message"
                rows="5"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button className="blue-gradient-btn" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Help;
