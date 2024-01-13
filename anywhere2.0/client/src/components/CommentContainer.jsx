import React, { useEffect, useState } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { BiMessageSquareAdd } from "react-icons/bi";
import { useParams } from "react-router-dom";
import axios from "../config/axios";
import useSessionStorage from "../hooks/useSessionStorage";

export default function CommentContainer() {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [votes, setVotes] = useState(0);
  const [reply, setReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

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

  const handleReply = async (event, commentId) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `/posts/${postId}/comments/${commentId}/replies`,
        {
          text: reply,
          user: user.username, // replace this with the actual username
        }
      );
      console.log(response.data);
      setReply("");
      setReplyingTo(null);
    } catch (error) {
      console.error(error);
    }
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
            <button
              onClick={() => setReplyingTo(comment._id)}
              className="text-blue-500"
            >
              <BiMessageSquareAdd />
            </button>
            <span>{votes}</span>
          </div>
          {comment.replies.map((reply) => (
            <div key={reply._id} className="ml-4 mt-2 bg-gray-200 p-2 rounded">
              <h4 className="font-semibold">{reply.user}</h4>
              <p className="text-gray-800">{reply.text}</p>
            </div>
          ))}
          {replyingTo === comment._id && (
            <form onSubmit={(e) => handleReply(e, comment._id)} className="mt-2">
              <input
                type="text"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Add a reply"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
            </form>
          )}
        </div>
      ))}
    </div>
  );
}
