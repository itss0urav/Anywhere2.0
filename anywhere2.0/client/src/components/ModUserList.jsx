import React, { useEffect, useState } from "react";
import axios from "../config/axios";

export default function ModUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching/Updating...")
      try {
        const result = await axios.get("/users");
        console.log(result.data);
        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
     // Set up interval for automatic refresh (every 5 minutes in this example)
     const refreshInterval = setInterval(
      fetchData,
      // 5 *
      // 60 *
      2000
    );

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  function handleBanUnban(userId) {
    axios.put("/admin/banunbanuser", { userId }).then((res) => {
      setUsers(
        users.map((user) => (user._id === userId ? res.data.user : user))
      );
    });
  }

  

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {[
            "Username",
            "Email",
            "Date of Birth",
            "Created At",
            "Updated At",
            "Mod Access",
            "Status",
            "Profile Pic",
            "Actions",
          ].map((header) => (
            <th
              key={header}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user._id}>
            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(user.dob).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4  whitespace-nowrap">
              {new Date(user.updatedAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.isMod ? (
                <div className="bg-green-500  text-white font-bold py-2 px-4 rounded">
                  Yes
                </div>
              ) : (
                <div className="bg-red-500  text-white font-bold py-2 px-4 rounded">
                  No
                </div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.isBanned ? (
                <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Banned
                </div>
              ) : (
                <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Active
                </div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                className="h-10 w-10 object-cover rounded-md"
                src={user.imageUrl}
                alt="User"
              />
            </td>
            <td className="flex gap-2  px-6 py-4  whitespace-nowrap">
              <button
                onClick={() => handleBanUnban(user._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {user.isBanned ? "Unban" : "Ban"}
              </button>
              
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
