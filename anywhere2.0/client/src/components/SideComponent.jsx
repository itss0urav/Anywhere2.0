import axios from "../config/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <div className="">Popular Categories</div>
      <div className="text-center rounded-sm text-white bg-gradient-to-r from-blue-700 to-blue-500 md:min-w-[11rem]">
        {renderCategories()}
      </div>
    </div>
  );
};

export default SideComponent;
