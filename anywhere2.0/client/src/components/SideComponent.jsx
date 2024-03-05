import axios from "../config/axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CaroselContainer from "./CaroselContainer";
import { FaUsers } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
const SideComponent = () => {
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
  }, []);

  const renderCategories = () => {
    // console.log("renderCategories");
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
      <div className="flex flex-col gap-4 my-4">
        <Link
          to="/Explore"
          className="flex text-xl gap-2 justify-center bg-gradient-to-r from-blue-600 to-indigo-800 rounded-md text-white py-2"
        >
          <FaUsers />
          Community
        </Link>
        <Link
          to="/DiscoverZone"
          className="flex text-xl gap-2 justify-center bg-gradient-to-r from-blue-600 to-indigo-800 rounded-md text-white py-2"
        >
          <MdTravelExplore />
          Explore
        </Link>
      </div>
      <div className="text-center">Popular Categories</div>
      <div className="text-center rounded-md text-white bg-gradient-to-r from-blue-700 to-blue-500 md:min-w-[13rem] ">
        {renderCategories()}
      </div>

      <div className="mt-4 md:max-w-[13rem]">
        <CaroselContainer />
      </div>
    </div>
  );
};

export default SideComponent;
