import React, { useEffect, useState } from "react";
import axios from "../config/axios";

export default function ModReportList() {
  const [reports, setReports] = useState([]);
  const fetchReports = async () => {
    console.log("Fetching/Updating...");
    try {
      const result = await axios.get("/posts/reports/get");
      setReports(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchReports();
    const refreshInterval = setInterval(
      fetchReports,
      2000
    );

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);
  async function handleRemoveReport(postId,reportId) {
    try {
      const result = await axios.delete("/posts/reports/delete", {
        data: { postId },
      });
      handleIgnoreReport(reportId);
      fetchReports();
      if (Array.isArray(result.data)) {
        setReports(result.data);
      } else {
        console.error("Expected an array but received", result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleIgnoreReport(reportId) {
    try {
      const result = await axios.delete("/posts/reports/ignore", {
        data: { reportId },
      });
      fetchReports();
      if (Array.isArray(result.data)) {
        setReports(result.data);
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
                    Reported By
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Reason
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Post ID
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
                {reports.map((report) => (
                  <tr key={report._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 sm:w-20 md:w-[40rem] break-words">
                      {report.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.postId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report._id}
                    </td>
                    <td className="flex gap-2 px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => {
                          handleRemoveReport(report.postId, report._id);
                        }}
                        className="red-gradient-btn"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => {
                          handleIgnoreReport(report._id);
                        }}
                        className="green-gradient-btn"
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
