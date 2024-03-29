import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// custom-hooks
import useSessionStorage from "../hooks/useSessionStorage";
import useCalculateAge from "../hooks/useCalculateAge";
// react-icons
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline, MdReport } from "react-icons/md";
import { LuArrowBigUp, LuArrowBigDown, LuFileEdit } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { IoShareSocialSharp } from "react-icons/io5";

import { PacmanLoader } from "react-spinners";

const AllPosts = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useSessionStorage("user");
  const [posts, setPosts] = useState([]);
  // console.log(posts);
  const [blurStatus, setBlurStatus] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const fetchPosts = async () => {
    try {
      const response = await axios.get("/posts");
      setPosts(response.data);
      setLoading(false);
      const initialBlurStatus = {};
      response.data.forEach((post, index) => {
        initialBlurStatus[index] = true;
      });
      setBlurStatus(initialBlurStatus);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const userAge = useCalculateAge(user.dob);
  // console.log("Current Age:", userAge);

  useEffect(() => {
    fetchPosts();
    const refreshInterval = setInterval(fetchUser, 2000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
    // eslint-disable-next-line
  }, []);
  const fetchUser = async () => {
    // un comment below code to refresh post every 2 sec
    // fetchPosts();
    try {
      const userId = user._id;
      const response = await axios.get(`/users/current/${userId}`);
      // console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const toggleBlur = (index, event) => {
    event.stopPropagation();
    setBlurStatus({
      ...blurStatus,
      [index]: !blurStatus[index],
    });
  };

  const handleDeletePost = (event, postId) => {
    event.stopPropagation();
    axios
      .delete(`/posts/${postId}`)
      .then((req, res) => {
        fetchPosts();
        toast.success("Post Deleted", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => console.log(err));
  };
  const handleEditPost = (event, postId) => {
    event.stopPropagation();
    navigate(`/posts/edit/${postId}`);
  };

  const handleReportPost = (event, postId) => {
    event.stopPropagation();
    navigate(`/report/${postId}`);
    fetchPosts();
  };

  const handleShowOptions = (event) => {
    event.stopPropagation();
    setShowOptions(!showOptions);
  };

  const path = "http://localhost:3000/posts/";
  // console.log(path);

  const handleShare = (event, postId) => {
    event.stopPropagation();
    navigator.clipboard.writeText(path + postId);
    toast.success("Post link copied to clipboard", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  function viewProfileofOthers(event, username) {
    event.stopPropagation();

    navigate(`/profile/${username}`);
  }
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
      fetchPosts();
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
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    // If loading, display the spinner
    return (
      <div className="w-2/4 p-4 h-screen flex justify-center items-center">
        <PacmanLoader color="#005eff" /> {/* Use PacmanLoader component */}
      </div>
    );
  }

  return (
    <div className=" w-2/4 p-4 flex flex-col justify-center items-center space-y-4">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">
        {posts.length === 0 ? "No Posts" : "All Posts"}
      </h1>
      <div className="min-w-[40rem] m-4">
        {posts
          .slice()
          .reverse()
          .map((post, index) => {
            const totalVotes = Array.isArray(post.votes)
              ? post.votes.reduce((total, vote) => total + vote.voteStatus, 0)
              : 0;

            // Check if the user is under 18 and the post is marked as NSFW
            if (userAge < 18 && post.nsfw) {
              return null; // Skip rendering this post
            }

            return (
              <div
                key={index}
                onClick={() => navigate(`/posts/${post._id}`)}
                className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4"
              >
                <div className="flex  ">
                  {" "}
                  {/*  */}
                  <div className="flex flex-col items-center space-y-2 px-2 mr-3 bg-gradient-to-r from-blue-600 to-sky-400">
                    <button
                      onClick={(event) => upvote(event, post)}
                      className="mt-2 text-green-300 text-2xl"
                    >
                      <LuArrowBigUp />
                    </button>
                    <div className="text-2xl font-bold">{totalVotes}</div>
                    <button
                      onClick={(event) => downvote(event, post)}
                      className="text-red-300 text-2xl"
                    >
                      <LuArrowBigDown />
                    </button>
                  </div>
                  {/*  */}
                  <div className="">
                    <div className="">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3 text-lg font-semibold">
                          Post By
                          <div
                            onClick={(event) =>
                              viewProfileofOthers(event, post.author)
                            }
                            className=" cursor-pointer bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent"
                          >
                            {post.author}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="relative inline-block text-left">
                            <div>
                              <SlOptionsVertical
                                onClick={handleShowOptions}
                                className="text-xl cursor-pointer"
                                aria-hidden="true"
                              />
                            </div>

                            {showOptions && (
                              <div className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div
                                  className="py-1 "
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu"
                                >
                                  <button
                                    onClick={(event) => {
                                      handleReportPost(event, post._id);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    <MdReport className="inline-block mr-2 text-red-700 text-xl" />
                                    Report
                                  </button>
                                  <button
                                    onClick={(event) => {
                                      handleShare(event, post._id);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    <IoShareSocialSharp className="inline-block mr-2 text-gray-700 text-xl" />
                                    Share
                                  </button>
                                  {user.username === post.author && (
                                    <button
                                      onClick={(event) => {
                                        handleEditPost(event, post._id);
                                      }}
                                      className="block  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                      role="menuitem"
                                    >
                                      <LuFileEdit className="inline-block mr-2 text-red-700 text-xl" />
                                      Edit
                                    </button>
                                  )}
                                  {(user.username === post.author ||
                                    user.isMod) && (
                                    <div>
                                      <button
                                        onClick={(event) => {
                                          handleDeletePost(event, post._id);
                                        }}
                                        className="block  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                        role="menuitem"
                                      >
                                        <MdDeleteOutline className="inline-block mr-2 text-red-700 text-xl" />
                                        Delete
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      {post.nsfw && (
                        <p className="inline rounded-sm text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                          NSFW
                        </p>
                      )}

                      <div className="flex justify-center">
                        {post.imageUrl.includes(".") && (
                          <img
                            onClick={(event) => toggleBlur(index, event)}
                            className={`object-contain rounded-t-lg h-1/3 ${
                              blurStatus[index] && post.nsfw ? "blur-lg" : ""
                            }`}
                            src={post.imageUrl}
                            alt={post.name}
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="flex items-center gap-2 text-gray-600 ">
                          {post.votes.length} <FaUser /> voted
                        </p>
                        <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                        <p className="bg-gradient-to-r from-sky-700 to-indigo-900 bg-clip-text text-transparent mb-2">
                          {post.category}
                        </p>
                        <p className="text-gray-600 text-sm mb-2">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllPosts;
