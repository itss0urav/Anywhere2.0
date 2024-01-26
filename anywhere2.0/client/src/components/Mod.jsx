import React, { useState } from "react";
import Navbar from "./Navbar";
import ModUserList from "./ModUserList";
import ModPostList from "./ModPostList";
import ModReportList from "./ModReportList";

export default function Mod() {
  const [currentOption, setCurrentOption] = useState("");
  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />
      <div className="flex justify-between p-4 bg-blue-100 border-b-2 border-blue-200">
        <button
          onClick={() => {
            setCurrentOption("manage-users");
          }}
          className="blue-gradient-btn"
        >
          Manage Users
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-posts");
          }}
          className="blue-gradient-btn"
        >
          Manage Posts
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-reports");
          }}
          className="blue-gradient-btn"
        >
          Reports
        </button>
      </div>
      <div className="flex justify-center mt-8">
        {currentOption === "manage-users" ? (
          <>
            <ModUserList />
          </>
        ) : (
          <></>
        )}
        {currentOption === "manage-posts" ? (
          <>
            <ModPostList />
          </>
        ) : (
          <></>
        )}
        {currentOption === "manage-reports" ? (
          <>
            <ModReportList />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
