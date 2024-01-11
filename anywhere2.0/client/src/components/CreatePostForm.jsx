// src/components/CreatePostForm.js

import React, { useState } from "react";
import axios from "../config/axios";
import Navbar from "./Navbar";

const CreatePostForm = () => {
  const [post, setPost] = useState({
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
    setPost({ ...post, [name]: value });
  };

  const handleCheck = () => {
    setPost((prevPost) => ({ ...prevPost, nsfw: !prevPost.nsfw }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await axios.post("/posts", post, { withCredentials: true });

      setAlert({
        type: "success",
        message: "Post created successfully!",
      });

      setPost({
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
            {alert.message}
            <span className="ml-2 cursor-pointer" onClick={closeAlert}>
              X
            </span>
          </div>
        )}

        <div className="rounded-md bg-gradient-to-r from-blue-700 to-blue-500 p-4 backdrop-blur-lg bg-opacity-40 border border-blue-300 border-opacity-20 w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col items-center justify-center">
          <input
            required
            name="name"
            value={post.name}
            onChange={handleChange}
            className="w-full rounded p-2"
            type="text"
            placeholder="Post Name"
          />
          <input
            required
            name="category"
            value={post.category}
            onChange={handleChange}
            className="w-full rounded p-2 mt-2"
            type="text"
            placeholder="Category"
          />
          <textarea
            required
            name="description"
            value={post.description}
            onChange={handleChange}
            className="w-full rounded p-2 mt-2"
            placeholder="Description"
          />
          <input
            required
            name="imageUrl"
            value={post.imageUrl}
            onChange={handleChange}
            className="w-full rounded p-2 mt-2"
            type="text"
            placeholder="Image URL"
          />
          <div className="w-full flex justify-start items-center mt-2">
            <input
              required
              name="nsfw"
              checked={post.nsfw}
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
