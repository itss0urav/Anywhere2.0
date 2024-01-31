import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";

const CreatePost = () => {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const nav = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 w-2/4 rounded-md">
      <div className="flex justify-between flex-col md:flex-row items-center">
        <img
          alt="user-profile"
          src={user.imageUrl}
          onClick={() => {
            nav("/UserProfile");
          }}
          className="w-10 rounded-full mr-4 text-white "
        />
        <input
          onClick={() => {
            nav("/createpostform");
          }}
          className="w-full rounded p-2 "
          type="text"
          placeholder="Have something to discuss?"
        />
      </div>
    </div>
  );
};

export default CreatePost;
