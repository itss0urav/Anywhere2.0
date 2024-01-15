import React, { useEffect } from "react";
import { MdAddAPhoto, MdMic, MdAttachFile } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";

const CreatePost = () => {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const nav = useNavigate();
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 w-2/4">
      <div className="flex justify-between flex-col md:flex-row items-center">
        {/* <img
          className="w-12 h-12 rounded-full mr-4"
          // src={}
        /> */}

        <img
          src={user.imageUrl}
          onClick={() => {
            nav("/UserProfile");
          }}
          className="w-10 rounded-full mr-4 text-white "
        />
        {/* <FaCircleUser
          onClick={() => {
            nav("/UserProfile");
          }}
          className="w-8 h-12 rounded-full mr-4 text-white "
        /> */}

        <input
          onClick={() => {
            nav("/createpostform");
          }}
          className="w-full rounded p-2 "
          type="text"
          placeholder="Create Post"
        />

        {/* <div className="flex justify-center">
          <div className="flex justify-end md:justify-end space-x-2 mt-2">
            <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
              <MdAddAPhoto className="text-white" />
            </button>
            <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
              <MdMic className="text-white" />
            </button>
            <button className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white">
              <MdAttachFile className="text-white" />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CreatePost;
