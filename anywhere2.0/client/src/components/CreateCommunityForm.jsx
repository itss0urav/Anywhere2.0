import React, { useState } from "react";
import axios from "../config/axios";
import Navbar from "./Navbar";
import logo from "../assets/Anywhere-Transparent.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateCommunityForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    communityName: "",
    logoUrl: "",
    isNSFW: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/community/create", formData);
      console.log(response.data);
      toast.success("Community created successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Error creating Community. Please try again.",
        {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div className="">
        <form
          onSubmit={handleSubmit}
          class="max-w-sm mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md mt-[10%] backdrop-blur-lg bg-opacity-80 relative"
        >
          <img
            src={logo}
            alt=""
            className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
          />
          <div class="mb-5">
            <label
              for="Community Name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Community Name
            </label>
            <input
              type="text"
              id="communityName"
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Science"
              required
              value={formData.communityName}
              onChange={handleChange}
            />
          </div>
          <div class="mb-5">
            <label
              for="logourl"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Community Logo Url
            </label>
            <input
              placeholder="Enter image url"
              type="text"
              id="logoUrl"
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
              value={formData.logoUrl}
              onChange={handleChange}
            />
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                type="checkbox"
                id="isNSFW"
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                checked={formData.isNSFW}
                onChange={handleChange}
              />
            </div>
            <label
              for="remember"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              NSFW
            </label>
          </div>
          <button
            type="submit"
            class="blue-gradient-btn border border-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
