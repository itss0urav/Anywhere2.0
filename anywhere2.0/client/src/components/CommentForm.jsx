import React, { useState, useEffect } from "react";
import axios from "../config/axios";
import { toast } from "react-hot-toast"; 
import { useParams } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";

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
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4">
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-2 py-1 mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
