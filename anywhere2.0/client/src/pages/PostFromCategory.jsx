// PostFromCategory.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";

const PostFromCategory = () => {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/posts/category/${category}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      }
    };

    fetchPosts();
  }, [category]);

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="">
      <Navbar />
      <div className="w-3/4 m-4">
        {posts.map((post) => (
          <PostContainer
            key={post._id}
            value={post}
            onClick={() => handlePostClick(post._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostFromCategory;
