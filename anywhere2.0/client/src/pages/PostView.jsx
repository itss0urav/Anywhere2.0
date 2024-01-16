// PostView.js

import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import CommentForm from "../components/CommentForm";
import PostContainer from "../components/PostContainer";
import CommentContainer from "../components/CommentContainer";
import useSessionStorage from "../hooks/useSessionStorage";
import { MdDeleteOutline } from "react-icons/md";
import { toast, Toaster } from "react-hot-toast"; // import react-hot-toast
import { useNavigate } from "react-router-dom";
const PostView = () => {
  const nav = useNavigate();
  const [user] = useSessionStorage("user");

  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  }, [post]);

  const handleDeletePost = (event, postId) => {
    event.stopPropagation();
    axios
      .delete(`/posts/${postId}`)
      .then((req, res) => {
        toast.success(req.data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        fetchPost();
        setTimeout(() => {
          nav("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error deleting post", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  if (!post) {
    return <div className="text-center text-4xl mt-4">No post selected</div>;
  }

  return (
    <div className="">
      <Navbar />
      <div>
        <Toaster />
      </div>
      {user.username === post.author ? (
        <div className="flex justify-end items-center p-4">
          <button
            onClick={(event) => {
              handleDeletePost(event, post._id);
            }}
            className="flex items-center text-red-700 text-xl hover:text-red-500"
          >
            <MdDeleteOutline /> <span className="ml-2">Delete</span>
          </button>
        </div>
      ) : (
        <></>
      )}
      <PostContainer value={post} index={0} />
      <div className="">
        <CommentForm value={postId} />
        <CommentContainer />
      </div>
    </div>
  );
};

export default PostView;
