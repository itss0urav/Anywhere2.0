import React, { useEffect, useState } from "react";
import PostContainer from "./PostContainer";
import axios from "../config/axios";
// custom hooks

import useSessionStorage from "../hooks/useSessionStorage";
import useCalculateAge from "../hooks/useCalculateAge";
import { useNavigate } from "react-router-dom";

export default function CurrentUserPost() {
  const navigate = useNavigate();

  const [user] = useSessionStorage("user");
  const [posts, setPosts] = useState([]);
  const userAge = useCalculateAge(user.dob);

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const author = user.username;
      const response = await axios.get(`/posts/userpost/${author}`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/posts/${postId}`);
  };

  return (
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
      </div>
    </div>
  );
}
