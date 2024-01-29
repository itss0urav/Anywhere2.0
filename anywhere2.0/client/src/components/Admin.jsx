import React, { useState } from "react";
import AdminNavbar from "./AdminNavbar";
import AdminUserList from "./AdminUserList";
import AdminPostList from "./AdminPostList";
import AdminReportList from "./AdminReportList";
import AdminVerificationRequest from "./AdminVerificationRequest";
import AdminSupportList from "./AdminSupportList";
import AdminInsights from "./AdminInsights";
import AdminBannerManagement from "./AdminBannerManagement";

export default function Admin() {
  const [currentOption, setCurrentOption] = useState("");
  return (
    <div className="bg-blue-50 min-h-screen">
      <AdminNavbar />
      <div className="flex  justify-between p-4 bg-blue-100 border-b-2 border-blue-200">
        <button
          onClick={() => {
            setCurrentOption("manage-users");
          }}
          className=" red-gradient-btn"
        >
          Manage Users
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-posts");
          }}
          className=" red-gradient-btn"
        >
          Manage Posts
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-reports");
          }}
          className="red-gradient-btn"
        >
          Reports
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-verification");
          }}
          className=" red-gradient-btn"
        >
          Verification Request
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-support");
          }}
          className=" red-gradient-btn"
        >
          Support
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-insights");
          }}
          className=" red-gradient-btn"
        >
          Server Insights
        </button>
        <button
          onClick={() => {
            setCurrentOption("manage-banner");
          }}
          className=" red-gradient-btn"
        >
          Manage Banner
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
        {currentOption === "manage-insights" ? (
          <>
            <AdminInsights />
          </>
        ) : (
          <></>
        )}
        {currentOption === "manage-banner" ? (
          <>
            <AdminBannerManagement />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
