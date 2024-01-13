import React, { useEffect, useState } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

export default function CommentContainer() {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/comments`);
        setComments(response.data.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const upvote = () => {
    setVotes(votes + 1);
  };

  const downvote = () => {
    setVotes(votes - 1);
  };

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4">
      <h2 className="text-3xl font-bold text-center">Comments</h2>
      {comments.map((comment) => (
        <div className="bg-gray-100 p-4 rounded-md" key={comment._id}>
          <h3 className="text-xl font-bold">{comment.user}</h3>
          <p className="text-gray-700">{comment.text}</p>
          <div className="flex items-center space-x-2 mt-2">
            <button onClick={upvote} className="text-green-500">
              <LuArrowBigUp />
            </button>
            <button onClick={downvote} className="text-red-500">
              <LuArrowBigDown />
            </button>
            <span>{votes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
