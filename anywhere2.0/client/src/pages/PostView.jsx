// PostView.js
import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
import PostContainer from "../components/PostContainer";

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

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

  return (
    <div className="">
      <Navbar />
      <PostContainer value={post} index={0} />
      <div className="">
        <Comment />
      </div>
    </div>
  );
};

export default PostView;
