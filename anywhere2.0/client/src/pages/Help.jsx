import React, { useState } from "react";
import axios from "../config/axios";
import { toast, Toaster } from "react-hot-toast"; // import react-hot-toast
import Navbar from "../components/Navbar";

const Help = () => {
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
      <Navbar />
      <div className="flex flex-col items-center justify-center  bg-gray-100">
        <div>
          <Toaster />
        </div>
        <div className="w-full min-h-screen max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
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
                className="block text-gray-700 text-sm font-bold mb-2"
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
                className="block text-gray-700 text-sm font-bold mb-2"
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
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
