import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import useSessionStorage from "../hooks/useSessionStorage";
import axios from "../config/axios";

export default function UserProfile() {
  const [user, setUser] = useSessionStorage("user");
  const [editMode, setEditMode] = useState(false);
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
  }, [user]);

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
    }
  };

  if (editMode) {
    return (
      <div>
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
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg p-6 mt-4">
            <div className="mb-4">
              <h3 className="text-xl text-center font-semibold text-gray-900">
                User Profile
              </h3>
            </div>
            <div className="border-t border-gray-200">
              <dl>
                <dl>
                  <div className="grid grid-cols-3 gap-4 py-4">
                    <dt className="text-sm font-medium text-gray-500">
                      Username
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 col-span-2">
                      {user.username}
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
              </dl>
            </div>
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-sky-300 text-white rounded px-2 py-1 m-1"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>
      </div>
    );
  }
}
