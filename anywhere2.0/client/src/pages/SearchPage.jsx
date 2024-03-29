import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";
import Navbar from "../components/Navbar";
import { toast } from "react-hot-toast";
// react icons
import { FaSearch } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDeleteOutline, MdReport } from "react-icons/md";
// custom hooks
import useCalculateAge from "../hooks/useCalculateAge";
import useSessionStorage from "../hooks/useSessionStorage";
import { PacmanLoader } from "react-spinners";

const SearchPage = () => {
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useSessionStorage("user");
  const [posts, setPosts] = useState([]);
  const [blurStatus, setBlurStatus] = useState({});
  const [showOptions, setShowOptions] = useState(false);
  const [postName, setPostName] = useState("");
  const navigate = useNavigate();

  const userAge = useCalculateAge(user.dob);
  console.log("Current Age:", userAge);

  const fetchPosts = async () => {
    try {
      const response = await axios.post("/posts/search", { postName });
      setPosts(response.data);
      setLoading(false);

      console.log("filtered post", response.data);
      const initialBlurStatus = {};
      response.data.forEach((post, index) => {
        initialBlurStatus[index] = true;
      });
      setBlurStatus(initialBlurStatus);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
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

  if (loading) {
    // If loading, display the spinner
    return (
      <div className="w-2/4 p-4 h-screen flex justify-center items-center">
        <PacmanLoader color="#005eff" /> {/* Use PacmanLoader component */}
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="w-3/4 flex m-4">
          <input
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
            placeholder="Enter the name of post..."
            className="w-full border rounded p-2 text-center"
            type="text"
          />
          <FaSearch
            onClick={fetchPosts}
            className="cursor-pointer text-4xl mx-2"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-2/4 p-4 flex flex-col justify-center items-center space-y-4">
          <h1 className="text-3xl font-bold mb-4 text-blue-700">
            {posts.length === 0 ? "No Posts" : "Posts"}
          </h1>
          <div className="min-w-[40rem] m-4">
            {posts.map((post, index) => {
              // Skip rendering this post if user is under 18 and post is NSFW
              if (userAge < 18 && post.nsfw) {
                return null;
              }

              return (
                <div
                  key={index}
                  onClick={() => navigate(`/posts/${post._id}`)}
                  className="rounded-lg shadow-md p-4 bg-white transform transition-transform duration-500 hover:shadow-blue-400 mb-4"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 text-lg font-semibold">
                      Post By
                      <div className="bg-gradient-to-r from-sky-500 to-indigo-900 bg-clip-text text-transparent">
                        {post.author}
                      </div>
                    </div>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                          id="options-menu"
                          aria-haspopup="true"
                          aria-expanded="true"
                          onClick={handleShowOptions}
                        >
                          <SlOptionsVertical
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {showOptions && (
                        <div className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                          <div
                            className="py-1 "
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {(user.username === post.author || user.isMod) && (
                              <div className="">
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
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {post.nsfw && (
                    <p className="inline rounded-sm text-red-600 border border-red-800 text-sm mt-4 pr-1 pl-1">
                      NSFW
                    </p>
                  )}
                  <div className="flex justify-center">
                    <img
                      onClick={(event) => toggleBlur(index, event)}
                      className={`object-contain rounded-t-lg h-1/3 ${
                        blurStatus[index] && post.nsfw ? "blur-lg" : ""
                      }`}
                      src={post.imageUrl}
                      alt={post.name}
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2">{post.name}</h2>
                    <p className="bg-gradient-to-r from-sky-700 to-indigo-900 bg-clip-text text-transparent mb-2">
                      {post.category}
                    </p>
                    <p className="text-gray-600 text-sm">{post.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
