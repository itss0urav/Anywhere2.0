import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
// import useSessionStorage from "../hooks/useSessionStorage";
import axios from "../config/axios";
// import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { useParams } from "react-router-dom";

export default function OtherUserProfile() {
  // const currentUserFromSession = sessionStorage.getItem("user");
  const { username } = useParams();
  // const nav = useNavigate();
  const [user, setUser] = useState([]);
  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   let month = "" + (date.getMonth() + 1);
  //   let day = "" + date.getDate();
  //   if (month.length < 2) month = "0" + month;
  //   if (day.length < 2) day = "0" + day;
  //   return [year, month, day].join("-");
  // };

  // const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
    fetchUser();

    // Set up interval for automatic refresh (every 5 minutes in this example)
    const refreshInterval = setInterval(
      fetchUser,
      // 5 *
      // 60 *
      2000
    );

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
  // function handleFollow() {}

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
              {/* <button
                className="w-[10rem] bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100  transition-all duration-200 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => handleFollow(user._id)}
              >
                Follow
              </button> */}
            </div>

            <dl className="bg-gray-100 border p-4">
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className=" flex gap-2 mt-1 text-sm text-gray-900 col-span-2">
                  {user.username}
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
                  {user.email}
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
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
