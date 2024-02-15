import axios from "../config/axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CaroselContainer from "./CaroselContainer";
import { MdTravelExplore } from "react-icons/md";
const SideComponent = () => {
  const [communities, setCommunities] = useState([]);

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    console.log("fetching category");
    try {
      const { data } = await axios.get("/posts/categories");
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
    getCommunities();
  }, []);

  const getCommunities = async () => {
    try {
      const response = await axios.get("/community/get");
      setCommunities(response.data);
    } catch (error) {
      console.error(`Error fetching communities: ${error}`);
    }
  };
  const renderCategories = () => {
    console.log("renderCategories");
    if (categories.length === 0) {
      return <div>Empty Here</div>;
    }

    return categories.map((category, index) => (
      <Link
        to={`/posts/category/${encodeURIComponent(category)}`}
        className="bg-cyan-100 bg-transparent mt-2 p-2 rounded-md bg-opacity-20"
        key={index}
      >
        <div className="">{category}</div>
      </Link>
    ));
  };

  return (
    <div>
      <Link
        to="/Explore"
        className="flex text-xl gap-2 justify-center bg-gradient-to-r from-blue-600 to-indigo-800 rounded-md text-white py-2"
      >
        <MdTravelExplore />
        Explore
      </Link>
      <div className="text-center">Popular Categories</div>
      <div className="text-center rounded-md text-white bg-gradient-to-r from-blue-700 to-blue-500 md:min-w-[13rem] ">
        {renderCategories()}
      </div>

      <div className="">
        <div className="mt-4 text-center">Communities</div>
        <div className=" text-center rounded-md text-white bg-gradient-to-r from-blue-700 to-blue-500 md:min-w-[13rem]">
          {communities.map((data) => (
            <Link
              to={`/posts/community/${encodeURIComponent(data.communityName)}`}
              className="flex flex-col bg-cyan-100 bg-transparent mt-2 p-2 rounded-md bg-opacity-20"
              key={data._id}
            >
              {data.communityName}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-4 md:max-w-[13rem]">
        <CaroselContainer />
      </div>
    </div>
  );
};

export default SideComponent;
