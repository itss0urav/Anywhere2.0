import React from "react";
import Navbar from "./Navbar";
import logo from "../assets/Anywhere-Transparent.png";

export default function CreateCommunityForm() {
  return (
    <div>
      <Navbar />

      <div className="">
        <form class="max-w-sm mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md mt-[10%] backdrop-blur-lg bg-opacity-80 relative">
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
              id="CommunityName"
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Science"
              required
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
              id="logourl"
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div class="flex items-start mb-5">
            <div class="flex items-center h-5">
              <input
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
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
