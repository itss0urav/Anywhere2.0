import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import { toast, Toaster } from "react-hot-toast";

export default function AdminPostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    console.log("Fetching/Updating...")
    try {
      const response = await axios.get("/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDeletePost = (postId) => {
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

  useEffect(() => {
    fetchPosts();
     // Set up interval for automatic refresh (every 5 minutes in this example)
     const refreshInterval = setInterval(
      fetchPosts,
      // 5 *
      // 60 *
      2000
    );

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              "Image",
              "Name",
              "Category",
              "Description",
              "Author",
              "NSFW",
              "[Unique User Interaction] Votes",
              "Comments",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {posts.map((post) => (
            <tr key={post._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img
                  className="h-10 w-10 object-cover rounded-md"
                  src={post.imageUrl}
                  alt="User"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{post.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{post.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {post.description.split(" ").slice(0, 3).join(" ") + "..."}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{post.author}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {post.nsfw ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {post.votes.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {post.comments.length}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => {
                    handleDeletePost(post._id);
                  }}
                  className="red-gradient-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
