import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminUserList from "./AdminUserList";
import AdminPostList from "./AdminPostList";
import AdminReportList from "./AdminReportList";
import AdminVerificationRequest from "./AdminVerificationRequest";

export default function Admin() {
  const [currentOption, setCurrentOption] = useState("");
  return (
    <div className="bg-blue-50 min-h-screen">
      <AdminNavbar />
      <div className="flex justify-between p-4 bg-blue-100 border-b-2 border-blue-200">
        <button
          onClick={() => {
            setCurrentOption("manage-users");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Manage Users
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-posts");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Manage Posts
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-reports");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Reports
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-verification");
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Verification Request
        </button>
      </div>
      <div className="flex justify-center mt-8">
        {currentOption === "manage-users" ? (
          <>
            <AdminUserList />
          </>
        ) : (
          <></>
        )}
        {currentOption === "manage-posts" ? (
          <>
            <AdminPostList />
          </>
        ) : (
          <></>
        )}
        {currentOption === "manage-reports" ? (
          <>
            <AdminReportList />
          </>
        ) : (
          <></>
        )}
        {currentOption === "manage-verification" ? (
          <>
            <AdminVerificationRequest />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
