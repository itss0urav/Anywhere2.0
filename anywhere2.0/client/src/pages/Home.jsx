import React from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center mt-2 ">
        <CreatePost />
      </div>
    </div>
  );
};

export default Home;
