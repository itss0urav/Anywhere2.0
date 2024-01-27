import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "../config/axios";
import { toast, Toaster } from "react-hot-toast"; // import react-hot-toast
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
export default function VerificationForm() {
  const [user] = useSessionStorage("user");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user.username,
    userId: user._id,
    email: user.email,
    isVerified: user.isVerified,
    voterId: "",
    formType: "individual",
    mobileNumber: "",
    companyName: "",
    companyRegNumber: "",
  });
console.log(formData)
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    axios
      .post("/users/verification", formData) // Assuming your backend route is "/admin/verification"
      .then((res) => {
        // Handle the response
        toast.success("Verification Request Submitted!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        console.log(res);

        setTimeout(() => {
          navigate("/home"); // navigate to "/home" after 2 seconds
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        // Handle the error, you might want to show an error message to the user
        toast.error("Error submitting verification request");
      });
  }

  return (
    <div className="">
      <Navbar />
      <div>
        <Toaster />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <form className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="voterId"
            >
              Voter ID Card Number
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="voterId"
              type="text"
              placeholder="Voter ID Card Number"
              name="voterId"
              value={formData.voterId}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="formType"
            >
              Form Type
            </label>
            <select
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="formType"
              value={formData.formType}
              name="formType"
              onChange={handleChange}
            >
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </div>
          {formData.formType === "company" && (
            <>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="companyName"
                >
                  Company Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="companyName"
                  type="text"
                  placeholder="Company Name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="companyRegNumber"
                >
                  Company Registration Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="companyRegNumber"
                  type="text"
                  placeholder="Company Registration Number"
                  name="companyRegNumber"
                  value={formData.companyRegNumber}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobileNumber"
              type="text"
              placeholder="Mobile Number"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="blue-gradient-btn"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
