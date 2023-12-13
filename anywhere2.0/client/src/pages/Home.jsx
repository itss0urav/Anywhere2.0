import React from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import AllPosts from "../components/AllPosts";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-2 ">
        <CreatePost />
      </div>
        <div className="">
          <AllPosts />
        </div>
    </div>
  );
};

export default Home;
