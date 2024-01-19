import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const ContactUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="">
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
          <h1 className="font-bold text-2xl mb-2 text-gray-700">Contact Us</h1>
          <p className="mb-4 text-gray-600">
            We'd love to hear from you! Send us a message and we'll respond as
            soon as possible.
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/Help")}
          >
            Go to Help
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
