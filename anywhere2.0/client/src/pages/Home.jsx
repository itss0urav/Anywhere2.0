import React from "react";
import Navbar from "../components/Navbar";
import CreatePost from "../components/CreatePost";
import AllPosts from "../components/AllPosts";
import SideComponent from "../components/SideComponent";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex justify-center">
        <div className="flex-grow">
          <div className="flex justify-center mt-2">
            <CreatePost />
          </div>
          <div className="flex justify-center">
            <AllPosts />
          </div>
        </div>
        <div className="max-w-[25%] m-2  ">
          <SideComponent />
        </div>
        
      </div>
    </div>
  );
};

export default Home;
