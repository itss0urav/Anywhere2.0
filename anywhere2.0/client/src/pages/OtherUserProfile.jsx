import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import { SiAdguard } from "react-icons/si";
import { MdVerified } from "react-icons/md";
import { useParams } from "react-router-dom";

export default function OtherUserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState([]);

  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
    fetchUser();

    const refreshInterval = setInterval(fetchUser, 2000);
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
    // eslint-disable-next-line
  }, []);
  const fetchUser = async () => {
    try {
      const response = await axios.get(`/users/other/${username}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="bg-white shadow-md rounded-lg p-8 mt-4">
          <div className="mb-4">
            <h3 className="text-2xl text-center font-semibold text-gray-700">
              User Profile
            </h3>
          </div>
          <div className="  lg:flex border-t border-gray-200 p-4 justify-center items-center">
            <div className="flex flex-col gap-2 justify-center mr-6">
              <img
                alt="profile pic"
                src={user.imageUrl}
                className=" mb-3 rounded-lg w-[10rem] object-contain mr-8"
              />
            </div>

            <dl className="bg-gray-100 border p-4">
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className=" flex gap-2 mt-1 text-sm text-gray-900 col-span-2">
                  {user.username ? (
                    user.username
                  ) : (
                    <div className="md:w-[11rem] w-[7rem] red-gradient-btn">
                      User Info Missing
                    </div>
                  )}
                  {user.isVerified === true ? (
                    <MdVerified className="text-xl" />
                  ) : (
                    <></>
                  )}
                  {user.isMod === true ? (
                    <SiAdguard className="text-lg" />
                  ) : (
                    <></>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">
                  Date Of Birth {"[MM/DD/YYYY]"}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {new Date(user.dob).toLocaleDateString()}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {user.email ? (
                    user.email
                  ) : (
                    <div className="md:w-[11rem] w-[7rem] red-gradient-btn">
                      User Info Missing
                    </div>
                  )}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">
                  Account Created At {"[MM/DD/YYYY]"}
                </dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">
                  User Status
                </dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {user.isBanned ? (
                    <div className="inline red-gradient-btn">Banned</div>
                  ) : (
                    <div className="inline green-gradient-btn">Active</div>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
