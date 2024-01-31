import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; 
import useSessionStorage from "../hooks/useSessionStorage";

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

  const navigate = useNavigate(); 

  const handleSubmit = async () => {
    // Set default imageUrl if it's empty
    if (postData.imageUrl === "") {
      postData.imageUrl =
        "https://cdn.mos.cms.futurecdn.net/4MLyNZ66GSMUp7z49Q8k3K.jpg";
    }

    if (
      postData.name &&
      postData.category &&
      postData.description &&
      postData.imageUrl
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
          navigate("/home");
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
      <div>
        <Toaster />
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <div className="font-bold mb-4 text-2xl">Start Discussion here</div>

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
            className="blue-gradient-btn border border-blue-800 "
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
