import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import Navbar from "../components/Navbar";

const PostFromCategory = () => {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  const [blurStatus, setBlurStatus] = useState(true); // Initialize blurStatus as true

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts/category/${category}`);
        setPosts(response.data);
        const initialBlurStatus = {};
        response.data.forEach((post, index) => {
          initialBlurStatus[index] = true;
        });
        setBlurStatus(initialBlurStatus);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      }
    };

    fetchPosts();
  }, [category]);
  const toggleBlur = (index, event) => {
    event.stopPropagation(); // Stop event propagation
    setBlurStatus({
      ...blurStatus,
      [index]: !blurStatus[index],
    });
  };
  return (
    <div className="">
      <Navbar />
      <div className="m-8">
        <h1 className="text-2xl font-bold mb-4">
          Posts in category: {category}
        </h1>
        <div className="w-full p-4 flex flex-col justify-center items-center space-y-4 ">
        {posts.length === 0 ? (
          <h1 className=" text-3xl font-bold mb-4 text-blue-700">No Posts</h1>
        ) : (
          <h1 className=" text-3xl font-bold mb-4 text-blue-700">All Posts</h1>
        )}
        <div className="w-3/4 m-4">
          {posts.map((post, index) => (
            <div
              key={index}
            //   onClick={() => navigate(`/posts/${post._id}`)}
              className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4" // Add 'mb-4' here
            >
              {post.nsfw ? (
                <p className="inline rounded-sm  text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                  {post.nsfw ? "NSFW" : ""}
                </p>
              ) : (
                ""
              )}
              <img
                onClick={(event) => toggleBlur(index, event)}
                className={`w-full h-64 object-contain rounded-t-lg ${
                  blurStatus[index] && post.nsfw ? "blur-lg" : ""
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
          ))}
        </div>
      </div>
      </div>
    </div>
  );
};

export default PostFromCategory;
