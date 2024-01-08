import React, { useContext, useEffect } from "react";
import GlobalContext from "../contexts/Context";
import Navbar from "../components/Navbar";

export default function UserProfile() {
  const { user } = useContext(GlobalContext);
  useEffect(() => {}, [user]);

//   console.log(user.userCredentials.username);
  return (
    <div className="">
      <Navbar />
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            User Profile
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Username</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.user.username}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
