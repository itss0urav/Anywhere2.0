import React, { useState } from "react";
import axios from "axios";
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      AllPosts
      <div className="">{}</div>
    </div>
  );
};

export default AllPosts;
