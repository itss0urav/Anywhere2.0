import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../config/axios";
import logo from "../assets/Anywhere-Transparent.png";
import space from "../assets/deepspace.jpg";

export default function Explore() {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

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

  const openModal = (community) => {
    setSelectedCommunity(community);
  };

  const closeModal = () => {
    setSelectedCommunity(null);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 text-4xl text-center font-roboto  bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent">
        {communities.length === 0 ? "No communities found" : " Communities"}
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4 p-4">
          {communities.map((data) => (
            <div key={data._id}>
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
                  <div className="lg:flex justify-between ">
                    <button 
                      onClick={() => openModal(data)}
                      className="inline blue-gradient-btn border border-blue-800 "
                    >
                      Info
                    </button>
                    <Link
                      to={`/posts/community/${encodeURIComponent(
                        data.communityName
                      )}`}
                    >
                      <button className="green-gradient-btn border border-green-800 ">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedCommunity && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[80%] p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCommunity.communityName}
            </h2>
            <p className="mb-4">{selectedCommunity.description}</p>
            <button
              onClick={closeModal}
              className="red-gradient-btn border border-red-800 "
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
