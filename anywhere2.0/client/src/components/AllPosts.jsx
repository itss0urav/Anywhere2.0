import React, { useEffect, useState } from "react";
import axios from "../config/axios";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts.map((post, index) => (
        <div key={index} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <p className="text-gray-600 text-base">{post.name}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
            <p className="text-gray-600 text-base">{post.category}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <p className="text-gray-600 text-base">{post.description}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
            <img className="w-full h-64 object-cover mt-2" src={post.imageUrl} alt={post.name} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">NSFW:</label>
            <p className="text-gray-600 text-base">{post.nsfw ? 'Yes' : 'No'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
