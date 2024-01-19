import axios from "../config/axios";
import React, { useEffect, useState } from "react";

export default function AdminVerificationRequest() {
  const [requests, setRequests] = useState([]);
  console.log(requests);
  useEffect(() => {
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
  const fetchData = async () => {
    console.log("Fetching/Updating...")
    try {
      const result = await axios.get("users/verification");
      setRequests(result.data);
      console.log(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  async function handleAcceptRequest(userId, reqId) {
    console.log("changes", userId);
    // for user collection updation
    try {
      await axios.put("users/verification", { userId, reqId });
      console.log("verified sucessfully");
      fetchData();
    } catch (error) {
      console.error(error);
    }

    //for verification request collection
    // try {
    //   await axios.put("users/verification", { userId });
    //   console.log("verified sucessfully");
    // } catch (error) {
    //   console.error(error);
    // }
  }
  async function handleIgnoreRequest(reqId) {
    console.log("reqId:", reqId); // Add this line for debugging

    try {
      await axios.delete("users/verification", { data: { reqId } });
      console.log("verification ignored");
      fetchData();
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
                    Voter ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Form Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Mobile Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Company Registration Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
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
                {requests.map((request) => (
                  <tr key={request._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.voterId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.formType || "Not Provided"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.mobileNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.companyName || "Not Provided"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.companyRegNumber || "Not Provided"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {request.isVerified !== false ? "Yes" : "No"}
                    </td>
                    <td className="flex gap-2 px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {
                          handleAcceptRequest(request.userId, request._id);
                        }}
                      >
                        {request.isVerified !== false ? (
                          <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Revoke</div>
                        ) : (
                          <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Allow</div>
                        )}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => {
                          handleIgnoreRequest(request._id);
                        }}
                      >
                        Ignore
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
