import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useSessionStorage from "../hooks/useSessionStorage";
import logo from "../assets/Anywhere-Transparent.png";
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
  console.log(formData);
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    axios
      .post("/users/verification", formData)
      .then((res) => {
        toast.success("Verification Request Submitted!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        console.log(res);

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error submitting verification request");
      });
  }

  return (
    <div className="">
      <Navbar />
      <div className=" ">
        <div className="">
          <form className="mt-[9%] max-w-sm mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md backdrop-blur-lg bg-opacity-80 relative">
            <img
              src={logo}
              alt=""
              className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="voterId"
              >
                Voter ID Card Number
              </label>
              <input
                required
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="formType"
              >
                Form Type
              </label>
              <select
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="companyName"
                  >
                    Company Name
                  </label>
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="companyRegNumber"
                  >
                    Company Registration Number
                  </label>
                  <input
                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="mobileNumber"
              >
                Mobile Number
              </label>
              <input
                required
                className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                className="blue-gradient-btn border-blue-800"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
