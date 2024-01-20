import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminUserList from "./AdminUserList";
import AdminPostList from "./AdminPostList";
import AdminReportList from "./AdminReportList";
import AdminVerificationRequest from "./AdminVerificationRequest";
import AdminSupportList from "./AdminSupportList";

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
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-900 hover:text-red-100 text-white hover:bg-red-500"
        >
          Manage Users
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-posts");
          }}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-900 hover:text-red-100 text-white hover:bg-rose-500"
        >
          Manage Posts
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-reports");
          }}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-900 hover:text-red-100 text-white hover:bg-rose-500"
        >
          Reports
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-verification");
          }}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-900 hover:text-red-100 text-white hover:bg-rose-500"
        >
          Verification Request
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-support");
          }}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-900 hover:text-red-100 text-white hover:bg-rose-500"
        >
          Support
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
        {currentOption === "manage-support" ? (
          <>
            <AdminSupportList />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
