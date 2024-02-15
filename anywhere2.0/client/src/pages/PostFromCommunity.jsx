import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import PostContainer from "../components/PostContainer";
import SideComponent from "../components/SideComponent";
// custom hooks
import useCalculateAge from "../hooks/useCalculateAge";
import useSessionStorage from "../hooks/useSessionStorage";

const PostFromCommunity = () => {
  const [posts, setPosts] = useState([]);
  const { communityName } = useParams();
  const [user] = useSessionStorage("user");

  const navigate = useNavigate();

  const userAge = useCalculateAge(user.dob);
  console.log("Current Age:", userAge);

  useEffect(() => {
    console.log("Fetching posts for community:", communityName);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/community/get/${communityName}`);
        console.log("Response data:", response.data); // Log response data
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts by category:", error);
      }
    };

    fetchPosts();
  }, [communityName]);

  const handlePostClick = (postId) => {
    console.log("Post clicked:", postId); // Log the clicked post ID
    navigate(`/posts/${postId}`);
  };

  console.log("Posts state:", posts); // Log the posts state
  if (posts.length == 0) {
    return (
      <div>
        <Navbar />
        <div className="text-center text-2xl mt-4">No Posts Found</div>
      </div>
    );
  }
  return (
    <div className=" ">
      <Navbar />
      <div className=" font-roboto flex justify-center gap-3 bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent font-bold text-4xl mt-2">
        Posts From
        <div className="font-roboto  bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent ">
          {communityName}
        </div>
      </div>
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

export default PostFromCommunity;
