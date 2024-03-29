import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import useSessionStorage from "../hooks/useSessionStorage";
import { LuArrowBigUp, LuArrowBigDown } from "react-icons/lu";

const PostContainer = ({ value, onClick }) => {
  const [post, setPost] = useState([]);
  console.log("Ultimate", value);
  const [blurStatus, setBlurStatus] = useState(true);

  // eslint-disable-next-line
  const [user, setUser] = useSessionStorage("user");
  const navigate = useNavigate();

  const fetchPost = async () => {
    console.log("Fetching/Updating");
    try {
      const postId = value._id;
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
  const toggleBlur = (event) => {
    event.stopPropagation();
    setBlurStatus(!blurStatus);
  };
  const upvote = async (event, post) => {
    event.stopPropagation();
    console.log("Upvoting for postId:", post._id);
    if (post.voteStatus === 1) {
      post.votes -= 1;
      post.voteStatus = 0;
    } else {
      post.votes -= post.voteStatus - 1;
      post.voteStatus = 1;
    }

    try {
      const postId = post._id;
      const response = await axios.post(`/posts/${postId}/votes`, {
        userId: user._id,
        voteStatus: post.voteStatus,
        postId: postId,
      });

      console.log("Upvote response:", response.data);
      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  const downvote = async (event, post) => {
    event.stopPropagation();
    console.log("Downvoting for postId:", post._id);

    if (post.voteStatus === -1) {
      post.votes += 1;
      post.voteStatus = 0;
    } else {
      post.votes -= post.voteStatus + 1;
      post.voteStatus = -1;
    }

    try {
      const postId = post._id;
      const response = await axios.post(`/posts/${postId}/votes`, {
        userId: user._id,
        voteStatus: post.voteStatus,
        postId: postId,
      });

      console.log("Downvote response:", response.data);
      fetchPost();
    } catch (error) {
      console.error(error);
    }
  };

  function viewProfileofOthers(event, username) {
    event.stopPropagation();

    navigate(`/profile/${username}`);
  }

  const totalVotes = Array.isArray(post.votes)
    ? post.votes.reduce((total, vote) => total + vote.voteStatus, 0)
    : 0;

  return (
    <div className="flex justify-center">
      <div className="w-3/4 ">
        <div className="m-8 " onClick={onClick}>
          <div className=" rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4">
            <div className="">
              <div className="flex gap-3 text-lg font-semibold">
                Post By
                <div
                  onClick={(event) => viewProfileofOthers(event, post.author)}
                  className=" cursor-pointer bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent"
                >
                  {post.author}
                </div>
              </div>
              {post.nsfw ? (
                <p className="inline rounded-sm text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                  {post.nsfw ? "NSFW" : ""}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="">
              <img
                onClick={toggleBlur}
                className={`w-full h-[20rem] object-contain rounded-t-lg ${
                  blurStatus && post.nsfw ? "blur-lg" : ""
                }`}
                src={post.imageUrl}
                alt={post.name}
              />
            </div>

            <div className="p-4 flex">
              <div className="">
                <div className="flex mt-2 space-x-2 ">
                  <button
                    onClick={(event) => upvote(event, post)}
                    className="  text-green-300 text-2xl"
                  >
                    <LuArrowBigUp />
                  </button>
                  <div className="text-xl font-bold">{totalVotes}</div>
                  <button
                    onClick={(event) => downvote(event, post)}
                    className="text-red-300  text-2xl"
                  >
                    <LuArrowBigDown />
                  </button>
                </div>

                <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                <p className="text-gray-600 text-base mb-2">{post.category}</p>
                <p className="text-gray-600 text-sm">{post.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostContainer;
