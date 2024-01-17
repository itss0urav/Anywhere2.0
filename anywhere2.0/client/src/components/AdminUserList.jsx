import React, { useEffect, useState } from "react";
import axios from "../config/axios";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/users");
        console.log(result.data);
        setUsers(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  function handleBanUnban(userId) {
    axios.put("/admin/banunbanuser", { userId }).then((res) => {
      setUsers(
        users.map((user) => (user._id === userId ? res.data.user : user))
      );
    });
  }

  function handleModAccess(userId) {
    axios.put("/admin/modunmoduser", { userId }).then((res) => {
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
            "Date of Birth",
            "Email",
            "Mod Access",
            "Status",
            "Image",
            "Created At",
            "Updated At",
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
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(user.dob).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.isMod ? "Yes" : "No"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {user.isBanned ? "Banned" : "Active"}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <img
                className="h-10 w-10 rounded-full"
                src={user.imageUrl}
                alt="User"
              />
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4  whitespace-nowrap">
              {new Date(user.updatedAt).toLocaleDateString()}
            </td>
            <td className="flex gap-2  px-6 py-4  whitespace-nowrap">
              <button
                onClick={() => handleBanUnban(user._id)}
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                {user.isBanned ? "Unban" : "Ban"}
              </button>
              <button
                onClick={() => handleModAccess(user._id)}
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {user.isMod ? "Remove Mod" : "Make Mod"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
