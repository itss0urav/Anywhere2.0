import React, { useEffect, useState } from "react";
import axios from "../config/axios";

export default function AdminSupportList() {
  const [supports, setSupports] = useState([]);
  const fetchSupport = async () => {
    console.log("Fetching/Updating...");
    try {
      const result = await axios.get("/admin/support/get");
      setSupports(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchSupport();
    // Set up interval for automatic refresh (every 5 minutes in this example)
    const refreshInterval = setInterval(
      fetchSupport,
      // 5 *
      // 60 *
      2000
    );

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);
  async function handleRemoveSupport(supportId) {
    try {
      const result = await axios.delete("/admin/support/delete", {
        data: { supportId },
      });
      fetchSupport();
      if (Array.isArray(result.data)) {
        setSupports(result.data);
      } else {
        console.error("Expected an array but received", result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {supports.map((support) => (
                  <tr key={support._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {support.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {support.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {support.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {support._id}
                    </td>
                    <td className="flex gap-2 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          handleRemoveSupport(support._id);
                        }}
                        className="bg-gradient-to-r from-red-500 to-rose-900 text-white font-bold py-2 px-4 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
