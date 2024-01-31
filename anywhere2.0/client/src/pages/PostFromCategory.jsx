import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";
import SideComponent from "../components/SideComponent";
// custom hooks
import useCalculateAge from "../hooks/useCalculateAge";
import useSessionStorage from "../hooks/useSessionStorage";
const PostFromCategory = () => {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  const [user] = useSessionStorage("user");

  const navigate = useNavigate();

  const userAge = useCalculateAge(user.dob);
  console.log("Current Age:", userAge);

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

      <div className="flex flex-col items-center">
        <div className="flex justify-center w-full m-4">
          <div className="w-3/4">
            {posts.map((post) => {
              // Skip rendering this post if user is under 18 and post is NSFW
              if (userAge < 18 && post.nsfw) {
                return null;
              }

              return (
                <PostContainer
                  key={post._id}
                  value={post}
                  onClick={() => handlePostClick(post._id)}
                />
              );
            })}
          </div>
          <div className="max-w-[25%] ml-4">
            <SideComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFromCategory;
