import React, { useEffect, useState } from "react";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";
import { BiMessageRounded } from "react-icons/bi";

import { useParams } from "react-router-dom";
import axios from "../config/axios";
import useSessionStorage from "../hooks/useSessionStorage";

export default function CommentContainer() {
  const [user] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
  }, [user]);

  const { postId } = useParams();
  console.log("Post id from comment ", postId);

  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  // Add a state variable for the most liked comment
  const [mostLikedComment, setMostLikedComment] = useState(null);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      console.log("fetched comments", response.data);
      const commentsWithVotes = response.data.comments.map((comment) => ({
        ...comment,
        voteStatus: 0, // Initialize voteStatus to 0 for each comment
      }));
      setComments(commentsWithVotes);

      // Find the comment with the most likes
      const mostLiked = commentsWithVotes.reduce((prev, current) => {
        return prev.votes > current.votes ? prev : current;
      });
      setMostLikedComment(mostLiked);

      console.log("Fetched comments with votes:", commentsWithVotes);
      console.log("Most liked comment:", mostLiked);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, [postId]);

  const upvote = async (comment) => {
    console.log("Upvoting for postId:", postId, "commentId:", comment._id);
    if (comment.voteStatus === 1) {
      comment.votes -= 1;
      comment.voteStatus = 0;
    } else {
      comment.votes -= comment.voteStatus - 1;
      comment.voteStatus = 1;
    }

    try {
      const response = await axios.post(
        `/posts/${postId}/comments/${comment._id}/votes`,
        {
          userId: user._id,
          voteStatus: comment.voteStatus,
          postId: postId,
        }
      );

      console.log("Upvote response:", response.data);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
  };

  const downvote = async (comment) => {
    console.log("Downvoting for postId:", postId, "commentId:", comment._id);

    if (comment.voteStatus === -1) {
      comment.votes += 1;
      comment.voteStatus = 0;
    } else {
      comment.votes -= comment.voteStatus + 1;
      comment.voteStatus = -1;
    }

    try {
      const response = await axios.post(
        `/posts/${postId}/comments/${comment._id}/votes`,
        {
          userId: user._id,
          voteStatus: comment.voteStatus,
          postId: postId,
        }
      );

      console.log("Downvote response:", response.data);
      fetchComments();
    } catch (error) {
      console.error(error);
    }
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
      console.log("Reply response:", response.data);
      setReply("");
      setReplyingTo(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-4 p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4">
      <h2 className="text-3xl font-bold text-center">Comments</h2>
      {mostLikedComment && (
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="text-xl font-bold text-gray-800">
            {mostLikedComment.user}
          </h3>
          <p className="text-gray-600">{mostLikedComment.text}</p>
          <div className="text-lg font-bold">
            {mostLikedComment.votes.length}
          </div>
        </div>
      )}
      {comments.map((comment) => {
        const totalVotes = comment.votes.reduce(
          (total, vote) => total + vote.voteStatus,
          0
        );
        return (
          <div
            key={comment._id}
            className="bg-white shadow-sm p-4 rounded-md space-y-4"
          >
            <div className="flex space-x-4">
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => upvote(comment)}
                  className="text-green-500 text-2xl"
                >
                  <LuArrowBigUp />
                </button>
                <div className="text-lg font-bold">{totalVotes}</div>
                <button
                  onClick={() => downvote(comment)}
                  className="text-red-500 text-2xl"
                >
                  <LuArrowBigDown />
                </button>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-800">
                  {comment.user}
                </h3>
                <p className="text-gray-600">{comment.text}</p>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setReplyingTo(comment._id)}
                    className="text-blue-800"
                  >
                    <BiMessageRounded />
                  </button>
                </div>
              </div>
            </div>
            {comment.replies.map((reply) => (
              <div
                key={reply._id}
                className="ml-4 mt-2 bg-gray-100 p-2 rounded"
              >
                <h4 className="font-semibold text-gray-700">{reply.user}</h4>
                <p className="text-gray-600">{reply.text}</p>
              </div>
            ))}
            {replyingTo === comment._id && (
              <form
                onSubmit={(e) => handleReply(e, comment._id)}
                className="mt-2"
              >
                <input
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Add a reply"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        );
      })}
    </div>
  );
}
