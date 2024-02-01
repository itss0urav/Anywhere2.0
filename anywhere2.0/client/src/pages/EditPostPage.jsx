import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
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
      <div>
        <Toaster />
      </div>
      <div className="">
        <div className="flex flex-col justify-center items-center mx-auto p-6 ">
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
          <form onSubmit={handleSubmit} className="max-w-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
              <label className="block text-gray-700 text-sm font-bold mb-2">
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
