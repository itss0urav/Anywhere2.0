import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../config/axios";
import { Link } from "react-router-dom";
import logo from "../assets/Anywhere-Transparent.png";
import space from "../assets/deepspace.jpg";
export default function Explore() {
  const [communities, setCommunities] = useState([]);
  console.log(communities);

  useEffect(() => {
    getCommunities();
  }, []);

  const getCommunities = async () => {
    try {
      const response = await axios.get("/community/get");
      setCommunities(response.data);
    } catch (error) {
      console.error(`Error fetching communities: ${error}`);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 text-4xl text-center font-roboto  bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent">
        Communities
      </div>
      <div className="grid grid-cols-3 gap-4 p-4">
        {communities.map((data) => (
          <Link
            to={`/posts/community/${encodeURIComponent(data.communityName)}`}
            key={data._id}
          >
            <div class="max-w-sm  bg-gradient-to-r from-blue-700 to-cyan-400 border border-gray-200 rounded-lg backdrop-blur-lg  shadow relative ">
              <img
                src={logo}
                alt=""
                className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
              />
              <a href="#">
                <img
                  class="rounded-t-lg"
                  //   src={data.logoUrl}
                  src={data.logoUrl !== "" ? data.logoUrl : space}
                  alt={data.logoUrl}
                />
              </a>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {data.communityName}
                  </h5>
                </a>
                <p class="mb-3 font-normal text-white">{data.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
