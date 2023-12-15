import axios from "../config/axios";
import React, { useEffect, useState } from "react";

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
      <div className="rounded-sm text-white bg-gradient-to-r from-blue-700 to-blue-500 p-2">
        {categories.map((category, index) => (
          <p className="bg-gray-700 bg-transparent mt-2 p-2 rounded-md" key={index}>{category}</p>
        ))}
      </div>
    </div>
  );
};

export default SideComponent;
