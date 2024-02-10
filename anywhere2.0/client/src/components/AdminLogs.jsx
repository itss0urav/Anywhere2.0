import React, { useEffect, useState, useRef } from "react";

const AdminLogs = () => {
  const [logs, setLogs] = useState([]);
  console.log(logs)
  const endOfLogsRef = useRef(null);

  useEffect(() => {
    fetchLogs();
    const refreshInterval = setInterval(fetchLogs, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    // Scroll to the end of logs whenever logs update
    endOfLogsRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  function fetchLogs() {
    console.log("Fetching every 2 sec on focus")
    fetch("http://localhost:5000/api/logs")
        .then((response) => response.json())
        .then((data) => {
            const filteredData = data.filter(log => !log.requestCode.includes('GET /api/logs'));
            setLogs(filteredData);
        })
        .catch((error) => console.error("Error:", error));
  }

  const getRowColor = (requestCode) => {
    if (requestCode.includes("users")) {
      return "bg-blue-200";
    } else if (requestCode.includes("admin")) {
      return "bg-red-200";
    } else if (requestCode.includes("posts")) {
      return "bg-green-200";
    } else {
      return "";
    }
  };

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Request Code</th>
          <th className="px-4 py-2">Response Code</th>
          <th className="px-4 py-2">Message</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, index) => (
          <tr
            key={index}
            className={`${getRowColor(log.requestCode)} ${
              index % 2 === 0 ? "bg-gray-200" : ""
            }`}
          >
            <td className="border px-4 py-2">{log.requestCode}</td>
            <td className="border px-4 py-2">{log.responseCode}</td>
            <td className="border px-4 py-2">{log.message}</td>
          </tr>
        ))}
        {/* Add a ref to the last element in your logs list */}
        <tr ref={endOfLogsRef} />
      </tbody>
    </table>
  );
};

export default AdminLogs;
