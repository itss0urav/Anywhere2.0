// src/components/CreatePostForm.js
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import Navbar from "./Navbar";
import useSessionStorage from "../hooks/useSessionStorage";
import { toast,Toaster } from "react-hot-toast"; // import react-hot-toast

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleCheck = () => {
    setPostData((prevPost) => ({ ...prevPost, nsfw: !prevPost.nsfw }));
  };

  const navigate = useNavigate(); // initialize useNavigate

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

        toast.success("Post created successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        setPostData({
          name: "",
          category: "",
          description: "",
          imageUrl: "",
          nsfw: false,
        });

        setTimeout(() => {
          navigate("/home"); // navigate to "/home" after 2 seconds
        }, 2000);
      } catch (error) {
        console.error("Error creating post:", error);

        toast.error(
          error.response?.data?.message ||
            "Error creating post. Please try again.",
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("All fields must be filled", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="">
      <Navbar />
      <div><Toaster/></div>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="font-bold mb-4 text-2xl">Create Post</div>

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
