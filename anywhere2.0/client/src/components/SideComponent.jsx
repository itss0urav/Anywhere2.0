import axios from "../config/axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SideComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/posts/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <div className="">Popular Categories</div>
      <div className="text-center rounded-sm text-white bg-gradient-to-r from-blue-700 to-blue-500 p-2">
        {categories.map((category, index) => (
          <Link
            to={`/posts/category/${encodeURIComponent(category)}`}
            className="bg-cyan-100 bg-transparent mt-2 p-2 rounded-md bg-opacity-20"
            key={index}
          >
            <div className="">{category}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideComponent;
