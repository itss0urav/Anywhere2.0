import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import { MdGroups2 } from "react-icons/md";
import logo from "../assets/Anywhere-Transparent.png";

const CreatePost = () => {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const nav = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-600 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 w-2/4 rounded-md">
      <img
        src={logo}
        alt=""
        className=" opacity-50 blur absolute inset-0 w-full h-full object-cover z-[-1]"
      />
      <div className="flex justify-between flex-col md:flex-row items-center">
        <img
          alt="user-profile"
          src={user.imageUrl}
          onClick={() => {
            nav("/UserProfile");
          }}
          className="w-10 rounded-full lg:mr-4 text-white "
        />
        <input
          onClick={() => {
            nav("/createpostform");
          }}
          className="w-full rounded p-2 "
          type="text"
          placeholder="Have something to discuss?"
        />
        <MdGroups2
          onClick={() => {
            nav("/CreateCommunity");
          }}
          className="text-4xl lg:ml-3 text-white"
        />
      </div>
    </div>
  );
};

export default CreatePost;
