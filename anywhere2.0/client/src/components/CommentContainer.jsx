import React, { useEffect, useState } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { useParams } from "react-router-dom";
import axios from "../config/axios";

export default function CommentContainer() {
  const { postId } = useParams();
  console.log("From container", postId);
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
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-2 sm:py-4">
      <div>CommentContainer</div>
      <div>
        {comments.map((comment) => (
          <div key={comment._id}>
            <h2 className="flex gap-1">
              Comment By{" "}
              <div className="bg-gradient-to-r from-sky-400 to-indigo-600 bg-clip-text text-transparent">
                {comment.user}
              </div>{" "}
            </h2>
            <p className="bg-gradient-to-r from-cyan-900 to-sky-700 bg-clip-text text-transparent">{comment.text}</p>
            <div className="flex items-center space-x-2">
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
    </div>
  );
}
