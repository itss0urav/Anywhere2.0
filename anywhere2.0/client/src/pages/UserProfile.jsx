import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import useSessionStorage from "../hooks/useSessionStorage";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import { SiAdguard } from "react-icons/si";
import { toast, Toaster } from "react-hot-toast"; // import react-hot-toast

export default function UserProfile() {
  const nav = useNavigate();
  const [user, setUser] = useSessionStorage("user");
  const [editMode, setEditMode] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [postCount,setPostCount]=useState(0)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  const [formData, setFormData] = useState({
    // imageUrl: user.imageUrl === "" ? "https://i.pinimg.com/originals/36/ca/c0/36cac052d0c16bbf663b013495e53b97.jpg" : user.imageUrl,
    imageUrl: user.imageUrl,
    userId: user._id,
    username: user.username,
    dob: formatDate(user.dob),
    email: user.email,
    oldPassword: "",
    newPassword: "",
  });

  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
    if (user) {
      const currentDate = new Date();
      const dob = new Date(user.dob);

      // Compare only the date parts of the Date objects
      if (
        currentDate.getDate() === dob.getDate() &&
        currentDate.getMonth() === dob.getMonth()
      ) {
        setShowImage(true);
      }
    }
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
      const userId = user._id;
      const response = await axios.get(`/users/current/${userId}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  const totalPosts = async () => {
    try {
      const author = user.username;
      const response = await axios.get(`/posts/current/totalposts/${author}`);
      console.log("total posts", response.data);
      setPostCount(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  totalPosts();
  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    if (formData.oldPassword !== "") {
      try {
        const response = await axios.put("/users/update", formData, {
          withCredentials: true,
        });
        if (response.data.passed) {
          toast.success("Profile updated!", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          sessionStorage.removeItem("user");
          setUser(response.data.user); // This should update the session data
          console.log("Updated User from server", response.data.user);
          setEditMode(false);
        } else {
          setAlertMessage(response.data.message);

          console.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setAlertMessage("Must Provide Old Password for updation");
      toast.error("Must Provide Old Password for updation", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  if (editMode) {
    return (
      <div>
        <div>
          <Toaster />
        </div>
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <div className="mb-4">
              <h3 className="text-xl text-center font-semibold text-gray-900">
                Edit Profile
              </h3>
              {alertMessage && (
                <h3 className="text-xl text-center font-semibold text-gray-900">
                  {alertMessage}
                </h3>
              )}
            </div>
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  placeholder="username"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  placeholder="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  placeholder="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Old Password
                  </label>
                  <span className="text-sm font-bold text-red-500">
                    Required
                  </span>
                </div>
                <input
                  placeholder="Enter old password"
                  required
                  type="password"
                  name="oldPassword"
                  value={formData.oldPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  placeholder="newPassword"
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <Toaster />
        </div>
        <Navbar />
        <div className="container mx-auto p-8">
          <div className="bg-white shadow-md rounded-lg p-8 mt-4">
            <div className="mb-4">
              <h3 className="text-2xl text-center font-semibold text-gray-700">
                User Profile
              </h3>
            </div>

            <div className="  lg:flex border-t border-gray-200 p-4 justify-center items-center">
              <div className="flex items-center">
                <img
                  alt="profile pic"
                  src={user.imageUrl}
                  className=" mb-3 rounded-lg w-64 object-contain mr-8"
                />
                <div>
                  {showImage && user && (
                    <img
                      className="w-64 "
                      src="https://static.vecteezy.com/system/resources/previews/001/201/729/large_2x/birthday-text-png.png"
                      alt="bday image"
                    />
                  )}
                </div>
              </div>
              <dl className="bg-gray-100 border p-4">
                <div className="grid grid-cols-3 gap-4 py-4">
                  <dt className="text-sm font-medium text-gray-500">
                    Username
                  </dt>
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
                {user.isVerified === true ? (
                  <div className="grid grid-cols-3 gap-4 py-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Total Posts Created
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {postCount}
                    </dd>
                  </div>
                ) : (
                  <div></div>
                )}
              </dl>
            </div>
          </div>
          <div className="flex gap-2">
            {" "}
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100  transition-all duration-200 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-900 text-blue-100 hover:text-white transition-all duration-200 hover:bg-blue-500  font-bold py-2 px-4 rounded mt-4"
              onClick={() => nav("/Verification")}
            >
              Apply for Verification
            </button>
            {user.isMod === true ? (
              <>
                <button
                  className="bg-gradient-to-r from-red-500 to-rose-900  text-red-100 hover:text-white font-bold py-2 px-4 rounded mt-4"
                  onClick={() => nav("/modhome")}
                >
                  Mod Menu
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
