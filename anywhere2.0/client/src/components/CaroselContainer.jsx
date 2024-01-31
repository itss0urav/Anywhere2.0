import React, { useState, useEffect } from "react";
import axios from "../config/axios";
export default function CaroselContainer() {
  const [bannerData, setBannerData] = useState([]);
  const imagePath = "http://localhost:5000/files/";
  useEffect(() => {
    fetchData();
    const refreshInterval = setInterval(fetchData, 2000);
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  function fetchData() {
    axios
      .get("/admin/getbanner")
      .then((res) => {
        setBannerData(res.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 to-blue-500 rounded p-1">
      {bannerData.map((banner, index) => (
        <div key={index}>
          <div className="text-center text-white animate-pulse">
            {banner.name}
          </div>
          <img
            className=" rounded-md shadow "
            src={`${imagePath}${banner.image}`}
            alt={banner.name}
          />
        </div>
      ))}
    </div>
  );
}
