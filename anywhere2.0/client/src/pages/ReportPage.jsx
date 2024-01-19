import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "../config/axios";
import useSessionStorage from "../hooks/useSessionStorage";
import Navbar from "../components/Navbar";
import v1 from "../assets/v2.mp4";

export default function ReportPage() {
  const [user] = useSessionStorage("user");
  const username = user.username;
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const postId = useLocation().pathname.split("/")[2];

  const handleReportPost = () => {
    console.log("Report submitted:", reason);

    axios
      .post(`/posts/${postId}`, { postId, reason, username })
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
    <div className="relative">
      <video
        autoPlay
        loop
        muted
        src={v1}
        className="absolute object-cover z-[-1] min-w-full min-h-full w-auto"
      />
      <Navbar />
      <div className="flex items-center justify-center h-screen  z-20">
        <div>
          <Toaster />
        </div>
        <div className="w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-white bg-opacity-80">
          <h2 className="pb-5 text-2xl font-bold text-center text-gray-800">
            Report Post
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="reason"
            >
              Reason for Report
            </label>
            <textarea
              className="shadow bg-transparent appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Specify the reason..."
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleReportPost}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
