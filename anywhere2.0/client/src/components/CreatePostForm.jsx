import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useSessionStorage from "../hooks/useSessionStorage";
import bgimg from "../assets/Anywhere-Transparent.png";

const CreatePostForm = () => {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
    getCommunities();
  }, [user]);
  const [postData, setPostData] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    nsfw: false,
    community: "",
  });
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCommunities = async () => {
    try {
      const response = await axios.get("/community/get");
      setCommunities(response.data);
    } catch (error) {
      console.error(`Error fetching communities: ${error}`);
    }
  };
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
          community: "",
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
    <div>
      <Navbar />

      <div className="mt-[9%]">
        <div className="mb-2 text-center font-bold text-2xl">
          Start Discussion here
        </div>
        <div className="max-w-sm mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md  backdrop-blur-lg bg-opacity-80 relative">
          <img
            src={bgimg}
            alt=""
            className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
          />
          <div className="mb-5">
            <label
              for="Name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              required
              name="name"
              value={postData.name}
              onChange={handleChange}
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="Post Name"
            />
          </div>
          <div className="mb-5">
            <label
              for="Category"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <input
              required
              name="category"
              value={postData.category}
              onChange={handleChange}
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="Category"
            />
          </div>
          <div className="mb-5">
            <label
              for="Description"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              required
              name="description"
              value={postData.description}
              onChange={handleChange}
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Description"
            />
          </div>
          <div className="mb-5">
            <label
              for="ImageUrl"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ImageUrl
            </label>
            <input
              required
              name="imageUrl"
              value={postData.imageUrl}
              onChange={handleChange}
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              type="text"
              placeholder="Image URL"
            />
          </div>
          <div className="mb-5">
            <label
              for="Community"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Community
            </label>
            <select
              name="community"
              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              value={postData.community}
              onChange={handleChange}
            >
              <option value="">Select a community</option>
              {communities.map((community) => (
                <option key={community._id} value={community.communityName}>
                  {community.communityName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-start mb-5">
            <div className="flex items-center h-5">
              <input
                required
                name="nsfw"
                checked={postData.nsfw}
                onChange={handleCheck}
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                type="checkbox"
              />
              <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                NSFW
              </label>
            </div>
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
