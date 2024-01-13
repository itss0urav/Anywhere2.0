// src/components/CreatePostForm.js

import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import Navbar from "./Navbar";
import useSessionStorage from "../hooks/useSessionStorage";
import { IoMdCloseCircle } from "react-icons/io";
const CreatePostForm = () => {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const [postData, setPostData] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    nsfw: false,
  });

  const [alert, setAlert] = useState({
    type: null,
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleCheck = () => {
    setPostData((prevPost) => ({ ...prevPost, nsfw: !prevPost.nsfw }));
  };

  const handleSubmit = async () => {
    if (
      postData.name &&
      postData.category &&
      postData.description &&
      postData.imageUrl !== ""
    ) {
      try {
        setLoading(true);
        const post = { ...postData, author: user.username };

        await axios.post("/posts", post, {
          withCredentials: true,
        });

        setAlert({
          type: "success",
          message: "Post created successfully!",
        });

        setPostData({
          name: "",
          category: "",
          description: "",
          imageUrl: "",
          nsfw: false,
        });
      } catch (error) {
        console.error("Error creating post:", error);

        setAlert({
          type: "error",
          message:
            error.response?.data?.message ||
            "Error creating post. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    } else {
      setAlert({ type: "error", message: "All fields must be filled" });
    }
  };

  const closeAlert = () => {
    setAlert({
      type: null,
      message: "",
    });
  };

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="font-bold mb-4 text-2xl">Create Post</div>
        {alert.type && (
          <div
            className={`rounded-md p-4 mb-4 ${
              alert.type === "success"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            <div className="flex">
              {alert.message}
              <IoMdCloseCircle
                className="ml-2  text-2xl cursor-pointer"
                onClick={closeAlert}
              />
            </div>
            {/* <span className="ml-2 cursor-pointer" onClick={closeAlert}> */}
            {/* X
            </span> */}
          </div>
        )}

        <div className="rounded-md bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-center justify-center">
          <input
            required
            name="name"
            value={postData.name}
            onChange={handleChange}
            className="w-full rounded p-2"
            type="text"
            placeholder="Post Name"
          />
          <input
            required
            name="category"
            value={postData.category}
            onChange={handleChange}
            className="w-full rounded p-2 mt-2"
            type="text"
            placeholder="Category"
          />
          <textarea
            required
            name="description"
            value={postData.description}
            onChange={handleChange}
            className="w-full rounded p-2 mt-2"
            placeholder="Description"
          />
          <input
            required
            name="imageUrl"
            value={postData.imageUrl}
            onChange={handleChange}
            className="w-full rounded p-2 mt-2"
            type="text"
            placeholder="Image URL"
          />
          <div className="w-full flex justify-start items-center mt-2">
            <input
              required
              name="nsfw"
              checked={postData.nsfw}
              onChange={handleCheck}
              className="mr-2"
              type="checkbox"
            />
            <label className="flex items-center">NSFW</label>
          </div>
          <button
            onClick={handleSubmit}
            className="bg-blue-800 text-blue-100 rounded px-4 py-2 transition-all duration-200 hover:bg-blue-500 hover:text-white mt-2 w-full"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;
