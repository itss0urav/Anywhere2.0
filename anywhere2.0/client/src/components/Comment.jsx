import React, { useState, useEffect } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import axios from "../config/axios";
import useSessionStorage from "../hooks/useSessionStorage";
import { useParams } from "react-router-dom";

const Comment = ({ username, commentText }) => {
  const { postId } = useParams();

  console.log(postId);
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const [votes, setVotes] = useState(0);
  const [input, setInput] = useState("");

  const upvote = () => {
    setVotes(votes + 1);
  };

  const downvote = () => {
    setVotes(votes - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`/posts/${postId}/comments`, {
        text: input,
        user: user.username,
      });
      console.log(response.data);
      setInput("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4">
      <div className="text-2xl font-bold">{username}</div>
      <p className="text-gray-500">{commentText}</p>
      <div className="flex items-center space-x-2">
        <button onClick={upvote} className="text-green-500">
          <LuArrowBigUp />
        </button>
        <button onClick={downvote} className="text-red-500">
          <LuArrowBigDown />
        </button>
        <span>{votes}</span>
      </div>
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

export default Comment;
