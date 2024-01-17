import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "../config/axios";
import useSessionStorage from "../hooks/useSessionStorage";

export default function ReportPage() {
  const [user] = useSessionStorage("user");
  const username = user.username;
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const postId = useLocation().pathname.split("/")[2];

  const handleReportPost = () => {
    console.log("Report submitted:", reason);

    axios
      .post(`/posts/${postId}`, {postId, reason, username })
      .then((req, res) => {
        toast.success("Post Reported", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setTimeout(() => {
          navigate("/home"); // navigate to "/home" after 2 seconds
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div>
        <Toaster />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reason"
          >
            Reason for Report
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reason"
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Specify the reason..."
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleReportPost}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
