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
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 p-4">
          {communities.map((data) => (
            <Link
              to={`/posts/community/${encodeURIComponent(data.communityName)}`}
              key={data._id}
            >
              <div className="max-w-sm  bg-gradient-to-r from-blue-700 to-cyan-400 border border-gray-200 rounded-lg backdrop-blur-lg  shadow relative ">
                <img
                  src={logo}
                  alt=""
                  className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
                />
                <div className=" inline ">
                  {data.isNSFW && (
                    <p className=" absolute inline rounded-sm text-white border border-white text-sm  pr-1 pl-1">
                      NSFW
                    </p>
                  )}
                </div>
                <div className="flex justify-center">
                  <img
                    className="rounded-t-lg"
                    src={data.logoUrl !== "" ? data.logoUrl : space}
                    alt={data.logoUrl}
                  />
                </div>

                <div className="p-5">
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {data.communityName}
                    </h5>
                  </div>
                  <p className="mb-3 font-normal text-white">
                    {data.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
