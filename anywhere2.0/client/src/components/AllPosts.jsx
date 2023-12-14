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
      <div className="">
        {posts.map((post, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:scale-105"
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
              <p className="inline rounded-sm  text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                {post.nsfw ? "NSFW" : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
