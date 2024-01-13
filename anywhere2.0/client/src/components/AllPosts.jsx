import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [blurStatus, setBlurStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
        const initialBlurStatus = {};
        response.data.forEach((post, index) => {
          initialBlurStatus[index] = true;
        });
        setBlurStatus(initialBlurStatus);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const toggleBlur = (index, event) => {
    event.stopPropagation();
    setBlurStatus({
      ...blurStatus,
      [index]: !blurStatus[index],
    });
  };

  return (
    <div className="w-full p-4 flex flex-col justify-center items-center space-y-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        {posts.length === 0 ? "No Posts" : "All Posts"}
      </h1>
      <div className="min-w-[40rem] m-4">
        {posts.map((post, index) => (
          <div
            key={index}
            onClick={() => navigate(`/posts/${post._id}`)}
            className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4"
          >
            <div className="text-lg font-semibold">Post By {post.author}</div>
            {post.nsfw && (
              <p className="inline rounded-sm text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                NSFW
              </p>
            )}
            <div className="flex justify-center">
              <img
                onClick={(event) => toggleBlur(index, event)}
                className={`object-contain rounded-t-lg h-64 ${
                  blurStatus[index] && post.nsfw ? "blur-lg" : ""
                }`}
                src={post.imageUrl}
                alt={post.name}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.name}</h2>
              <p className="text-gray-600 text-base mb-2">{post.category}</p>
              <p className="text-gray-600 text-sm">{post.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
