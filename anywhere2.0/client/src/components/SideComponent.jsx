import axios from "../config/axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CaroselContainer from "./CaroselContainer";

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
