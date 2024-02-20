import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useSessionStorage from "../hooks/useSessionStorage";
// react-icons
import { MdDeleteOutline } from "react-icons/md";
import { BiMessageRounded } from "react-icons/bi";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";

export default function CommentContainer() {
  const navigate = useNavigate();

  const [user, setUser] = useSessionStorage("user");
  useEffect(() => {
    console.log("Changes/Access Noticed in Session Data");
    fetchUser();

    const refreshInterval = setInterval(fetchUser, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
    // eslint-disable-next-line
  }, []);
  const fetchUser = async () => {
    try {
      const userId = user._id;
      const response = await axios.get(`/users/current/${userId}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [mostLikedComment, setMostLikedComment] = useState(null);
  console.log("Post id from comment ", postId);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/posts/${postId}/comments`);
      console.log("fetched comments", response.data);
      const commentsWithVotes = response.data.comments.map((comment) => ({
        ...comment,
        voteStatus: 0, // Initialize voteStatus to 0 for each comment
      }));
      setComments(commentsWithVotes);

      // Find the comment with the most replies
      if (commentsWithVotes.length > 0) {
        const mostReplied = commentsWithVotes.reduce((prev, current) => {
          return prev.replies.length > current.replies.length ? prev : current;
        });
        setMostLikedComment(mostReplied);
        console.log("Most replied comment:", mostReplied);
      } else {
        console.log("No comments to find the most replied");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchComments();
    const refreshInterval = setInterval(fetchComments, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
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
      toast.success("Reply added!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Failed to add reply", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error(error);
    }
  };
  const handleReplyDelete = async (postId, commentId, text) => {
    console.log("ReplyIDD", text);
    try {
      // console.log("Deleting reply...", "PostId:", postId, "CommentId:", commentId, "ReplyId:", replyId);

      // const response =
       await axios.delete(
        `/posts/${postId}/comments/${commentId}/replies/${text}`
      );

      // console.log("Reply delete response:", response.data);
      toast.success("Reply deleted!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      fetchComments();
    } catch (error) {
      toast.error("Failed to delete reply", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error("Error deleting reply:", error);
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    try {
      const response = await axios.delete(
        `/posts/${postId}/comments/${commentId}/delete`,
        { data: { postId } }
      );
      toast.success("Comment deleted!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.log("Reply response:", response.data);
    } catch (error) {
      toast.error("Failed to delete Comment", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      console.error(error);
    }
  };

  function viewProfileofOthers(event, username) {
    event.stopPropagation();

    navigate(`/profile/${username}`);
  }

  return (
    <div className="mt-4 p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4 sm:py-4">
      <h2 className="text-3xl font-bold text-center">Comments</h2>
      {mostLikedComment && (
        <div className="bg-green-100 p-4 rounded-md">
          <h3 className="flex gap-4 text-xl font-bold text-gray-800">
            Most Interacted Comment by
            <div className="bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent">
              {mostLikedComment.user}
            </div>
          </h3>
          <p className="text-gray-600">{mostLikedComment.text}</p>
          <div className="text-lg ">
            {mostLikedComment.replies.length} Replies
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
                <h3 className="flex gap-4 text-xl font-bold text-gray-800">
                  Comment by
                  <div
                    onClick={(event) =>
                      viewProfileofOthers(event, comment.user)
                    }
                    className=" cursor-pointer bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent"
                  >
                    {comment.user}
                  </div>
                </h3>
                <p className="text-gray-600">{comment.text}</p>
                <div className="flex items-center space-x-2">
                  <BiMessageRounded
                    onClick={() => setReplyingTo(comment._id)}
                    className="cursor-pointer text-blue-800"
                  />
                  {user.username === comment.user || user.isMod === true ? (
                    <MdDeleteOutline
                      onClick={() => handleDeleteComment(postId, comment._id)}
                      className="cursor-pointer text-red-800"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            {comment.replies.map((reply, index) => (
              <div key={index} className="ml-4 mt-2 bg-gray-100 p-2 rounded">
                <h4 className="flex gap-2 font-semibold text-gray-700">
                  Replied by
                  <div
                    onClick={(event) => viewProfileofOthers(event, reply.user)}
                    className="cursor-pointer bg-gradient-to-r from-sky-600 to-cyan-900 bg-clip-text text-transparent"
                  >
                    {reply.user}
                  </div>
                  <div className="flex items-center">
                    {user.username === reply.user || user.isMod === true ? (
                      <MdDeleteOutline
                        onClick={() =>
                          handleReplyDelete(postId, comment._id, reply.text)
                        }
                        className="cursor-pointer text-red-800"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                </h4>
                <p className="text-gray-600 mt-2">{reply.text}</p>
              </div>
            ))}
            {replyingTo === comment._id && (
              <form
                onSubmit={(e) => handleReply(e, comment._id)}
                className="mt-2"
              >
                <input
                  required
                  type="text"
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Add a reply"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <button
                  type="submit"
                  className="blue-gradient-btn mt-2"
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
