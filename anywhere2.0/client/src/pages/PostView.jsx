// PostView.js
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom"; // Import useParams
import Navbar from "../components/Navbar";

const PostView = () => {
  const { postId } = useParams(); // Get postId from URL parameters
  const [post, setPost] = useState(null);
  const [blurStatus, setBlurStatus] = useState(true); // Initialize blurStatus as true

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (!post) {
    return <div>No post selected</div>;
  }
  const toggleBlur = () => {
    setBlurStatus(!blurStatus); // Toggle blurStatus
  };
  return (
    <div className="">
      <Navbar />
      <div className="m-8">
        <div
          className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4" // Add 'mb-4' here
        >
          <p className="inline rounded-sm  text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
            {post.nsfw ? "NSFW" : ""}
          </p>
          <img
            onClick={toggleBlur} // Call toggleBlur on click
            className={`w-full h-64 object-contain rounded-t-lg ${
              blurStatus && post.nsfw ? "blur-lg" : ""
            }`}
            src={post.imageUrl}
            alt={post.name}
          />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{post.name}</h2>
            <p className="text-gray-600 text-base mb-2">{post.category}</p>
            <p className="text-gray-600 text-sm">{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;
