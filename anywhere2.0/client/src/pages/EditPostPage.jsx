import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import bgimg from "../assets/Anywhere-Transparent.png";
export default function EditPostPage() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
    nsfw: false,
  });
  console.log("toogle data", formData);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/posts/${postId}`);
      const postData = response.data;
      setFormData({
        name: postData.name,
        category: postData.category,
        description: postData.description,
        imageUrl: postData.imageUrl,
        nsfw: postData.nsfw,
      });
    } catch (error) {
      console.error("Error fetching post data:", error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [postId]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: !prevData[e.target.name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Data from update form:", formData);
      await axios.put(`/posts/edit/${postId}`, formData);
      console.log("Post updated successfully!");
      toast.success("Post updated successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="">
      <Navbar />

      <div className="">
        <div className="mt-[10%] ">
          <h2 className="text-2xl text-center font-bold mb-4">Edit Post</h2>
          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md  backdrop-blur-lg bg-opacity-80 relative"
          >
            <img
              src={bgimg}
              alt=""
              className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name:
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Category:
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description:
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Image URL:
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="w-full border rounded-md py-2 px-3"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                NSFW:
                <input
                  type="checkbox"
                  name="nsfw"
                  checked={formData.nsfw}
                  onChange={handleCheckboxChange}
                  className="ml-2"
                />
              </label>
            </div>
            <button type="submit" className="blue-gradient-btn">
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
