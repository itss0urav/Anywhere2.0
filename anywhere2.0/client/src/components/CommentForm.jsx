import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import bgimg from "../assets/Anywhere-Transparent.png";
const CommentForm = () => {
  const { postId } = useParams();

  console.log(postId);
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        text: input,
        user: user.username,
      });
      console.log(response.data.post);
      setInput("");
      toast.success("Comment added!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to add comment", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error(error);
    }
  };

  return (
    <div className=" max-w-xl mx-auto bg-white rounded-xl shadow-md  ">
      <form
        onSubmit={handleSubmit}
        class=" mx-auto bg-gradient-to-r from-blue-700 to-cyan-400 p-4 rounded-md  backdrop-blur-lg bg-opacity-80 relative"
      >
        <img
          src={bgimg}
          alt=""
          className=" blur absolute inset-0 w-full h-full object-cover z-[-1]"
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border text-center border-gray-300 p-2 rounded w-full"
          placeholder="Add a comment"
        />
        <button type="submit" class="blue-gradient-btn border border-blue-800 mt-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
