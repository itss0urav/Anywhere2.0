import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-hot-toast"; 
import CommentForm from "../components/CommentForm";
import PostContainer from "../components/PostContainer";
import useSessionStorage from "../hooks/useSessionStorage";
import CommentContainer from "../components/CommentContainer";
const PostView = () => {
  const nav = useNavigate();
  const [user] = useSessionStorage("user");

  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    console.log("Fetching/Updating")
    try {
      const response = await axios.get(`/posts/${postId}`);
      setPost(response.data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  useEffect(() => {
    fetchPost();
  // eslint-disable-next-line
  }, []);

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
        }, 1000);
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
     
      {user.username === post.author || user.isMod ? (
        <div className="flex justify-end items-center p-4">
          <button
            onClick={(event) => {
              handleDeletePost(event, post._id);
            }}
            className="flex justify-center items-center red-gradient-btn"
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
