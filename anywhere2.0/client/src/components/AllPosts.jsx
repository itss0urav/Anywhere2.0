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
    <div className="p-4 flex flex-col justify-center items-center space-y-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md p-4 bg-white"
          >
            <img
              className="w-full h-64 object-cover rounded-t-lg"
              src={post.imageUrl}
              alt={post.name}
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.name}</h2>
              <p className="text-gray-600 text-base mb-2">{post.category}</p>
              <p className="text-gray-600 text-sm">{post.description}</p>
              <p className="text-gray-600 text-sm mt-4">
                {post.nsfw ? "NSFW: Yes" : "NSFW: No"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
