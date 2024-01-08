import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function UserProfile() {
  const SessionStorageData = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {}, [SessionStorageData]);

  
  return (
    <div className="">
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
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {SessionStorageData.user.username}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">
                  Date Of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {SessionStorageData.user.dob}
                </dd>
              </div>
              <div className="grid grid-cols-3 gap-4 py-4">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 col-span-2">
                  {SessionStorageData.user.email}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
